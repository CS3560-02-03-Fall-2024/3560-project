import { NextResponse } from "next/server";
import { query } from "@/utils/client";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM Caller");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch callers", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, address, phone_number } = body;

    const result = await query(
      "INSERT IGNORE INTO Caller (first_name, last_name, address, phone_number) VALUES (?, ?, ?, ?)",
      [first_name, last_name, address, phone_number],
    );

    return NextResponse.json({ message: "Caller added", id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add caller", details: error.message },
      { status: 500 },
    );
  }
}
