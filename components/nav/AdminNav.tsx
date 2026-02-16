'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/dealers', label: 'Dealers' },
    { href: '/admin/auctions', label: 'Auctions' },
    { href: '/admin/fraud-detection', label: 'Fraud Detection' },
  ];

  return (
    <nav className="bg-curb-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <span className="text-2xl font-bold">CURB</span>
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">ADMIN</span>
          </Link>
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? 'text-white hover:text-curb-orange'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-600">
              <div className="w-8 h-8 bg-curb-orange rounded-full flex items-center justify-center font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
