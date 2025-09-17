"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
    const router = useRouter()

    // Login as remembered user
    function loginRemembered() {
        const name = localStorage.getItem("visitor_name")
        const avatar = localStorage.getItem("visitor_avatar")
        const id = localStorage.getItem("visitor_id")

        if (name && avatar && id) {
            sessionStorage.setItem("active_user", "true")
            router.push("/") // กลับไปหน้า main
        } else {
            alert("ไม่มีผู้ใช้ที่จำไว้")
        }
    }

    // Google Login
    async function loginGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/` },
        })
    }

    // Guest Login (ใหม่)
    function loginGuest() {
        localStorage.clear()
        router.push("/") // ไปหน้า main แล้วจะเปิด modal ให้เลือกใหม่
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-6 rounded-lg shadow-lg bg-white w-96 space-y-4">
                <h1 className="text-xl font-bold mb-4">เลือกวิธี Login</h1>
                <Button className="w-full" onClick={loginRemembered}>
                    Login as Remembered User
                </Button>
                <Button className="w-full" variant="outline" onClick={loginGoogle}>
                    Login with Google
                </Button>
                <Button className="w-full" variant="destructive" onClick={loginGuest}>
                    Login as New Guest
                </Button>
            </div>
        </div>
    )
}
