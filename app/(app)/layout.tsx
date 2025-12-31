import dynamic from "next/dynamic";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop),
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="max-w-screen overflow-x-hidden">{children}</main>
      <ScrollTop className="bg-secondary-foreground/20 text-secondary-foreground/90 rounded-full mr-2" />
    </>
  );
}
