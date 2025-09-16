/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"

export async function GET() {
    try {
        // อ่านค่าปัจจุบัน
        const { data, error } = await supabaseServer
            .from("visitors")
            .select("count")
            .eq("id", 1)
            .single()

        if (error) throw error

        const newCount = (data?.count ?? 0) + 1

        // update +1
        const { error: updateError } = await supabaseServer
            .from("visitors")
            .update({ count: newCount })
            .eq("id", 1)

        if (updateError) throw updateError

        return NextResponse.json({ count: newCount })
    } catch (err: any) {
        console.error("Visitor API error:", err.message)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
