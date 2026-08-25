import { NextRequest, NextResponse } from "next/server";

interface Participant {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
  color: string;
  lastSeen: number;
}

interface StickyNote {
  id: number;
  author: string;
  content: string;
  color: "orange" | "blue" | "emerald" | "amber";
  date: string;
}

interface SharedTask {
  id: number;
  text: string;
  done: boolean;
  tag: string;
  priority: "urgent" | "normal" | "low";
  assignedTo?: string;
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

interface SyncedTimer {
  isRunning: boolean;
  mode: string;
  timeLeft: number;
  durationSecs: number;
  lastSyncTimestamp: number;
  updatedBy: string;
}

interface RoomData {
  roomId: string;
  roomName?: string;
  participants: Map<string, Participant>;
  stickyNotes: StickyNote[];
  sharedTasks: SharedTask[];
  spaceMoments: SpaceMoment[];
  syncedTimer: SyncedTimer;
  lastUpdated: number;
}

// In-memory room storage
const globalRooms = new Map<string, RoomData>();

const defaultPublicMoments: SpaceMoment[] = [
  {
    id: 1,
    title: "Session Nocturne au Lab",
    caption: "Minuit passé à Monastir. Le silence est d'or, le focus est à 100%.",
    image: "/assets/gallery/IMG_1541.jpg",
    author: "Équipe CTRL S",
    timeAgo: "Ce soir, 22:45",
    likes: 18,
    zoneTag: "The Lab"
  },
  {
    id: 2,
    title: "Pause Café de Spécialité",
    caption: "Rien de tel qu'un bon espresso torréfié pour relancer l'énergie avant le prochain bloc.",
    image: "/assets/cafe.png",
    author: "Yasmine (Dentaire)",
    timeAgo: "Aujourd'hui, 16:30",
    likes: 24,
    zoneTag: "Lounge Barista"
  },
  {
    id: 3,
    title: "Brainstorming en Plein Air",
    caption: "Travail sur le projet web en terrasse. La lumière naturelle fait toute la différence.",
    image: "/assets/outdoor.png",
    author: "Karim & Groupe Web",
    timeAgo: "Aujourd'hui, 14:15",
    likes: 15,
    zoneTag: "Outdoor Zone"
  },
  {
    id: 4,
    title: "Révisions Intenses & Silence",
    caption: "Fiches de synthèse anatomie terminées. L'espace indoor est parfait pour s'isoler.",
    image: "/assets/gallery/IMG_1542.jpg",
    author: "Sarra (Médecine)",
    timeAgo: "Hier, 18:20",
    likes: 31,
    zoneTag: "Indoor Zone"
  },
  {
    id: 5,
    title: "L'Espace Study Lab au Complet",
    caption: "Une journée productive face à la Faculté Dentaire. Save Your Progress !",
    image: "/assets/gallery/IMG_1480.jpg",
    author: "Community CTRL S",
    timeAgo: "Hier, 11:00",
    likes: 42,
    zoneTag: "Open Space"
  },
  {
    id: 6,
    title: "Focus Deep Work au Lab",
    caption: "Chaque session terminée est une victoire pour les examens.",
    image: "/assets/gallery/IMG_1548.jpg",
    author: "Ahmed (Arch)",
    timeAgo: "Il y a 2 jours",
    likes: 19,
    zoneTag: "The Lab"
  }
];

function getOrCreateRoom(rawRoomId: string): RoomData {
  const roomId = (rawRoomId || "PUBLIC").trim().toUpperCase();
  
  if (!globalRooms.has(roomId)) {
    globalRooms.set(roomId, {
      roomId,
      roomName: roomId === "PUBLIC" ? "Salon Public Général CTRL S" : undefined,
      participants: new Map(),
      stickyNotes: [],
      sharedTasks: [],
      spaceMoments: [],
      syncedTimer: {
        isRunning: false,
        mode: "pomodoro",
        timeLeft: 25 * 60,
        durationSecs: 25 * 60,
        lastSyncTimestamp: Date.now(),
        updatedBy: "System"
      },
      lastUpdated: Date.now()
    });
  }

  return globalRooms.get(roomId)!;
}

// Cleanup inactive participants (timeout > 10 seconds)
function cleanupInactiveParticipants(room: RoomData) {
  const now = Date.now();
  for (const [id, participant] of room.participants.entries()) {
    if (now - participant.lastSeen > 10000) {
      room.participants.delete(id);
    }
  }
}

// GET: Fetch real-time room state
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId: rawRoomId } = await params;
  const room = getOrCreateRoom(rawRoomId);
  cleanupInactiveParticipants(room);

  if (room.syncedTimer.isRunning) {
    const elapsed = Math.floor((Date.now() - room.syncedTimer.lastSyncTimestamp) / 1000);
    const newTimeLeft = Math.max(0, room.syncedTimer.timeLeft - elapsed);
    if (newTimeLeft <= 0) {
      room.syncedTimer.isRunning = false;
      room.syncedTimer.timeLeft = 0;
    }
  }

  return NextResponse.json({
    roomId: room.roomId,
    roomName: room.roomName,
    participants: Array.from(room.participants.values()),
    stickyNotes: room.stickyNotes,
    sharedTasks: room.sharedTasks,
    spaceMoments: room.spaceMoments,
    syncedTimer: room.syncedTimer,
    lastUpdated: room.lastUpdated,
    serverTime: Date.now()
  });
}

