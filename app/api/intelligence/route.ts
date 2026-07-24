import { NextRequest, NextResponse } from "next/server";
import { DEMO_INTELLIGENCE_RESPONSE } from "@/lib/demo-data";
import type { IntelligenceRequest, IntelligenceResponse } from "@/lib/types";

// Build Rule 2: this endpoint does NOT write to Zebra, CIS or any production
// database. It returns the demonstration payload only.
// A data-connection task with explicit approval is required before connecting
// to live sources.
// All responses use decisionSignal: "NOT_COMPUTED" until released engines are connected.

export async function POST(request: NextRequest): Promise<NextResponse<IntelligenceResponse>> {
  const body: IntelligenceRequest = await request.json();

  // Validate required fields
  if (!body.timestamp) {
    return NextResponse.json(
      {
        ...DEMO_INTELLIGENCE_RESPONSE,
        decisionSignal: "NOT_COMPUTED",
        decisionReason: "Missing required field: timestamp. Demonstration payload only.",
        answerStatus: "INCOMPLETE_INPUT",
        status: "error",
        missingInput: ["timestamp"],
      },
      { status: 400 }
    );
  }

  // Build Rule 8: always return a labelled demo payload until a live
  // data-connection task is approved and implemented.
  const response: IntelligenceResponse = {
    ...DEMO_INTELLIGENCE_RESPONSE,
    requestId: `DEMO-${Date.now()}`,
    timestamp: new Date().toISOString(),
    isDemoPayload: true,
  };

  return NextResponse.json(response);
}

export async function GET(): Promise<NextResponse<IntelligenceResponse>> {
  // Convenience GET endpoint returns the demonstration payload.
  const response: IntelligenceResponse = {
    ...DEMO_INTELLIGENCE_RESPONSE,
    requestId: `DEMO-${Date.now()}`,
    timestamp: new Date().toISOString(),
    isDemoPayload: true,
  };

  return NextResponse.json(response);
}
