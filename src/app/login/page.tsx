"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Github,
  Chrome,
  Sparkles,
  ArrowRight,
  UserCheck,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [hasRememberedUser, setHasRememberedUser] = useState(false);
  const [rememberedUser, setRememberedUser] = useState({
    name: "",
    avatar: "",
  });

  // Check for remembered user on component mount
  useEffect(() => {
    const name = localStorage.getItem("visitor_name");
    const avatar = localStorage.getItem("visitor_avatar");
    const id = localStorage.getItem("visitor_id");

    if (name && avatar && id) {
      setHasRememberedUser(true);
      setRememberedUser({ name, avatar });
    }
  }, []);

  // Login as remembered user
  function loginRemembered() {
    const name = localStorage.getItem("visitor_name");
    const avatar = localStorage.getItem("visitor_avatar");
    const id = localStorage.getItem("visitor_id");

    if (name && avatar && id) {
      sessionStorage.setItem("active_user", "true");
      router.push("/");
    }
  }

  // Google Login
  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  // GitHub Login (เพิ่ม option)
  async function loginGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  // Guest Login
  function loginGuest() {
    localStorage.clear();
    router.push("/");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const, // แก้ไข type ตรงนี้
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <Card className="border-muted/50 shadow-2xl backdrop-blur-sm bg-background/95">
          <CardHeader className="text-center space-y-4 pb-8">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardDescription className="text-base text-muted-foreground">
                Choose your preferred way to continue your journey
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            {/* Remembered User Section */}
            {hasRememberedUser && (
              <motion.div variants={itemVariants}>
                <Button
                  onClick={loginRemembered}
                  className="w-full h-14 bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all duration-300 group"
                  variant="ghost"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-foreground">
                        Continue as {rememberedUser.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pick up where you left off
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>
            )}

            {/* Social Logins */}
            <motion.div variants={itemVariants}>
              <Button
                disabled
                onClick={loginGoogle}
                className="w-full h-12 bg-background hover:bg-muted/50 border border-muted/50 transition-all duration-300 group"
                variant="outline"
              >
                <div className="flex items-center gap-3 w-full">
                  <Chrome className="w-5 h-5 text-red-500" />
                  <span className="flex-1 text-left font-medium">
                    Continue with Google
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                    Soon
                  </span>
                </div>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                disabled
                onClick={loginGitHub}
                className="w-full h-12 bg-background hover:bg-muted/50 border border-muted/50 transition-all duration-300 group"
                variant="outline"
              >
                <div className="flex items-center gap-3 w-full">
                  <Github className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">
                    Continue with GitHub
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                    Soon
                  </span>
                </div>
              </Button>
            </motion.div>

            {/* Guest Login */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={loginGuest}
                className="w-full h-12 bg-blue-300/30 hover:bg-blue-500/50 border border-muted/30 transition-all duration-300 group"
                variant="ghost"
              >
                <div className="flex items-center gap-3 w-full">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium text-muted-foreground">
                    Continue as Guest
                  </span>
                </div>
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center py-4"
            >
              <div className="flex-grow border-t border-muted/30"></div>
              <span className="flex-shrink mx-4 text-sm text-muted-foreground">
                or
              </span>
              <div className="flex-grow border-t border-muted/30"></div>
            </motion.div>

            {/* Email Login (Optional - สามารถเพิ่มในอนาคต) */}
            <motion.div variants={itemVariants}>
              <Button
                className="w-full h-12 bg-background hover:bg-primary hover:text-primary-foreground border border-muted/50 transition-all duration-300 group"
                variant="outline"
                disabled
              >
                <div className="flex items-center gap-3 w-full">
                  <Mail className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">
                    Continue with Email
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                    Soon
                  </span>
                </div>
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <button className="text-primary hover:underline">Terms</button> and{" "}
            <button className="text-primary hover:underline">
              Privacy Policy
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
