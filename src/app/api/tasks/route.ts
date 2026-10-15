import { NextRequest, NextResponse } from "next/server";
import {
  getUserTasks,
  addUserTask,
  toggleUserTask,
  deleteUserTask,
  clearCompletedUserTasks,
} from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "anonymous";
  const tasks = await getUserTasks(userId);
  return NextResponse.json({ success: true, tasks });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, payload } = body;
    const activeUserId = userId || "anonymous";

    let tasks;

    switch (action) {
      case "add_task": {
        const { text, tag = "Examen", priority = "normal", dueDate } = payload || {};
        if (!text || !text.trim()) {
          return NextResponse.json(
            { success: false, error: "Text is required" },
            { status: 400 }
          );
        }
        tasks = await addUserTask(activeUserId, text, tag, priority, dueDate);
        break;
      }

      case "toggle_task": {
        const { id } = payload || {};
        tasks = await toggleUserTask(activeUserId, Number(id));
        break;
      }

      case "delete_task": {
        const { id } = payload || {};
        tasks = await deleteUserTask(activeUserId, Number(id));
        break;
      }

      case "clear_completed": {
        tasks = await clearCompletedUserTasks(activeUserId);
        break;
      }

      default: {
        tasks = await getUserTasks(activeUserId);
        break;
      }
    }

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("Error in /api/tasks:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
