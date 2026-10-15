"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Timer, 
  CheckSquare, 
  Users, 
  FileText, 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Download, 
  Sparkles, 
  Share2, 
  Flame, 
  Radio, 
  StickyNote, 
  ShieldCheck, 
  Edit3,
  Key,
  Globe,
  LogOut,
  Layers,
  Camera,
  Heart,
  Maximize2,
  X,
  MapPin,
  Sliders,
  Award,
  CheckCircle2,
  Database,
  Cloud
} from "lucide-react";

// Web Audio API Synthesizer for 100% reliable offline / local sound generation
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.8); // D6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.8);
  }
}

const audioEngine = typeof window !== "undefined" ? new AmbientAudioEngine() : null;

interface TaskItem {
  id: number;
  text: string;
  done: boolean;
  tag: string;
  priority: "urgent" | "normal" | "low";
  dueDate?: string;
  assignedTo?: string;
}

interface StickyNoteItem {
  id: number;
  author: string;
  content: string;
  color: "orange" | "blue" | "emerald" | "amber";
  date: string;
}

interface SpaceMoment {
  id: number;
  title: string;
  caption: string;
  image: string;
  author: string;
  timeAgo: string;
  likes: number;
  zoneTag: string;
}

interface Participant {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
  color: string;
  lastSeen: number;
}

interface StudyHistoryItem {
  id: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
}

