import BuyerNav from '@/components/nav/BuyerNav';

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BuyerNav />
      {children}
    </>
  );
}
