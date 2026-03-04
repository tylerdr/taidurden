import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = createPageMetadata({
  title: "Tai Durden - AI Venture Builder",
  description: siteConfig.description
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.twitter, siteConfig.github],
    email: siteConfig.newsletterEmail
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <AnalyticsProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 pt-10 md:px-8 md:pt-14">{children}</main>
          <SiteFooter />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
