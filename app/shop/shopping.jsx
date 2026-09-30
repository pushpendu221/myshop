// Change these numbers to match your shop
export const FLAT_RATE = 5; // shipping cost
export const FREE_SHIPPING_MIN = 50; // orders at/above this ship free

export function getShipping(subtotal) {
  return subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : FLAT_RATE;
}
