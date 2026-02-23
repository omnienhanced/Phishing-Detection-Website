import { useState } from "react";
import {
  Settings,
  BarChart3,
  Database,
  RefreshCw,
  Upload,
  Download,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

export function AdminPanel() {
  const [isRetraining, setIsRetraining] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleRetrain = () => {
    setIsRetraining(true);
    setTimeout(() => setIsRetraining(false), 3000);
  };

  const handleDatasetUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="w-10 h-10 text-orange-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">Admin Panel</h2>
          <p className="text-slate-400">System management and control center</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">24,847</div>
          <div className="text-cyan-400 text-sm">Total Scans</div>
          <div className="text-xs text-slate-500 mt-1">+12% from last week</div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">3,142</div>
          <div className="text-red-400 text-sm">Phishing Detected</div>
          <div className="text-xs text-slate-500 mt-1">12.6% detection rate</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-green-400" />
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">8,523</div>
          <div className="text-green-400 text-sm">Active Users</div>
          <div className="text-xs text-slate-500 mt-1">+5% from yesterday</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <Database className="w-8 h-8 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">150K</div>
          <div className="text-purple-400 text-sm">Dataset Size</div>
          <div className="text-xs text-slate-500 mt-1">Last updated Feb 20</div>
        </div>
      </div>

      {/* Model Management */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <RefreshCw className="w-5 h-5 text-orange-400" />
          <h3 className="text-white text-xl font-bold">Model Management</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Model Stats */}
          <div className="bg-slate-900/50 rounded-lg p-5 space-y-4">
            <h4 className="text-white font-bold mb-3">Current Model Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Version:</span>
                <span className="text-white font-medium">ELM v2.5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accuracy:</span>
                <span className="text-green-400 font-bold">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">F1 Score:</span>
                <span className="text-cyan-400 font-bold">0.987</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Precision:</span>
                <span className="text-blue-400 font-bold">98.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recall:</span>
                <span className="text-purple-400 font-bold">99.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Training Time:</span>
                <span className="text-white font-medium">23 minutes</span>
              </div>
            </div>
          </div>

          {/* Retrain Model */}
          <div className="bg-slate-900/50 rounded-lg p-5">
            <h4 className="text-white font-bold mb-3">Retrain Model</h4>
            <p className="text-slate-400 text-sm mb-4">
              Retrain the ELM model with the latest dataset to improve accuracy and detection rates.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Last Training:</span>
                <span className="text-white">Feb 20, 2026</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Next Scheduled:</span>
                <span className="text-white">Feb 27, 2026</span>
              </div>
              <button
                onClick={handleRetrain}
                disabled={isRetraining}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRetraining ? "animate-spin" : ""}`} />
                {isRetraining ? "Retraining..." : "Retrain Model Now"}
              </button>
              {isRetraining && (
                <p className="text-xs text-slate-400 text-center">
                  This may take several minutes...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Management */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-purple-400" />
          <h3 className="text-white text-xl font-bold">Dataset Management</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dataset Info */}
          <div className="bg-slate-900/50 rounded-lg p-5">
            <h4 className="text-white font-bold mb-3">Current Dataset</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Total URLs:</span>
                <span className="text-white font-medium">150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phishing URLs:</span>
                <span className="text-red-400 font-medium">75,000 (50%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Legitimate URLs:</span>
                <span className="text-green-400 font-medium">75,000 (50%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Updated:</span>
                <span className="text-white font-medium">Feb 20, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dataset Size:</span>
                <span className="text-white font-medium">245 MB</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export Dataset
            </button>
          </div>

          {/* Upload Dataset */}
          <div className="bg-slate-900/50 rounded-lg p-5">
            <h4 className="text-white font-bold mb-3">Upload New Dataset</h4>
            <p className="text-slate-400 text-sm mb-4">
              Upload a CSV file containing URLs and their labels (phishing/legitimate).
            </p>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 mb-1">Click to upload or drag and drop</p>
              <p className="text-slate-500 text-xs">CSV files only (Max 500MB)</p>
            </div>
            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Uploading...</span>
                  <span className="text-purple-400 font-bold">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            <button
              onClick={handleDatasetUpload}
              className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Start Upload
            </button>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white text-xl font-bold">System Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium mb-2 block">Detection Threshold</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>Less Strict</span>
                <span>More Strict</span>
              </div>
            </div>
            <div>
              <label className="text-white font-medium mb-2 block">Scan Timeout (seconds)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-white font-medium mb-2 block">Maximum Concurrent Scans</label>
              <input
                type="number"
                defaultValue="10"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">Auto-Retrain</div>
                <div className="text-slate-400 text-sm">Weekly model retraining</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">Email Alerts</div>
                <div className="text-slate-400 text-sm">Get notified on critical events</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">API Access</div>
                <div className="text-slate-400 text-sm">Allow external API requests</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
