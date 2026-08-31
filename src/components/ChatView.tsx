import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Plus, 
  Trash2, 
  Sparkles, 
  Paperclip, 
  FileText, 
  Copy, 
  Check, 
  Scale, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  Clock,
  Shield,
  Zap,
  Info,
  BookOpen,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { ChatSession, ChatMessage, UserProfile } from '../types';

interface ChatViewProps {
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenTierModal: () => void;
  onNavigateToCalculator: () => void;
  onNavigateToNoticeDrafter: (section?: string) => void;
}

const QUICK_PROMPTS = [
  {
    label: "Income Tax Slabs 2025-2026",
    category: "Income Tax",
    prompt: "Provide the detailed comparison of Salaried vs Non-Salaried Income Tax Slabs for Tax Year 2025-2026 under the latest Finance Act with example tax calculations.",
  },
  {
    label: "Section 114(4) Notice Reply",
    category: "FBR Notice",
    prompt: "What is the statutory defense strategy against an FBR notice issued under Section 114(4) for failure to file a return? What documents must be submitted?",
  },
  {
    label: "Active Taxpayer List (ATL) Rates",
    category: "Withholding",
    prompt: "Explain the withholding tax penalties under the Tenth Schedule for Non-Filers vs Filers on property purchase (Sec 236K), cash withdrawal (Sec 231A), and dividend income (Sec 150).",
  },
  {
    label: "Sales Tax IT Export Zero-Rating",
    category: "Sales Tax",
    prompt: "What are the exact legal requirements to claim 0% Sales Tax exemption on IT and software exports under the Sixth Schedule and PSEB / PRC rules?",
  },
  {
    label: "Section 177 Audit Checklist",
    category: "FBR Audit",
    prompt: "What books of accounts, ledgers, bank reconciliations, and withholding tax certificates are required when the Commissioner issues a notice for audit under Section 177 of ITO 2001?",
  },
  {
    label: "Super Tax (Section 4C) Rates",
    category: "Corporate",
    prompt: "Explain the progressive Super Tax brackets under Section 4C for high earning individuals and corporate entities with income exceeding PKR 150 Million.",
  }
];

