import fs from "node:fs";
import path from "node:path";
import { getSupabase, isSupabaseConfigured } from "./supabase";

export interface Participant {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
  color: string;
  lastSeen: number;
}

export interface StickyNote {
  id: number;
  author: string;
  content: string;
  color: "orange" | "blue" | "emerald" | "amber";
  date: string;
}

export interface SharedTask {
  id: number;
  text: string;
  done: boolean;
  tag: string;
  priority: "urgent" | "normal" | "low";
  assignedTo?: string;
}

export interface SpaceMoment {
  id: number;
  title: string;
  caption: string;
  image: string;
  author: string;
  timeAgo: string;
  likes: number;
  zoneTag: string;
}

export interface SyncedTimer {
  isRunning: boolean;
  mode: string;
  timeLeft: number;
  durationSecs: number;
  startedAt?: number;
  lastSyncTimestamp: number;
  updatedBy: string;
}

export interface RoomData {
  roomId: string;
  roomName?: string;
  participants: Participant[];
  stickyNotes: StickyNote[];
  sharedTasks: SharedTask[];
  spaceMoments: SpaceMoment[];
  syncedTimer: SyncedTimer;
  lastUpdated: number;
}

export interface StudySessionHistory {
  id: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
}

export interface UserStats {
  userId: string;
  date: string; // YYYY-MM-DD
  completedPoms: number;
  focusTimeMinutes: number;
  dailyGoalCycles: number;
  customFocusDuration: number; // in minutes
  customBreakDuration: number;
  customLongBreakDuration: number;
  history: StudySessionHistory[];
  updatedAt: number;
}

