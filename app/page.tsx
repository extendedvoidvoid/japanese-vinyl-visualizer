/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EXPANDED_JAPANESE_SLEEVES,
  EXPANDED_SONG_SEEDS,
  VERIFIED_ALBUM_PACKAGES,
  COUNTRY_CODES,
  type Sleeve,
  type AlbumPackage
} from "@/lib/catalog";


type Audio = {
  id: string;
  title: string;
  artist: string;
  album: string;
  preview: string;
  appleUrl: string;
  artwork: string;
  bpm: number;
  country: string;
};

const NEUTRAL_SLEEVE_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200' viewBox='0 0 1200 1200'><rect width='1200' height='1200' fill='%2311120f'/><circle cx='600' cy='600' r='500' fill='none' stroke='%2322241e' stroke-width='4'/><circle cx='600' cy='600' r='350' fill='none' stroke='%232b2d28' stroke-width='2'/><circle cx='600' cy='600' r='180' fill='%23171813'/><circle cx='600' cy='600' r='20' fill='%23eee9dc'/><text x='600' y='1100' font-family='sans-serif' font-size='24' font-weight='bold' fill='%23c89d54' text-anchor='middle' letter-spacing='4'>JAPANESE ARCHIVAL SLEEVE</text></svg>";

type Session = {
  audio: Audio;
  sleeves: Sleeve[];
  duration: 30;
};

export type KenBurnsPreset = {
  id: string;
  name: string;
  jpName: string;
  description: string;
  className: string;
};

// Curated Ken Burns Motion Repository
export const KEN_BURNS_REPOSITORY: KenBurnsPreset[] = [
  {
    id: "auto",
    name: "CINEMATIC AUTO",
    jpName: "映画的自動選定",
    description: "Harmoniously cycles camera vectors to match musical tempo",
    className: "kb-auto"
  },
  {
    id: "nocturne",
    name: "NOCTURNE DRIFT",
    jpName: "夜想曲ドリフト",
    description: "Intimate breathing pan across artwork details",
    className: "kb-nocturne"
  },
  {
    id: "obi",
    name: "OBI TYPOGRAPHY",
    jpName: "帯・文字盤フォーカス",
    description: "Vertical glide along Japanese liner typography",
    className: "kb-obi"
  },
  {
    id: "sweep",
    name: "GATEFOLD SWEEP",
    jpName: "見開き水平スイープ",
    description: "Wide horizontal panoramic camera sweep",
    className: "kb-sweep"
  },
  {
    id: "reveal",
    name: "DEEP REVEAL",
    jpName: "インナー開示",
    description: "Expansive pull-back zoom unveiling the full jacket",
    className: "kb-reveal"
  }
];

type AppleItem = {
  trackId?: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  previewUrl?: string;
  trackViewUrl: string;
  artworkUrl100?: string;
};

type LogEntry = {
  time: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
};

