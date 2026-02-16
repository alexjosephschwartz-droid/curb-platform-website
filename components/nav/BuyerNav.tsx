'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BuyerNav() {
  const pathname = usePathname();

  const links = [
    { href: '/browse', label: 'Browse' },
    { href: '/account', label: 'Account' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <header className="bg-curb-navy text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            CURB
          </Link>
          <nav className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? 'text-curb-orange'
                    : 'hover:text-curb-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