export interface UserTask {
  id: number;
  userId: string;
  text: string;
  done: boolean;
  tag: string;
  priority: "urgent" | "normal" | "low";
  dueDate?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ROOMS_FILE = path.join(DATA_DIR, "rooms.json");
const STATS_FILE = path.join(DATA_DIR, "stats.json");
const TASKS_FILE = path.join(DATA_DIR, "tasks.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function safeReadJson<T>(filePath: string, fallback: T): T {
  try {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return fallback;
  }
}

function safeWriteJson<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// NO FAKE PHOTOS: Clean initial state for authentic user-uploaded photos
const defaultPublicMoments: SpaceMoment[] = [];

const defaultPublicNotes: StickyNote[] = [
  {
    id: 1,
    author: "Équipe CTRL S",
    content: "Bienvenue dans le Salon Public ! Partagez vos mémos de révision et encouragez vos camarades.",
    color: "orange",
    date: "Aujourd'hui",
  },
  {
    id: 2,
    author: "Youssef (Monastir)",
    content: "Session QCMs Anatomie dentaire cet après-midi au Lab ! Objectif 100% de bonnes réponses.",
    color: "blue",
    date: "Aujourd'hui",
  },
];

const defaultPublicSharedTasks: SharedTask[] = [
  {
    id: 1,
    text: "Réviser les 50 QCMs clés du semestre",
    done: false,
    tag: "Examen",
    priority: "urgent",
    assignedTo: "Groupe Dentaire",
  },
  {
    id: 2,
    text: "Fiches de synthèse Pharmacologie & Posologies",
    done: true,
    tag: "Révision",
    priority: "normal",
    assignedTo: "Sarra & Amine",
  },
];

// Helper to format today's date YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

// DB Row Mapper for Supabase
interface RoomDbRow {
  room_id: string;
  room_name?: string;
  participants?: Participant[];
  sticky_notes?: StickyNote[];
  shared_tasks?: SharedTask[];
  space_moments?: SpaceMoment[];
  synced_timer?: SyncedTimer;
  last_updated?: number;
}

function mapDbRowToRoom(row: RoomDbRow): RoomData {
  return {
    roomId: row.room_id,
    roomName: row.room_name || (row.room_id === "PUBLIC" ? "Salon Public Général CTRL S" : `Salle #${row.room_id}`),
    participants: Array.isArray(row.participants) ? row.participants : [],
    stickyNotes: Array.isArray(row.sticky_notes) ? row.sticky_notes : [],
    sharedTasks: Array.isArray(row.shared_tasks) ? row.shared_tasks : [],
    spaceMoments: Array.isArray(row.space_moments) ? row.space_moments : [],
    syncedTimer: row.synced_timer || {
      isRunning: false,
      mode: "pomodoro",
      timeLeft: 25 * 60,
      durationSecs: 25 * 60,
      lastSyncTimestamp: Date.now(),
      updatedBy: "System",
    },
    lastUpdated: Number(row.last_updated) || Date.now(),
  };
}

function mapRoomToDbRow(room: RoomData): RoomDbRow {
  return {
    room_id: room.roomId,
    room_name: room.roomName || (room.roomId === "PUBLIC" ? "Salon Public Général CTRL S" : `Salle #${room.roomId}`),
    participants: room.participants || [],
    sticky_notes: room.stickyNotes || [],
    shared_tasks: room.sharedTasks || [],
    space_moments: room.spaceMoments || [],
    synced_timer: room.syncedTimer,
    last_updated: room.lastUpdated || Date.now(),
  };
}

// ==========================================
// ROOMS PERSISTENCE REPOSITORY (SUPABASE + LOCAL)
// ==========================================

export async function getAllRooms(): Promise<Record<string, RoomData>> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.from("rooms").select("*");
      if (!error && data) {
        const roomsMap: Record<string, RoomData> = {};
        for (const row of data) {
          roomsMap[row.room_id] = mapDbRowToRoom(row);
        }
        if (!roomsMap["PUBLIC"]) {
          const publicRoom: RoomData = {
            roomId: "PUBLIC",
            roomName: "Salon Public Général CTRL S",
            participants: [],
            stickyNotes: defaultPublicNotes,
            sharedTasks: defaultPublicSharedTasks,
            spaceMoments: defaultPublicMoments,
            syncedTimer: {
              isRunning: false,
              mode: "pomodoro",
              timeLeft: 25 * 60,
              durationSecs: 25 * 60,
              lastSyncTimestamp: Date.now(),
              updatedBy: "System",
            },
            lastUpdated: Date.now(),
          };
          await client.from("rooms").upsert(mapRoomToDbRow(publicRoom));
          roomsMap["PUBLIC"] = publicRoom;
        }
        return roomsMap;
      }
    } catch (e) {
      console.error("Supabase getAllRooms error:", e);
    }
  }

  // Fallback to local JSON storage
  const rooms = safeReadJson<Record<string, RoomData>>(ROOMS_FILE, {});
  if (!rooms["PUBLIC"]) {
    rooms["PUBLIC"] = {
      roomId: "PUBLIC",
      roomName: "Salon Public Général CTRL S",
      participants: [],
      stickyNotes: defaultPublicNotes,
      sharedTasks: defaultPublicSharedTasks,
      spaceMoments: defaultPublicMoments,
      syncedTimer: {
        isRunning: false,
        mode: "pomodoro",
        timeLeft: 25 * 60,
        durationSecs: 25 * 60,
        lastSyncTimestamp: Date.now(),
        updatedBy: "System",
      },
      lastUpdated: Date.now(),
    };
    safeWriteJson(ROOMS_FILE, rooms);
  }
  return rooms;
}

