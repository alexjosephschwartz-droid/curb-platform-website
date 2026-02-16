'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PublicNav() {
  const pathname = usePathname();

  const links = [
    { href: '/browse', label: 'Browse Auctions' },
    { href: '/roadmap', label: 'Roadmap' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-curb-navy">
              CURB
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition font-medium ${
                    pathname === link.href
                      ? 'text-curb-orange'
                      : 'text-gray-600 hover:text-curb-navy'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="bg-curb-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
