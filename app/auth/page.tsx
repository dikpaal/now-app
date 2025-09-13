"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [showSkillSelection, setShowSkillSelection] = useState(false)
  const router = useRouter()

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    // Google auth logic will be implemented later
    setTimeout(() => {
      setIsLoading(false)
      if (mode === "signup") {
        setShowSkillSelection(true)
      } else {
        router.push("/dashboard")
      }
    }, 2000)
  }

  const handleSkillSelection = (skillType: "push" | "pull") => {
    // Store skill selection in localStorage for now (will be replaced with database later)
    localStorage.setItem("selectedSkillType", skillType)
    router.push("/dashboard")
  }

  if (showSkillSelection) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="/kuzan-logo.png"
                alt="Kuzan Logo"
                width={80}
                height={80}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-slate-800 tracking-tight">Choose Your Path</h1>
              <p className="text-slate-600 mt-2">Select your calisthenics journey to get a personalized roadmap</p>
            </div>
          </div>

          {/* Skill Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Push Static Path */}
            <Card
              className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleSkillSelection("push")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl text-slate-800">Push Static</CardTitle>
                <CardDescription className="text-slate-600">
                  Master pushing movements and build upper body strength
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-700">Your Journey:</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                      <span>1. Elbow Lever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                      <span>2. L-Sit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                      <span>3. Planche</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pull Static Path */}
            <Card
              className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleSkillSelection("pull")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>
                <CardTitle className="font-heading text-xl text-slate-800">Pull Static</CardTitle>
                <CardDescription className="text-slate-600">
                  Develop pulling strength and back muscle control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-700">Your Journey:</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-terracotta-500 rounded-full"></div>
                      <span>1. Back Lever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-terracotta-500 rounded-full"></div>
                      <span>2. Front Lever</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-slate-500">
            <p>Don't worry, you can always change your path later in your dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/kuzan-logo.png"
              alt="Kuzan Logo"
              width={80}
              height={80}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-800 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Join Now"}
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
              {mode === "login" ? "Use your Google account to access Kuzan" : "Create your Kuzan account using Google"}
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
              : "© 2024 Kuzan. All rights reserved."}
          </p>
        </div>
      </div>
    </div>
  )
}
