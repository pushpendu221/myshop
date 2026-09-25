import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "My E-Commerce",
  description: "Shop the best modern tech and home goods.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
        flex and flex-col ensure the footer is pushed to the bottom 
        if the page content is short.
      */}
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Navbar />

        {/* 'flex-grow' ensures this main content area takes up remaining space */}
        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
