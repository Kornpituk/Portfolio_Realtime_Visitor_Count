/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/visitor-count/route.ts
import { supabaseServer } from "@/lib/supabase"
import { NextResponse } from "next/server"

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