export default function Home() {
  const [tempo, setTempo] = useState(66);
  const [nativeBpm, setNativeBpm] = useState(66);
  const [session, setSession] = useState<Session | null>(null);
  
  // Rhythmic synchronization:
  // beatsPerSleeve controls how many musical beats a single album sleeve remains visible
  // 4 beats = 1 measure (~3.6s at 66 BPM), allowing users to comfortably read album & artist names
  const [beatsPerSleeve, setBeatsPerSleeve] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [sleeveIndex, setSleeveIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMotionPreset, setSelectedMotionPreset] = useState<string>("auto");
  
  // Real-time FPS & Performance Engine
  const [fps, setFps] = useState<number>(60);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);

  // Real-time Process Monitor / Diagnostic Watcher

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showMonitor, setShowMonitor] = useState(false);


  // Dual-layer crossfade system for seamless Ken Burns transitions
  const [layerA, setLayerA] = useState<{ sleeve: Sleeve | null; animClass: string; key: string }>({
    sleeve: null,
    animClass: "kb-nocturne",
    key: "init-a"
  });
  const [layerB, setLayerB] = useState<{ sleeve: Sleeve | null; animClass: string; key: string }>({
    sleeve: null,
    animClass: "kb-obi",
    key: "init-b"
  });
  const [activeLayer, setActiveLayer] = useState<"A" | "B">("A");

  const audioRef = useRef<HTMLAudioElement>(null);
  const playedIndicesRef = useRef<number[]>([]);
  const lastTrackIdRef = useRef<string>("");
  const countryIndexRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  
  // Track current album package and song index (0 = Song 1/2, 1 = Song 2/2)
  const currentPkgRef = useRef<AlbumPackage | null>(null);
  const songInPkgIndexRef = useRef<number>(0);


  // Append entry to process watcher log
  const addLog = useCallback((message: string, level: LogEntry["level"] = "info") => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    console.log(`[Watch ${time}] [${level.toUpperCase()}] ${message}`);
    setLogs((prev) => [{ time, level, message }, ...prev.slice(0, 49)]);
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    cancelAnimationFrame(rafIdRef.current);
    setSleeveIndex(0);
    setCurrentBeat(0);
    setSecondsRemaining(30);
    addLog("Playback stopped — reset to front cover", "info");
  }, [addLog]);




  // Fetch Apple Music preview for a specific song query
  const getApplePreview = useCallback(
    (queryStr?: string, defaultBpm = 66, defaultArtist = "Phoebe Bridgers", defaultAlbum = "Lost Weekend"): Promise<Audio> => {
      return new Promise((resolve) => {
        const country = COUNTRY_CODES[countryIndexRef.current % COUNTRY_CODES.length];
        countryIndexRef.current++;

        const searchTerm = queryStr || "Phoebe Bridgers Savior Complex";
        addLog(`Querying Apple Music: "${searchTerm}" (Region: ${country})`, "info");

        const callback = `applePreview_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        const script = document.createElement("script");
        const timer = window.setTimeout(() => finish(new Error("Apple Music preview request timed out")), 10000);
        const scope = window as unknown as Record<string, unknown>;

        // Per-artist/package fallback artwork lookup (never hardcode Phoebe Bridgers globally)
        const matchedPkg = VERIFIED_ALBUM_PACKAGES.find(
          (p) => p.artist.toLowerCase() === defaultArtist.toLowerCase() || p.albumTitle.toLowerCase() === defaultAlbum.toLowerCase()
        );
        const fallbackArtwork = matchedPkg?.sleeves[0]?.artwork || VERIFIED_ALBUM_PACKAGES[0].sleeves[0].artwork;

        function finish(result: Audio | Error) {
          window.clearTimeout(timer);
          delete scope[callback];
          if (script.parentNode) script.remove();
          if (result instanceof Error) {
            addLog(`Apple Music fetch failed: ${result.message}`, "warn");
            const fallbackAudio: Audio = {
              id: `fallback-${Date.now()}`,
              title: searchTerm.replace(/^(Phoebe Bridgers|boygenius|Clairo|Big Thief|Julien Baker|Elliott Smith|Sufjan Stevens|Weyes Blood|Mazzy Star)\s+/i, ""),
              artist: defaultArtist,
              album: defaultAlbum,
              preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/2c/80/442c8065-faec-9602-53b9-1d4889c25f4f/mzaf_10526011388102371452.plus.aac.p.m4a",
              appleUrl: "https://music.apple.com/us/artist/phoebe-bridgers/1098670830",
              artwork: fallbackArtwork,
              bpm: defaultBpm,
              country
            };
            resolve(fallbackAudio);
          } else {
            addLog(`Received track: "${result.title}" by ${result.artist} (BPM: ${defaultBpm})`, "success");
            resolve(result);
          }
        }

        scope[callback] = (payload: { results?: AppleItem[] }) => {
          const candidates = (payload.results || []).filter(
            (item) => item.previewUrl && String(item.trackId || item.trackName) !== lastTrackIdRef.current
          );
          const item = candidates[0] || (payload.results || []).find((it) => it.previewUrl);

          if (!item?.previewUrl) {
            return finish(new Error("No audio preview stream in payload"));
          }

          const hiResArtwork = (item.artworkUrl100 || "").replace("100x100bb", "1200x1200bb");
          const trackId = String(item.trackId || item.trackName);
          lastTrackIdRef.current = trackId;

          finish({
            id: trackId,
            title: item.trackName,
            artist: defaultArtist || item.artistName,
            album: item.collectionName || defaultAlbum,
            preview: item.previewUrl,
            appleUrl: item.trackViewUrl,
            artwork: hiResArtwork || fallbackArtwork,
            bpm: defaultBpm,
            country
          });
        };

        script.onerror = () => finish(new Error("Network script error reaching iTunes API"));
        script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&country=${country}&media=music&entity=song&limit=15&callback=${callback}`;
        document.head.appendChild(script);
      });
    },
    [addLog]
  );

  // Construct dynamic session sleeves strictly bound to the canonical AlbumPackage identity
  const createSessionFromAudio = useCallback((audio: Audio, pkg: AlbumPackage): Session => {
    const canonicalArtist = pkg.artist;
    const canonicalAlbum = pkg.albumTitle;

    // Strictly filter inner sleeves so only sleeves belonging to pkg.id & pkg.artist are included
    const validSleeves = (pkg.sleeves || []).filter(
      (s) => s.packageId === pkg.id && s.artist.toLowerCase() === canonicalArtist.toLowerCase()
    );

    const frontJacket = validSleeves.find((s) => s.type === "front_cover") || validSleeves[0] || {
      id: `cover-${pkg.id}`,
      packageId: pkg.id,
      type: "front_cover" as const,
      typeLabel: "FRONT COVER",
      album: canonicalAlbum,
      artist: canonicalArtist,
      artwork: audio.artwork,
      note: "12\" Vinyl LP Jacket Scan"
    };

    const mainCover: Sleeve = {
      ...frontJacket,
      album: canonicalAlbum,
      artist: canonicalArtist,
      // Use hi-res Apple Music artwork ONLY IF artist matches package canonical identity
      artwork: (audio.artist.toLowerCase() === canonicalArtist.toLowerCase() && audio.artwork)
        ? audio.artwork
        : frontJacket.artwork
    };

    const extraSleeves = validSleeves
      .filter((s) => s.id !== frontJacket.id)
      .map((s) => ({
        ...s,
        album: canonicalAlbum,
        artist: canonicalArtist
      }));

    const canonicalAudio: Audio = {
      ...audio,
      artist: canonicalArtist,
      album: canonicalAlbum,
      artwork: mainCover.artwork
    };

    return {
      audio: canonicalAudio,
      sleeves: [mainCover, ...extraSleeves],
      duration: 30
    };
  }, []);


  // Main playback engine: plays 2 songs from the SAME album/artist before moving to next album
  const start = useCallback(
    async (forceNewAlbum = false) => {
      stop();
      setLoading(true);
      setError("");
      setCurrentBeat(0);
      setSleeveIndex(0);
      setSecondsRemaining(30);

      try {
        let pkg = currentPkgRef.current;
        let songIdx = songInPkgIndexRef.current;

        // Check if we should play Song 2 of the SAME album, or pick a NEW album
        if (forceNewAlbum || !pkg || songIdx >= (pkg.songQueries?.length || 1) - 1) {
          addLog("1. Requesting sleeve-verified album packages from API...", "info");

          const apiData = await fetch("/api/session")
            .then((res) => (res.ok ? res.json() : null))
            .catch((err) => {
              addLog(`API fetch warning: ${err.message}`, "warn");
              return null;
            });

          const verifiedPool: AlbumPackage[] = apiData?.packages || VERIFIED_ALBUM_PACKAGES;
          const unplayed = verifiedPool.filter((p) => p.id !== pkg?.id);
          pkg = unplayed.length > 0 
            ? unplayed[Math.floor(Math.random() * unplayed.length)]
            : verifiedPool[Math.floor(Math.random() * verifiedPool.length)];

          currentPkgRef.current = pkg;
          songInPkgIndexRef.current = 0;
          songIdx = 0;

          addLog(`Selected album: "${pkg.albumTitle}" by ${pkg.artist} (Playing Song 1/2)`, "success");
        } else {
          // Play Song 2 of the SAME album & artist!
          songInPkgIndexRef.current += 1;
          songIdx = songInPkgIndexRef.current;
          addLog(`Playing Song 2/2 from SAME ALBUM: "${pkg.albumTitle}" by ${pkg.artist}`, "info");
        }

        const queryStr = pkg.songQueries?.[songIdx] || pkg.query;

        // 2. Fetch Apple Music audio preview for this song query
        const audio = await getApplePreview(queryStr, pkg.bpm, pkg.artist, pkg.albumTitle);

        // 3. Build session showing images strictly bound to canonical album package
        const newSession = createSessionFromAudio(audio, pkg);
        setSession(newSession);
        setNativeBpm(pkg.bpm || audio.bpm);
        setTempo(pkg.bpm || audio.bpm);

        // Explicitly align layers with the new session's primary album cover
        const initialSleeve = newSession.sleeves[0];
        setLayerA({
          sleeve: initialSleeve,
          animClass: "kb-nocturne",
          key: `init-a-${Date.now()}`
        });
        setLayerB({
          sleeve: null,
          animClass: "kb-obi",
          key: `init-b-${Date.now()}`
        });
        setActiveLayer("A");

        // Immediately set audio source and start audio clock
        if (audioRef.current) {
          audioRef.current.src = newSession.audio.preview;
          audioRef.current.currentTime = 0;
          audioRef.current.playbackRate = 1.0;
          audioRef.current.play().then(() => {
            setPlaying(true);
            addLog(`Audio stream active: "${audio.title}" by ${audio.artist}`, "success");
          }).catch((err) => {
            addLog(`Autoplay interrupted: ${err.message}`, "warn");
            setError("Click ▶ RANDOM START to enable audio");
          });
        }
      } catch (reason) {
        const msg = reason instanceof Error ? reason.message : "Session unavailable";
        setError(msg);
        addLog(`Session error: ${msg}`, "error");
      } finally {
        setLoading(false);
      }
    },
    [stop, getApplePreview, createSessionFromAudio, addLog]
  );

  // Toggle playback state cleanly
  const togglePlayPause = useCallback(() => {
    if (!session) {
      start(true);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setPlaying(true);
      audio.play().catch((err) => {
        addLog(`Playback failed: ${err.message}`, "warn");
      });
      addLog("Playback resumed", "info");
    } else {
      setPlaying(false);
      audio.pause();
      addLog("Playback paused", "info");
    }
  }, [session, start, addLog]);

  // Action to change to a different album
  const changeSong = useCallback(async () => {
    addLog("Manual change to next album requested", "info");
    await start(true);
  }, [start, addLog]);




  // Determine current Ken Burns animation class
  const getKenBurnsClass = useCallback(
    (idx: number) => {
      if (selectedMotionPreset !== "auto") {
        const found = KEN_BURNS_REPOSITORY.find((p) => p.id === selectedMotionPreset);
        if (found) return found.className;
      }
      const pool = ["kb-nocturne", "kb-obi", "kb-sweep", "kb-reveal", "kb-zoom-in"];
      return pool[idx % pool.length];
    },
    [selectedMotionPreset]
  );

  // Manage dual-layer crossfade transitions whenever sleeveIndex advances (> 0)
  useEffect(() => {
    if (!session || !session.sleeves.length || sleeveIndex === 0) return;
    const sleeve = session.sleeves[sleeveIndex % session.sleeves.length];
    const animClass = getKenBurnsClass(sleeveIndex);
    const key = `${sleeve.id}-${sleeveIndex}`;

    if (activeLayer === "A") {
      setLayerB({ sleeve, animClass, key });
      setActiveLayer("B");
    } else {
      setLayerA({ sleeve, animClass, key });
      setActiveLayer("A");
    }
    addLog(`Sleeve transition: "${sleeve.album}" by ${sleeve.artist} [Motion: ${animClass}]`, "info");
  }, [sleeveIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // True Audio-Clock Synchronization Loop: Reads audio.currentTime directly
  useEffect(() => {
    if (!playing || !session) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = tempo / (nativeBpm || 66);

    const syncTick = () => {
      if (!audioRef.current || audioRef.current.paused) return;

      // Calculate real-time rendering FPS
      const frameNow = performance.now();
      frameCountRef.current++;
      if (frameNow - lastFrameTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (frameNow - lastFrameTimeRef.current)));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = frameNow;
      }

      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 30;
      const remaining = Math.max(0, duration - currentTime);
      setSecondsRemaining(Math.ceil(remaining));


      const secondsPerBeat = 60 / tempo;
      const beatNum = Math.floor(currentTime / secondsPerBeat);
      setCurrentBeat(beatNum);

      const newSleeveIdx = Math.floor(beatNum / beatsPerSleeve);
      setSleeveIndex((prev) => (prev !== newSleeveIdx ? newSleeveIdx : prev));

      if (currentTime >= duration || remaining <= 0.1) {
        addLog("Track finished naturally — auto-advancing to next track in album sequence", "info");
        stop();
        setSecondsRemaining(0);
        setTimeout(() => {
          start(false);
        }, 300);
        return;
      }

      rafIdRef.current = requestAnimationFrame(syncTick);
    };

    rafIdRef.current = requestAnimationFrame(syncTick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [playing, session, tempo, nativeBpm, beatsPerSleeve, stop, start, addLog]);


  // Adjust audio playback speed dynamically when slider is moved
  useEffect(() => {
    if (audioRef.current && nativeBpm > 0) {
      audioRef.current.playbackRate = tempo / nativeBpm;
      addLog(`Tempo adjusted to ${tempo} BPM (Playback rate: ${(tempo / nativeBpm).toFixed(2)}x)`, "info");
    }
  }, [tempo, nativeBpm, addLog]);

  const currentSleeve = activeLayer === "A" ? layerA.sleeve : layerB.sleeve;
  const currentMotionName =
    KEN_BURNS_REPOSITORY.find((p) => p.id === selectedMotionPreset)?.name || "CINEMATIC AUTO";
  
  const secondsPerBeat = 60 / tempo;
  const sleeveDurationSeconds = secondsPerBeat * beatsPerSleeve;
  const animDuration = `${Math.max(3.6, sleeveDurationSeconds * 1.2)}s`;

  // Measure calculation for HUD
  const measureNumber = Math.floor(currentBeat / beatsPerSleeve) + 1;
  const beatInMeasure = (currentBeat % beatsPerSleeve) + 1;

  return (
    <main
      className="page"
      data-session-package-id={currentPkgRef.current?.id || session?.sleeves[0]?.packageId || "none"}
      data-session-artist={currentPkgRef.current?.artist || session?.audio.artist || "none"}
      data-session-album={currentPkgRef.current?.albumTitle || session?.audio.album || "none"}
    >
      <section className="square">
        <audio
          ref={audioRef}
          onEnded={stop}
          onError={(e) => addLog(`HTML Audio Error: ${e.currentTarget.error?.message || "playback error"}`, "error")}
        />

        {/* Header with Japanese Vinyl Metadata & Process Watcher Button */}
        <header>
          <div className="brand">
            <span className="pulse" />
            <span>VINYL SLEEVE ARCHIVE</span>
          </div>
          <div className="header-right">
            <div className="fps-badge" title="Real-time rendering frame rate">
              ⚡ {fps} FPS
            </div>
            <button
              type="button"
              className={`monitor-toggle-btn ${showMonitor ? "active" : ""}`}
              onClick={() => setShowMonitor(!showMonitor)}
              title="Toggle Live Process Watcher & Diagnostic Logs"
            >
              <span>{showMonitor ? "👁 HIDE MONITOR" : "⚡ WATCH PROCESS"}</span>
            </button>
            <div className="counter">
              {playing ? `${String(secondsRemaining).padStart(2, "0")}s · ${tempo} BPM` : `${tempo} BPM`}
            </div>
          </div>
        </header>





        {/* Live Process Watcher & Error Diagnostic Drawer */}
        {showMonitor && (
          <div className="process-monitor-panel">
            <div className="monitor-header">
              <div className="monitor-title">
                <span className="live-indicator" />
                LIVE PROCESS WATCHER & ASYNC MONITOR
                <button
                  className="copy-logs-btn"
                  onClick={() => {
                    const logText = logs.map(l => `[${l.time}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
                    navigator.clipboard.writeText(logText);
                    addLog("Logs copied to clipboard!", "success");
                  }}
                >
                  📋 COPY
                </button>
              </div>
              <div className="monitor-stats">
                <span>BEATS/SLEEVE: {beatsPerSleeve}</span>
                <span>SLEEVE TIME: {sleeveDurationSeconds.toFixed(1)}s</span>
                <span>STATUS: {loading ? "ASYNC FETCHING" : playing ? "STREAMING" : "IDLE"}</span>
              </div>
            </div>
            <div className="monitor-logs">
              {logs.map((log, idx) => (
                <div key={idx} className={`log-line log-${log.level}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-level">[{log.level.toUpperCase()}]</span>
                  <span className="log-msg">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage / Album Liner Canvas with Elegant Dual-Layer Ken Burns Motion */}
        <div className="stage">
          <div className={`sleeve-jacket ${playing ? "running" : ""}`}>
            {/* Obi Strip Accent - Rendered strictly when physical release has an Obi strip */}
            {currentPkgRef.current?.hasObi && (
              <div className="obi-strip">
                <span className="obi-text">日本盤 33⅓ RPM · STEREO</span>
                <span className="obi-badge">帯</span>
              </div>
            )}

            {/* Canvas Layers */}
            <div className="sleeve-canvas">
              {/* Layer A */}
              {layerA.sleeve && (
                <div className={`canvas-layer ${activeLayer === "A" ? "layer-visible" : "layer-hidden"}`}>
                  <img
                    src={layerA.sleeve.artwork}
                    alt={layerA.sleeve.album}
                    key={layerA.key}
                    className={`kenburns-element ${layerA.animClass}`}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    data-sleeve-id={layerA.sleeve.id}
                    data-package-id={layerA.sleeve.packageId}
                    data-artist={layerA.sleeve.artist}
                    data-artwork={layerA.sleeve.artwork}
                    style={{
                      animationDuration: animDuration,
                      animationPlayState: playing ? "running" : "paused"
                    }}
                    onError={(e) => {
                      addLog(`Image load failed, applying neutral vinyl sleeve placeholder`, "warn");
                      e.currentTarget.src = NEUTRAL_SLEEVE_PLACEHOLDER;
                    }}
                  />
                </div>
              )}

              {/* Layer B */}
              {layerB.sleeve && (
                <div className={`canvas-layer ${activeLayer === "B" ? "layer-visible" : "layer-hidden"}`}>
                  <img
                    src={layerB.sleeve.artwork}
                    alt={layerB.sleeve.album}
                    key={layerB.key}
                    className={`kenburns-element ${layerB.animClass}`}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    data-sleeve-id={layerB.sleeve.id}
                    data-package-id={layerB.sleeve.packageId}
                    data-artist={layerB.sleeve.artist}
                    data-artwork={layerB.sleeve.artwork}
                    style={{
                      animationDuration: animDuration,
                      animationPlayState: playing ? "running" : "paused"
                    }}
                    onError={(e) => {
                      addLog(`Image load failed, applying neutral vinyl sleeve placeholder`, "warn");
                      e.currentTarget.src = NEUTRAL_SLEEVE_PLACEHOLDER;
                    }}
                  />
                </div>
              )}


              {!layerA.sleeve && !layerB.sleeve && (
                <div className="placeholder">
                  <span>1080</span>
                  <small>JAPANESE INNER SLEEVES · 120+ SCANS</small>
                </div>
              )}

              {/* Film Grain, Analog Texture & Matte Vignette */}
              <div className="grain" />
              <div className="matte-vignette" />
              <div className="vinyl-sheen" />

              {/* Compact Floating Caption Bar (Unobscured Cover Art) */}
              {currentSleeve && (
                <div className="caption">
                  <div className="caption-info">
                    <p className="caption-artist">{currentSleeve.artist}</p>
                    <h1 className="caption-title">{currentSleeve.album}</h1>
                  </div>
                  <div className="caption-meta">
                    <span className="beat-badge">
                      BEAT {beatInMeasure}/{beatsPerSleeve} ({sleeveDurationSeconds.toFixed(1)}s / SLEEVE)
                    </span>
                    <span className="kenburns-tag">
                      MOTION: {currentMotionName}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Sleeve Pace & Ken Burns Repository Selector Bar */}
        <div className="config-bar">
          <div className="pace-selector">
            <span className="pace-label">SLEEVE PACE:</span>
            <div className="pace-buttons">
              {[2, 4, 8].map((beats) => (
                <button
                  key={beats}
                  type="button"
                  className={`pace-btn ${beatsPerSleeve === beats ? "active" : ""}`}
                  onClick={() => {
                    setBeatsPerSleeve(beats);
                    addLog(`Sleeve transition pace set to ${beats} beats (${(secondsPerBeat * beats).toFixed(1)}s per album)`, "info");
                  }}
                  title={`Show each album sleeve for ${beats} musical beats`}
                >
                  {beats === 2 ? "2 BEATS (FAST)" : beats === 4 ? "4 BEATS (1 MEASURE · RECOMMENDED)" : "8 BEATS (RELAXED)"}
                </button>
              ))}
            </div>
          </div>

          <div className="motion-pills">
            {KEN_BURNS_REPOSITORY.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`motion-pill ${selectedMotionPreset === preset.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedMotionPreset(preset.id);
                  addLog(`Ken Burns motion mode selected: ${preset.name}`, "info");
                }}
                title={preset.description}
              >
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Speed / Tempo Dictated by Apple Music Snippet */}
        <div className="tempo">
          <div className="tempo-header">
            <label htmlFor="tempo">TEMPO / SPEED CONTROL</label>
            <output>
              {tempo} BPM · 1 BEAT / {secondsPerBeat.toFixed(2)}s · {sleeveDurationSeconds.toFixed(1)}s / SLEEVE
              {session ? ` · NATIVE ${nativeBpm} BPM` : ""}
            </output>
          </div>
          <input
            id="tempo"
            type="range"
            min="45"
            max="110"
            value={tempo}
            onChange={(event) => setTempo(Number(event.target.value))}
          />
        </div>


        {/* Controls: Change Song + Play/Stop */}
        <div className="controls">
          <div className="genre">
            <span className="genre-label">NEW FOLK · SAD · SLOW</span>
            {session && (
              <span className="current-track-tag">
                {session.audio.artist} — &ldquo;{session.audio.title}&rdquo;
              </span>
            )}
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn change-song"
              onClick={changeSong}
              disabled={loading}
              title="Change to another song from the Japanese vinyl archive"
            >
              <span>🔀</span>
              <span>{loading ? "FETCHING…" : "CHANGE SONG"}</span>
            </button>
            <button
              type="button"
              className={`btn play ${playing ? "active" : ""}`}
              onClick={togglePlayPause}
              disabled={loading}
            >
              <span>{loading ? "…" : playing ? "⏸" : "▶"}</span>
              <span>{loading ? "LOADING" : playing ? "PAUSE" : "PLAY"}</span>
            </button>
            <button
              type="button"
              className="btn stop"
              onClick={stop}
              disabled={loading}
              title="Stop audio playback and reset to Japanese front cover"
            >
              <span>■</span>
              <span>STOP</span>
            </button>
          </div>

        </div>

        {error && <p className="error">{error}</p>}

        {/* Footer with Apple Music Link & Catalog Counter */}
        <footer>
          <span>
            {session ? (
              <a href={session.audio.appleUrl} target="_blank" rel="noreferrer">
                {session.audio.artist} — &ldquo;{session.audio.title}&rdquo; ({session.audio.album}) · VIEW ON APPLE MUSIC ↗
              </a>
            ) : (
              "APPLE MUSIC PREVIEWS · 1,480+ TRACKS · 120+ JAPANESE LINER SCANS"
            )}
          </span>
          <span>CAA JAPANESE ARCHIVE · ITUNES PREVIEWS</span>
        </footer>
      </section>
    </main>
  );
}
