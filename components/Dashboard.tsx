"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Mic, MicOff, Terminal, BarChart3, MessageSquare, 
  ShieldAlert, Cpu, Zap, Activity, Users, Settings,
  ArrowRight, Award, History, Volume2, Search,
  AlertCircle, CheckCircle2, LayoutGrid, PieChart
} from 'lucide-react';
import { PERSONAS, Persona, RefactorLogic } from '../lib/NexusBrain';

// --- TYPES ---
interface DialogueLine {
  role: 'AI' | 'USER';
  text: string;
  timestamp: string;
}

interface LinguisticError {
  id: string;
  category: string;
  original: string;
  correction: string;
  severity: 'low' | 'high';
  resolved: boolean;
}

const NexusVocalApp = () => {
  // --- STATE ---
  const [isRecording, setIsRecording] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<Persona>('ARCHITECT');
  const [transcript, setTranscript] = useState<DialogueLine[]>([]);
  const [stress, setStress] = useState(42);
  const [fluency, setFluency] = useState(65);
  const [errors, setErrors] = useState<LinguisticError[]>([
    { 
      id: '1', 
      category: 'Grammar', 
      original: "The most part of developers...", 
      correction: "Most developers...", 
      severity: 'high', 
      resolved: false 
    },
    { 
      id: '2', 
      category: 'Pronunciation', 
      original: "E-script", 
      correction: "Script", 
      severity: 'low', 
      resolved: true 
    }
  ]);

  // --- MOCK INTERACTION LOGIC ---
  const simulateAIResponse = useCallback((userText: string) => {
    // In a real app, this would call the OpenAI Realtime API
    setTimeout(() => {
      const responseText = `I hear your point about ${userText.split(' ').slice(-1)[0]}. But let's look at the scalability. How does your choice impact the overall latency of the system? Use specific technical terms.`;
      const newLine: DialogueLine = { 
        role: 'AI', 
        text: responseText, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setTranscript(prev => [...prev, newLine]);
      setStress(s => Math.min(s + 5, 100));
    }, 1500);
  }, []);

  const handleStartStop = () => {
    if (isRecording) {
      // Stopping: Simulate a user input
      const userLines = [
        "I think the [restricción de llave foránea] is the best way to handle this.",
        "We are using a microservices architecture for the project.",
        "The scalability is a main priority for our sprint."
      ];
      const randomLine = userLines[Math.floor(Math.random() * userLines.length)];
      const newLine: DialogueLine = { 
        role: 'USER', 
        text: randomLine, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setTranscript(prev => [...prev, newLine]);
      simulateAIResponse(randomLine);
      
      // Update Fluency based on length
      setFluency(prev => Math.min(prev + 2, 100));
    }
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    // Initial Greeting
    setTranscript([{ 
      role: 'AI', 
      text: "Nexus OS initialized. Persona: " + PERSONAS[currentPersona].name + " is online. Give me your status update.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
  }, [currentPersona]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* 1. ULTRA-MINIMAL SIDEBAR */}
      <nav className="fixed left-0 top-0 h-full w-16 border-r border-white/5 bg-[#080808] flex flex-col items-center py-6 gap-8 z-50">
        <div className="group relative">
           <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-violet-900/40">
            NX
           </div>
           <div className="absolute left-14 top-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">NEXUS_CORE v1.0</div>
        </div>
        
        <div className="flex flex-col gap-8 mt-10">
          <button className="text-slate-600 hover:text-cyan-400 transition-colors"><LayoutGrid size={20} /></button>
          <button className="text-slate-600 hover:text-cyan-400 transition-colors"><PieChart size={20} /></button>
          <button className="text-slate-600 hover:text-cyan-400 transition-colors"><Users size={20} /></button>
          <button className="text-slate-600 hover:text-cyan-400 transition-colors"><History size={20} /></button>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <Award className="text-amber-500/50 hover:text-amber-400 cursor-pointer" size={20} />
          <Settings className="text-slate-600 hover:text-white cursor-pointer" size={20} />
        </div>
      </nav>

      <div className="pl-16 h-screen flex flex-col">
        
        {/* 2. TOP NAV (GLASS) */}
        <header className="h-16 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Current_Environment</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
                <span className="text-sm font-mono text-white tracking-tighter uppercase">{currentPersona} // ACTIVE</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-white/5"></div>
            
            <div className="hidden md:flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              <Search size={14} className="text-slate-500" />
              <input type="text" placeholder="Search tech terms..." className="bg-transparent border-none text-xs outline-none w-48 text-slate-300 placeholder:text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#050505] bg-slate-800 flex items-center justify-center text-[8px] font-bold">JD</div>
              ))}
            </div>
            <button className="px-4 py-1.5 bg-white text-black text-[11px] font-bold rounded-full hover:bg-cyan-400 transition-all uppercase tracking-tighter">
              Upgrade to C1
            </button>
          </div>
        </header>

        {/* 3. MAIN WORKSPACE */}
        <main className="flex-1 overflow-hidden p-6 grid grid-cols-12 gap-6 bg-[radial-gradient(circle_at_50%_50%,_#111_0%,_#050505_100%)]">
          
          {/* LEFT: THE INTERACTIVE STAGE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* PERSONA DISPLAY & WAVEFORM */}
            <div className="bento-card relative flex-1 flex flex-col items-center justify-center overflow-hidden border-violet-500/10 shadow-[inset_0_0_50px_rgba(139,92,246,0.02)]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none"></div>

              {/* Persona Tag */}
              <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Users className="text-slate-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight tracking-tight">{PERSONAS[currentPersona].name}</h2>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">{PERSONAS[currentPersona].role}</p>
                </div>
              </div>

              {/* Core Visualizer */}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-64 h-64 rounded-full flex items-center justify-center transition-all duration-1000 ${isRecording ? 'scale-110' : 'scale-100'}`}>
                  {/* Outer Rings */}
                  <div className={`absolute inset-0 border border-white/5 rounded-full ${isRecording ? 'animate-ping opacity-20' : ''}`}></div>
                  <div className={`absolute inset-4 border border-violet-500/10 rounded-full ${isRecording ? 'animate-[spin_4s_linear_infinite]' : ''}`}></div>
                  
                  {/* The Core */}
                  <div className={`w-40 h-40 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-2xl transition-all ${isRecording ? 'border-violet-500/40 shadow-violet-500/10' : ''}`}>
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 blur-xl absolute ${isRecording ? 'opacity-100 scale-150' : 'opacity-0'}`}></div>
                    {isRecording ? <Activity className="text-violet-400 animate-pulse" size={48} /> : <Cpu className="text-slate-700" size={48} />}
                  </div>
                </div>

                {/* Subtitle / Live Text */}
                <div className="mt-12 text-center max-w-lg">
                  <p className="text-xl font-medium text-slate-200 leading-relaxed tracking-tight px-4">
                    {isRecording ? 
                      <span className="italic text-slate-400">Listening to your speech patterns...</span> : 
                      `"${transcript[transcript.length - 1]?.text || 'System ready.'}"`
                    }
                  </p>
                </div>
              </div>

              {/* Record Button Floating */}
              <div className="absolute bottom-10 flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleStartStop}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl ${isRecording ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-red-500/20' : 'bg-white hover:bg-cyan-400 scale-100 shadow-white/5'}`}
                  >
                    {isRecording ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-black" />}
                  </button>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{isRecording ? 'Stop Session' : 'Start Talking'}</span>
                </div>
              </div>
            </div>

            {/* FEED CONSOLE */}
            <div className="bento-card h-64 p-0 flex flex-col overflow-hidden border-white/5">
              <div className="bg-white/[0.02] px-6 py-2.5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                  <Terminal size={14} className="text-cyan-500" />
                  <span>Terminal.Log // Conversation_History</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">Buffer: OK</span>
                  <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest animate-pulse">Streaming_Active</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-4 scrollbar-hide">
                {transcript.map((line, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-end shrink-0 w-16">
                      <span className={`font-bold ${line.role === 'AI' ? 'text-violet-500' : 'text-cyan-500'}`}>{line.role}</span>
                      <span className="text-[8px] text-slate-700">{line.timestamp}</span>
                    </div>
                    <p className={`leading-relaxed ${line.role === 'AI' ? 'text-slate-300' : 'text-slate-500'}`}>
                      {line.text}
                    </p>
                  </div>
                ))}
                <div id="anchor"></div>
              </div>
            </div>
          </div>

          {/* RIGHT: ANALYTICS & DEBT */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            
            {/* BIOMETRICS PANEL */}
            <div className="bento-card relative overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                    <ShieldAlert size={14} className="text-violet-500" />
                    Biometrics.v4
                  </h3>
                  <div className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[8px] font-bold">LIVE</div>
               </div>

               <div className="space-y-10">
                  {/* Stress Level */}
                  <div className="relative">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Stress_Intensity</span>
                        <span className="text-[8px] text-slate-600">Based on prosody gaps</span>
                      </div>
                      <span className={`text-sm font-mono font-bold ${stress > 60 ? 'text-red-500' : 'text-cyan-400'}`}>{stress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 rounded-full ${stress > 60 ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-violet-500'}`} style={{ width: `${stress}%` }}></div>
                    </div>
                  </div>

                  {/* Fluency Coefficient */}
                  <div className="relative">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fluency_Coefficient</span>
                        <span className="text-[8px] text-slate-600">Words per minute / Logic flow</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-violet-400">{fluency}%</span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {[30, 45, 20, 60, 80, 50, 40, 90, 75, 40, 60].map((v, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-violet-500/20 group-hover:bg-violet-500/40 transition-all rounded-t-sm" 
                            style={{ height: `${v}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* LINGUISTIC DEBT TRACKER */}
            <div className="bento-card flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <BarChart3 size={14} className="text-cyan-500" />
                  Debt_Registry
                </h3>
                <span className="text-[10px] font-mono text-slate-600">{errors.length} ENTRIES</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {errors.map((error) => (
                  <div key={error.id} className={`p-4 rounded-2xl border transition-all ${error.resolved ? 'bg-green-500/5 border-green-500/10 opacity-60' : 'bg-red-500/5 border-red-500/10'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${error.resolved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                          {error.category}
                        </span>
                        {error.resolved && <CheckCircle2 size={12} className="text-green-500" />}
                      </div>
                      <AlertCircle size={12} className={error.severity === 'high' ? 'text-red-500' : 'text-amber-500'} />
                    </div>
                    <p className="text-xs font-mono text-slate-400 line-through mb-1">{error.original}</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                      <ArrowRight size={10} className="text-cyan-500" />
                      <span>{error.correction}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                View_Full_Audit_Trail
              </button>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 gap-4">
               <button className="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-900/40 transition-all active:scale-95">
                  <Zap size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Sprint_Mode</span>
               </button>
               <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95">
                  <Volume2 size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Accent_Lab</span>
               </button>
            </div>

          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NexusVocalApp;