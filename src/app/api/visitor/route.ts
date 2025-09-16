/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/api/visitor/route.ts */
import { supabaseServer } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, avatar_url } = await req.json()

    // insert visitor
    const { data, error } = await supabaseServer
      .from("visitors")
      .insert([{ name, avatar_url }])
      .select("id_user") // คืน id_user จาก row ใหม่

    if (error) throw error

    return NextResponse.json({ data: data?.[0] }) // { id_user: "..." }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


export async function GET() {
  try {
    const { count, error } = await supabaseServer
      .from("visitors")
      .select("*", { count: "exact", head: true }) // head:true → ไม่เอาข้อมูล แค่ count

    if (error) throw error

    return NextResponse.json({ count })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}