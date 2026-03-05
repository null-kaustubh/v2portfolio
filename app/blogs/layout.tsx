import { ScrollTop } from "@/components/scroll-top";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="max-w-screen overflow-x-clip">{children}</main>
      <ScrollTop />
    </>
  );
}
