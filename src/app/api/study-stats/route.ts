import { NextRequest, NextResponse } from "next/server";
import {
  getUserStats,
  recordStudySession,
  updateUserGoals,
  resetTodayStats,
} from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "anonymous";
  const stats = await getUserStats(userId);
  return NextResponse.json({ success: true, stats });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, payload } = body;
    const activeUserId = userId || "anonymous";

    let updatedStats;

    switch (action) {
      case "record_session": {
        const { mode = "pomodoro", durationMinutes = 25 } = payload || {};
        updatedStats = await recordStudySession(activeUserId, mode, durationMinutes);
        break;
      }

      case "update_goals": {
        const {
          dailyGoalCycles,
          customFocusDuration,
          customBreakDuration,
          customLongBreakDuration,
        } = payload || {};
        updatedStats = await updateUserGoals(activeUserId, {
          dailyGoalCycles,
          customFocusDuration,
          customBreakDuration,
          customLongBreakDuration,
        });
        break;
      }

      case "reset_today": {
        updatedStats = await resetTodayStats(activeUserId);
        break;
      }

      default: {
        updatedStats = await getUserStats(activeUserId);
        break;
      }
    }

    return NextResponse.json({ success: true, stats: updatedStats });
  } catch (error) {
    console.error("Error in /api/study-stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
