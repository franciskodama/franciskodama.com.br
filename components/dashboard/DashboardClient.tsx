'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import {
  Activity,
  Mail,
  Send,
  Shield,
  ArrowRightLeft,
  DollarSign,
  FileText,
  Copy,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Globe,
  Check,
  Server,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import { CanadaFlagCircle } from '@/components/flags/CanadaFlagCircle';
import { BrazilFlagCircle } from '@/components/flags/BrazilFlagCircle';

interface DashboardClientProps {
  userEmail: string;
  userName?: string | null;
  userImage?: string | null;
}

export function DashboardClient({
  userEmail,
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

  // Scratchpad state initialized lazily
  const [scratchpad, setScratchpad] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fk_hub_scratchpad') || '';
    }
    return '';
  });
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Currency Converter state
  const [cadAmount, setCadAmount] = useState<number>(100);
  const cadToBrlRate = 4.18;
  const usdToBrlRate = 5.62;

  // Clocks
  const [timeCanada, setTimeCanada] = useState('');
  const [timeBrazil, setTimeBrazil] = useState('');

  useEffect(() => {
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
    <div className='min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-blue selection:text-white'>
      {/* Dedicated Private Mission Control Header */}
      <header className='sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center group'>
            <Image
              src='/images/logo-fkodama.png'
              alt='fkodama'
              width={120}
              height={44}
              priority
              className='h-7 sm:h-8 w-auto group-hover:opacity-80 transition-opacity'
            />
          </Link>
          <div className='h-4 w-px bg-gray-200 hidden sm:block'></div>
          <Link
            href='/'
            className='inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-brand transition-colors'
          >
            <ArrowLeft className='w-3.5 h-3.5' />
            <span>Public Site</span>
          </Link>
        </div>

        {/* Center Pill: Private Indicator */}
        <div className='hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono text-zinc-700'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
          </span>
          <span className='font-semibold tracking-tight'>Mission Control</span>
        </div>

        {/* Right Side: User & Sign Out */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <div className='hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500'>
            <span className='text-zinc-400'>Signed in:</span>
            <span className='text-zinc-900 font-medium'>{userEmail}</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            title='Sign out'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-black bg-white text-xs font-mono text-zinc-700 hover:text-black transition-colors cursor-pointer shadow-2xs'
          >
            <LogOut className='w-3.5 h-3.5' />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className='relative border-b border-gray-100 bg-white'>
        <div className='relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]'>
          <div className='bg-linear-to-b from-white via-white/80 to-white w-full h-full absolute top-0 pointer-events-none'></div>
          <div className='container mx-auto px-4 sm:px-6 py-10 sm:py-14 relative'>
            <div className='max-w-5xl mx-auto'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                <div>
                  <div className='inline-block text-xs uppercase py-1 px-3 bg-white font-mono italic text-zinc-800 border border-gray-200 rounded-sm mb-3 shadow-2xs'>
                    Private Command Center
                  </div>
                  <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-2'>
                    Mission Control
                  </h1>
                  <p className='text-sm sm:text-base text-zinc-600 font-mono'>
                    Do Brasil para o Canadá. Telemetry, emergency dispatch, currency, and developer utilities.
                  </p>
                </div>

                {/* Status Badges */}
                <div className='flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono shrink-0'>
                  <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200'>
                    <span className='relative flex h-2 w-2'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
                    </span>
                    <span className='text-zinc-700 font-medium'>All Systems Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <main className='flex-1 bg-gray-50/50 py-10 sm:py-14'>
        <div className='container mx-auto px-4 sm:px-6 max-w-5xl'>
          {/* Navigation Tabs */}
          <div className='flex flex-wrap items-center gap-2 sm:gap-3 mb-8'>
            <button
              onClick={() => setActiveTab('mori')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                activeTab === 'mori'
                  ? 'bg-black text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-gray-100 text-zinc-700 border border-gray-200 font-medium'
              }`}
            >
              <Mail className={`w-4 h-4 ${activeTab === 'mori' ? 'text-brand' : 'text-zinc-500'}`} />
              <span>Monkey Mori & Resend</span>
            </button>

            <button
              onClick={() => setActiveTab('uptime')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                activeTab === 'uptime'
                  ? 'bg-black text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-gray-100 text-zinc-700 border border-gray-200 font-medium'
              }`}
            >
              <Server className={`w-4 h-4 ${activeTab === 'uptime' ? 'text-blue' : 'text-zinc-500'}`} />
              <span>Application Ecosystem</span>
            </button>

            <button
              onClick={() => setActiveTab('currency')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                activeTab === 'currency'
                  ? 'bg-black text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-gray-100 text-zinc-700 border border-gray-200 font-medium'
              }`}
            >
              <DollarSign className={`w-4 h-4 ${activeTab === 'currency' ? 'text-yellow' : 'text-zinc-500'}`} />
              <span>Expat & Currency</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-black text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-gray-100 text-zinc-700 border border-gray-200 font-medium'
              }`}
            >
              <FileText className='w-4 h-4 text-zinc-500' />
              <span>Quick Scratchpad</span>
            </button>
          </div>

          {/* TAB 1: MONKEY MORI & RESEND EMAIL */}
          {activeTab === 'mori' && (
            <div className='space-y-6'>
              {/* Emergency Protocol Card */}
              <div className='border-2 border-brand/20 bg-white rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative shadow-xs'>
                <div>
                  <div className='inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand font-semibold mb-2'>
                    <Activity className='w-3.5 h-3.5' />
                    <span>Dead Man&apos;s Switch Engine</span>
                  </div>
                  <h2 className='text-2xl font-bold font-mono text-zinc-950'>
                    Monkey Mori Emergency Protocol
                  </h2>
                  <p className='text-xs sm:text-sm text-zinc-600 font-mono mt-1'>
                    Status: <span className='text-emerald-700 font-semibold'>ACTIVE</span> · Last confirmed:{' '}
                    <span className='text-zinc-900 font-semibold'>{lastCheckIn}</span>
                  </p>
                </div>

                <div className='flex items-center gap-3 shrink-0'>
                  <button
                    onClick={handleCheckIn}
                    disabled={isCheckingIn}
                    className='rounded-full flex gap-2 font-mono whitespace-nowrap items-center bg-black hover:bg-brand py-3 px-6 text-white transition-colors duration-200 text-xs sm:text-sm font-semibold cursor-pointer shadow-sm disabled:opacity-50'
                  >
                    {isCheckingIn ? (
                      <RefreshCw className='w-4 h-4 animate-spin' />
                    ) : checkInSuccess ? (
                      <Check className='w-4 h-4 text-emerald-400' />
                    ) : (
                      <Shield className='w-4 h-4' />
                    )}
                    <span>{checkInSuccess ? 'Check-In Confirmed!' : 'Check In Now'}</span>
                  </button>
                </div>
              </div>

              {/* Email Deliverability Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* DNS & Domain Health */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs flex flex-col justify-between'>
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <h3 className='font-mono text-sm font-bold text-zinc-900 flex items-center gap-2'>
                        <Globe className='w-4 h-4 text-zinc-500' />
                        Domain Email Health
                      </h3>
                      <span className='text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                        Resend Verified
                      </span>
                    </div>

                    <p className='text-xs text-zinc-500 font-mono mb-5'>
                      DNS records configured for transaction emails on franciskodama.com.br.
                    </p>

                    <div className='space-y-3 font-mono text-xs'>
                      <div className='flex items-center justify-between p-3.5 rounded-sm bg-gray-50 border border-gray-100'>
                        <div>
                          <span className='text-zinc-500 block text-[11px]'>SPF Record:</span>
                          <span className='text-zinc-900 font-medium text-[11px]'>v=spf1 include:amazonses.com ~all</span>
                        </div>
                        <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 ml-2' />
                      </div>

                      <div className='flex items-center justify-between p-3.5 rounded-sm bg-gray-50 border border-gray-100'>
                        <div>
                          <span className='text-zinc-500 block text-[11px]'>DKIM Key:</span>
                          <span className='text-zinc-900 font-medium text-[11px]'>resend._domainkey.franciskodama.com.br</span>
                        </div>
                        <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 ml-2' />
                      </div>

                      <div className='flex items-center justify-between p-3.5 rounded-sm bg-gray-50 border border-gray-100'>
                        <div>
                          <span className='text-zinc-500 block text-[11px]'>DMARC Policy:</span>
                          <span className='text-zinc-900 font-medium text-[11px]'>v=DMARC1; p=none;</span>
                        </div>
                        <CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 ml-2' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Dispatch Sandbox */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs flex flex-col justify-between'>
                  <div>
                    <h3 className='font-mono text-sm font-bold text-zinc-900 flex items-center gap-2 mb-2'>
                      <Send className='w-4 h-4 text-zinc-500' />
                      Monkey Mori Dispatch Sandbox
                    </h3>
                    <p className='text-xs text-zinc-500 font-mono mb-5'>
                      Send a live test alert to inspect layout, responsiveness, and inbox spam score.
                    </p>

                    <form onSubmit={handleSendTestEmail} className='space-y-4'>
                      <div>
                        <label className='block text-[11px] font-mono text-zinc-600 mb-1 font-medium'>
                          Recipient Email:
                        </label>
                        <input
                          type='email'
                          required
                          value={testEmailRecipient}
                          onChange={(e) => setTestEmailRecipient(e.target.value)}
                          className='w-full px-3.5 py-2 rounded-sm bg-gray-50 border border-gray-200 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                        />
                      </div>

                      <div>
                        <label className='block text-[11px] font-mono text-zinc-600 mb-1 font-medium'>
                          Template Alert Type:
                        </label>
                        <select
                          value={testEmailType}
                          onChange={(e) => setTestEmailType(e.target.value)}
                          className='w-full px-3.5 py-2 rounded-sm bg-gray-50 border border-gray-200 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                        >
                          <option value='REMINDER_1'>Stage 1: Friendly Check-in Reminder</option>
                          <option value='REMINDER_2'>Stage 2: Urgent Countdown Alert</option>
                          <option value='TRIGGERED'>Stage 3: Protocol Triggered (Household Vault Release)</option>
                        </select>
                      </div>

                      <button
                        type='submit'
                        disabled={testSending}
                        className='w-full py-2.5 rounded-full bg-black hover:bg-blue text-white font-mono text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'
                      >
                        {testSending ? (
                          <RefreshCw className='w-3.5 h-3.5 animate-spin' />
                        ) : (
                          <Send className='w-3.5 h-3.5' />
                        )}
                        <span>Dispatch Test Alert</span>
                      </button>

                      {testSentResult && (
                        <div className='p-3.5 rounded-sm bg-gray-50 border border-gray-200 text-[11px] font-mono text-zinc-800 leading-relaxed'>
                          {testSentResult}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPTIME & APPLICATION ECOSYSTEM */}
          {activeTab === 'uptime' && (
            <div className='space-y-6'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200'>
                <div>
                  <h2 className='text-xl font-bold font-mono text-zinc-950'>Application Ecosystem</h2>
                  <p className='text-xs text-zinc-500 font-mono mt-0.5'>
                    Live health telemetry and direct access to production deployments.
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* HandyFor.me */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs hover:border-zinc-400 transition-colors flex flex-col justify-between group'>
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider'>
                        Productivity Ecosystem
                      </span>
                      <span className='flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        200 OK
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-zinc-950 font-mono group-hover:text-blue transition-colors'>
                      HandyFor.me
                    </h3>
                    <p className='text-xs text-zinc-600 font-mono mt-1.5 leading-relaxed'>
                      Centralized productivity hub, daily execution, promises, and stoic modules.
                    </p>
                  </div>

                  <div className='pt-5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono'>
                    <span className='text-zinc-500'>Latency: ~42ms</span>
                    <a
                      href='https://handyfor.me'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-black font-semibold hover:text-blue hover:underline'
                    >
                      <span>Launch</span>
                      <ExternalLink className='w-3 h-3' />
                    </a>
                  </div>
                </div>

                {/* Monkey Business */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs hover:border-zinc-400 transition-colors flex flex-col justify-between group'>
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider'>
                        FinTech & Household
                      </span>
                      <span className='flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        200 OK
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-zinc-950 font-mono group-hover:text-blue transition-colors'>
                      Monkey Business
                    </h3>
                    <p className='text-xs text-zinc-600 font-mono mt-1.5 leading-relaxed'>
                      Household budget automation, AI receipt import, and multi-currency planner.
                    </p>
                  </div>

                  <div className='pt-5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono'>
                    <span className='text-zinc-500'>Latency: ~38ms</span>
                    <a
                      href='https://monkeybusiness-olive.vercel.app'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-black font-semibold hover:text-blue hover:underline'
                    >
                      <span>Launch</span>
                      <ExternalLink className='w-3 h-3' />
                    </a>
                  </div>
                </div>

                {/* fkodama.com */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs hover:border-zinc-400 transition-colors flex flex-col justify-between group'>
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider'>
                        Flagship Portfolio
                      </span>
                      <span className='flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        200 OK
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-zinc-950 font-mono group-hover:text-blue transition-colors'>
                      fkodama.com
                    </h3>
                    <p className='text-xs text-zinc-600 font-mono mt-1.5 leading-relaxed'>
                      International product engineer portfolio, Matter.js interactive cards, and case studies.
                    </p>
                  </div>

                  <div className='pt-5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono'>
                    <span className='text-zinc-500'>Latency: ~31ms</span>
                    <a
                      href='https://www.fkodama.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-black font-semibold hover:text-blue hover:underline'
                    >
                      <span>Launch</span>
                      <ExternalLink className='w-3 h-3' />
                    </a>
                  </div>
                </div>

                {/* Sanity Studio CMS */}
                <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs hover:border-zinc-400 transition-colors flex flex-col justify-between group'>
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider'>
                        Headless Content
                      </span>
                      <span className='flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        Ready
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-zinc-950 font-mono group-hover:text-brand transition-colors'>
                      Sanity Studio
                    </h3>
                    <p className='text-xs text-zinc-600 font-mono mt-1.5 leading-relaxed'>
                      Embedded studio for franciskodama.com.br blog posts, articles, and author metadata.
                    </p>
                  </div>

                  <div className='pt-5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono'>
                    <span className='text-zinc-500'>Route: /studio</span>
                    <Link
                      href='/studio'
                      className='inline-flex items-center gap-1 text-black font-semibold hover:text-brand hover:underline'
                    >
                      <span>Open Editor</span>
                      <ExternalLink className='w-3 h-3' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPAT & CURRENCY */}
          {activeTab === 'currency' && (
            <div className='space-y-6'>
              {/* Clocks with Canadian and Brazilian Flags */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='p-6 rounded-sm border border-gray-200 bg-white font-mono shadow-xs'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-xs text-zinc-500 uppercase font-semibold tracking-wider'>
                      Montreal / Toronto (Eastern)
                    </span>
                    <div className='w-6 h-6 rounded-full overflow-hidden border border-zinc-200 shadow-2xs'>
                      <CanadaFlagCircle className='w-full h-full' />
                    </div>
                  </div>
                  <p className='text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight'>
                    {timeCanada || 'Loading...'}
                  </p>
                  <span className='text-[11px] text-zinc-500 mt-1 block'>Local Time (Canada)</span>
                </div>

                <div className='p-6 rounded-sm border border-gray-200 bg-white font-mono shadow-xs'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-xs text-zinc-500 uppercase font-semibold tracking-wider'>
                      São Paulo / Brasília (BRT)
                    </span>
                    <div className='w-6 h-6 rounded-full overflow-hidden border border-zinc-200 shadow-2xs'>
                      <BrazilFlagCircle className='w-full h-full' />
                    </div>
                  </div>
                  <p className='text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight'>
                    {timeBrazil || 'Loading...'}
                  </p>
                  <span className='text-[11px] text-zinc-500 mt-1 block'>Local Time (Brazil)</span>
                </div>
              </div>

              {/* Currency Converter */}
              <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs'>
                <h3 className='font-mono text-sm font-bold text-zinc-900 flex items-center gap-2 mb-4'>
                  <ArrowRightLeft className='w-4 h-4 text-emerald-700' />
                  Live Expat Remittance Calculator (CAD ⇄ BRL)
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 font-mono'>
                  <div className='p-4 rounded-sm bg-gray-50 border border-gray-200'>
                    <label className='block text-xs text-zinc-600 mb-1 font-medium'>CAD Amount:</label>
                    <input
                      type='number'
                      value={cadAmount}
                      onChange={(e) => setCadAmount(Number(e.target.value))}
                      className='w-full text-2xl font-bold bg-transparent text-zinc-900 focus:outline-none'
                    />
                    <span className='text-[11px] text-zinc-500'>Canadian Dollar ($)</span>
                  </div>

                  <div className='p-4 rounded-sm bg-gray-50 border border-gray-200'>
                    <span className='block text-xs text-zinc-600 mb-1 font-medium'>Equals BRL:</span>
                    <p className='text-2xl font-bold text-emerald-700'>
                      R$ {(cadAmount * cadToBrlRate).toFixed(2)}
                    </p>
                    <span className='text-[11px] text-zinc-500'>1 CAD ≈ R$ {cadToBrlRate}</span>
                  </div>

                  <div className='p-4 rounded-sm bg-gray-50 border border-gray-200'>
                    <span className='block text-xs text-zinc-600 mb-1 font-medium'>USD Benchmark:</span>
                    <p className='text-2xl font-bold text-zinc-800'>
                      R$ {(cadAmount * 0.74 * usdToBrlRate).toFixed(2)}
                    </p>
                    <span className='text-[11px] text-zinc-500'>1 USD ≈ R$ {usdToBrlRate}</span>
                  </div>
                </div>
              </div>

              {/* Cross-border Milestones */}
              <div className='border border-gray-200 rounded-sm bg-white p-6 shadow-xs'>
                <h3 className='font-mono text-sm font-bold text-zinc-900 mb-4'>
                  Expat Compliance & Milestones
                </h3>
                <div className='space-y-3 font-mono text-xs'>
                  <div className='p-3.5 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-between'>
                    <div>
                      <span className='text-zinc-900 font-semibold'>Declaração Saída Definitiva / IRPF</span>
                      <p className='text-[11px] text-zinc-500 mt-0.5'>Brazilian tax non-residence status maintained</p>
                    </div>
                    <span className='text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                      Regular
                    </span>
                  </div>

                  <div className='p-3.5 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-between'>
                    <div>
                      <span className='text-zinc-900 font-semibold'>TNE / CRA Notice of Assessment</span>
                      <p className='text-[11px] text-zinc-500 mt-0.5'>Canadian annual tax documentation</p>
                    </div>
                    <span className='text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium'>
                      On file
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUICK SCRATCHPAD */}
          {activeTab === 'notes' && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between pb-2 border-b border-gray-200'>
                <div>
                  <h2 className='text-xl font-bold font-mono text-zinc-950'>Private Scratchpad</h2>
                  <p className='text-xs text-zinc-500 font-mono mt-0.5'>
                    Ephemeral developer clipboard auto-saved to your local storage.
                  </p>
                </div>

                <button
                  onClick={copyNotes}
                  className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 hover:border-black bg-white text-xs font-mono text-zinc-800 hover:text-black transition-colors cursor-pointer shadow-2xs'
                >
                  {copiedNotes ? (
                    <Check className='w-3.5 h-3.5 text-emerald-600' />
                  ) : (
                    <Copy className='w-3.5 h-3.5 text-zinc-500' />
                  )}
                  <span>{copiedNotes ? 'Copied' : 'Copy All'}</span>
                </button>
              </div>

              <textarea
                value={scratchpad}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder='Paste terminal snippets, temporary env vars, ideas, or reminders here...'
                rows={16}
                className='w-full p-4 rounded-sm bg-white border border-gray-200 text-xs sm:text-sm font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder:text-zinc-400 resize-y shadow-xs leading-relaxed'
              />
            </div>
          )}
        </div>
      </main>

      {/* Minimal Private Footer */}
      <footer className='border-t border-gray-100 py-6 text-center text-xs font-mono text-zinc-400 bg-white'>
        Mission Control · Private Administration · franciskodama.com.br
      </footer>
    </div>
  );
}
