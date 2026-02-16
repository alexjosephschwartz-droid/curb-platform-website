'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DealerNav() {
  const pathname = usePathname();

  const links = [
    { href: '/dealer/dashboard', label: 'Dashboard' },
    { href: '/dealer/list-vehicle', label: 'List Vehicle' },
    { href: '/dealer/ai-assistant', label: 'AI Assistant' },
  ];

  return (
    <nav className="bg-curb-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dealer/dashboard" className="flex items-center">
            <span className="text-2xl font-bold">CURB</span>
            <span className="ml-3 text-sm text-gray-400">Dealer Portal</span>
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
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold">Premium Auto Wholesalers</p>
                <p className="text-xs text-gray-400">&#9733; 4.8 &bull; 142 sales</p>
              </div>
              <div className="w-10 h-10 bg-curb-orange rounded-full flex items-center justify-center font-bold">
                P
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