export default function StudyHubPage() {
  const [activeTab, setActiveTab] = useState<"timer" | "tasks" | "collab" | "notes">("timer");

  // User Profile
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("Étudiant CTRL S");
  const [userRole, setUserRole] = useState("Faculté Dentaire Monastir");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // ROOM STATE & LOBBY SYSTEM
  const [inRoom, setInRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [roomDisplayName, setRoomDisplayName] = useState("");
  const [roomSectionView, setRoomSectionView] = useState<"notes" | "moments">("notes");

  // Lobby Creation Inputs
  const [createRoomNameInput, setCreateRoomNameInput] = useState("");
  const [createRoomCodeInput, setCreateRoomCodeInput] = useState("");
  const [joinRoomCodeInput, setJoinRoomCodeInput] = useState("");

  // Real-Time Room Data (Persistent Backend DB)
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteItem[]>([]);
  const [sharedTasks, setSharedTasks] = useState<TaskItem[]>([]);
  const [spaceMoments, setSpaceMoments] = useState<SpaceMoment[]>([]);
  const [shareLinkToast, setShareLinkToast] = useState(false);

  // New Moment Modal / Form
  const [isAddingMoment, setIsAddingMoment] = useState(false);
  const [newMomentTitle, setNewMomentTitle] = useState("");
  const [newMomentCaption, setNewMomentCaption] = useState("");
  const [newMomentImage, setNewMomentImage] = useState("");
  const [newMomentImageError, setNewMomentImageError] = useState("");
  const [newMomentZone, setNewMomentZone] = useState("The Lab");
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<SpaceMoment | null>(null);
  const [selectedMomentFile, setSelectedMomentFile] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [backendMode, setBackendMode] = useState<"cloud_supabase" | "local_storage" | "cloud_credentials_found">("local_storage");
  const [showBackendInfoModal, setShowBackendInfoModal] = useState(false);

  // Synced Group Timer
  const [isGroupTimerSync, setIsGroupTimerSync] = useState(false);

  // Timer State & Goals (Personal / Persistent Backend DB)
  const [timerMode, setTimerMode] = useState<"pomodoro" | "deep" | "shortBreak" | "longBreak">("pomodoro");
  const [durationSecs, setDurationSecs] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Real Statistics & Goals
  const [completedPoms, setCompletedPoms] = useState(0);
  const [focusTimeMinutes, setFocusTimeMinutes] = useState(0);
  const [dailyGoalCycles, setDailyGoalCycles] = useState(8);
  const [customFocusDuration, setCustomFocusDuration] = useState(25);
  const [customBreakDuration, setCustomBreakDuration] = useState(5);
  const [customLongBreakDuration, setCustomLongBreakDuration] = useState(15);
  const [studyHistory, setStudyHistory] = useState<StudyHistoryItem[]>([]);
  
  // Customization & Feedback Modals
  const [isCustomizingGoals, setIsCustomizingGoals] = useState(false);
  const [sessionSuccessToast, setSessionSuccessToast] = useState(false);
  const [resetStatsToast, setResetStatsToast] = useState(false);

  // Personal Tasks State (Persistent Backend DB)
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTag, setNewTaskTag] = useState("Examen");
  const [newTaskPriority, setNewTaskPriority] = useState<"urgent" | "normal" | "low">("normal");
  const [taskFilter, setTaskFilter] = useState<"all" | "active" | "completed">("all");

  // Sticky Notes Inputs
  const [newStickyText, setNewStickyText] = useState("");
  const [newStickyColor, setNewStickyColor] = useState<"orange" | "blue" | "emerald" | "amber">("orange");

  // Shared Task Inputs
  const [newSharedTaskTitle, setNewSharedTaskTitle] = useState("");

  // Notepad State
  const [notesContent, setNotesContent] = useState("");
  const [copyToast, setCopyToast] = useState(false);

  // Format MM:SS helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 1. Initialize Profile, Load Stats & Tasks from Backend
  useEffect(() => {
    try {
      let currentId = localStorage.getItem("ctrl_s_user_id");
      if (!currentId) {
        currentId = "user_" + Math.random().toString(36).substring(2, 9);
        localStorage.setItem("ctrl_s_user_id", currentId);
      }
      setUserId(currentId);

      const savedName = localStorage.getItem("ctrl_s_user_name");
      if (savedName) setUserName(savedName);

      const savedRole = localStorage.getItem("ctrl_s_user_role");
      if (savedRole) setUserRole(savedRole);

      const randomCode = "CTRL-" + Math.floor(1000 + Math.random() * 9000);
      setCreateRoomCodeInput(randomCode);

      // Fetch User Study Stats from Backend
      fetch(`/api/study-stats?userId=${encodeURIComponent(currentId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.stats) {
            setCompletedPoms(data.stats.completedPoms || 0);
            setFocusTimeMinutes(data.stats.focusTimeMinutes || 0);
            setDailyGoalCycles(data.stats.dailyGoalCycles || 8);
            setCustomFocusDuration(data.stats.customFocusDuration || 25);
            setCustomBreakDuration(data.stats.customBreakDuration || 5);
            setCustomLongBreakDuration(data.stats.customLongBreakDuration || 15);
            setStudyHistory(data.stats.history || []);
            setDurationSecs((data.stats.customFocusDuration || 25) * 60);
            setTimeLeft((data.stats.customFocusDuration || 25) * 60);
          }
        })
        .catch(() => {});

      // Fetch User Tasks from Backend
      fetch(`/api/tasks?userId=${encodeURIComponent(currentId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.tasks) {
            setTasks(data.tasks);
          } else {
            const savedTasks = localStorage.getItem("ctrl_s_saved_tasks");
            if (savedTasks) setTasks(JSON.parse(savedTasks));
          }
        })
        .catch(() => {
          const savedTasks = localStorage.getItem("ctrl_s_saved_tasks");
          if (savedTasks) setTasks(JSON.parse(savedTasks));
        });

      // Check URL Room Params
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const urlRoom = urlParams.get("room");
        if (urlRoom) {
          const formatted = urlRoom.toUpperCase();
          setRoomCode(formatted);
          setRoomDisplayName(formatted === "PUBLIC" ? "Salon Public Général CTRL S" : formatted);
          setInRoom(true);
          setActiveTab("collab");
        }
      }

      // Check Backend Database Status
      fetch("/api/backend-status")
        .then((r) => r.json())
        .then((d) => {
          if (d.mode) setBackendMode(d.mode);
        })
        .catch(() => {});

      const savedNotes = localStorage.getItem("ctrl_s_scratchpad");
      if (savedNotes) {
        setNotesContent(savedNotes);
      } else {
        setNotesContent(
          "# CTRL S - Bloc-Notes & Objectifs de Séance\n\n" +
          "Bienvenue dans votre espace focus à Monastir !\n\n" +
          "• Objectif 1 : Terminer la révision des QCMs.\n" +
          "• Objectif 2 : Valider le code du projet.\n" +
          "• Rappel : Pause café de 10 min après 2 cycles Pomodoro.\n\n" +
          "\"Save Your Progress\" — CTRL S"
        );
      }
    } catch {}
  }, []);

  // Save personal notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ctrl_s_scratchpad", notesContent);
    } catch {}
  }, [notesContent]);

  // Save tasks cache to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ctrl_s_saved_tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // 2. REAL-TIME ROOM SYNC ENGINE (Persistent Backend)
  const syncWithRoomServer = useCallback(async (action?: string, payload?: unknown) => {
    if (!inRoom || !roomCode) return;
    try {
      const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";

      if (action) {
        const res = await fetch(`/api/rooms/${encodeURIComponent(roomCode)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, payload })
        });
        if (res.ok) {
          const data = await res.json();
          setParticipants(data.participants || []);
          setStickyNotes(data.stickyNotes || []);
          setSharedTasks(data.sharedTasks || []);
          setSpaceMoments(data.spaceMoments || []);
          if (data.roomName) setRoomDisplayName(data.roomName);
        }
      } else {
        // Heartbeat ping
        const res = await fetch(`/api/rooms/${encodeURIComponent(roomCode)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "heartbeat",
            payload: {
              id: activeUserId,
              name: userName,
              role: userRole,
              status: isTimerActive ? `Focus (${formatTime(timeLeft)})` : "En ligne",
              avatar: userName.substring(0, 2).toUpperCase() || "CS",
              color: "bg-brand-orange"
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          setParticipants(data.participants || []);
          setStickyNotes(data.stickyNotes || []);
          setSharedTasks(data.sharedTasks || []);
          setSpaceMoments(data.spaceMoments || []);
          if (data.roomName) setRoomDisplayName(data.roomName);

          // Synchronized group timer
          if (isGroupTimerSync && data.syncedTimer) {
            if (data.syncedTimer.updatedBy !== userName) {
              setIsTimerActive(data.syncedTimer.isRunning);
              setTimeLeft(data.syncedTimer.timeLeft);
              setDurationSecs(data.syncedTimer.durationSecs);
            }
          }
        }
      }
    } catch {}
  }, [inRoom, roomCode, userId, userName, userRole, isTimerActive, timeLeft, isGroupTimerSync]);

  // Real-Time Polling Loop (every 2.5s)
  useEffect(() => {
    if (!inRoom) return;
    syncWithRoomServer();
    const interval = setInterval(() => {
      syncWithRoomServer();
    }, 2500);
    return () => clearInterval(interval);
  }, [inRoom, syncWithRoomServer]);

  // 3. Local & Synced Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerActive && timeLeft === 0) {
      setIsTimerActive(false);

      // Play audio chime
      if (audioEngine) {
        audioEngine.playChime();
      }

      if (timerMode === "pomodoro" || timerMode === "deep") {
        const sessionMins = Math.round(durationSecs / 60);

        // Optimistic UI updates
        setCompletedPoms((c) => c + 1);
        setFocusTimeMinutes((m) => m + sessionMins);
        setSessionSuccessToast(true);
        setTimeout(() => setSessionSuccessToast(false), 5000);

        // Record session to backend database
        const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
        fetch("/api/study-stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "record_session",
            userId: activeUserId,
            payload: {
              mode: timerMode,
              durationMinutes: sessionMins,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.stats) {
              setCompletedPoms(data.stats.completedPoms);
              setFocusTimeMinutes(data.stats.focusTimeMinutes);
              setStudyHistory(data.stats.history || []);
            }
          })
          .catch(() => {});
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, durationSecs, timerMode, userId]);

  // Timer Preset Change
  const setTimerPreset = (mode: "pomodoro" | "deep" | "shortBreak" | "longBreak") => {
    setTimerMode(mode);
    setIsTimerActive(false);
    let seconds = 25 * 60;
    if (mode === "pomodoro") seconds = customFocusDuration * 60;
    if (mode === "deep") seconds = 50 * 60;
    if (mode === "shortBreak") seconds = customBreakDuration * 60;
    if (mode === "longBreak") seconds = customLongBreakDuration * 60;
    setDurationSecs(seconds);
    setTimeLeft(seconds);

    if (isGroupTimerSync && inRoom) {
      syncWithRoomServer("sync_timer", {
        isRunning: false,
        mode,
        timeLeft: seconds,
        durationSecs: seconds,
        updatedBy: userName
      });
    }
  };

  const toggleTimerState = () => {
    const nextState = !isTimerActive;
    setIsTimerActive(nextState);

    if (isGroupTimerSync && inRoom) {
      syncWithRoomServer("sync_timer", {
        isRunning: nextState,
        mode: timerMode,
        timeLeft,
        durationSecs,
        updatedBy: userName
      });
    }
  };

  // Save Customized Goal Settings to Backend DB
  const saveGoalSettings = async () => {
    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
    try {
      const res = await fetch("/api/study-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_goals",
          userId: activeUserId,
          payload: {
            dailyGoalCycles,
            customFocusDuration,
            customBreakDuration,
            customLongBreakDuration,
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setDailyGoalCycles(data.stats.dailyGoalCycles);
          setCustomFocusDuration(data.stats.customFocusDuration);
          setCustomBreakDuration(data.stats.customBreakDuration);
          setCustomLongBreakDuration(data.stats.customLongBreakDuration);
          if (timerMode === "pomodoro") {
            setDurationSecs(data.stats.customFocusDuration * 60);
            setTimeLeft(data.stats.customFocusDuration * 60);
          }
        }
      }
    } catch {}
    setIsCustomizingGoals(false);
  };

  // Reset Today's Pomodoro Stats in Backend DB
  const handleResetTodayStats = async () => {
    if (!confirm("Voulez-vous réinitialiser vos cycles et temps focus pour aujourd'hui ?")) {
      return;
    }
    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
    try {
      const res = await fetch("/api/study-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_today",
          userId: activeUserId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setCompletedPoms(data.stats.completedPoms);
          setFocusTimeMinutes(data.stats.focusTimeMinutes);
        }
      }
    } catch {
      setCompletedPoms(0);
      setFocusTimeMinutes(0);
    }
    setResetStatsToast(true);
    setTimeout(() => setResetStatsToast(false), 3000);
  };

  // ROOM ACTIONS: CREATE / JOIN / LEAVE (With Browser URL Sync)
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = (createRoomCodeInput.trim() || "CTRL-" + Math.floor(1000 + Math.random() * 9000)).toUpperCase();
    const displayName = createRoomNameInput.trim() || finalCode;

    setRoomCode(finalCode);
    setRoomDisplayName(displayName);
    setInRoom(true);

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/hub?room=${encodeURIComponent(finalCode)}`);
    }

    fetch(`/api/rooms/${encodeURIComponent(finalCode)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "set_room_name",
        payload: { name: displayName },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.participants) setParticipants(data.participants);
        if (data.stickyNotes) setStickyNotes(data.stickyNotes);
        if (data.sharedTasks) setSharedTasks(data.sharedTasks);
        if (data.spaceMoments) setSpaceMoments(data.spaceMoments);
      })
      .catch(() => {});
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinRoomCodeInput.trim()) return;
    const finalCode = joinRoomCodeInput.trim().toUpperCase();
    setRoomCode(finalCode);
    setRoomDisplayName(finalCode);
    setInRoom(true);
    setJoinRoomCodeInput("");

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/hub?room=${encodeURIComponent(finalCode)}`);
    }

    fetch(`/api/rooms/${encodeURIComponent(finalCode)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.participants) setParticipants(data.participants);
        if (data.stickyNotes) setStickyNotes(data.stickyNotes);
        if (data.sharedTasks) setSharedTasks(data.sharedTasks);
        if (data.spaceMoments) setSpaceMoments(data.spaceMoments);
        if (data.roomName) setRoomDisplayName(data.roomName);
      })
      .catch(() => {});
  };

  const handleJoinPublicLounge = () => {
    const finalCode = "PUBLIC";
    setRoomCode(finalCode);
    setRoomDisplayName("Salon Public Général CTRL S");
    setRoomSectionView("moments");
    setInRoom(true);

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/hub?room=PUBLIC`);
    }

    fetch(`/api/rooms/PUBLIC`)
      .then((res) => res.json())
      .then((data) => {
        if (data.participants) setParticipants(data.participants);
        if (data.stickyNotes) setStickyNotes(data.stickyNotes);
        if (data.sharedTasks) setSharedTasks(data.sharedTasks);
        if (data.spaceMoments) setSpaceMoments(data.spaceMoments);
      })
      .catch(() => {});
  };

  const handleLeaveRoom = () => {
    if (roomCode) {
      const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
      fetch(`/api/rooms/${encodeURIComponent(roomCode)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "leave_room",
          payload: { id: activeUserId },
        }),
      }).catch(() => {});
    }

    setInRoom(false);
    setRoomCode("");
    setRoomDisplayName("");
    setParticipants([]);
    setStickyNotes([]);
    setSharedTasks([]);
    setSpaceMoments([]);
    setIsGroupTimerSync(false);

    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/hub");
    }
  };

  // Real-Time Sticky Notes Actions
  const addStickyNoteRealtime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;

    syncWithRoomServer("add_note", {
      author: userName || "Coworker",
      content: newStickyText.trim(),
      color: newStickyColor
    });

    setNewStickyText("");
  };

  const deleteStickyNoteRealtime = (id: number) => {
    syncWithRoomServer("delete_note", { id });
  };

  // Real-Time Moments & Souvenirs Actions
  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1400;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        } else {
          resolve(img.src);
        }
      };
      img.onerror = () => resolve("");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  const handleAddMoment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMomentTitle.trim()) {
      setNewMomentImageError("Veuillez donner un titre à la photo.");
      return;
    }
    if (!selectedMomentFile && !newMomentImage) {
      setNewMomentImageError("Veuillez sélectionner une photo.");
      return;
    }

    setIsUploadingPhoto(true);
    setNewMomentImageError("");

    try {
      let finalImageUrl = newMomentImage;

      if (selectedMomentFile) {
        // Compress client-side before sending
        const compressedDataUrl = await compressImage(selectedMomentFile);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataUrl: compressedDataUrl,
            customName: newMomentTitle.trim().toLowerCase().replace(/[^a-z0-9]/g, "-"),
          }),
        });

        if (!res.ok) {
          throw new Error("Erreur de téléversement vers le serveur.");
        }

        const data = await res.json();
        if (!data.success || !data.url) {
          throw new Error(data.error || "Échec de l'enregistrement de l'image.");
        }
        finalImageUrl = data.url;
      }

      await syncWithRoomServer("add_moment", {
        title: newMomentTitle.trim(),
        caption: newMomentCaption.trim(),
        image: finalImageUrl,
        author: userName || "Coworker CTRL S",
        zoneTag: newMomentZone,
      });

      setNewMomentTitle("");
      setNewMomentCaption("");
      setNewMomentImage("");
      setSelectedMomentFile(null);
      setIsAddingMoment(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de téléversement.";
      setNewMomentImageError(msg);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleMomentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setNewMomentImageError("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNewMomentImageError("Choisissez un fichier image (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setNewMomentImageError("L'image d'origine doit faire 12 Mo maximum.");
      return;
    }

    setSelectedMomentFile(file);
    const previewUrl = URL.createObjectURL(file);
    setNewMomentImage(previewUrl);
  };

  const handleLikeMoment = (id: number) => {
    syncWithRoomServer("like_moment", { id });
  };

  const handleDeleteMoment = (id: number) => {
    if (confirm("Supprimer cette photo du salon ?")) {
      syncWithRoomServer("delete_moment", { id });
      if (selectedLightboxImage && selectedLightboxImage.id === id) {
        setSelectedLightboxImage(null);
      }
    }
  };

  // Real-Time Shared Tasks Actions
  const addSharedTaskRealtime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSharedTaskTitle.trim()) return;

    syncWithRoomServer("add_shared_task", {
      text: newSharedTaskTitle.trim(),
      tag: "Groupe",
      priority: "normal",
      assignedTo: userName
    });

    setNewSharedTaskTitle("");
  };

  const toggleSharedTaskRealtime = (id: number) => {
    syncWithRoomServer("toggle_shared_task", { id });
  };

  const deleteSharedTaskRealtime = (id: number) => {
    syncWithRoomServer("delete_shared_task", { id });
  };

  const copyRoomInviteLink = () => {
    const url = `${window.location.origin}/hub?room=${encodeURIComponent(roomCode)}`;
    navigator.clipboard.writeText(url);
    setShareLinkToast(true);
    setTimeout(() => setShareLinkToast(false), 2500);
  };

  // 4. PERSONAL TASKS ACTIONS (Persistent Backend DB)
  const addPersonalTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const taskText = newTaskTitle.trim();
    const taskTag = newTaskTag;
    const taskPriority = newTaskPriority;
    setNewTaskTitle("");

    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";

    // Optimistic local update
    const tempTask: TaskItem = {
      id: Date.now(),
      text: taskText,
      done: false,
      tag: taskTag,
      priority: taskPriority,
    };
    setTasks((prev) => [tempTask, ...prev]);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_task",
          userId: activeUserId,
          payload: {
            text: taskText,
            tag: taskTag,
            priority: taskPriority,
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tasks) setTasks(data.tasks);
      }
    } catch {}
  };

  const togglePersonalTaskDone = async (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_task",
          userId: activeUserId,
          payload: { id },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tasks) setTasks(data.tasks);
      }
    } catch {}
  };

  const deletePersonalTask = async (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_task",
          userId: activeUserId,
          payload: { id },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tasks) setTasks(data.tasks);
      }
    } catch {}
  };

  const clearCompletedPersonalTasks = async () => {
    setTasks((prev) => prev.filter((t) => !t.done));

    const activeUserId = userId || localStorage.getItem("ctrl_s_user_id") || "anonymous";
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "clear_completed",
          userId: activeUserId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tasks) setTasks(data.tasks);
      }
    } catch {}
  };

  const copyNotesToClipboard = () => {
    navigator.clipboard.writeText(notesContent);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  const downloadNotesFile = () => {
    const element = document.createElement("a");
    const file = new Blob([notesContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `CTRL_S_Notes_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const saveUserProfile = () => {
    localStorage.setItem("ctrl_s_user_name", userName);
    localStorage.setItem("ctrl_s_user_role", userRole);
    setIsEditingProfile(false);
    if (inRoom) syncWithRoomServer();
  };

  const progressPercent = durationSecs > 0 ? ((durationSecs - timeLeft) / durationSecs) * 100 : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const filteredPersonalTasks = tasks.filter((t) => {
    if (taskFilter === "active") return !t.done;
    if (taskFilter === "completed") return t.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col selection:bg-brand-orange selection:text-white font-sans">
      
      {/* Toast Notifications */}
      <AnimatePresence>
        {sessionSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 font-lemon-milk text-xs uppercase"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <div>
              <span className="font-bold block">Session Terminée !</span>
              <span className="text-[10px] font-normal lowercase tracking-normal">Progression sauvegardée en base de données</span>
            </div>
          </motion.div>
        )}
        {resetStatsToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-brand-orange text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-orange-400 font-lemon-milk text-xs uppercase"
          >
            <RotateCcw className="w-5 h-5 text-white" />
            <span>Statistiques du jour réinitialisées</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0e17]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk"
          >
            <ArrowLeft className="w-4 h-4 text-brand-orange" />
            <span className="hidden sm:inline">Retour Accueil</span>
          </Link>

          <div className="flex items-center gap-3 border-l border-white/15 pl-4 sm:pl-6">
            <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-white p-0.5 shrink-0 shadow-md">
              <Image
                src="/assets/logo-2-colors-transparent.png"
                alt="CTRL S"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-xs font-bold uppercase tracking-widest text-white font-lemon-milk">
                CTRL S STUDY HUB
              </span>
              <span className="text-[10px] text-brand-orange font-semibold tracking-wider uppercase mt-0.5">
                Save Your Progress
              </span>
            </div>
          </div>
        </div>

        {/* Live Multi-Device Synchronization HUD */}
        <div className="flex items-center gap-3 sm:gap-5">
          {inRoom ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-lemon-milk uppercase tracking-wider text-[11px] text-emerald-400">
                Salle : #{roomCode}
              </span>
              <span className="hidden sm:inline text-[10px] text-white/80 font-bold bg-white/10 px-2 py-0.5 rounded-full">
                {participants.length || 1} connecté{participants.length > 1 ? "s" : ""}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
              <Layers className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-[11px] font-lemon-milk uppercase">Mode Personnel</span>
            </div>
          )}

          {/* Cloud Database Status Pill */}
          <button
            onClick={() => setShowBackendInfoModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer font-lemon-milk uppercase tracking-wider ${
              backendMode === "cloud_supabase"
                ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                : "bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25"
            }`}
            title="Statut de la base de données et du backend multi-ordinateurs"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">
              {backendMode === "cloud_supabase" ? "Cloud DB Actif" : "Sync Multi-PC (Setup)"}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                backendMode === "cloud_supabase" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
              }`}
            />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-white transition-all cursor-pointer font-lemon-milk"
            >
              <div className="w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                {userName.substring(0, 1).toUpperCase()}
              </div>
              <span className="hidden md:inline max-w-[120px] truncate">{userName}</span>
              <Edit3 className="w-3 h-3 text-white/60" />
            </button>

            {/* Profile Edit Popover */}
            <AnimatePresence>
              {isEditingProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-11 w-72 bg-[#101624] border border-white/20 rounded-2xl p-4 shadow-2xl z-50 text-left space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk block">
                    Votre Profil Coworker
                  </span>
                  <div>
                    <label className="text-[10px] uppercase text-white/60 font-lemon-milk block mb-1">Votre Nom / Pseudo</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-white/60 font-lemon-milk block mb-1">Votre Faculté / Spécialité</label>
                    <input
                      type="text"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <button
                    onClick={saveUserProfile}
                    className="w-full py-2 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase font-lemon-milk cursor-pointer shadow-md hover:bg-brand-orange/90"
                  >
                    Sauvegarder
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-grow gap-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          <div className="flex items-center gap-2">
            {[
              { id: "timer", label: "Pomodoro & Focus", icon: Timer },
              { id: "tasks", label: "To-Do & Objectifs", icon: CheckSquare },
              { 
                id: "collab", 
                label: inRoom ? `Salle : #${roomCode}` : "Mode Collab & Salles", 
                icon: Users, 
                badge: inRoom ? `${participants.length || 1} en direct` : undefined 
              },
              { id: "notes", label: "Bloc-Notes Rapide", icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 font-lemon-milk ${
                    isActive
                      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-[1.02]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {inRoom && (
            <button
              onClick={copyRoomInviteLink}
              className="hidden sm:flex items-center gap-2 text-xs text-brand-orange bg-brand-orange/10 hover:bg-brand-orange hover:text-white border border-brand-orange/30 px-3.5 py-1.5 rounded-full font-lemon-milk uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareLinkToast ? "Lien Copié !" : "Inviter un Ordinateur"}</span>
            </button>
          )}
        </div>

        {/* TAB 1: POMODORO & FOCUS TIMER (CUSTOMIZABLE WITH REAL STATS) */}
        {activeTab === "timer" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Main Timer Display */}
            <div className="lg:col-span-7 bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
              <div className="absolute w-72 h-72 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />

              {/* Mode Presets */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8 z-10">
                {[
                  { key: "pomodoro", label: `Pomodoro ${customFocusDuration}m` },
                  { key: "deep", label: "Deep Work 50m" },
                  { key: "shortBreak", label: `Pause ${customBreakDuration}m` },
                  { key: "longBreak", label: `Pause ${customLongBreakDuration}m` },
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setTimerPreset(p.key as typeof timerMode)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-lemon-milk ${
                      timerMode === p.key
                        ? "bg-brand-orange text-white shadow-md"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* SVG Circular Progress Ring */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center z-10 my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
                  <circle
                    cx="140"
                    cy="140"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="140"
                    cy="140"
                    r={radius}
                    stroke="#C46340"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>

                {/* Digital Clock in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl sm:text-7xl font-extrabold tracking-tight font-mono text-white drop-shadow-lg">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-brand-orange font-bold font-lemon-milk mt-2">
                    {isTimerActive ? "Session en Cours" : "En Pause"}
                  </span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center gap-4 mt-8 z-10">
                <button
                  onClick={toggleTimerState}
                  className={`flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xl font-lemon-milk ${
                    isTimerActive
                      ? "bg-amber-500 hover:bg-amber-600 text-black"
                      : "bg-brand-orange hover:bg-brand-orange/90 text-white hover:scale-105"
                  }`}
                >
                  {isTimerActive ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Démarrer</>}
                </button>

                <button
                  onClick={() => {
                    setIsTimerActive(false);
                    setTimeLeft(durationSecs);
                  }}
                  className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Réinitialiser le chrono"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Real-Time Sync Toggle */}
              {inRoom && (
                <div className="mt-6 z-10">
                  <button
                    onClick={() => setIsGroupTimerSync(!isGroupTimerSync)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer font-lemon-milk ${
                      isGroupTimerSync
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-white/5 text-white/50 border border-white/10 hover:text-white"
                    }`}
                  >
                    <Radio className={`w-3.5 h-3.5 ${isGroupTimerSync ? "animate-pulse" : ""}`} />
                    <span>{isGroupTimerSync ? "Timer Synchronisé avec la Salle (Actif)" : "Synchroniser le Timer avec la Salle"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Side Metrics & Personalized Goals Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-2">
                    <Flame className="w-4 h-4 text-brand-orange" />
                    Statistiques de la Session
                  </h3>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsCustomizingGoals(true)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white text-white/70 text-[10px] font-lemon-milk uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Personnaliser les objectifs et durées"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Personnaliser</span>
                    </button>

                    <button
                      onClick={handleResetTodayStats}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                      title="Remettre les statistiques du jour à zéro"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Real Tracked Numbers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <span className="text-[11px] text-white/60 uppercase font-lemon-milk block mb-1">Cycles Réalisés</span>
                    <span className="text-3xl font-extrabold text-brand-orange font-mono">{completedPoms}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <span className="text-[11px] text-white/60 uppercase font-lemon-milk block mb-1">Temps Total Focus</span>
                    <span className="text-3xl font-extrabold text-brand-blue font-mono">{focusTimeMinutes}m</span>
                  </div>
                </div>

                {/* Personalized Daily Goal Progress */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/80 mb-2 font-medium">
                    <span>Objectif Quotidien ({dailyGoalCycles} cycles)</span>
                    <span className="font-bold text-brand-orange">
                      {Math.min(100, Math.round((completedPoms / dailyGoalCycles) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-orange to-amber-400 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(100, (completedPoms / dailyGoalCycles) * 100)}%` }}
                    />
                  </div>
                  {completedPoms >= dailyGoalCycles && (
                    <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-lemon-milk uppercase flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Objectif du jour accompli ! Bravo !</span>
                    </div>
                  )}
                </div>

                {/* Recent Completed Sessions Today */}
                {studyHistory.length > 0 && (
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] text-white/50 uppercase font-lemon-milk block mb-2">
                      Sessions Validées Aujourd&apos;hui ({studyHistory.length})
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {studyHistory.slice(0, 5).map((h) => (
                        <div key={h.id} className="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-white/5 text-white/80">
                          <span className="font-mono text-brand-orange">+{h.durationMinutes} min</span>
                          <span className="capitalize text-white/60 text-[11px]">{h.mode}</span>
                          <span className="text-[10px] text-white/40">{h.completedAt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Study Tip Box */}
              <div className="bg-gradient-to-br from-brand-blue/20 to-brand-orange/10 border border-brand-blue/30 rounded-3xl p-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Conseil Révision CTRL S
                </span>
                <h4 className="text-sm font-semibold text-white">Méthode Focus Adaptée aux Examens</h4>
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  Travaillez {customFocusDuration} minutes complètes sans notification ni distraction. Accordez-vous ensuite {customBreakDuration} minutes de pause active ou un café pour recharger votre mémoire de travail.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* GOALS CUSTOMIZATION MODAL */}
        <AnimatePresence>
          {isCustomizingGoals && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
            >
              <div className="max-w-md w-full bg-[#101624] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
                <button
                  onClick={() => setIsCustomizingGoals(false)}
                  className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk block mb-1">
                    Paramètres Personnalisés
                  </span>
                  <h3 className="text-lg font-bold uppercase text-white font-lemon-milk">
                    Ajuster vos Objectifs & Durées
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-1">
                    Personnalisez votre rythme de révision selon vos besoins d&apos;examen.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-lemon-milk uppercase text-white/80 block mb-1.5">
                      Objectif Quotidien (Nombre de Cycles)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[4, 6, 8, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setDailyGoalCycles(num)}
                          className={`py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                            dailyGoalCycles === num
                              ? "bg-brand-orange text-white ring-2 ring-white/50"
                              : "bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {num} cycles
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-lemon-milk uppercase text-white/80 block mb-1.5">
                      Durée Session Focus Pomodoro (Minutes)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[20, 25, 30, 45].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setCustomFocusDuration(mins)}
                          className={`py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                            customFocusDuration === mins
                              ? "bg-brand-orange text-white ring-2 ring-white/50"
                              : "bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {mins} min
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-lemon-milk uppercase text-white/70 block mb-1">
                        Pause Courte (min)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={customBreakDuration}
                        onChange={(e) => setCustomBreakDuration(Number(e.target.value) || 5)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-lemon-milk uppercase text-white/70 block mb-1">
                        Pause Longue (min)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={customLongBreakDuration}
                        onChange={(e) => setCustomLongBreakDuration(Number(e.target.value) || 15)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsCustomizingGoals(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-lemon-milk uppercase cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={saveGoalSettings}
                    className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold font-lemon-milk uppercase cursor-pointer shadow-md"
                  >
                    Sauvegarder en Base
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 2: TO-DO LIST & TASK MATRIX (PERSISTENT BACKEND DATABASE) */}
        {activeTab === "tasks" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Task List */}
            <div className="lg:col-span-8 bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk">
                    Vos Tâches & Objectifs de Révision
                  </h3>
                  <p className="text-xs text-white/60 font-light">
                    Sauvegardé de façon permanente dans votre base de données.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  {(["all", "active", "completed"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTaskFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors font-lemon-milk cursor-pointer ${
                        taskFilter === filter
                          ? "bg-brand-orange text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {filter === "all" ? "Toutes" : filter === "active" ? "En cours" : "Terminées"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Task Form */}
              <form onSubmit={addPersonalTask} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Nouvel objectif (ex: Fiches anatomie dentaire, TP code, QCM)..."
                  className="flex-grow px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-orange text-sm text-white placeholder:text-white/40"
                />

                <select
                  value={newTaskTag}
                  onChange={(e) => setNewTaskTag(e.target.value)}
                  className="px-3 py-3 rounded-2xl bg-[#1a2335] border border-white/10 text-xs text-white uppercase font-lemon-milk cursor-pointer"
                >
                  <option value="Examen">Examen</option>
                  <option value="Projet">Projet</option>
                  <option value="Code">Code</option>
                  <option value="Révision">Révision</option>
                  <option value="Perso">Perso</option>
                </select>

                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "urgent" | "normal" | "low")}
                  className="px-3 py-3 rounded-2xl bg-[#1a2335] border border-white/10 text-xs text-white uppercase font-lemon-milk cursor-pointer"
                >
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                  <option value="low">Basse</option>
                </select>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </form>

              {/* Task Items List */}
              <div className="space-y-3 pt-2">
                {filteredPersonalTasks.length === 0 ? (
                  <div className="text-center py-12 text-white/50 text-xs font-light">
                    Aucune tâche dans cette catégorie. Ajoutez vos objectifs ci-dessus !
                  </div>
                ) : (
                  filteredPersonalTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        task.done
                          ? "bg-white/[0.02] border-white/5 text-white/40"
                          : "bg-white/5 border-white/10 hover:border-brand-orange/50 text-white"
                      }`}
                    >
                      <div
                        onClick={() => togglePersonalTaskDone(task.id)}
                        className="flex items-center gap-3.5 cursor-pointer select-none flex-grow"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                            task.done
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-white/30 bg-white/5 hover:border-brand-orange"
                          }`}
                        >
                          {task.done && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>

                        <div className="flex flex-col">
                          <span className={`text-sm ${task.done ? "line-through text-white/50" : "font-medium"}`}>
                            {task.text}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border font-lemon-milk ${
                          task.priority === "urgent"
                            ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                            : task.priority === "low"
                            ? "bg-white/10 text-white/60 border-white/10"
                            : "bg-brand-blue/20 text-brand-blue border-brand-blue/30"
                        }`}>
                          {task.tag}
                        </span>
                        <button
                          onClick={() => deletePersonalTask(task.id)}
                          className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                          title="Supprimer la tâche"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Clear Completed Button */}
              {tasks.some((t) => t.done) && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={clearCompletedPersonalTasks}
                    className="text-xs text-white/50 hover:text-red-400 font-lemon-milk uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vider les objectifs terminés</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Progress Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk">
                  Progression des Objectifs
                </h4>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {tasks.filter((t) => t.done).length} / {tasks.length}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {tasks.length > 0 ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0}% terminé
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-orange to-emerald-400 transition-all duration-500 rounded-full"
                    style={{
                      width: `${tasks.length > 0 ? (tasks.filter((t) => t.done).length / tasks.length) * 100 : 0}%`
                    }}
                  />
                </div>

                <p className="text-xs text-white/60 font-light pt-2 leading-relaxed">
                  Chaque objectif complété est sauvegardé sur votre compte et contribue à votre concentration globale.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: COLLAB ROOMS (LOBBY OR ACTIVE ROOM - PERSISTENT DB BACKEND) */}
        {activeTab === "collab" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {/* 1. LOBBY VIEW */}
            {!inRoom ? (
              <div className="max-w-4xl mx-auto space-y-8 py-4">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider font-lemon-milk">
                    <Users className="w-4 h-4" />
                    Salles d&apos;Étude & Travail Collaboratif
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white font-lemon-milk">
                    Rejoindre ou Créer une Salle
                  </h2>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Étudiez en direct sur plusieurs ordinateurs avec vos camarades. Synchronisez vos mémos, tâches partagées et immortalisez vos instants souvenirs dans le space.
                  </p>
                </div>

                {/* 3 Entry Choice Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Create New Private Room */}
                  <div className="bg-[#101624] border border-brand-orange/30 hover:border-brand-orange rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center">
                        <Plus className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk">
                        Créer une Salle
                      </h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed">
                        Créez un espace de travail vierge pour votre groupe d&apos;étude avec un code privé.
                      </p>

                      <form onSubmit={handleCreateRoom} className="space-y-3 pt-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                            Nom du Groupe / Salle
                          </label>
                          <input
                            type="text"
                            value={createRoomNameInput}
                            onChange={(e) => setCreateRoomNameInput(e.target.value)}
                            placeholder="ex: Révision Dentaire 3"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                            Code de la Salle
                          </label>
                          <input
                            type="text"
                            value={createRoomCodeInput}
                            onChange={(e) => setCreateRoomCodeInput(e.target.value)}
                            placeholder="ex: CTRL-7821"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 uppercase font-mono font-bold"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk transition-all cursor-pointer shadow-lg shadow-brand-orange/20 mt-2"
                        >
                          Créer ma Salle
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Card 2: Join Existing Room with Code */}
                  <div className="bg-[#101624] border border-brand-blue/30 hover:border-brand-blue rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue flex items-center justify-center">
                        <Key className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk">
                        Rejoindre avec Code
                      </h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed">
                        Entrez le code partagé par un camarade pour rejoindre sa session en direct.
                      </p>

                      <form onSubmit={handleJoinRoom} className="space-y-3 pt-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                            Code de la Salle
                          </label>
                          <input
                            type="text"
                            value={joinRoomCodeInput}
                            onChange={(e) => setJoinRoomCodeInput(e.target.value)}
                            placeholder="ex: CTRL-7821"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 uppercase font-mono font-bold focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk transition-all cursor-pointer shadow-lg shadow-brand-blue/20 mt-8"
                        >
                          Rejoindre la Session
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Card 3: Public Lounge */}
                  <div className="bg-[#101624] border border-white/10 hover:border-emerald-400/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk">
                        Salon Public CTRL S
                      </h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed">
                        Rejoignez l&apos;espace ouvert général et découvrez le <strong>Mur des Instants & Souvenirs du Space</strong>.
                      </p>
                    </div>

                    <button
                      onClick={handleJoinPublicLounge}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      Entrer dans le Salon Public
                    </button>
                  </div>

                </div>
              </div>
            ) : (
              /* 2. ACTIVE ROOM VIEW */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Switchable Views (Post-its vs Instants & Souvenirs) */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                  
                  {/* Room Navigation Banner */}
                  <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-lemon-milk">
                          Session En Ligne Active (Sauvegardée en Base)
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-3">
                        <span>{roomDisplayName || `#${roomCode}`}</span>
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-mono text-white/70 bg-white/10 px-2.5 py-1 rounded-lg">
                          Code : #{roomCode}
                        </span>
                        <button
                          onClick={copyRoomInviteLink}
                          className="text-xs text-brand-orange hover:text-white flex items-center gap-1 font-lemon-milk uppercase transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{shareLinkToast ? "Copié !" : "Copier le Lien"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Exit Room Button */}
                    <button
                      onClick={handleLeaveRoom}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk transition-colors cursor-pointer shrink-0"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Changer de Salle</span>
                    </button>
                  </div>

                  {/* Room Sub-View Switcher: Mémos vs Instants Souvenirs */}
                  <div className="flex items-center gap-2 bg-[#101624] p-1.5 rounded-2xl border border-white/10 w-fit">
                    <button
                      onClick={() => setRoomSectionView("notes")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                        roomSectionView === "notes"
                          ? "bg-brand-orange text-white shadow-md"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <StickyNote className="w-3.5 h-3.5" />
                      <span>Mémos & Tâches de Groupe</span>
                    </button>

                    <button
                      onClick={() => setRoomSectionView("moments")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-lemon-milk cursor-pointer ${
                        roomSectionView === "moments"
                          ? "bg-brand-orange text-white shadow-md"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Instants & Souvenirs du Space</span>
                      {spaceMoments.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                          {spaceMoments.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* VIEW 1: MÉMOS & SHARED TASKS */}
                  {roomSectionView === "notes" && (
                    <>
                      {/* Shared Group Tasks */}
                      <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div>
                            <h3 className="text-base font-bold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-brand-orange" />
                              Objectifs Communs de la Salle
                            </h3>
                            <p className="text-xs text-white/60 font-light">
                              Synchronisé en direct sur tous les ordinateurs connectés.
                            </p>
                          </div>
                          <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                            {sharedTasks.filter((t) => t.done).length} / {sharedTasks.length} accomplis
                          </span>
                        </div>

                        {/* Add shared task form */}
                        <form onSubmit={addSharedTaskRealtime} className="flex gap-2">
                          <input
                            type="text"
                            value={newSharedTaskTitle}
                            onChange={(e) => setNewSharedTaskTitle(e.target.value)}
                            placeholder="Ajouter un objectif pour le groupe (ex: 'Finir les 50 QCMs')..."
                            className="flex-grow px-4 py-2.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase tracking-wider font-lemon-milk cursor-pointer hover:bg-brand-orange/90 flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Ajouter</span>
                          </button>
                        </form>

                        <div className="space-y-2">
                          {sharedTasks.length === 0 ? (
                            <div className="text-center py-6 text-white/40 text-xs font-light">
                              Aucun objectif de groupe pour le moment. Ajoutez-en un ci-dessus !
                            </div>
                          ) : (
                            sharedTasks.map((t) => (
                              <div
                                key={t.id}
                                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                                  t.done
                                    ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-300"
                                    : "bg-white/5 border-white/10 hover:border-brand-orange/40 text-white"
                                }`}
                              >
                                <div
                                  onClick={() => toggleSharedTaskRealtime(t.id)}
                                  className="flex items-center gap-3 cursor-pointer select-none flex-grow"
                                >
                                  <div
                                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                      t.done
                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                        : "border-white/30 bg-white/5 hover:border-brand-orange"
                                    }`}
                                  >
                                    {t.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>
                                  <span className={`text-xs ${t.done ? "line-through opacity-70" : "font-medium"}`}>
                                    {t.text}
                                  </span>
                                </div>

                                <button
                                  onClick={() => deleteSharedTaskRealtime(t.id)}
                                  className="text-white/40 hover:text-red-400 p-1 transition-colors cursor-pointer"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Real-Time Sticky Notes Whiteboard */}
                      <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div>
                            <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-2">
                              <StickyNote className="w-5 h-5 text-brand-orange" />
                              Mur de Mémos en Temps Réel
                            </h3>
                            <p className="text-xs text-white/60 font-light">
                              Chaque note s&apos;affiche instantanément sur chaque écran de la salle.
                            </p>
                          </div>
                        </div>

                        {/* New Sticky Note Form */}
                        <form onSubmit={addStickyNoteRealtime} className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/80 font-medium font-lemon-milk">
                              Auteur : <strong className="text-brand-orange">{userName}</strong>
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-white/60 font-lemon-milk uppercase">Couleur :</span>
                              {(["orange", "blue", "emerald", "amber"] as const).map((col) => (
                                <button
                                  type="button"
                                  key={col}
                                  onClick={() => setNewStickyColor(col)}
                                  className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                                    col === "orange" ? "bg-brand-orange" : col === "blue" ? "bg-brand-blue" : col === "emerald" ? "bg-emerald-500" : "bg-amber-400"
                                  } ${newStickyColor === col ? "scale-125 ring-2 ring-white" : "opacity-70"}`}
                                />
                              ))}
                            </div>
                          </div>

                          <textarea
                            rows={2}
                            value={newStickyText}
                            onChange={(e) => setNewStickyText(e.target.value)}
                            placeholder="Écrire un mémo ou info pour le groupe..."
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange resize-none"
                          />

                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk flex items-center gap-1.5 cursor-pointer shadow-md ml-auto"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Diffuser à la Salle</span>
                          </button>
                        </form>

                        {/* Sticky Notes Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {stickyNotes.length === 0 ? (
                            <div className="col-span-full text-center py-10 text-white/40 text-xs font-light">
                              Aucun mémo pour l&apos;instant. Soyez le premier à épingler une note pour votre groupe !
                            </div>
                          ) : (
                            stickyNotes.map((note) => (
                              <div
                                key={note.id}
                                className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 shadow-lg relative group ${
                                  note.color === "orange"
                                    ? "bg-brand-orange/15 border-brand-orange/40 text-brand-orange"
                                    : note.color === "blue"
                                    ? "bg-brand-blue/15 border-brand-blue/40 text-brand-blue"
                                    : note.color === "emerald"
                                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                                    : "bg-amber-400/15 border-amber-400/40 text-amber-300"
                                }`}
                              >
                                <p className="text-xs text-white/90 font-light leading-relaxed">
                                  {note.content}
                                </p>

                                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px]">
                                  <span className="font-bold uppercase font-lemon-milk text-white/80">
                                    {note.author}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/40">{note.date}</span>
                                    <button
                                      onClick={() => deleteStickyNoteRealtime(note.id)}
                                      className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* VIEW 2: INSTANTS & SOUVENIRS DU SPACE (Polaroid Moments Stream) */}
                  {roomSectionView === "moments" && (
                    <div className="bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                      
                      {/* Header & Add Moment Trigger */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-[10px] font-bold uppercase tracking-wider font-lemon-milk mb-2">
                            <Camera className="w-3 h-3" />
                            Instants Capturés chez CTRL S
                          </span>
                          <h3 className="text-xl font-bold uppercase tracking-wider text-white font-lemon-milk">
                            Mur des Souvenirs & Ambiance
                          </h3>
                          <p className="text-xs text-white/70 font-light">
                            Les photos et moments vécus dans l&apos;espace, gardés comme souvenirs précieux de vos sessions de révision.
                          </p>
                        </div>

                        <button
                          onClick={() => setIsAddingMoment(!isAddingMoment)}
                          className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider font-lemon-milk flex items-center gap-2 cursor-pointer shadow-md shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Partager un Instant</span>
                        </button>
                      </div>

                      {/* Add Moment Form (Collapsible) */}
                      <AnimatePresence>
                        {isAddingMoment && (
                          <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleAddMoment}
                            className="bg-white/5 border border-brand-orange/30 p-5 rounded-2xl space-y-4 overflow-hidden"
                          >
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange font-lemon-milk">
                              Ajouter une Photo Souvenir
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                                  Titre du Souvenir
                                </label>
                                <input
                                  type="text"
                                  value={newMomentTitle}
                                  onChange={(e) => setNewMomentTitle(e.target.value)}
                                  placeholder="ex: 'Session nocturne examen dentaire'..."
                                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                                  Zone du Space
                                </label>
                                <select
                                  value={newMomentZone}
                                  onChange={(e) => setNewMomentZone(e.target.value)}
                                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#1a2335] border border-white/10 text-white uppercase font-lemon-milk cursor-pointer"
                                >
                                  <option value="The Lab">The Lab</option>
                                  <option value="Indoor Zone">Indoor Focus Zone</option>
                                  <option value="Outdoor Zone">Terrasse Plein Air</option>
                                  <option value="Lounge Barista">Lounge & Café</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="moment-image" className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1.5">
                                Choisir une photo :
                              </label>
                              <input
                                id="moment-image"
                                type="file"
                                accept="image/*"
                                onChange={handleMomentImageChange}
                                required
                                className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base text-white file:mr-3 file:rounded-lg file:border-0 file:bg-brand-orange file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-brand-orange/90 sm:text-xs"
                              />
                              <p className="mt-1.5 text-[10px] text-white/45">PNG, JPG ou WebP — Optimisé et synchronisé sur le réseau.</p>
                              {newMomentImageError && <p className="mt-1 text-[10px] text-red-400">{newMomentImageError}</p>}
                              {newMomentImage && (
                                <div className="relative mt-3 aspect-[4/3] max-w-xs overflow-hidden rounded-xl border border-brand-orange/50">
                                  <Image src={newMomentImage} alt="Aperçu de la photo" fill unoptimized className="object-cover" />
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-white/60 font-lemon-milk block mb-1">
                                Description / Légende
                              </label>
                              <textarea
                                rows={2}
                                value={newMomentCaption}
                                onChange={(e) => setNewMomentCaption(e.target.value)}
                                placeholder="Racontez l'ambiance ou le moment vécu..."
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange resize-none"
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                disabled={isUploadingPhoto}
                                onClick={() => setIsAddingMoment(false)}
                                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-lemon-milk uppercase"
                              >
                                Annuler
                              </button>
                              <button
                                type="submit"
                                disabled={isUploadingPhoto}
                                className="px-5 py-2 rounded-xl bg-brand-orange disabled:opacity-60 text-white text-xs font-bold uppercase font-lemon-milk shadow-md cursor-pointer flex items-center gap-2"
                              >
                                {isUploadingPhoto ? (
                                  <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Téléversement...</span>
                                  </>
                                ) : (
                                  <span>Épingler le Souvenir</span>
                                )}
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>

                      {/* Polaroid Moments Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {spaceMoments.length === 0 ? (
                          <div className="col-span-full text-center py-14 px-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-3">
                              <Camera className="w-6 h-6" />
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase font-lemon-milk mb-1">
                              Aucune photo pour l&apos;instant
                            </h4>
                            <p className="text-xs text-white/50 font-light max-w-md mx-auto mb-4">
                              Le salon est prêt. Prenez ou sélectionnez une photo de votre révision, du Lab ou de votre pause café pour l&apos;épingler ici !
                            </p>
                            <button
                              onClick={() => setIsAddingMoment(true)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase font-lemon-milk shadow-md hover:bg-brand-orange/90 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Ajouter la première photo
                            </button>
                          </div>
                        ) : (
                          spaceMoments.map((moment) => (
                            <motion.div
                              key={moment.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ y: -6, rotate: 0.5 }}
                              className="bg-white rounded-2xl p-3 sm:p-4 text-slate-800 shadow-xl border border-white/40 flex flex-col justify-between transition-all duration-300 group"
                            >
                              {/* Polaroid Photo Banner */}
                              <div
                                onClick={() => setSelectedLightboxImage(moment)}
                                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 cursor-pointer mb-3"
                              >
                                <Image
                                  src={moment.image}
                                  alt={moment.title}
                                  fill
                                  unoptimized
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="p-2 rounded-full bg-white/80 text-brand-blue shadow-md">
                                    <Maximize2 className="w-4 h-4 text-brand-orange" />
                                  </span>
                                </div>
                                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-white font-lemon-milk">
                                  {moment.zoneTag}
                                </span>
                              </div>

                              {/* Polaroid Handwritten Style Title & Text */}
                              <div className="space-y-1.5 flex-grow">
                                <h4 className="text-sm font-bold uppercase tracking-wide text-brand-blue font-lemon-milk leading-snug">
                                  {moment.title}
                                </h4>
                                <p className="text-xs text-slate-600 font-light leading-relaxed">
                                  &ldquo;{moment.caption}&rdquo;
                                </p>
                              </div>

                              {/* Footer metadata & Like/Delete buttons */}
                              <div className="flex items-center justify-between border-t border-slate-200 pt-3 mt-3 text-[11px] text-slate-500">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-700 text-[10px] uppercase font-lemon-milk">
                                    {moment.author}
                                  </span>
                                  <span className="text-[9px] text-slate-400">{moment.timeAgo}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleDeleteMoment(moment.id)}
                                    className="p-1.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                    title="Supprimer cette photo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleLikeMoment(moment.id)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold transition-all cursor-pointer shadow-xs active:scale-125"
                                    title="J'aime ce moment"
                                  >
                                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                                    <span>{moment.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Column: Active Connected Laptops in Room */}
                <div className="lg:col-span-4 bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      Ordinateurs Connectés ({participants.length || 1})
                    </h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    {participants.length === 0 ? (
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-xs font-bold text-white uppercase">
                          {userName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">{userName} (Vous)</span>
                          <span className="text-[10px] text-emerald-400">Connecté en direct</span>
                        </div>
                      </div>
                    ) : (
                      participants.map((peer) => {
                        const isMe = peer.id === userId || peer.name === userName;
                        return (
                          <div key={peer.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${peer.color || "bg-brand-blue"} flex items-center justify-center text-xs font-bold text-white uppercase`}>
                                {peer.avatar || peer.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-white block">
                                  {peer.name} {isMe ? "(Vous)" : ""}
                                </span>
                                <span className="text-[10px] text-white/50">{peer.role}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-lemon-milk">
                              {peer.status}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Share Room Button */}
                  <button
                    onClick={copyRoomInviteLink}
                    className="w-full py-3 rounded-2xl bg-brand-blue/15 hover:bg-brand-blue/30 border border-brand-blue/30 text-brand-blue text-xs font-bold uppercase tracking-wider font-lemon-milk flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{shareLinkToast ? "Lien Copié dans le Presse-Papier !" : "Partager le Lien de la Salle"}</span>
                  </button>

                  <div className="p-4 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-xs text-white/80 leading-relaxed font-light">
                    ⚡ <strong>Données Persistantes :</strong> Les objectifs et notes de cette salle sont sauvegardés en direct et restent accessibles même en actualisant la page.
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: SCRATCHPAD & QUICK NOTES */}
        {activeTab === "notes" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full bg-[#101624] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-orange" />
                  Bloc-Notes & Formules (Markdown)
                </h3>
                <p className="text-xs text-white/60 font-light">
                  Prenez des notes rapides pendant votre session. Sauvegardé automatiquement.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyNotesToClipboard}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-lemon-milk uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copyToast ? "Copié !" : "Copier"}</span>
                </button>

                <button
                  onClick={downloadNotesFile}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold font-lemon-milk uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exporter (.md)</span>
                </button>
              </div>
            </div>

            {/* Markdown Text Area */}
            <textarea
              rows={16}
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              placeholder="Écrivez vos notes, formules, résumés de cours ou liens ici..."
              className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-orange leading-relaxed resize-y selection:bg-brand-orange"
            />

            <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4">
              <span>Caractères : {notesContent.length} | Mots : {notesContent.trim() ? notesContent.trim().split(/\s+/).length : 0}</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Progression Sauvegardée en Local
              </span>
            </div>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal for Photo Moments */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <div className="relative max-w-4xl w-full bg-[#101624] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <button
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-brand-orange transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[300px] bg-black">
                <Image
                  src={selectedLightboxImage.image}
                  alt={selectedLightboxImage.title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between gap-6 text-left">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-wider font-lemon-milk">
                    <MapPin className="w-3 h-3" />
                    {selectedLightboxImage.zoneTag}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white font-lemon-milk">
                    {selectedLightboxImage.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    &ldquo;{selectedLightboxImage.caption}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/60">
                  <div>
                    <span className="font-semibold text-white block">{selectedLightboxImage.author}</span>
                    <span className="text-[10px]">{selectedLightboxImage.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteMoment(selectedLightboxImage.id)}
                      className="p-2 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                      title="Supprimer cette photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleLikeMoment(selectedLightboxImage.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 font-bold hover:bg-rose-500/30 transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-rose-400" />
                      <span>{selectedLightboxImage.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backend & Cloud Database Info Modal */}
      <AnimatePresence>
        {showBackendInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            <div className="relative max-w-2xl w-full bg-[#101624] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-5 my-8">
              <button
                onClick={() => setShowBackendInfoModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${backendMode === "cloud_supabase" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white font-lemon-milk">
                    Base de Données & Multi-Ordinateurs
                  </h3>
                  <p className="text-xs text-white/60">
                    Statut actuel :{" "}
                    <strong className={backendMode === "cloud_supabase" ? "text-emerald-400" : "text-amber-400"}>
                      {backendMode === "cloud_supabase"
                        ? "Connecté au Cloud Supabase (Partage universel actif)"
                        : "Mode Local (Actif sur cette machine)"}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-2 leading-relaxed">
                <p>
                  Pour que les photos, les notes et les tâches s&apos;affichent <strong>instantanément sur tous les ordinateurs distants</strong> (et sur les téléphones), une base de données cloud (Supabase) est intégrée dans le code.
                </p>
                <p className="text-brand-orange font-medium">
                  Le code est 100% prêt. Il vous suffit d&apos;ajouter vos identifiants gratuits dans le fichier <code className="bg-black/50 px-2 py-0.5 rounded text-white font-mono">.env.local</code>.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-brand-orange font-lemon-milk">
                  Comment connecter Supabase en 3 étapes :
                </h4>
                <ol className="text-xs text-white/70 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    Créez un projet gratuit sur{" "}
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange underline">
                      supabase.com
                    </a>.
                  </li>
                  <li>
                    Dans <strong>SQL Editor</strong> sur Supabase, collez le contenu du fichier <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-mono">supabase-schema.sql</code> (situé à la racine du projet) et cliquez sur <strong>Run</strong>.
                  </li>
                  <li>
                    Créez un fichier <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-mono">.env.local</code> avec votre URL et votre clé :
                    <pre className="mt-2 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] text-emerald-400 font-mono overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_publique`}
                    </pre>
                  </li>
                </ol>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowBackendInfoModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase font-lemon-milk shadow-md cursor-pointer hover:bg-brand-orange/90 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer info bar */}
      <footer className="border-t border-white/10 bg-[#0a0e17] py-6 px-6 text-center text-xs text-white/50 font-light">
        <p>© {new Date().getFullYear()} Control and Study (CTRL S) Monastir — Espace d&apos;Étude & Coworking.</p>
      </footer>

    </div>
  );
}
