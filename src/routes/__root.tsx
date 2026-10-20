import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, MobileBar } from "@/components/site";
import logo from "@/assets/paradise-logo.jpg.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
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
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Paradise Fitness Center" },
      { name: "description", content: "Paradise Fitness Center — strength, conditioning and a free trial for new members." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Bebas+Neue&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <InitialLoader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <MobileBar />
    </QueryClientProvider>
  );
}

export function InitialLoader() {
  const [state, setState] = useState<"waiting" | "visible" | "leaving" | "hidden">("waiting");

  useEffect(() => {
    if (document.readyState === "complete") {
      setState("hidden");
      return;
    }

    let dismissTimer = 0;
    const showTimer = window.setTimeout(() => {
      setState((current) => current === "waiting" ? "visible" : current);
    }, 180);

    const finishLoading = () => {
      window.clearTimeout(showTimer);
      setState((current) => current === "visible" ? "leaving" : "hidden");
      dismissTimer = window.setTimeout(() => setState("hidden"), 240);
    };

    window.addEventListener("load", finishLoading, { once: true });
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(dismissTimer);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  if (state !== "visible" && state !== "leaving") return null;

  return (
    <div
      className={`initial-loader ${state === "leaving" ? "initial-loader-leaving" : ""}`}
      role="status"
      aria-label="Loading Paradise Fitness Center"
      aria-hidden={state === "leaving"}
    >
      <div className="initial-loader-content">
        <img src={logo.url} alt="Paradise Fitness Center" className="initial-loader-logo" />
        <div className="loader-barbell-scene" aria-hidden="true">
          <div className="loader-barbell">
            <span className="loader-weight loader-weight-left" />
            <span className="loader-collar loader-collar-left" />
            <span className="loader-bar" />
            <span className="loader-collar loader-collar-right" />
            <span className="loader-weight loader-weight-right" />
          </div>
          <span className="loader-floor" />
        </div>
        <span className="loader-spinner" aria-hidden="true" />
        <p className="initial-loader-label">LOADING YOUR NEXT REP.</p>
      </div>
    </div>
  );
}
