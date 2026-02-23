import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { UserPanel } from "./components/UserPanel";
import { ReportsLogs } from "./components/ReportsLogs";
import { Analytics } from "./components/Analytics";
import { LiveCrawler } from "./components/LiveCrawler";
import { ExtensionControl } from "./components/ExtensionControl";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: UserPanel },
      { path: "reports", Component: ReportsLogs },
      { path: "analytics", Component: Analytics },
      { path: "crawler", Component: LiveCrawler },
      { path: "extension", Component: ExtensionControl },
    ],
  },
]);