export const ChatView: React.FC<ChatViewProps> = ({
  user,
  onOpenAuth,
  onOpenTierModal,
  onNavigateToCalculator,
  onNavigateToNoticeDrafter,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [lastSentQuery, setLastSentQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Document Context Drawer
  const [showDocContext, setShowDocContext] = useState(false);
  const [documentContext, setDocumentContext] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('saqibtax_token');

  // Load Sessions on Mount / Token change
  useEffect(() => {
    if (token) {
      fetchSessions();
    } else {
      // Demo session for non-logged-in preview
      const demoId = 'demo-session';
      setCurrentSessionId(demoId);
      setMessages([
        {
          id: 'welcome-demo',
          sessionId: demoId,
          role: 'assistant',
          content: `### Assalamu Alaikum & Welcome to SaqibTax Legal AI

I am your dedicated Pakistani tax law counsel and FBR compliance intelligence system. 

#### Key Capabilities:
- **Income Tax Ordinance, 2001**: Comprehensive advisory on personal, business, and corporate tax computation.
- **FBR Notice Strategies**: Defenses for Section 114(4), 177 (Audit), 122(5A) (Amendment), 161 (Withholding default), and 140 (Recovery).
- **Sales Tax Act, 1990**: Exemption schedules (6th & 8th Schedules), 3rd schedule retail goods, and zero-rating.
- **Active Taxpayer List (ATL)**: Filer vs Non-Filer withholding tax surcharges (Tenth Schedule).

*Select a quick topic below or type your legal inquiry to begin.*`,
          timestamp: new Date().toISOString(),
          citations: ['ITO 2001', 'Sales Tax Act 1990', 'Finance Act 2025/2026'],
          suggestedActions: ['View Income Tax Slabs 2026', 'Open FBR Tax Calculator', 'Check Property Withholding (Sec 236K)'],
        },
      ]);
    }
  }, [token]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/chat/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !currentSessionId) {
          selectSession(data[0].id);
        } else if (data.length === 0) {
          createNewSession();
        }
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const selectSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    try {
      const res = await fetch(`/api/chat/sessions/${sessionId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const createNewSession = async () => {
    if (!token) {
      onOpenAuth('signin');
      return;
    }
    try {
      const res = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: 'New Legal Consultation' }),
      });
      if (res.ok) {
        const newSession = await res.json();
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
        setMessages([
          {
            id: `init-${Date.now()}`,
            sessionId: newSession.id,
            role: 'assistant',
            content: `Assalamu Alaikum! How can I assist your Pakistani tax affairs or FBR legal compliance today? You may ask about specific sections, tax slabs, notice replies, or upload a contract for audit.`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error('Error creating session:', err);
    }
  };

  const deleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (!token) return;
    try {
      const res = await fetch(`/api/chat/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const updated = sessions.filter(s => s.id !== sessionId);
        setSessions(updated);
        if (currentSessionId === sessionId) {
          if (updated.length > 0) {
            selectSession(updated[0].id);
          } else {
            createNewSession();
          }
        }
      }
    } catch (err) {
      console.error('Error deleting session:', err);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || inputMessage;
    if (!messageContent.trim()) return;

    if (!token) {
      onOpenAuth('signin');
      return;
    }

    // Check paywall quota on Free tier
    if (user?.subscriptionTier === 'free' && user.queriesUsedToday >= 5) {
      onOpenTierModal();
      return;
    }

    setLastSentQuery(messageContent);

    const tempUserMsgId = `temp-user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: tempUserMsgId,
      sessionId: currentSessionId,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    setIsStreaming(true);

    const tempAssistantId = `temp-ai-${Date.now()}`;
    const assistantPlaceholder: ChatMessage = {
      id: tempAssistantId,
      sessionId: currentSessionId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, assistantPlaceholder]);

    let streamedText = '';

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
          message: messageContent,
          documentContext: documentContext.trim() ? documentContext : undefined,
        }),
      });

      if (!response.ok) {
        let errDetail = 'Streaming connection failed';
        try {
          const errData = await response.json();
          errDetail = errData.detail || errDetail;
        } catch {
          // ignore non-json error responses
        }
        throw new Error(errDetail);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.replace('data: ', ''));
                if (data.chunk) {
                  streamedText += data.chunk;
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === tempAssistantId
                        ? { ...m, content: streamedText }
                        : m
                    )
                  );
                }
                if (data.response && !streamedText) {
                  streamedText = data.response;
                }
                if (data.done) {
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === tempAssistantId
                        ? { 
                            ...m, 
                            content: streamedText || data.response || '',
                            citations: data.citations || ['Income Tax Ordinance 2001', 'Sales Tax Act 1990'],
                            suggestedActions: data.suggestedActions || ['Draft FBR Notice Reply', 'Calculate Income Tax']
                          }
                        : m
                    )
                  );
                }
              } catch (e) {
                // Partial JSON buffer parse tolerance
              }
            }
          }
        }
      }

      // If streaming yielded no text or failed silently, invoke non-streaming fallback endpoint
      if (!streamedText.trim()) {
        try {
          const fallbackRes = await fetch('/api/chat/message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              sessionId: currentSessionId,
              message: messageContent,
              documentContext: documentContext.trim() ? documentContext : undefined,
            }),
          });

          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const replyText = fallbackData.response || fallbackData.reply || fallbackData.content;
            if (replyText && replyText.trim()) {
              streamedText = replyText;
              setMessages(prev =>
                prev.map(m =>
                  m.id === tempAssistantId
                    ? { 
                        ...m, 
                        content: replyText,
                        citations: fallbackData.citations || ['Income Tax Ordinance 2001'],
                        suggestedActions: fallbackData.suggestedActions || ['Open Tax Calculator', 'Draft FBR Reply']
                      }
                    : m
                )
              );
            }
          }
        } catch (directErr) {
          console.warn('Fallback direct endpoint error:', directErr);
        }
      }

      // Ensure that under no condition does the chat bubble remain blank/empty
      if (!streamedText.trim()) {
        const safeAdvisory = (
          "### ⚠️ Legal Advisory Notice\n\n" +
          "The legal intelligence server is currently experiencing high demand or statutory indexing refresh. " +
          "Please try rephrasing your legal query or ask a specific section of the **Income Tax Ordinance 2001** or **Sales Tax Act 1990**."
        );
        setMessages(prev =>
          prev.map(m =>
            m.id === tempAssistantId
              ? { 
                  ...m, 
                  content: safeAdvisory,
                  citations: ['Income Tax Ordinance 2001', 'Sales Tax Act 1990'],
                  suggestedActions: ['Retry Query', 'Calculate Income Tax 2026', 'Section 114(4) Notice Help']
                }
              : m
          )
        );
      }

      // Refresh sessions to update titles/counts
      fetchSessions();
      if (documentContext) {
        setDocumentContext('');
        setShowDocContext(false);
      }
    } catch (err: any) {
      console.error('Chat error encountered:', err);
      const friendlyErrMsg = (
        `### ⚠️ Legal Advisory Notice\n\n` +
        `**Connection Status**: ${err.message || 'The AI counsel service is temporarily busy.'}\n\n` +
        `Please click **Retry Query** below or verify your inquiry under **Income Tax Ordinance 2001** or **Sales Tax Act 1990**.`
      );
      setMessages(prev =>
        prev.map(m =>
          m.id === tempAssistantId
            ? { 
                ...m, 
                content: friendlyErrMsg,
                citations: ['Income Tax Ordinance 2001', 'Sales Tax Act 1990'],
                suggestedActions: ['Retry Query', 'Open Tax Calculator', 'Draft FBR Notice Reply']
              }
            : m
        )
      );
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  const handleCopyText = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (action: string) => {
    if (action.toLowerCase().includes('retry')) {
      if (lastSentQuery) {
        handleSendMessage(lastSentQuery);
      } else {
        handleSendMessage('Please provide a legal analysis of latest Income Tax Ordinance 2001 provisions.');
      }
    } else if (action.includes('Notice') || action.includes('Draft')) {
      onNavigateToNoticeDrafter();
    } else if (action.includes('Calculator') || action.includes('Tax Computation') || action.includes('Slabs')) {
      onNavigateToCalculator();
    } else {
      handleSendMessage(`Please provide detailed legal analysis on: ${action}`);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-7xl mx-auto overflow-hidden bg-slate-100">
      
      {/* LEFT SIDEBAR: Chat History & Sessions */}
      <aside className="w-72 hidden md:flex flex-col bg-slate-900 border-r border-slate-800 text-slate-300">
        
        {/* New Chat Button */}
        <div className="p-4 border-b border-slate-800">
          <button
            id="btn-new-chat"
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-950/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Legal Consultation</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Consultation History
          </div>

          {sessions.map(s => {
            const isActive = s.id === currentSessionId;
            return (
              <div
                key={s.id}
                onClick={() => selectSession(s.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition text-xs ${
                  isActive
                    ? 'bg-slate-800 text-white font-medium border border-slate-700/80'
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Scale className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="truncate">{s.title}</span>
                </div>
                <button
                  onClick={(e) => deleteSession(e, s.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 rounded transition"
                  title="Delete consultation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {sessions.length === 0 && (
            <div className="p-4 text-center text-slate-500 text-xs">
              No previous consultations recorded.
            </div>
          )}
        </div>

        {/* User Quota Status Box */}
        {user && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Plan Quota</span>
              <span className="text-[11px] font-medium text-emerald-400">
                {user.subscriptionTier === 'free' ? `${user.queriesUsedToday} / ${user.maxDailyQueries} Daily` : 'Unlimited'}
              </span>
            </div>
            {user.subscriptionTier === 'free' && (
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (user.queriesUsedToday / user.maxDailyQueries) * 100)}%` }}
                />
              </div>
            )}
            <button
              onClick={onOpenTierModal}
              className="w-full py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 flex items-center justify-between transition border border-slate-700"
            >
              <span>{user.subscriptionTier === 'free' ? 'Upgrade to Pro' : 'Manage Subscription'}</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            </button>
          </div>
        )}
      </aside>

      {/* RIGHT MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Chat Top Banner */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-xs flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300/60 flex items-center justify-center text-emerald-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                SaqibTax Advisory Engine
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ITO 2001 & Finance Act 2026
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">Live AI grounded in Pakistani tax jurisprudence and appellate rulings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-open-calc-top"
              onClick={onNavigateToCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Tax Calculator</span>
            </button>
            <button
              id="btn-open-doc-context"
              onClick={() => setShowDocContext(!showDocContext)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                showDocContext || documentContext
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
              title="Attach notice text or contract clause"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>{documentContext ? 'Document Attached' : 'Attach Document Context'}</span>
            </button>
          </div>
        </div>

        {/* Document Context Drawer (Collapsible) */}
        {showDocContext && (
          <div className="p-4 bg-amber-50/70 border-b border-amber-200 text-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Document & FBR Notice Context Injection</span>
              </div>
              <button 
                onClick={() => setShowDocContext(false)}
                className="text-amber-800 hover:text-amber-950 font-bold"
              >
                Done
              </button>
            </div>
            <p className="text-amber-800 text-[11px] mb-2">
              Paste the text of your FBR show-cause notice, withholding certificate, or contract clause below. The AI will ground its legal analysis directly in these terms.
            </p>
            <textarea
              rows={3}
              value={documentContext}
              onChange={(e) => setDocumentContext(e.target.value)}
              placeholder="Paste FBR Notice text (e.g. 'Whereas you are required under section 114(4)...') or contract clauses..."
              className="w-full p-2.5 bg-white border border-amber-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none text-xs"
            />
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          
          {/* Quick Prompt Cards (Shown at start of chat) */}
          {messages.length <= 1 && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Frequently Consulted Tax Provisions & Quick Inquiries</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qp.prompt)}
                    className="p-3 text-left bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl shadow-xs transition group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {qp.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1.5 group-hover:text-emerald-800 transition">
                        {qp.label}
                      </h4>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 group-hover:text-emerald-700 font-medium">
                      <span>Ask AI</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages List */}
          {messages.map((m) => {
            const isUser = m.role === 'user';
            const isEmptyContent = !m.content || m.content.trim() === '';
            const isErrorOrAdvisory = m.content && (m.content.includes('⚠️') || m.content.includes('Notice:') || m.content.includes('Connection Notice') || m.content.includes('Connection Status'));

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-400/30">
                    <Scale className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`relative group rounded-2xl p-4.5 max-w-[85%] text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-tr-xs'
                      : isErrorOrAdvisory
                      ? 'bg-amber-50/90 border border-amber-200 text-slate-900 rounded-tl-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Top Bar for Assistant Message */}
                  {!isUser && (
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-[11px]">SaqibTax Counsel</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {!isEmptyContent && (
                        <button
                          onClick={() => handleCopyText(m.content, m.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="Copy legal advice"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Message Content or Interactive Loading Spinner */}
                  {isEmptyContent ? (
                    <div className="flex items-center gap-3 py-3 px-1 text-slate-700">
                      <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">Reviewing FBR Laws & Case Precedents</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-semibold animate-pulse">
                            Processing
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Cross-referencing Income Tax Ordinance 2001, Sales Tax Act 1990 & ATL statutory rules...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`prose prose-xs max-w-none ${isUser ? 'prose-invert text-white' : 'text-slate-800'}`}>
                      <div className="markdown-body">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  )}

                  {/* Retry Action Banner for Error / Advisory bubbles */}
                  {!isUser && isErrorOrAdvisory && (
                    <div className="mt-3 pt-2.5 border-t border-amber-200 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-amber-900 font-medium">Need immediate legal analysis?</span>
                      <button
                        onClick={() => handleActionClick('Retry Query')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold shadow-xs transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retry Query</span>
                      </button>
                    </div>
                  )}

                  {/* Statutory Citations Badge Row */}
                  {!isUser && !isEmptyContent && m.citations && m.citations.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        <span>Statutory Citations:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.citations.map((cite, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            {cite}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Next Action Chips */}
                  {!isUser && !isEmptyContent && m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-medium mr-1">Recommended Actions:</span>
                      {m.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                    {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {loading && isStreaming && (
            <div className="flex items-center gap-2.5 max-w-4xl mx-auto text-xs text-slate-600 pl-11 py-1">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
              <span>SaqibTax legal engine analyzing statutory provisions & structuring response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                id="input-chat-query"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Pakistani tax laws, FBR notice replies, salary slabs, sales tax exemptions..."
                disabled={loading}
                className="w-full pl-4 pr-24 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none shadow-xs text-slate-900 placeholder:text-slate-400"
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowDocContext(!showDocContext)}
                  className={`p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition ${documentContext ? 'text-amber-600' : ''}`}
                  title="Attach notice or document context"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  id="btn-send-message"
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white shadow-sm transition flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Grounded in FBR Income Tax Ordinance 2001, Sales Tax Act 1990 & Finance Acts</span>
              <span>Model: Google Gemini 3.7 Flash</span>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};
