import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { globalStyles } from "./styles/global";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { uiStore } from "./stores/ui";

export const meta: MetaFunction = () => {
  return { title: "Code Editor" };
};

export const links: LinksFunction = () => {
  return [
    ...globalStyles,
  ];
};

export const loader: LoaderFunction = async () => {
  return null;
}


export default function App() {
  const transition = useTransition();
  const loading = transition.state === "loading";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang="en" className={uiStore.get().theme === "dark" ? "dark" : ""}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="relative">
         {loading && <Loading />}
         <ThemeSwitcher />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}