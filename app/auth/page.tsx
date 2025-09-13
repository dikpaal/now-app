"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    // Google auth logic will be implemented later
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/kuzan-logo.png"
              alt="KUZAN Logo"
              width={80}
              height={80}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-800 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Join KUZAN"}
            </h1>
            <p className="text-slate-600 mt-2">
              {mode === "login"
                ? "Sign in to continue your calisthenics journey"
                : "Start your calisthenics journey with AI-powered analysis"}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="font-heading text-xl text-slate-800">
              {mode === "login" ? "Sign In with Google" : "Sign Up with Google"}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {mode === "login" ? "Use your Google account to access KUZAN" : "Create your KUZAN account using Google"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading
                ? mode === "login"
                  ? "Signing In..."
                  : "Creating Account..."
                : mode === "login"
                  ? "Continue with Google"
                  : "Sign Up with Google"}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors duration-300"
              >
                {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>
            {mode === "signup"
              ? "By signing up, you agree to our Terms of Service and Privacy Policy"
              : "© 2024 KUZAN. All rights reserved."}
          </p>
        </div>
      </div>
    </div>
  )
}