// POST: Execute real-time collaborative action
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId: rawRoomId } = await params;
  const room = getOrCreateRoom(rawRoomId);
  const body = await req.json();
  const { action, payload } = body;

  const now = Date.now();

  switch (action) {
    // 1. Heartbeat / Presence
    case "heartbeat": {
      const { id, name, role, status, avatar, color } = payload;
      room.participants.set(id, {
        id,
        name: name || "Coworker",
        role: role || "Étudiant Monastir",
        status: status || "En ligne",
        avatar: avatar || "CS",
        color: color || "bg-brand-orange",
        lastSeen: now
      });
      break;
    }

    // 2. Set Room Name
    case "set_room_name": {
      if (payload.name) {
        room.roomName = payload.name;
      }
      break;
    }

    // 3. Add Sticky Note
    case "add_note": {
      const newNote: StickyNote = {
        id: Date.now(),
        author: payload.author || "Anonyme",
        content: payload.content,
        color: payload.color || "orange",
        date: "À l'instant"
      };
      room.stickyNotes.unshift(newNote);
      if (room.stickyNotes.length > 50) room.stickyNotes.pop();
      break;
    }

    // 4. Delete Sticky Note
    case "delete_note": {
      room.stickyNotes = room.stickyNotes.filter(n => n.id !== payload.id);
      break;
    }

    // 5. Add Space Photo Memory / Instant
    case "add_moment": {
      const newMoment: SpaceMoment = {
        id: Date.now(),
        title: payload.title || "Instant Capturé",
        caption: payload.caption || "",
        image: payload.image || "/assets/gallery/IMG_1541.jpg",
        author: payload.author || "Coworker",
        timeAgo: "À l'instant",
        likes: 1,
        zoneTag: payload.zoneTag || "CTRL S Space"
      };
      room.spaceMoments.unshift(newMoment);
      if (room.spaceMoments.length > 30) room.spaceMoments.pop();
      break;
    }

    // 6. Like a Space Moment
    case "like_moment": {
      room.spaceMoments = room.spaceMoments.map(m =>
        m.id === payload.id ? { ...m, likes: m.likes + 1 } : m
      );
      break;
    }

    // 7. Timer Sync
    case "sync_timer": {
      room.syncedTimer = {
        isRunning: payload.isRunning,
        mode: payload.mode || "pomodoro",
        timeLeft: payload.timeLeft,
        durationSecs: payload.durationSecs || 25 * 60,
        lastSyncTimestamp: now,
        updatedBy: payload.updatedBy || "Coworker"
      };
      break;
    }

    // 8. Add Shared Task
    case "add_shared_task": {
      const newTask: SharedTask = {
        id: Date.now(),
        text: payload.text,
        done: false,
        tag: payload.tag || "Groupe",
        priority: payload.priority || "normal",
        assignedTo: payload.assignedTo
      };
      room.sharedTasks.unshift(newTask);
      break;
    }

    // 9. Toggle Shared Task
    case "toggle_shared_task": {
      room.sharedTasks = room.sharedTasks.map(t =>
        t.id === payload.id ? { ...t, done: !t.done } : t
      );
      break;
    }

    // 10. Delete Shared Task
    case "delete_shared_task": {
      room.sharedTasks = room.sharedTasks.filter(t => t.id !== payload.id);
      break;
    }

    default:
      break;
  }

  cleanupInactiveParticipants(room);
  room.lastUpdated = now;

  return NextResponse.json({
    success: true,
    roomId: room.roomId,
    roomName: room.roomName,
    participants: Array.from(room.participants.values()),
    stickyNotes: room.stickyNotes,
    sharedTasks: room.sharedTasks,
    spaceMoments: room.spaceMoments,
    syncedTimer: room.syncedTimer,
    lastUpdated: room.lastUpdated
  });
}
