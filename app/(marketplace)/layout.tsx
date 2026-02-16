import PublicNav from '@/components/nav/PublicNav';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}
