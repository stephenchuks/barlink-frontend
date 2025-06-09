// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white pt-12 pb-4 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-bold mb-2">Temporarily BarLink</div>
          <div className="text-gray-500 mb-1">Scan, browse, order—it's that easy.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="text-gray-700 space-y-1">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/" className="hover:text-primary">Menu</a></li>
            <li><a href="/orders" className="hover:text-primary">My Orders</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="text-gray-700 space-y-1">
            <li><a href="/help" className="hover:text-primary">Help</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            <li><a href="/about" className="hover:text-primary">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Legal</div>
          <ul className="text-gray-700 space-y-1">
            <li><a href="/terms" className="hover:text-primary">Terms</a></li>
            <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8 border-t pt-4">
        © 2025 Temporarily BarLink. All rights reserved.
      </div>
    </footer>
  );
}
