import { NotFound as PageNotFound } from "@/components/not-found";

export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootNotFound() {
  return (
    <main className="max-w-screen overflow-x-clip">
      <PageNotFound />
    </main>
  );
}
