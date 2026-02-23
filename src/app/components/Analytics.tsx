import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, AlertTriangle, Activity } from "lucide-react";

export function Analytics() {
  // Daily phishing detected
  const dailyData = [
    { date: "Feb 17", legit: 820, phishing: 180 },
    { date: "Feb 18", legit: 950, phishing: 220 },
    { date: "Feb 19", legit: 780, phishing: 195 },
    { date: "Feb 20", legit: 1100, phishing: 250 },
    { date: "Feb 21", legit: 890, phishing: 210 },
    { date: "Feb 22", legit: 1050, phishing: 280 },
    { date: "Feb 23", legit: 920, phishing: 240 },
  ];

  // Legit vs Phishing distribution
  const distributionData = [
    { name: "Legitimate", value: 5510, color: "#10b981" },
    { name: "Phishing", value: 1575, color: "#ef4444" },
  ];

  // Attack trends by type
  const trendData = [
    { month: "Sep", banking: 120, social: 80, ecommerce: 60, other: 40 },
    { month: "Oct", banking: 150, social: 95, ecommerce: 70, other: 55 },
    { month: "Nov", banking: 180, social: 110, ecommerce: 85, other: 65 },
    { month: "Dec", banking: 220, social: 130, ecommerce: 100, other: 80 },
    { month: "Jan", banking: 260, social: 150, ecommerce: 120, other: 90 },
    { month: "Feb", banking: 310, social: 175, ecommerce: 140, other: 105 },
  ];

  // Top phishing keywords
  const keywordData = [
    { keyword: "verify", count: 456 },
    { keyword: "secure", count: 389 },
    { keyword: "account", count: 342 },
    { keyword: "update", count: 298 },
    { keyword: "confirm", count: 267 },
    { keyword: "login", count: 234 },
    { keyword: "suspend", count: 198 },
    { keyword: "urgent", count: 176 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart3 className="w-10 h-10 text-blue-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-slate-400">Visual statistics and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
          <Activity className="w-8 h-8 text-blue-400 mb-3" />
          <div className="text-2xl font-bold text-white">7,085</div>
          <div className="text-blue-400 text-sm">Total Scans (7 days)</div>
          <div className="text-xs text-slate-500 mt-1">+18% from last week</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
          <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
          <div className="text-2xl font-bold text-white">1,575</div>
          <div className="text-red-400 text-sm">Phishing Detected</div>
          <div className="text-xs text-slate-500 mt-1">22.2% detection rate</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-2xl font-bold text-white">99.2%</div>
          <div className="text-green-400 text-sm">Accuracy Rate</div>
          <div className="text-xs text-slate-500 mt-1">Model performance</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
          <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
          <div className="text-2xl font-bold text-white">2.1s</div>
          <div className="text-purple-400 text-sm">Avg. Scan Time</div>
          <div className="text-xs text-slate-500 mt-1">-0.3s improvement</div>
        </div>
      </div>

      {/* Daily Scans Chart */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl font-bold mb-6">Daily Phishing Detection (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Bar dataKey="legit" fill="#10b981" name="Legitimate" radius={[4, 4, 0, 0]} />
            <Bar dataKey="phishing" fill="#ef4444" name="Phishing" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution and Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legit vs Phishing Pie Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl font-bold mb-6">Legit vs Phishing Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Phishing Keywords */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl font-bold mb-6">Most Common Phishing Keywords</h3>
          <div className="space-y-3">
            {keywordData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 text-slate-400 text-sm font-bold">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{item.keyword}</span>
                    <span className="text-cyan-400 font-bold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${(item.count / keywordData[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attack Trends */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl font-bold mb-6">Attack Trend by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="banking"
              stroke="#ef4444"
              strokeWidth={2}
              name="Banking"
              dot={{ fill: "#ef4444" }}
            />
            <Line
              type="monotone"
              dataKey="social"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Social Media"
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="ecommerce"
              stroke="#10b981"
              strokeWidth={2}
              name="E-commerce"
              dot={{ fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="other"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Other"
              dot={{ fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Attack Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-5">
          <div className="text-slate-400 text-sm mb-1">Banking Phishing</div>
          <div className="text-2xl font-bold text-white mb-1">310</div>
          <div className="text-red-400 text-xs">42.4% of attacks</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-5">
          <div className="text-slate-400 text-sm mb-1">Social Media</div>
          <div className="text-2xl font-bold text-white mb-1">175</div>
          <div className="text-blue-400 text-xs">23.9% of attacks</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-5">
          <div className="text-slate-400 text-sm mb-1">E-commerce</div>
          <div className="text-2xl font-bold text-white mb-1">140</div>
          <div className="text-green-400 text-xs">19.1% of attacks</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-5">
          <div className="text-slate-400 text-sm mb-1">Other</div>
          <div className="text-2xl font-bold text-white mb-1">105</div>
          <div className="text-orange-400 text-xs">14.3% of attacks</div>
        </div>
      </div>
    </div>
  );
}
