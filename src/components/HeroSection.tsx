// src/components/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white py-16 px-4 text-center shadow-card rounded-2xl mx-auto mt-8 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
        Discover. Order. Enjoy.
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Scan a restaurant QR code or search to explore menus, place orders, and track your food—all from your phone.
      </p>
      <Link
        href="#restaurants"
        className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-2xl shadow transition hover:bg-primary/90"
      >
        Browse Restaurants
      </Link>
    </section>
  );
}
