import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    // FIX #1: the order is (set, get) - NOT (get, set)!
    (set, get) => ({
      cart: [],

      // Add a product (default 1), or increase its quantity if already in the cart
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          // Only keep what the cart needs (small + safe to save in localStorage)
          const slimProduct = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity,
          };
          return { cart: [...state.cart, slimProduct] };
        });
      },

      // +1 / -1 buttons. If quantity drops to 0, the item disappears.
      changeQuantity: (productId, amount) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + amount }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ cart: [] }),

      // Helpers - call them like: useCartStore((s) => s.totalItems())
      totalItems: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      cartTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + parseFloat(item.price) * item.quantity,
          0,
        ),
    }),
    {
      name: "sayan-cart", // key in localStorage
    },
  ),
);
