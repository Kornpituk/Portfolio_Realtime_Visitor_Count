import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    // TODO: save to DB / send email
    console.log("📩 New contact:", body)

    return NextResponse.json({ success: true })
}