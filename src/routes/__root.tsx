import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-white"
          >Try again</button>
          <a href="/" className="rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground">Go home</a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://designedbyld.lovable.app";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DesignedByLD — Graphic Designer & Visual Storyteller" },
      { name: "description", content: "Portfolio of DesignedByLD — Graphic Designer, Visual Storyteller & Creative Technologist based in India. Crafting visual experiences that connect, inspire, and convert." },
      { name: "author", content: "DesignedByLD" },
      { name: "keywords", content: "DesignedByLD, Graphic Designer India, Freelance Graphic Designer, Brand Designer, Social Media Designer, Visual Storyteller" },
      { property: "og:site_name", content: "DesignedByLD" },
      { property: "og:title", content: "DesignedByLD — Graphic Designer & Visual Storyteller" },
      { property: "og:description", content: "Portfolio of DesignedByLD — Graphic Designer, Visual Storyteller & Creative Technologist based in India. Crafting visual experiences that connect, inspire, and convert." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DesignedByLD — Graphic Designer & Visual Storyteller" },
      { name: "twitter:description", content: "Portfolio of DesignedByLD — Graphic Designer, Visual Storyteller & Creative Technologist based in India. Crafting visual experiences that connect, inspire, and convert." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/49642d89-599c-4d13-848a-82e2b6b9ebb0" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/49642d89-599c-4d13-848a-82e2b6b9ebb0" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "DesignedByLD",
        alternateName: "Designed By LD",
        jobTitle: "Graphic Designer & Visual Storyteller",
        url: SITE_URL,
        email: "designedbyld25@gmail.com",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        sameAs: [
          "https://linkedin.com/in/marri-leeladhar",
          "https://instagram.com/designedby.ld",
        ],
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
