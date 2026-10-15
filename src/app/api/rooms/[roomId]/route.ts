import { NextRequest, NextResponse } from "next/server";
import {
  getRoom,
  saveRoom,
  Participant,
  StickyNote,
  SharedTask,
  SpaceMoment,
} from "@/lib/db";

export const runtime = "nodejs";

// GET: Fetch real-time room state from database (Supabase or local)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId: rawRoomId } = await params;
  const room = await getRoom(rawRoomId);

  return NextResponse.json({
    success: true,
    roomId: room.roomId,
    roomName: room.roomName,
    participants: room.participants,
    stickyNotes: room.stickyNotes,
    sharedTasks: room.sharedTasks,
    spaceMoments: room.spaceMoments,
    syncedTimer: room.syncedTimer,
    lastUpdated: room.lastUpdated,
    serverTime: Date.now(),
  });
}

// POST: Execute real-time collaborative action and persist to database
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId: rawRoomId } = await params;
  const room = await getRoom(rawRoomId);

  const body = await req.json();
  const { action, payload } = body;
  const now = Date.now();

  switch (action) {
    // 1. Heartbeat / Presence
    case "heartbeat": {
      const { id, name, role, status, avatar, color } = payload || {};
      if (id) {
        const existingIdx = room.participants.findIndex((p) => p.id === id);
        const participantData: Participant = {
          id,
          name: name || "Coworker",
          role: role || "Étudiant Monastir",
          status: status || "En ligne",
          avatar: avatar || (name ? name.substring(0, 2).toUpperCase() : "CS"),
          color: color || "bg-brand-orange",
          lastSeen: now,
        };

        if (existingIdx >= 0) {
          room.participants[existingIdx] = participantData;
        } else {
          room.participants.push(participantData);
        }
      }
      break;
    }

    // 2. Explicit Leave Room
    case "leave_room": {
      const { id } = payload || {};
      if (id) {
        room.participants = room.participants.filter((p) => p.id !== id);
      }
      break;
    }

    // 3. Set Room Name
    case "set_room_name": {
      if (payload?.name) {
        room.roomName = payload.name;
      }
      break;
    }

    // 4. Add Sticky Note
    case "add_note": {
      const newNote: StickyNote = {
        id: Date.now(),
        author: payload?.author || "Anonyme",
        content: payload?.content || "",
        color: payload?.color || "orange",
        date: "À l'instant",
      };
      room.stickyNotes = [newNote, ...(room.stickyNotes || [])].slice(0, 50);
      break;
    }

    // 5. Delete Sticky Note
    case "delete_note": {
      room.stickyNotes = (room.stickyNotes || []).filter((n) => n.id !== payload?.id);
      break;
    }

    // 6. Add Space Photo Memory / Instant
    case "add_moment": {
      if (payload?.image) {
        const newMoment: SpaceMoment = {
          id: Date.now(),
          title: payload?.title || "Instant Capturé",
          caption: payload?.caption || "",
          image: payload.image,
          author: payload?.author || "Coworker",
          timeAgo: "À l'instant",
          likes: 1,
          zoneTag: payload?.zoneTag || "CTRL S Space",
        };
        room.spaceMoments = [newMoment, ...(room.spaceMoments || [])].slice(0, 40);
      }
      break;
    }

    // 7. Like a Space Moment
    case "like_moment": {
      room.spaceMoments = (room.spaceMoments || []).map((m) =>
        m.id === payload?.id ? { ...m, likes: m.likes + 1 } : m
      );
      break;
    }

    // 8. Delete a Space Moment
    case "delete_moment": {
      room.spaceMoments = (room.spaceMoments || []).filter((m) => m.id !== payload?.id);
      break;
    }

    // 9. Timer Sync (Group synchronized timer)
    case "sync_timer": {
      const isRunning = Boolean(payload?.isRunning);
      const durationSecs = Number(payload?.durationSecs) || 25 * 60;
      const timeLeft = Number(payload?.timeLeft) ?? durationSecs;

      room.syncedTimer = {
        isRunning,
        mode: payload?.mode || "pomodoro",
        timeLeft,
        durationSecs,
        startedAt: isRunning ? now - (durationSecs - timeLeft) * 1000 : undefined,
        lastSyncTimestamp: now,
        updatedBy: payload?.updatedBy || "Coworker",
      };
      break;
    }

    // 10. Add Shared Task
    case "add_shared_task": {
      const newTask: SharedTask = {
        id: Date.now(),
        text: payload?.text,
        done: false,
        tag: payload?.tag || "Groupe",
        priority: payload?.priority || "normal",
        assignedTo: payload?.assignedTo,
      };
      room.sharedTasks = [newTask, ...(room.sharedTasks || [])];
      break;
    }

    // 11. Toggle Shared Task
    case "toggle_shared_task": {
      room.sharedTasks = (room.sharedTasks || []).map((t) =>
        t.id === payload?.id ? { ...t, done: !t.done } : t
      );
      break;
    }

    // 12. Delete Shared Task
    case "delete_shared_task": {
      room.sharedTasks = (room.sharedTasks || []).filter((t) => t.id !== payload?.id);
      break;
    }

    default:
      break;
  }

  // Save to persistent database
  await saveRoom(room);

  return NextResponse.json({
    success: true,
    roomId: room.roomId,
    roomName: room.roomName,
    participants: room.participants,
    stickyNotes: room.stickyNotes,
    sharedTasks: room.sharedTasks,
    spaceMoments: room.spaceMoments,
    syncedTimer: room.syncedTimer,
    lastUpdated: room.lastUpdated,
    serverTime: now,
  });
}
