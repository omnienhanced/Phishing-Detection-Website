import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Clock, Shield, TrendingUp, Link as LinkIcon, Globe, Zap, XCircle } from "lucide-react";

interface ScanResult {
  url: string;
  status: "legit" | "phishing" | "suspicious";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  timestamp: string;
  features: {
    domainAge: string;
    ssl: boolean;
    redirect: boolean;
    suspiciousKeywords: number;
  };
}

export function UserPanel() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([
    {
      url: "https://secure-paypal-verify.com",
      status: "phishing",
      confidence: 94,
      riskLevel: "high",
      timestamp: "2026-02-23 10:30 AM",
      features: {
        domainAge: "2 days",
        ssl: false,
        redirect: true,
        suspiciousKeywords: 5,
      },
    },
    {
      url: "https://google.com",
      status: "legit",
      confidence: 99,
      riskLevel: "low",
      timestamp: "2026-02-23 10:25 AM",
      features: {
        domainAge: "25 years",
        ssl: true,
        redirect: false,
        suspiciousKeywords: 0,
      },
    },
  ]);

  const handleScan = () => {
    if (!url) return;

    setScanning(true);
    setResult(null);

    // Simulate scanning process
    setTimeout(() => {
      const isSuspicious = url.toLowerCase().includes("verify") || 
                          url.toLowerCase().includes("secure") || 
                          url.toLowerCase().includes("account-update") ||
                          url.toLowerCase().includes("login-confirm");
      
      const newResult: ScanResult = {
        url,
        status: isSuspicious ? "phishing" : "legit",
        confidence: isSuspicious ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 10) + 90,
        riskLevel: isSuspicious ? (Math.random() > 0.5 ? "high" : "medium") : "low",
        timestamp: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        features: {
          domainAge: isSuspicious ? `${Math.floor(Math.random() * 30)} days` : `${Math.floor(Math.random() * 10) + 5} years`,
          ssl: !isSuspicious || Math.random() > 0.5,
          redirect: isSuspicious && Math.random() > 0.5,
          suspiciousKeywords: isSuspicious ? Math.floor(Math.random() * 5) + 1 : 0,
        },
      };

      setResult(newResult);
      setHistory([newResult, ...history.slice(0, 9)]);
      setScanning(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "legit":
        return "text-green-400";
      case "phishing":
        return "text-red-400";
      case "suspicious":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section with Scanner */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-6 py-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 text-sm font-medium">AI-Powered Phishing Detection</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Protect Yourself From
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Phishing Attacks</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Scan any website URL instantly with our advanced machine learning model. 
          Get real-time threat analysis in seconds.
        </p>

        {/* Enhanced URL Input Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-xl">Website URL Scanner</h3>
                <p className="text-slate-400 text-sm">Enter any URL to check if it's safe or malicious</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    placeholder="https://example.com"
                    className="w-full bg-slate-900/90 border-2 border-slate-600 hover:border-slate-500 focus:border-cyan-500 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none transition-all text-lg"
                  />
                  {url && (
                    <button
                      onClick={() => setUrl("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleScan}
                  disabled={scanning || !url}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-cyan-500/25 disabled:shadow-none min-w-[180px]"
                >
                  {scanning ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Scan Now
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-slate-500 text-sm">Try scanning:</span>
              {["https://google.com", "https://secure-paypal-login.com", "https://github.com"].map((example) => (
                <button
                  key={example}
                  onClick={() => setUrl(example)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1 rounded-lg transition-colors border border-cyan-500/20"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
          <div className={`bg-gradient-to-br ${
            result.status === "legit" 
              ? "from-green-500/10 to-green-500/5 border-green-500/30" 
              : "from-red-500/10 to-red-500/5 border-red-500/30"
          } backdrop-blur-xl border-2 rounded-2xl p-8 shadow-2xl`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  result.status === "legit" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {result.status === "legit" ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${getStatusColor(result.status)} mb-1`}>
                    {result.status === "legit" ? "✓ Safe to Visit" : "⚠ Phishing Detected"}
                  </h3>
                  <p className="text-slate-300 text-sm break-all">{result.url}</p>
                </div>
              </div>
              <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel.toUpperCase()} RISK
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Detection Confidence</span>
                <span className="text-white font-bold text-xl">{result.confidence}%</span>
              </div>
              <div className="relative h-4 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full transition-all duration-1000 ${
                    result.status === "legit" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-400" 
                      : "bg-gradient-to-r from-red-500 to-orange-500"
                  }`}
                  style={{ width: `${result.confidence}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Domain Age
                </div>
                <div className="text-white font-bold text-lg">{result.features.domainAge}</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  SSL Status
                </div>
                <div className={`font-bold text-lg ${result.features.ssl ? "text-green-400" : "text-red-400"}`}>
                  {result.features.ssl ? "✓ Valid" : "✗ Invalid"}
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Redirects
                </div>
                <div className={`font-bold text-lg ${result.features.redirect ? "text-red-400" : "text-green-400"}`}>
                  {result.features.redirect ? "✗ Detected" : "✓ None"}
                </div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Suspicious Keywords
                </div>
                <div className={`font-bold text-lg ${result.features.suspiciousKeywords > 0 ? "text-red-400" : "text-green-400"}`}>
                  {result.features.suspiciousKeywords}
                </div>
              </div>
            </div>

            {/* Warning/Success Message */}
            <div className={`mt-6 p-4 rounded-xl border-2 ${
              result.status === "legit"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}>
              <p className={`text-sm ${result.status === "legit" ? "text-green-300" : "text-red-300"}`}>
                {result.status === "legit"
                  ? "✓ This website appears to be legitimate and safe to visit based on our analysis."
                  : "⚠ WARNING: This website shows signs of phishing activity. Do not enter personal information or login credentials."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{history.filter(h => h.status === "legit").length}</div>
              <div className="text-green-400 font-medium">Safe Sites</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{history.filter(h => h.status === "phishing").length}</div>
              <div className="text-red-400 font-medium">Threats Blocked</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{history.length}</div>
              <div className="text-cyan-400 font-medium">Total Scans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan History */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-cyan-400" />
          <h3 className="text-white text-2xl font-bold">Recent Scan History</h3>
        </div>
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-900/70 transition-all hover:scale-[1.02] border border-slate-700/30"
            >
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.status === "legit" ? "bg-green-500/20" : "bg-red-500/20"
                }`}>
                  {item.status === "legit" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate mb-1">{item.url}</div>
                  <div className="text-slate-400 text-sm">{item.timestamp}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-lg text-xs font-bold border ${getRiskColor(item.riskLevel)}`}>
                  {item.riskLevel.toUpperCase()}
                </div>
                <div className={`font-bold text-lg ${getStatusColor(item.status)} min-w-[60px] text-right`}>
                  {item.confidence}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extension CTA */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Get Real-Time Protection</h3>
              <p className="text-slate-300">Install our browser extension for automatic phishing detection while you browse</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/25 whitespace-nowrap">
            Install Extension →
          </button>
        </div>
      </div>
    </div>
  );
}