export async function getRoom(rawRoomId: string): Promise<RoomData> {
  const roomId = (rawRoomId || "PUBLIC").trim().toUpperCase();
  const client = getSupabase();

  let room: RoomData | null = null;

  if (client) {
    try {
      const { data, error } = await client
        .from("rooms")
        .select("*")
        .eq("room_id", roomId)
        .maybeSingle();

      if (!error && data) {
        room = mapDbRowToRoom(data);
      } else if (!error && !data) {
        // Create initial room in Supabase
        const initialRoom: RoomData = {
          roomId,
          roomName: roomId === "PUBLIC" ? "Salon Public Général CTRL S" : `Salle #${roomId}`,
          participants: [],
          stickyNotes: roomId === "PUBLIC" ? defaultPublicNotes : [],
          sharedTasks: roomId === "PUBLIC" ? defaultPublicSharedTasks : [],
          spaceMoments: defaultPublicMoments,
          syncedTimer: {
            isRunning: false,
            mode: "pomodoro",
            timeLeft: 25 * 60,
            durationSecs: 25 * 60,
            lastSyncTimestamp: Date.now(),
            updatedBy: "System",
          },
          lastUpdated: Date.now(),
        };
        await client.from("rooms").upsert(mapRoomToDbRow(initialRoom));
        room = initialRoom;
      }
    } catch (e) {
      console.error("Supabase getRoom error:", e);
    }
  }

  // Fallback to local file if Supabase not configured or failed
  if (!room) {
    const rooms = await getAllRooms();
    if (!rooms[roomId]) {
      rooms[roomId] = {
        roomId,
        roomName: roomId === "PUBLIC" ? "Salon Public Général CTRL S" : `Salle #${roomId}`,
        participants: [],
        stickyNotes: roomId === "PUBLIC" ? defaultPublicNotes : [],
        sharedTasks: roomId === "PUBLIC" ? defaultPublicSharedTasks : [],
        spaceMoments: defaultPublicMoments,
        syncedTimer: {
          isRunning: false,
          mode: "pomodoro",
          timeLeft: 25 * 60,
          durationSecs: 25 * 60,
          lastSyncTimestamp: Date.now(),
          updatedBy: "System",
        },
        lastUpdated: Date.now(),
      };
      safeWriteJson(ROOMS_FILE, rooms);
    }
    room = rooms[roomId];
  }

  // Inactivity timeout: 35 seconds (avoids quick drops when switching tabs)
  const now = Date.now();
  const activeParticipants = (room.participants || []).filter(
    (p) => now - p.lastSeen <= 35000
  );
  room.participants = activeParticipants;

  // Synced timer countdown update if running
  if (room.syncedTimer.isRunning && room.syncedTimer.startedAt) {
    const elapsed = Math.floor((now - room.syncedTimer.startedAt) / 1000);
    const newTimeLeft = Math.max(0, room.syncedTimer.durationSecs - elapsed);
    room.syncedTimer.timeLeft = newTimeLeft;
    if (newTimeLeft <= 0) {
      room.syncedTimer.isRunning = false;
      room.syncedTimer.timeLeft = 0;
    }
  }

  return room;
}

export async function saveRoom(room: RoomData): Promise<void> {
  room.lastUpdated = Date.now();
  const client = getSupabase();

  if (client) {
    try {
      await client.from("rooms").upsert(mapRoomToDbRow(room));
    } catch (e) {
      console.error("Supabase saveRoom error:", e);
    }
  }

  // Also maintain local copy for redundancy & offline testing
  const rooms = safeReadJson<Record<string, RoomData>>(ROOMS_FILE, {});
  rooms[room.roomId] = room;
  safeWriteJson(ROOMS_FILE, rooms);
}

// ==========================================
// USER STUDY STATS & GOALS REPOSITORY
// ==========================================

export async function getUserStats(userId: string): Promise<UserStats> {
  const today = getTodayDateString();
  const userStatKey = userId || "anonymous";
  const client = getSupabase();

  if (client) {
    try {
      const { data, error } = await client
        .from("user_stats")
        .select("stats")
        .eq("user_id", userStatKey)
        .maybeSingle();

      if (!error && data && data.stats) {
        const existing = data.stats as UserStats;
        if (existing.date === today) {
          return existing;
        }
        // New day: reset today counters but keep custom preferences
        const updatedStat: UserStats = {
          ...existing,
          date: today,
          completedPoms: 0,
          focusTimeMinutes: 0,
          updatedAt: Date.now(),
        };
        await client.from("user_stats").upsert({
          user_id: userStatKey,
          stats: updatedStat,
          updated_at: Date.now(),
        });
        return updatedStat;
      }
    } catch (e) {
      console.error("Supabase getUserStats error:", e);
    }
  }

  // Local fallback
  const allStats = safeReadJson<Record<string, UserStats>>(STATS_FILE, {});
  const existing = allStats[userStatKey];

  if (existing && existing.date === today) {
    return existing;
  }

  const defaultGoals = existing
    ? {
        dailyGoalCycles: existing.dailyGoalCycles || 8,
        customFocusDuration: existing.customFocusDuration || 25,
        customBreakDuration: existing.customBreakDuration || 5,
        customLongBreakDuration: existing.customLongBreakDuration || 15,
      }
    : {
        dailyGoalCycles: 8,
        customFocusDuration: 25,
        customBreakDuration: 5,
        customLongBreakDuration: 15,
      };

  const initialStat: UserStats = {
    userId: userStatKey,
    date: today,
    completedPoms: 0,
    focusTimeMinutes: 0,
    dailyGoalCycles: defaultGoals.dailyGoalCycles,
    customFocusDuration: defaultGoals.customFocusDuration,
    customBreakDuration: defaultGoals.customBreakDuration,
    customLongBreakDuration: defaultGoals.customLongBreakDuration,
    history: existing?.history || [],
    updatedAt: Date.now(),
  };

  allStats[userStatKey] = initialStat;
  safeWriteJson(STATS_FILE, allStats);

  if (client) {
    try {
      await client.from("user_stats").upsert({
        user_id: userStatKey,
        stats: initialStat,
        updated_at: Date.now(),
      });
    } catch {}
  }

  return initialStat;
}

