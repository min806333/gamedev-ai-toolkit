import { NextResponse } from "next/server";

export function getInternalErrorMessage(error: unknown, fallback = "Internal server error") {
  if (process.env.NODE_ENV === "development" && error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function createInternalServerErrorResponse(error: unknown, fallback = "Internal server error", status = 500) {
  return NextResponse.json({ error: getInternalErrorMessage(error, fallback) }, { status });
}

