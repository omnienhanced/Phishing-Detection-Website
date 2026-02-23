import { Outlet, Link, useLocation } from "react-router";
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Radio, 
  Puzzle,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/", icon: Shield, label: "User Panel", description: "Scan URLs" },
    { path: "/reports", icon: FileText, label: "Reports & Logs", description: "Scan History" },
    { path: "/analytics", icon: BarChart3, label: "Analytics", description: "Visual Stats" },
    { path: "/crawler", icon: Radio, label: "Live Crawler", description: "Auto Scanner" },
    { path: "/extension", icon: Puzzle, label: "Extension", description: "Browser Plugin" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-white text-xl font-bold">PhishGuard AI</h1>
              <p className="text-slate-400 text-xs">Advanced Phishing Detection System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-slate-400 text-sm">Status:</span>
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-72 bg-slate-900/30 backdrop-blur-sm border-r border-slate-700/50 transform transition-transform duration-300 z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${isActive ? "text-cyan-300" : ""}`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}