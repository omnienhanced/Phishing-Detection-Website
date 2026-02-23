import { useState } from "react";
import {
  Puzzle,
  Download,
  Chrome,
  Globe,
  Shield,
  Bell,
  Settings,
  Users,
  Activity,
  CheckCircle,
} from "lucide-react";

export function ExtensionControl() {
  const [extensionSettings, setExtensionSettings] = useState({
    realTimeProtection: true,
    notifications: true,
    autoBlock: false,
    telemetry: true,
  });

  const toggleSetting = (key: keyof typeof extensionSettings) => {
    setExtensionSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Puzzle className="w-10 h-10 text-indigo-400" />
        <div>
          <h2 className="text-white text-2xl font-bold">Extension Control Panel</h2>
          <p className="text-slate-400">Manage browser extension settings and deployment</p>
        </div>
      </div>

      {/* Extension Download */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-12 h-12 text-indigo-400" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-white text-2xl font-bold mb-2">PhishGuard Browser Extension</h3>
            <p className="text-slate-300 mb-4">
              Real-time phishing protection for your browser. Get instant alerts when visiting suspicious websites.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                <Chrome className="w-5 h-5" />
                Download for Chrome
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                <Globe className="w-5 h-5" />
                Download for Firefox
              </button>
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                <Download className="w-5 h-5" />
                Download for Edge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extension Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
          <Users className="w-8 h-8 text-cyan-400 mb-3" />
          <div className="text-2xl font-bold text-white mb-1">8,523</div>
          <div className="text-cyan-400 text-sm">Active Users</div>
          <div className="text-xs text-slate-500 mt-1">+342 this week</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6">
          <Shield className="w-8 h-8 text-red-400 mb-3" />
          <div className="text-2xl font-bold text-white mb-1">1,247</div>
          <div className="text-red-400 text-sm">Threats Blocked</div>
          <div className="text-xs text-slate-500 mt-1">Today</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-2xl font-bold text-white mb-1">99.8%</div>
          <div className="text-green-400 text-sm">Protection Rate</div>
          <div className="text-xs text-slate-500 mt-1">Last 30 days</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
          <Activity className="w-8 h-8 text-purple-400 mb-3" />
          <div className="text-2xl font-bold text-white mb-1">v2.5.1</div>
          <div className="text-purple-400 text-sm">Latest Version</div>
          <div className="text-xs text-slate-500 mt-1">Feb 20, 2026</div>
        </div>
      </div>

      {/* Extension Settings */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white text-xl font-bold">Extension Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="text-white font-bold mb-1">Real-Time Protection</div>
                <div className="text-slate-400 text-sm">
                  Scan URLs automatically as you browse
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={extensionSettings.realTimeProtection}
                onChange={() => toggleSetting("realTimeProtection")}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-white font-bold mb-1">Push Notifications</div>
                <div className="text-slate-400 text-sm">
                  Get alerts when phishing sites are detected
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={extensionSettings.notifications}
                onChange={() => toggleSetting("notifications")}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-white font-bold mb-1">Auto-Block Phishing Sites</div>
                <div className="text-slate-400 text-sm">
                  Automatically block access to detected phishing websites
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={extensionSettings.autoBlock}
                onChange={() => toggleSetting("autoBlock")}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-white font-bold mb-1">Usage Telemetry</div>
                <div className="text-slate-400 text-sm">
                  Help improve PhishGuard by sharing anonymous usage data
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={extensionSettings.telemetry}
                onChange={() => toggleSetting("telemetry")}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        <button className="mt-6 w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Save Settings
        </button>
      </div>

      {/* Real-Time Alerts */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white text-xl font-bold">Recent Extension Alerts</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold mb-1">Phishing Site Blocked</div>
              <div className="text-slate-300 text-sm mb-2 truncate">
                https://secure-paypal-verify.com/login
              </div>
              <div className="text-xs text-slate-400">2 minutes ago • Confidence: 94%</div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold mb-1">Suspicious Site Warning</div>
              <div className="text-slate-300 text-sm mb-2 truncate">
                https://amazon-verify-account.net
              </div>
              <div className="text-xs text-slate-400">15 minutes ago • Confidence: 87%</div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold mb-1">Phishing Site Blocked</div>
              <div className="text-slate-300 text-sm mb-2 truncate">
                https://microsoft-security-alert.com/login
              </div>
              <div className="text-xs text-slate-400">1 hour ago • Confidence: 96%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Guide */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white text-xl font-bold mb-4">Installation Guide</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <div className="text-white font-bold mb-1">Download the Extension</div>
              <div className="text-slate-400 text-sm">
                Click on your browser's download button above to get the extension file
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <div className="text-white font-bold mb-1">Install the Extension</div>
              <div className="text-slate-400 text-sm">
                Open your browser's extension manager and install the downloaded file
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <div className="text-white font-bold mb-1">Configure Settings</div>
              <div className="text-slate-400 text-sm">
                Customize your protection preferences in the extension settings
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <div className="text-white font-bold mb-1">Start Browsing Safely</div>
              <div className="text-slate-400 text-sm">
                You're all set! PhishGuard will now protect you while browsing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
