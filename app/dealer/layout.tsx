import DealerNav from '@/components/nav/DealerNav';

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DealerNav />
      {children}
    </>
  );
}
