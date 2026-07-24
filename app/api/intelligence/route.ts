import { NextRequest, NextResponse } from "next/server";
import { DEMO_INTELLIGENCE_RESPONSE } from "@/lib/demo-data";
import type { IntelligenceRequest, IntelligenceResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<IntelligenceResponse>> {
  const body = (await request.json()) as IntelligenceRequest;

  if (!body.timestamp) {
    return NextResponse.json(
      {
        ...DEMO_INTELLIGENCE_RESPONSE,
        decisionSignal: "NOT_COMPUTED",
        decisionReason:
          "Missing required field: timestamp. Demonstration payload only.",
        answerStatus: "INCOMPLETE_INPUT",
        calculationStatus: "INCOMPLETE_INPUT",
        status: "error",
        missingInput: ["timestamp"],
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ...DEMO_INTELLIGENCE_RESPONSE,
    requestId: `DEMO-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
}

export async function GET(): Promise<NextResponse<IntelligenceResponse>> {
  return NextResponse.json({
    ...DEMO_INTELLIGENCE_RESPONSE,
    requestId: `DEMO-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
}