export async function recordStudySession(
  userId: string,
  mode: string,
  durationMinutes: number
): Promise<UserStats> {
  const stats = await getUserStats(userId);
  const now = new Date();

  if (mode === "pomodoro" || mode === "deep" || mode === "custom") {
    stats.completedPoms += 1;
    stats.focusTimeMinutes += Math.max(1, durationMinutes);

    const historyItem: StudySessionHistory = {
      id: `session_${Date.now()}`,
      mode,
      durationMinutes,
      completedAt: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };

    stats.history = [historyItem, ...(stats.history || [])].slice(0, 30);
  }

  stats.updatedAt = Date.now();

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_stats").upsert({
        user_id: stats.userId,
        stats,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase recordStudySession error:", e);
    }
  }

  const allStats = safeReadJson<Record<string, UserStats>>(STATS_FILE, {});
  allStats[stats.userId] = stats;
  safeWriteJson(STATS_FILE, allStats);
  return stats;
}

export async function updateUserGoals(
  userId: string,
  updates: Partial<Pick<UserStats, "dailyGoalCycles" | "customFocusDuration" | "customBreakDuration" | "customLongBreakDuration">>
): Promise<UserStats> {
  const stats = await getUserStats(userId);
  if (updates.dailyGoalCycles !== undefined && updates.dailyGoalCycles > 0) {
    stats.dailyGoalCycles = updates.dailyGoalCycles;
  }
  if (updates.customFocusDuration !== undefined && updates.customFocusDuration > 0) {
    stats.customFocusDuration = updates.customFocusDuration;
  }
  if (updates.customBreakDuration !== undefined && updates.customBreakDuration > 0) {
    stats.customBreakDuration = updates.customBreakDuration;
  }
  if (updates.customLongBreakDuration !== undefined && updates.customLongBreakDuration > 0) {
    stats.customLongBreakDuration = updates.customLongBreakDuration;
  }

  stats.updatedAt = Date.now();

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_stats").upsert({
        user_id: stats.userId,
        stats,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase updateUserGoals error:", e);
    }
  }

  const allStats = safeReadJson<Record<string, UserStats>>(STATS_FILE, {});
  allStats[stats.userId] = stats;
  safeWriteJson(STATS_FILE, allStats);
  return stats;
}

export async function resetTodayStats(userId: string): Promise<UserStats> {
  const stats = await getUserStats(userId);
  stats.completedPoms = 0;
  stats.focusTimeMinutes = 0;
  stats.updatedAt = Date.now();

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_stats").upsert({
        user_id: stats.userId,
        stats,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase resetTodayStats error:", e);
    }
  }

  const allStats = safeReadJson<Record<string, UserStats>>(STATS_FILE, {});
  allStats[stats.userId] = stats;
  safeWriteJson(STATS_FILE, allStats);
  return stats;
}

// ==========================================
// USER TASKS / OBJECTIFS REPOSITORY
// ==========================================

