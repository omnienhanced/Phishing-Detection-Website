import { useState, useEffect } from "react";
import { Brain, Cpu, Activity, Zap, Database, TrendingUp } from "lucide-react";

export function AIScanEngine() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setAnalyzing(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  const startDemo = () => {
    setAnalyzing(true);
    setProgress(0);
  };

  const features = [
    { name: "URL Length Analysis", value: 87, status: "suspicious", color: "yellow" },
    { name: "Domain Age Check", value: 15, status: "critical", color: "red" },
    { name: "SSL Certificate", value: 45, status: "warning", color: "orange" },
    { name: "Redirect Chain", value: 92, status: "suspicious", color: "yellow" },
    { name: "Page Rank", value: 12, status: "critical", color: "red" },
    { name: "DNS Records", value: 78, status: "moderate", color: "yellow" },
    { name: "WHOIS Data", value: 23, status: "critical", color: "red" },
    { name: "JavaScript Behavior", value: 88, status: "suspicious", color: "yellow" },
  ];

  const elmStages = [
    {
      stage: "Input Layer",
      description: "Feature vector extraction",
      nodes: 24,
      status: progress > 20 ? "complete" : "processing",
    },
    {
      stage: "Hidden Layer",
      description: "Random neuron mapping",
      nodes: 128,
      status: progress > 50 ? "complete" : progress > 20 ? "processing" : "pending",
    },
    {
      stage: "Output Layer",
      description: "Classification result",
      nodes: 2,
      status: progress > 80 ? "complete" : progress > 50 ? "processing" : "pending",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="w-10 h-10 text-purple-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">AI Scan Engine Panel</h2>
          <p className="text-slate-400">Real-time detection logic and model insights</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-bold">ELM Model Analysis</h3>
          <button
            onClick={startDemo}
            disabled={analyzing}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {analyzing ? "Analyzing..." : "Run Demo Analysis"}
          </button>
        </div>

        {/* Progress Bar */}
        {analyzing && (
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Analysis Progress</span>
              <span className="text-purple-400 font-bold">{progress}%</span>
            </div>
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* ELM Model Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {elmStages.map((stage, index) => (
            <div
              key={index}
              className={`border rounded-xl p-5 transition-all ${
                stage.status === "complete"
                  ? "bg-green-500/10 border-green-500/30"
                  : stage.status === "processing"
                  ? "bg-purple-500/10 border-purple-500/30 animate-pulse"
                  : "bg-slate-800/30 border-slate-700/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Cpu
                  className={`w-6 h-6 ${
                    stage.status === "complete"
                      ? "text-green-400"
                      : stage.status === "processing"
                      ? "text-purple-400"
                      : "text-slate-500"
                  }`}
                />
                <div
                  className={`w-3 h-3 rounded-full ${
                    stage.status === "complete"
                      ? "bg-green-400"
                      : stage.status === "processing"
                      ? "bg-purple-400 animate-pulse"
                      : "bg-slate-600"
                  }`}
                ></div>
              </div>
              <h4 className="text-white font-bold mb-1">{stage.stage}</h4>
              <p className="text-slate-400 text-sm mb-2">{stage.description}</p>
              <div className="text-xs text-slate-500">Nodes: {stage.nodes}</div>
            </div>
          ))}
        </div>

        {/* Prediction Result */}
        {progress === 100 && (
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6 animate-in fade-in duration-500">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-white text-xl font-bold mb-2">Classification Result</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Phishing Probability</div>
                    <div className="text-3xl font-bold text-red-400">94.7%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Legitimate Probability</div>
                    <div className="text-3xl font-bold text-green-400">5.3%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature Extraction Status */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white text-xl font-bold">Feature Extraction Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/70 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{feature.name}</span>
                <span
                  className={`text-sm font-bold ${
                    feature.color === "red"
                      ? "text-red-400"
                      : feature.color === "orange"
                      ? "text-orange-400"
                      : "text-yellow-400"
                  }`}
                >
                  {feature.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      feature.color === "red"
                        ? "bg-red-500"
                        : feature.color === "orange"
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    }`}
                    style={{ width: `${feature.value}%` }}
                  ></div>
                </div>
                <span className="text-white font-bold text-sm w-10 text-right">{feature.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boosted Signals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
          <Activity className="w-8 h-8 text-red-400 mb-3" />
          <div className="text-slate-400 text-sm mb-1">Domain Age</div>
          <div className="text-2xl font-bold text-white">2 days</div>
          <div className="text-red-400 text-xs mt-1">⚠ High Risk</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-6">
          <Activity className="w-8 h-8 text-orange-400 mb-3" />
          <div className="text-slate-400 text-sm mb-1">SSL Status</div>
          <div className="text-2xl font-bold text-white">Invalid</div>
          <div className="text-orange-400 text-xs mt-1">⚠ Warning</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
          <Activity className="w-8 h-8 text-yellow-400 mb-3" />
          <div className="text-slate-400 text-sm mb-1">Redirects</div>
          <div className="text-2xl font-bold text-white">3 chains</div>
          <div className="text-yellow-400 text-xs mt-1">⚠ Suspicious</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-slate-400 text-sm mb-1">Detection Rate</div>
          <div className="text-2xl font-bold text-white">99.2%</div>
          <div className="text-green-400 text-xs mt-1">✓ Excellent</div>
        </div>
      </div>

      {/* Model Information */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl font-bold mb-4">ELM Model Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-slate-400 text-sm mb-1">Model Version</div>
            <div className="text-white font-medium">ELM v2.5.1</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Training Dataset</div>
            <div className="text-white font-medium">150,000 URLs</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Last Updated</div>
            <div className="text-white font-medium">Feb 20, 2026</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Accuracy</div>
            <div className="text-green-400 font-bold">99.2%</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">False Positive Rate</div>
            <div className="text-cyan-400 font-bold">0.8%</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm mb-1">Processing Time</div>
            <div className="text-white font-medium">~2.1s avg</div>
          </div>
        </div>
      </div>
    </div>
  );
}
