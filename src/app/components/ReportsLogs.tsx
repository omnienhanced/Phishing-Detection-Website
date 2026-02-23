import { useState } from "react";
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  url: string;
  result: "legit" | "phishing" | "suspicious";
  confidence: number;
  features: {
    urlLength: number;
    domainAge: string;
    ssl: boolean;
    redirects: number;
    suspiciousKeywords: number;
  };
  user: string;
  ip: string;
}

export function ReportsLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "legit" | "phishing">("all");

  const logs: LogEntry[] = [
    {
      id: "LOG-2024-001",
      timestamp: "2026-02-23 10:35:42",
      url: "https://secure-paypal-verify.com/login",
      result: "phishing",
      confidence: 94,
      features: {
        urlLength: 42,
        domainAge: "2 days",
        ssl: false,
        redirects: 3,
        suspiciousKeywords: 5,
      },
      user: "user@example.com",
      ip: "192.168.1.100",
    },
    {
      id: "LOG-2024-002",
      timestamp: "2026-02-23 10:30:15",
      url: "https://google.com",
      result: "legit",
      confidence: 99,
      features: {
        urlLength: 18,
        domainAge: "25 years",
        ssl: true,
        redirects: 0,
        suspiciousKeywords: 0,
      },
      user: "admin@example.com",
      ip: "192.168.1.101",
    },
    {
      id: "LOG-2024-003",
      timestamp: "2026-02-23 10:25:33",
      url: "https://amazon-account-update.net/verify",
      result: "phishing",
      confidence: 91,
      features: {
        urlLength: 45,
        domainAge: "5 days",
        ssl: true,
        redirects: 2,
        suspiciousKeywords: 4,
      },
      user: "user@example.com",
      ip: "192.168.1.100",
    },
    {
      id: "LOG-2024-004",
      timestamp: "2026-02-23 10:20:08",
      url: "https://github.com",
      result: "legit",
      confidence: 98,
      features: {
        urlLength: 19,
        domainAge: "15 years",
        ssl: true,
        redirects: 0,
        suspiciousKeywords: 0,
      },
      user: "dev@example.com",
      ip: "192.168.1.102",
    },
    {
      id: "LOG-2024-005",
      timestamp: "2026-02-23 10:15:22",
      url: "https://microsoft-security-alert.com/login",
      result: "phishing",
      confidence: 96,
      features: {
        urlLength: 47,
        domainAge: "1 day",
        ssl: false,
        redirects: 4,
        suspiciousKeywords: 6,
      },
      user: "user@example.com",
      ip: "192.168.1.100",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || log.result === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const downloadReport = (format: "csv" | "json" | "pdf") => {
    alert(`Downloading report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="w-10 h-10 text-green-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">Reports & Logs</h2>
          <p className="text-slate-400">Complete record of all scan activities</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-5">
          <Clock className="w-8 h-8 text-cyan-400 mb-2" />
          <div className="text-2xl font-bold text-white">{logs.length}</div>
          <div className="text-cyan-400 text-sm">Total Logs</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-5">
          <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">
            {logs.filter((l) => l.result === "legit").length}
          </div>
          <div className="text-green-400 text-sm">Legitimate</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-5">
          <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
          <div className="text-2xl font-bold text-white">
            {logs.filter((l) => l.result === "phishing").length}
          </div>
          <div className="text-red-400 text-sm">Phishing</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-5">
          <Download className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">245</div>
          <div className="text-purple-400 text-sm">MB Storage</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by URL or Log ID..."
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Results</option>
                <option value="legit">Legitimate Only</option>
                <option value="phishing">Phishing Only</option>
              </select>
            </div>
          </div>

          {/* Download */}
          <div className="md:col-span-3 flex gap-2">
            <button
              onClick={() => downloadReport("csv")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={() => downloadReport("json")}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Log ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-300 font-mono text-sm">{log.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300 text-sm">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 max-w-md">
                      <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-sm truncate">{log.url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {log.result === "legit" ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">Legitimate</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium">Phishing</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700/50 rounded-full w-16 overflow-hidden">
                        <div
                          className={`h-full ${
                            log.result === "legit" ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${log.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-bold text-sm w-10 text-right">
                        {log.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Log View (Example) */}
      {filteredLogs.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl font-bold mb-4">Detailed Log View</h3>
          <div className="bg-slate-900/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-3">
                <h4 className="text-cyan-400 font-bold mb-3">Basic Information</h4>
                <div className="flex justify-between">
                  <span className="text-slate-400">Log ID:</span>
                  <span className="text-white font-mono">{filteredLogs[0].id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Timestamp:</span>
                  <span className="text-white">{filteredLogs[0].timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">User:</span>
                  <span className="text-white">{filteredLogs[0].user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IP Address:</span>
                  <span className="text-white font-mono">{filteredLogs[0].ip}</span>
                </div>
              </div>

              {/* Features Extracted */}
              <div className="space-y-3">
                <h4 className="text-purple-400 font-bold mb-3">Features Extracted</h4>
                <div className="flex justify-between">
                  <span className="text-slate-400">URL Length:</span>
                  <span className="text-white">{filteredLogs[0].features.urlLength} chars</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Domain Age:</span>
                  <span className="text-white">{filteredLogs[0].features.domainAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SSL Certificate:</span>
                  <span
                    className={
                      filteredLogs[0].features.ssl ? "text-green-400" : "text-red-400"
                    }
                  >
                    {filteredLogs[0].features.ssl ? "✓ Valid" : "✗ Invalid"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Redirects:</span>
                  <span className="text-white">{filteredLogs[0].features.redirects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Suspicious Keywords:</span>
                  <span className="text-white">{filteredLogs[0].features.suspiciousKeywords}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
