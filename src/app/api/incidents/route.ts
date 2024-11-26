import { NextResponse } from "next/server";
import { query } from "@/utils/client";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM Incident");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch incidents", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      caller_ID,
      personnel_ID,
      address,
      priority,
      description,
      firstName,
      lastName,
      phone,
    } = body;

    const callerReq = await fetch("http://localhost:3000/api/callers", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        address,
      }),
    });

    if (!callerReq.ok) {
      throw new Error("Failed to create caller id");
    }

    const result = await query(
      "INSERT INTO Incident (caller_ID, personnel_ID, address, priority, description) VALUES (?, ?, ?, ?, ?)",
      [caller_ID, personnel_ID, address, priority, description],
    );

    return NextResponse.json({
      message: "Incident created",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create incident", details: error.message },
      { status: 500 },
    );
  }
}