export async function getUserTasks(userId: string): Promise<UserTask[]> {
  const userKey = userId || "anonymous";
  const client = getSupabase();

  if (client) {
    try {
      const { data, error } = await client
        .from("user_tasks")
        .select("tasks")
        .eq("user_id", userKey)
        .maybeSingle();

      if (!error && data && Array.isArray(data.tasks)) {
        return data.tasks as UserTask[];
      }
    } catch (e) {
      console.error("Supabase getUserTasks error:", e);
    }
  }

  const allTasks = safeReadJson<Record<string, UserTask[]>>(TASKS_FILE, {});

  if (!allTasks[userKey]) {
    allTasks[userKey] = [
      {
        id: 1,
        userId: userKey,
        text: "Définir mes objectifs de séance de révision",
        done: false,
        tag: "Révision",
        priority: "urgent",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: userKey,
        text: "Compléter un premier cycle Pomodoro de 25 minutes",
        done: false,
        tag: "Examen",
        priority: "normal",
        createdAt: new Date().toISOString(),
      },
    ];
    safeWriteJson(TASKS_FILE, allTasks);

    if (client) {
      try {
        await client.from("user_tasks").upsert({
          user_id: userKey,
          tasks: allTasks[userKey],
          updated_at: Date.now(),
        });
      } catch {}
    }
  }

  return allTasks[userKey];
}

export async function addUserTask(
  userId: string,
  text: string,
  tag = "Examen",
  priority: "urgent" | "normal" | "low" = "normal",
  dueDate?: string
): Promise<UserTask[]> {
  const userKey = userId || "anonymous";
  const tasks = await getUserTasks(userKey);

  const newTask: UserTask = {
    id: Date.now(),
    userId: userKey,
    text: text.trim(),
    done: false,
    tag: tag || "Examen",
    priority,
    dueDate,
    createdAt: new Date().toISOString(),
  };

  const updatedTasks = [newTask, ...tasks];

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_tasks").upsert({
        user_id: userKey,
        tasks: updatedTasks,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase addUserTask error:", e);
    }
  }

  const allTasks = safeReadJson<Record<string, UserTask[]>>(TASKS_FILE, {});
  allTasks[userKey] = updatedTasks;
  safeWriteJson(TASKS_FILE, allTasks);
  return updatedTasks;
}

export async function toggleUserTask(userId: string, taskId: number): Promise<UserTask[]> {
  const userKey = userId || "anonymous";
  const tasks = await getUserTasks(userKey);

  const updatedTasks = tasks.map((t) =>
    t.id === taskId ? { ...t, done: !t.done } : t
  );

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_tasks").upsert({
        user_id: userKey,
        tasks: updatedTasks,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase toggleUserTask error:", e);
    }
  }

  const allTasks = safeReadJson<Record<string, UserTask[]>>(TASKS_FILE, {});
  allTasks[userKey] = updatedTasks;
  safeWriteJson(TASKS_FILE, allTasks);
  return updatedTasks;
}

export async function deleteUserTask(userId: string, taskId: number): Promise<UserTask[]> {
  const userKey = userId || "anonymous";
  const tasks = await getUserTasks(userKey);

  const updatedTasks = tasks.filter((t) => t.id !== taskId);

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_tasks").upsert({
        user_id: userKey,
        tasks: updatedTasks,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase deleteUserTask error:", e);
    }
  }

  const allTasks = safeReadJson<Record<string, UserTask[]>>(TASKS_FILE, {});
  allTasks[userKey] = updatedTasks;
  safeWriteJson(TASKS_FILE, allTasks);
  return updatedTasks;
}

export async function clearCompletedUserTasks(userId: string): Promise<UserTask[]> {
  const userKey = userId || "anonymous";
  const tasks = await getUserTasks(userKey);

  const updatedTasks = tasks.filter((t) => !t.done);

  const client = getSupabase();
  if (client) {
    try {
      await client.from("user_tasks").upsert({
        user_id: userKey,
        tasks: updatedTasks,
        updated_at: Date.now(),
      });
    } catch (e) {
      console.error("Supabase clearCompletedUserTasks error:", e);
    }
  }

  const allTasks = safeReadJson<Record<string, UserTask[]>>(TASKS_FILE, {});
  allTasks[userKey] = updatedTasks;
  safeWriteJson(TASKS_FILE, allTasks);
  return updatedTasks;
}
