"use client";
import { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/auth";

// Define routes that should not use the dashboard layout
const standaloneRoutes = ["/stock-analysis", "/top-performing","/pantera-picks","/crypto-insights"];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, setUser } = useUser();

  // Check if the current route should use the dashboard layout
  const shouldUseDashboardLayout = !standaloneRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  if (shouldUseDashboardLayout) {
    return (
      <section className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </section>
    );
  }

  // If it's a standalone route, just render the children without the dashboard layout
  return (
    <>
      {user ? (
        <section className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </section>
      ) : null}
    </>
  );
}
