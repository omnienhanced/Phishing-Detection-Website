import { useState, useEffect } from "react";
import { Radio, Play, Pause, RefreshCw, Globe, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface CrawledSite {
  url: string;
  status: "scanning" | "legit" | "phishing";
  timestamp: string;
  confidence?: number;
}

export function LiveCrawler() {
  const [isRunning, setIsRunning] = useState(false);
  const [crawledSites, setCrawledSites] = useState<CrawledSite[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 0,
    phishingFound: 0,
    legitFound: 0,
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const domains = [
          "secure-paypal-login.com",
          "amazon.com",
          "google-verify-account.net",
          "microsoft.com",
          "facebook-security-alert.com",
          "github.com",
          "apple-id-unlock.com",
          "twitter.com",
          "netflix-billing-update.net",
          "linkedin.com",
        ];

        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const isPhishing = randomDomain.includes("verify") || 
                          randomDomain.includes("secure") || 
                          randomDomain.includes("alert") ||
                          randomDomain.includes("unlock") ||
                          randomDomain.includes("update");

        const newSite: CrawledSite = {
          url: `https://${randomDomain}`,
          status: "scanning",
          timestamp: new Date().toLocaleTimeString(),
        };

        setCrawledSites((prev) => [newSite, ...prev.slice(0, 19)]);

        setTimeout(() => {
          setCrawledSites((prev) =>
            prev.map((site) =>
              site.url === newSite.url
                ? {
                    ...site,
                    status: isPhishing ? "phishing" : "legit",
                    confidence: isPhishing ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 10) + 90,
                  }
                : site
            )
          );

          setStats((prev) => ({
            totalScanned: prev.totalScanned + 1,
            phishingFound: prev.phishingFound + (isPhishing ? 1 : 0),
            legitFound: prev.legitFound + (isPhishing ? 0 : 1),
          }));
        }, 1500);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const toggleCrawler = () => {
    setIsRunning(!isRunning);
  };

  const resetCrawler = () => {
    setCrawledSites([]);
    setStats({
      totalScanned: 0,
      phishingFound: 0,
      legitFound: 0,
    });
    setIsRunning(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Radio className="w-10 h-10 text-pink-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">Live Crawler Panel</h2>
          <p className="text-slate-400">Automatically scan suspicious sites in real-time</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-4 h-4 rounded-full ${
                isRunning ? "bg-green-400 animate-pulse" : "bg-slate-600"
              }`}
            ></div>
            <div>
              <div className="text-white font-bold">
                {isRunning ? "Crawler Active" : "Crawler Stopped"}
              </div>
              <div className="text-slate-400 text-sm">
                {isRunning
                  ? "Automatically scanning suspicious URLs..."
                  : "Click Start to begin scanning"}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleCrawler}
              className={`${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Stop Crawler
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Crawler
                </>
              )}
            </button>
            <button
              onClick={resetCrawler}
              disabled={isRunning}
              className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
          <Globe className="w-8 h-8 text-cyan-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{stats.totalScanned}</div>
          <div className="text-cyan-400 text-sm">Total Scanned</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
          <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{stats.phishingFound}</div>
          <div className="text-red-400 text-sm">Phishing Found</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{stats.legitFound}</div>
          <div className="text-green-400 text-sm">Legitimate Found</div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-pink-400" />
          <h3 className="text-white text-xl font-bold">Live Scan Feed</h3>
          {isRunning && (
            <span className="ml-auto text-slate-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live
            </span>
          )}
        </div>

        {crawledSites.length === 0 ? (
          <div className="text-center py-12">
            <Radio className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">No scans yet</p>
            <p className="text-slate-500 text-sm">Start the crawler to see live results</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {crawledSites.map((site, index) => (
              <div
                key={index}
                className={`bg-slate-900/50 rounded-lg p-4 flex items-center justify-between gap-4 transition-all ${
                  site.status === "scanning" ? "animate-pulse" : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {site.status === "scanning" ? (
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                  ) : site.status === "legit" ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{site.url}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {site.timestamp}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {site.status === "scanning" ? (
                    <span className="text-cyan-400 text-sm font-medium">Scanning...</span>
                  ) : (
                    <>
                      <span
                        className={`text-sm font-bold ${
                          site.status === "legit" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {site.status === "legit" ? "Legitimate" : "Phishing"}
                      </span>
                      <span className="text-white font-bold">{site.confidence}%</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Crawler Settings */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl font-bold mb-4">Crawler Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-white font-medium mb-2 block">Scan Interval (seconds)</label>
            <input
              type="number"
              defaultValue="2"
              min="1"
              max="60"
              disabled={isRunning}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-white font-medium mb-2 block">Max Concurrent Scans</label>
            <input
              type="number"
              defaultValue="5"
              min="1"
              max="20"
              disabled={isRunning}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
