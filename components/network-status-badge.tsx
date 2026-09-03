'use client';

import React, { useState, useEffect } from 'react';
import { networkSyncEngine, NetworkTelemetry } from '@/lib/network-sync';
import { meshNetwork } from '@/lib/network-p2p';
import {
  Wifi,
  WifiOff,
  Activity,
  Share2,
  RefreshCw,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export function NetworkStatusBadge() {
  const [telemetry, setTelemetry] = useState<NetworkTelemetry>(networkSyncEngine.getTelemetry());
  const [showDetails, setShowDetails] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    meshNetwork.init('Client Peer');
    const unsubscribe = networkSyncEngine.subscribe((t) => setTelemetry(t));
    return () => unsubscribe();
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await networkSyncEngine.measurePing();
    await networkSyncEngine.flushQueue();
    setTimeout(() => setIsSyncing(false), 500);
  };

  const getLatencyColor = (rtt: number) => {
    if (!telemetry.isOnline) return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
    if (rtt < 60) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (rtt < 150) return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative">
        {/* Main Pill Trigger */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg flex items-center gap-2 text-[11px] font-bold transition-all hover:scale-105 ${getLatencyColor(
            telemetry.rttMs
          )}`}
          title="Network-Centric Telemetry & P2P Mesh Status"
        >
          {telemetry.isOnline ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono">{telemetry.rttMs}ms</span>
              <span className="opacity-70 uppercase text-[9px] font-extrabold">{telemetry.effectiveType}</span>
              <Share2 className="w-3 h-3 text-sky-500" />
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-rose-500 animate-pulse" />
              <span>Offline (Local-First Sync)</span>
            </>
          )}

          {telemetry.pendingSyncCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black animate-pulse">
              {telemetry.pendingSyncCount} pending
            </span>
          )}
        </button>

        {/* Detailed Network Telemetry Popover */}
        {showDetails && (
          <div className="absolute bottom-10 right-0 w-72 p-4 rounded-2xl bg-card/95 border border-border shadow-2xl backdrop-blur-xl space-y-3 text-xs text-foreground animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="font-extrabold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-500" />
                <span>Network-Centric Mesh</span>
              </div>
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                title="Refresh Ping & Sync Queue"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-500' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-muted/40 border border-border">
                <span className="text-muted-foreground block text-[9px] uppercase font-bold">Latency (RTT)</span>
                <span className="font-black font-mono text-xs">{telemetry.rttMs} ms</span>
              </div>

              <div className="p-2 rounded-xl bg-muted/40 border border-border">
                <span className="text-muted-foreground block text-[9px] uppercase font-bold">Network Mode</span>
                <span className="font-black uppercase text-xs">{telemetry.effectiveType}</span>
              </div>

              <div className="p-2 rounded-xl bg-muted/40 border border-border">
                <span className="text-muted-foreground block text-[9px] uppercase font-bold">P2P Mesh Node</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs">Active (P2P)</span>
              </div>

              <div className="p-2 rounded-xl bg-muted/40 border border-border">
                <span className="text-muted-foreground block text-[9px] uppercase font-bold">Local-First Queue</span>
                <span className="font-black text-xs">{telemetry.pendingSyncCount} synced</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground leading-relaxed pt-1 border-t border-border flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Requests execute on global Edge Nodes & P2P WebRTC data channels with zero server bottleneck.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
