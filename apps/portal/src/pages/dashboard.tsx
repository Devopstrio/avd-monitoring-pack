import React from 'react';

// Devopstrio AVD Monitoring Pack
// Executive Observability & Health Command Center

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-cyan-500/30">
            {/* Global Monitoring Header */}
            <header className="border-b border-white/5 bg-black/60 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(16,185,129,0.3)] border border-white/10 relative overflow-hidden">
                            MP
                            <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full m-1 border border-black shadow-[0_0_50px_10px_rgba(52,211,153,0.5)]"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-widest leading-none">MONITORING PACK</h1>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mt-2 italic">Real-Time Observability Engine</p>
                        </div>
                    </div>
                    <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="text-emerald-400 border-b-2 border-emerald-500 pb-10 pt-10">Global Health</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Host Metrics</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">User UX</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Alert Hub</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Analytics</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-10 py-12">

                {/* Real-time Health KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Global UX Score', value: '0.94', status: 'Optimal', color: 'emerald' },
                        { label: 'Avg. Login Latency', value: '24.2s', status: '-2.1s vs local', color: 'cyan' },
                        { label: 'Active Alerts', value: '14', status: '2 Critical', color: 'rose' },
                        { label: 'Fleet Availability', value: '99.98%', status: 'SLA Compliant', color: 'blue' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-neutral-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/30 transition-all shadow-2xl relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-all"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">{kpi.label}</span>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono">{kpi.value}</div>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${kpi.color}-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]`}></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Primary Intelligence Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

                    {/* Live Health Heatmap Placeholder */}
                    <div className="xl:col-span-2 bg-neutral-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Regional Health Heatmap</h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-md">Real-time status of sessions and hosts across global Azure regions.</p>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 bg-black/40 border border-white/10 rounded-2xl">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[11px] font-black text-white uppercase tracking-widest">Live Engine Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <div key={i} className={`h-16 rounded-xl border border-white/5 transition-all cursor-pointer hover:scale-105 ${i === 12 ? 'bg-rose-950 border-rose-500/50' : i % 7 === 0 ? 'bg-amber-900 border-amber-500/50' : 'bg-emerald-950/40 border-emerald-900'}`}>
                                    <div className="w-full h-full flex items-center justify-center opacity-40 group-hover:opacity-100">
                                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-white/5 pt-8">
                            <div className="flex gap-8">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-sm"></span> Optimal</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-500 rounded-sm"></span> High Load</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 bg-rose-500 rounded-sm"></span> Critical</span>
                            </div>
                            <div>Total Monitored Nodes: 142</div>
                        </div>
                    </div>

                    {/* Active Incident Alert Stack */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-white/5 pb-6">Active Security Alerts</h3>
                            <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                                {[
                                    { app: 'vdpool-fin-uks', msg: 'Multiple High-Latency Logins', time: '4m ago', sev: 'Critical' },
                                    { app: 'vm-dev-uks-22', msg: 'Unauthorized Process Execution', time: '12m ago', sev: 'High' },
                                    { app: 'stg-avd-profiles', msg: 'Storage IOPS Peak (94%)', time: '22m ago', sev: 'Medium' }
                                ].map((alert, idx) => (
                                    <div key={idx} className="p-6 bg-black/40 rounded-2xl border border-white/5 relative group hover:border-emerald-500/20 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.app}</div>
                                            <div className="text-[9px] font-bold text-slate-600 italic">{alert.time}</div>
                                        </div>
                                        <div className="text-sm font-black text-white tracking-tight leading-snug mb-3">{alert.msg}</div>
                                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${alert.sev === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {alert.sev}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 bg-black hover:bg-neutral-800 text-white text-[11px] font-black py-4 rounded-2xl border border-white/10 uppercase tracking-widest transition-all">
                                View All 14 Incidents
                            </button>
                        </div>

                        <div className="bg-indigo-600 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.3)] relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all"></div>
                            <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2 leading-none">Capacity Forecast</h4>
                            <div className="text-2xl font-black text-white tracking-tight mb-2">Scale Up Suggested</div>
                            <p className="text-xs text-indigo-100 font-medium leading-relaxed">
                                Predictive modeling suggests Monday peak at <span className="font-bold underline">16:40 GMT</span> will exceed current host pool thresholds in East US.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Performance Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl relative overflow-hidden">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">FSLogix Profile Performance</h5>
                                <div className="text-3xl font-black text-white font-mono tracking-tighter">142ms <span className="text-xs font-bold text-emerald-400 uppercase tracking-normal underline ml-1">AVG LOAD</span></div>
                            </div>
                            <div className="text-right text-[10px] font-bold text-slate-600 uppercase">Last 24h Trend</div>
                        </div>
                        <div className="flex items-end gap-1.5 h-32 px-2">
                            {[42, 55, 34, 78, 92, 52, 44, 38, 62, 88, 48, 30, 45, 68].map((v, i) => (
                                <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-lg hover:bg-emerald-500 transition-all relative group cursor-pointer" style={{ height: `${v}%` }}>
                                    <div className="absolute -top-10 left-1/2 -ms-4 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none transition-all">
                                        {v}ms
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl">
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Login Performance Scorecard</h5>
                        <div className="space-y-6">
                            {[
                                { stage: 'Profile Mount', time: '4.2s', status: 'Optimal', col: 'emerald' },
                                { stage: 'GPO Processing', time: '12.8s', status: 'Warning', col: 'amber' },
                                { stage: 'Shell Init', time: '2.1s', status: 'Optimal', col: 'emerald' },
                                { stage: 'Network Handshake', time: '0.8s', status: 'Fast', col: 'cyan' }
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 hover:border-white/10 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-white mb-1">{row.stage}</div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{row.status} Phase</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xl font-black text-${row.col}-400 font-mono`}>{row.time}</div>
                                        <div className="text-[9px] text-slate-600 font-bold uppercase tracking-wider mt-1">Variance: ±0.2s</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
