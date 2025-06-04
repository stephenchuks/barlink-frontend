// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-white border-t shadow-inner py-4">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Barlink. All rights reserved.
      </div>
    </footer>
  );
}
