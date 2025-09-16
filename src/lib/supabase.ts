import { createClient } from "@supabase/supabase-js"

// client → ใช้ใน frontend (read-only)
export const supabaseBrowser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// server → ใช้ใน API Routes (มีสิทธิ์ update/delete)
export const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)
