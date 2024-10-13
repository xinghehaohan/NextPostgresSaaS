'use client';
import { ReactNode, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if the current route is not the stock analysis route
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/stock-analysis")) {
    return (
      <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </section>
    );
  }

  // If it is the stock analysis route, just render the children without the dashboard layout
  return <>{children}</>;
}
