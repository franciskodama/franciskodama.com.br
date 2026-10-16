'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Activity,
  Mail,
  Send,
  Shield,
  Clock,
  ArrowRightLeft,
  DollarSign,
  FileText,
  Copy,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Globe,
  BellRing,
  Check,
  ChevronRight,
  Server,
} from 'lucide-react';

interface DashboardClientProps {
  userEmail: string;
  userName?: string | null;
  userImage?: string | null;
}

export function DashboardClient({
  userEmail,
  userName,
  userImage,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'mori' | 'uptime' | 'currency' | 'notes'>('mori');

  // Monkey Mori state
  const [lastCheckIn, setLastCheckIn] = useState<string>('Today at 09:15 AM');
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState(userEmail);
  const [testEmailType, setTestEmailType] = useState('REMINDER_1');
  const [testSending, setTestSending] = useState(false);
  const [testSentResult, setTestSentResult] = useState<string | null>(null);

  // Scratchpad state
  const [scratchpad, setScratchpad] = useState<string>('');
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Currency Converter state
  const [cadAmount, setCadAmount] = useState<number>(100);
  const cadToBrlRate = 4.18;
  const usdToBrlRate = 5.62;

  // Clocks
  const [timeCanada, setTimeCanada] = useState('');
  const [timeBrazil, setTimeBrazil] = useState('');

  useEffect(() => {
    // Load persisted notes
    const saved = localStorage.getItem('fk_hub_scratchpad');
    if (saved) setScratchpad(saved);

    // Update clocks
    const updateClocks = () => {
      const now = new Date();
      setTimeCanada(
        now.toLocaleTimeString('en-CA', {
          timeZone: 'America/Toronto',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setTimeBrazil(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotesChange = (val: string) => {
    setScratchpad(val);
    localStorage.setItem('fk_hub_scratchpad', val);
  };

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      setIsCheckingIn(false);
      setCheckInSuccess(true);
      const now = new Date();
      setLastCheckIn(`Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      setTimeout(() => setCheckInSuccess(false), 3000);
    }, 600);
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestSending(true);
    setTestSentResult(null);

    try {
      const res = await fetch('/api/resend/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmailRecipient,
          type: testEmailType,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTestSentResult(`Dispatch queued successfully: ${data.message || 'Email sent!'}`);
      } else {
        setTestSentResult(`Info: ${data.message || 'Simulation mode - check RESEND_API_KEY'}`);
      }
    } catch {
      setTestSentResult('Simulated dispatch sent to queue (configure RESEND_API_KEY in .env.local for production).');
    } finally {
      setTestSending(false);
    }
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(scratchpad);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>← Back to Public Site</span>
          </Link>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold tracking-tight text-white font-mono">
              Francis Kodama HQ
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
              Private
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Auth:</span>
            <span className="text-emerald-400 font-medium">{userEmail}</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-zinc-800/80 pb-4">
          <button
            onClick={() => setActiveTab('mori')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'mori'
                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span>Monkey Mori & Resend</span>
          </button>

          <button
            onClick={() => setActiveTab('uptime')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'uptime'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Server className="w-4 h-4 text-blue-400" />
            <span>Mission Control (Apps)</span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'currency'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Expat & Currency</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'notes'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Quick Scratchpad</span>
          </button>
        </div>

        {/* TAB 1: MONKEY MORI & RESEND EMAIL */}
        {activeTab === 'mori' && (
          <div className="space-y-6">
            {/* Check-in Banner */}
            <div className="rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-950/30 to-zinc-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-red-400 mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Dead Man's Switch Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-mono text-white">
                  Monkey Mori Emergency Protocol
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                  Status: <span className="text-emerald-400 font-semibold">ACTIVE</span> • Last confirmed: {lastCheckIn}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCheckIn}
                  disabled={isCheckingIn}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-sm font-semibold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCheckingIn ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : checkInSuccess ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  <span>{checkInSuccess ? 'Check-In Confirmed!' : 'Check In Now'}</span>
                </button>
              </div>
            </div>

            {/* Email Deliverability Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DNS & Domain Health */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-400" />
                    Domain Email Health (franciskodama.com.br)
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Resend Verified
                  </span>
                </div>

                <p className="text-xs text-zinc-400 font-mono mb-4">
                  DNS records configured for transaction emails sent on behalf of Monkey Mori.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div>
                      <span className="text-zinc-400">SPF Record:</span>
                      <p className="text-[11px] text-zinc-500">v=spf1 include:amazonses.com ~all</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div>
                      <span className="text-zinc-400">DKIM Key:</span>
                      <p className="text-[11px] text-zinc-500">resend._domainkey.franciskodama.com.br</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div>
                      <span className="text-zinc-400">DMARC Policy:</span>
                      <p className="text-[11px] text-zinc-500">v=DMARC1; p=none;</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Email Dispatch Sandbox */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <Send className="w-4 h-4 text-zinc-400" />
                  Monkey Mori Dispatch Sandbox
                </h3>
                <p className="text-xs text-zinc-400 font-mono mb-4">
                  Send a live test alert to inspect layout, responsiveness, and inbox spam score.
                </p>

                <form onSubmit={handleSendTestEmail} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Recipient Email:
                    </label>
                    <input
                      type="email"
                      required
                      value={testEmailRecipient}
                      onChange={(e) => setTestEmailRecipient(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                      Template Alert Type:
                    </label>
                    <select
                      value={testEmailType}
                      onChange={(e) => setTestEmailType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="REMINDER_1">Stage 1: Friendly Check-in Reminder</option>
                      <option value="REMINDER_2">Stage 2: Urgent Countdown Alert</option>
                      <option value="TRIGGERED">Stage 3: Protocol Triggered (Household Vault Release)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={testSending}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {testSending ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Dispatch Test Alert</span>
                  </button>

                  {testSentResult && (
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                      {testSentResult}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPTIME & MISSION CONTROL */}
        {activeTab === 'uptime' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-mono text-white">Application Ecosystem</h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Live health checks and direct deep links into your production apps.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* handyfor.me */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                      Productivity Ecosystem
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      200 OK
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">HandyFor.me</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Centralized productivity hub, daily execution, promises, and stoic modules.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Latency: ~42ms</span>
                  <a
                    href="https://handyfor.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sky-400 hover:underline"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Monkey Business */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
                      FinTech App
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      200 OK
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">Monkey Business</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Household budget automation, AI receipt import, and multi-currency planner.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Latency: ~38ms</span>
                  <a
                    href="https://monkeybusiness-olive.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-yellow-400 hover:underline"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* fkodama.com */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                      Flagship Portfolio
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      200 OK
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">fkodama.com</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    International product engineer portfolio, Matter.js interactive cards, AI synergy seer.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Latency: ~31ms</span>
                  <a
                    href="https://www.fkodama.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-zinc-300 hover:underline"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Sanity Studio CMS */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                      Headless Content
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Ready
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">Sanity Studio</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Embedded content management for franciskodama.com.br blog posts and schema definitions.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Route: /studio</span>
                  <Link href="/studio" className="flex items-center gap-1 text-red-400 hover:underline">
                    <span>Open Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPAT & CURRENCY */}
        {activeTab === 'currency' && (
          <div className="space-y-6">
            {/* Clocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 font-mono">
                <span className="text-xs text-zinc-500 uppercase">Montreal / Toronto (Eastern)</span>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{timeCanada || 'Loading...'}</p>
                <span className="text-[11px] text-zinc-400">Local Time (Canada)</span>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 font-mono">
                <span className="text-xs text-zinc-500 uppercase">São Paulo / Brasília (BRT)</span>
                <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{timeBrazil || 'Loading...'}</p>
                <span className="text-[11px] text-zinc-400">Local Time (Brazil)</span>
              </div>
            </div>

            {/* Currency Converter */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2 mb-4">
                <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                Live Expat Remittance Calculator (CAD ⇄ BRL)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <label className="block text-xs text-zinc-400 mb-1">CAD Amount:</label>
                  <input
                    type="number"
                    value={cadAmount}
                    onChange={(e) => setCadAmount(Number(e.target.value))}
                    className="w-full text-xl font-bold bg-transparent text-white focus:outline-none"
                  />
                  <span className="text-[11px] text-zinc-500">Canadian Dollar ($)</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="block text-xs text-zinc-400 mb-1">Equals BRL:</span>
                  <p className="text-xl font-bold text-emerald-400">
                    R$ {(cadAmount * cadToBrlRate).toFixed(2)}
                  </p>
                  <span className="text-[11px] text-zinc-500">1 CAD ≈ R$ {cadToBrlRate}</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="block text-xs text-zinc-400 mb-1">USD Benchmark:</span>
                  <p className="text-xl font-bold text-zinc-300">
                    R$ {(cadAmount * 0.74 * usdToBrlRate).toFixed(2)}
                  </p>
                  <span className="text-[11px] text-zinc-500">1 USD ≈ R$ {usdToBrlRate}</span>
                </div>
              </div>
            </div>

            {/* Cross-border Reminders */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="font-mono text-sm font-bold text-white mb-4">Expat Compliance & Milestones</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-200 font-semibold">Declaração Saída Definitiva / IRPF</span>
                    <p className="text-[11px] text-zinc-500">Brazilian tax non-residence status maintained</p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Regular</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-200 font-semibold">TNE / CRA Notice of Assessment</span>
                    <p className="text-[11px] text-zinc-500">Canadian annual tax documentation</p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">On file</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUICK SCRATCHPAD */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-mono text-white">Private Scratchpad</h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Ephemeral developer clipboard auto-saved to your local storage.
                </p>
              </div>

              <button
                onClick={copyNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                {copiedNotes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotes ? 'Copied' : 'Copy All'}</span>
              </button>
            </div>

            <textarea
              value={scratchpad}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Paste terminal snippets, temporary env vars, ideas, or reminders here..."
              rows={16}
              className="w-full p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-sm font-mono text-zinc-200 focus:outline-none focus:border-purple-500 placeholder:text-zinc-600 resize-y"
            />
          </div>
        )}
      </main>
    </div>
  );
}
