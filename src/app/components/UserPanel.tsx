import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";

/* ---------------- KNOWN LEGIT DOMAINS ---------------- */

const legitDomains = [
  "google.com",
  "github.com",
  "amazon.com",
  "microsoft.com",
  "facebook.com",
  "instagram.com",
  "paypal.com",
];

/* ---------------- PHISHING KEYWORDS ---------------- */

const phishingWords = [
  "login",
  "verify",
  "secure",
  "update",
  "confirm",
  "bank",
  "account",
  "reset",
];

/* ---------------- DOMAIN PARSER ---------------- */

function getDomain(url: string) {
  try {
    const fixed = url.startsWith("http") ? url : "https://" + url;
    return new URL(fixed).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

/* ---------------- LEVENSHTEIN DISTANCE ---------------- */

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[a.length][b.length];
}

/* ---------------- FEATURE EXTRACTION ---------------- */

function extractFeatures(url: string) {
  const lower = url.toLowerCase();
  const domain = getDomain(url);

  const suspiciousKeywords = phishingWords.filter(w =>
    lower.includes(w)
  ).length;

  const typoMatch = legitDomains.some((legit) => {
    const dist = levenshtein(domain, legit);
    return dist > 0 && dist <= 2;
  });

  return {
    domain,
    hasHttps: lower.startsWith("https://"),
    isHttp: lower.startsWith("http://"),
    suspiciousKeywords,
    manyDots: (domain.match(/\./g)?.length || 0) > 2,
    hasSpecialChar: /[!@#₹%^&*()_+=]/.test(lower),
    hasPopularTLD: /\.com|\.in|\.org|\.net/.test(domain),
    typoMatch,
  };
}

/* ---------------- RISK → CONFIDENCE LOGIC ---------------- */

function detectPhishing(f: any) {
  let risk = 0;

  if (!f.hasHttps) risk += 25;

  if (f.typoMatch) risk += 45;

  if (f.suspiciousKeywords > 0)
    risk += f.suspiciousKeywords * 15;

  if (f.manyDots) risk += 10;

  if (f.hasSpecialChar) risk += 20;

  if (!f.hasPopularTLD) risk += 15;

  if (f.isHttp) risk += 20;

  risk = Math.min(100, risk);

  const confidence = 100 - risk;

  return {
    status: confidence < 60 ? "phishing" : "legit",
    confidence,
    riskLevel:
      risk > 70 ? "high" :
      risk > 40 ? "medium" : "low",
  };
}

/* ---------------- COMPONENT ---------------- */

export function UserPanel() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = () => {
    if (!url) return;

    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const features = extractFeatures(url);
      const detection = detectPhishing(features);

      setResult({
        url,
        ...detection,
        timestamp: new Date().toLocaleString(),
        features,
      });

      setScanning(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-5 py-2 rounded-full">
          <Zap className="w-4 h-4 text-cyan-400" />
          phishing_shield AI Protection
        </div>

        <h1 className="text-4xl font-bold text-white">🛡 phishing_shield</h1>

        <p className="text-slate-400">
          Smart phishing detection using AI-style conditional intelligence
        </p>

        <div className="flex gap-3 mt-6">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="flex-1 bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg text-white"
          />
          <button
            onClick={handleScan}
            disabled={!url || scanning}
            className="bg-cyan-500 px-6 rounded-lg text-white font-bold"
          >
            {scanning ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>

      {result && (
        <div className={`rounded-xl p-6 border ${
          result.status === "legit"
            ? "border-green-500/30 bg-green-500/10"
            : "border-red-500/30 bg-red-500/10"
        }`}>

          <div className="flex items-center gap-3 mb-4">
            {result.status === "legit" ? (
              <CheckCircle className="text-green-400 w-6 h-6" />
            ) : (
              <AlertTriangle className="text-red-400 w-6 h-6" />
            )}
            <h2 className={`text-2xl font-bold ${
              result.status === "legit" ? "text-green-400" : "text-red-400"
            }`}>
              {result.status === "legit"
                ? "Safe Website"
                : "Phishing Detected"}
            </h2>
          </div>

          <p className="text-slate-300 break-all mb-2">{result.url}</p>

          <div className="text-white font-bold">
            Legitimacy Confidence: {result.confidence}%
          </div>

          <div className="text-slate-400 text-sm mt-1">
            Risk Level: {result.riskLevel.toUpperCase()}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
            <div>HTTPS: {result.features.hasHttps ? "Yes" : "No"}</div>
            <div>Brand Spoof: {result.features.typoMatch ? "Detected" : "No"}</div>
            <div>Special Char: {result.features.hasSpecialChar ? "Yes" : "No"}</div>
            <div>Suspicious Words: {result.features.suspiciousKeywords}</div>
          </div>
        </div>
      )}

    </div>
  );
}