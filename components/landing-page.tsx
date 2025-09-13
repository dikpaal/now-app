"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, TrendingUp, Star } from "lucide-react"
import { useEffect, useRef } from "react"

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .stagger-children > *")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-in fade-in-left duration-700">
            <Image
              src="/kuzan-logo.png"
              alt="Now Logo"
              width={40}
              height={40}
              className="rounded-lg transition-transform hover:scale-110 duration-300"
            />
            <span className="font-heading text-2xl font-bold text-foreground">NOW</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 animate-in fade-in-right duration-700">
            <Link
              href="#features"
              className="text-foreground hover:text-secondary transition-all duration-300 hover:scale-105"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground hover:text-secondary transition-all duration-300 hover:scale-105"
            >
              Reviews
            </Link>
            <Link
              href="/auth"
              className="text-foreground hover:text-secondary transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/auth">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground border-secondary font-medium fade-in-up animate-in duration-700 delay-100 hover:scale-105 transition-transform">
            AI-Powered Movement Analysis
          </Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance fade-in-up animate-in duration-700 delay-200">
            Master{" "}
            <span className="text-secondary font-bold bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent animate-pulse">
              Calisthenics
            </span>{" "}
            with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty fade-in-up animate-in duration-700 delay-300">
            Follow personalized roadmaps, track your progress, and get instant AI-powered feedback on your calisthenics
            form. Master skills from elbow lever to planche with guided learning paths.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up animate-in duration-700 delay-400">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <Link href="/auth">
                Start Your Journey{" "}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent border-2 border-secondary/30 text-foreground hover:bg-secondary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/analyze">Try Analyzer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="relative max-w-4xl mx-auto fade-in-up animate-in duration-700 delay-500">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <img
                src="/calisthenics-athlete-performing-perfect-planche-on.jpg"
                alt="Calisthenics athlete performing planche"
                className="w-full h-96 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-in-up animate-in duration-700">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Why Choose NOW?</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Gamified learning paths meet advanced AI technology to give you the structured guidance and feedback you
              need to excel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-100">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
                  <svg
                    className="h-8 w-8 text-secondary transition-transform duration-300 hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Structured Roadmaps</h3>
                <p className="text-foreground/70">
                  Follow proven learning paths from beginner to advanced. Master elbow lever, L-sit, planche, and more
                  with step-by-step guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-200">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
                  <TrendingUp className="h-8 w-8 text-secondary transition-transform duration-300 hover:rotate-12" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Gamified Progress</h3>
                <p className="text-foreground/70">
                  Track your improvement with detailed progress bars, achievements, and milestone celebrations. Stay
                  motivated with visual feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-300">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
                  <Target className="h-8 w-8 text-secondary transition-transform duration-300 hover:rotate-12" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">AI Form Analysis</h3>
                <p className="text-foreground/70">
                  Get instant, precise feedback on your form at every step of your journey. Perfect your technique with
                  AI-powered analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-in-up animate-in duration-700">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-foreground/80">Start your calisthenics journey in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto stagger-children">
            <div className="text-center fade-in-up animate-in duration-700 delay-100 hover:scale-105 transition-transform duration-300">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Choose Your Path</h3>
              <p className="text-foreground/70">
                Select between Push Static (elbow lever → L-sit → planche) or Pull Static (back lever → front lever)
                roadmaps.
              </p>
            </div>

            <div className="text-center fade-in-up animate-in duration-700 delay-200 hover:scale-105 transition-transform duration-300">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Follow Your Roadmap</h3>
              <p className="text-foreground/70">
                Progress through structured milestones, track your improvement, and unlock achievements as you master
                each skill.
              </p>
            </div>

            <div className="text-center fade-in-up animate-in duration-700 delay-300 hover:scale-105 transition-transform duration-300">
              <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Analyze & Improve</h3>
              <p className="text-foreground/70">
                Use our AI form analyzer at each step to get detailed feedback and perfect your technique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-in-up animate-in duration-700">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">What Athletes Say</h2>
            <p className="text-xl text-foreground/80">
              Join thousands of calisthenics enthusiasts improving their skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-100">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-secondary fill-current transition-transform duration-300 hover:scale-125"
                    />
                  ))}
                </div>
                <p className="text-foreground/70 mb-6">
                  "NOW helped me perfect my planche form. The AI feedback is incredibly detailed and accurate."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-3 transition-transform duration-300 hover:scale-110">
                    <span className="text-foreground font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Marcus Johnson</p>
                    <p className="text-sm text-muted-foreground">Calisthenics Coach</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-200">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-secondary fill-current transition-transform duration-300 hover:scale-125"
                    />
                  ))}
                </div>
                <p className="text-foreground/70 mb-6">
                  "Finally achieved my first handstand thanks to the personalized feedback. Game changer!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-3 transition-transform duration-300 hover:scale-110">
                    <span className="text-foreground font-semibold">SC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Fitness Enthusiast</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/20 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-up animate-in duration-700 delay-300">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-secondary fill-current transition-transform duration-300 hover:scale-125"
                    />
                  ))}
                </div>
                <p className="text-foreground/70 mb-6">
                  "The progress tracking feature keeps me motivated. I can see my improvement over time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-3 transition-transform duration-300 hover:scale-110">
                    <span className="text-foreground font-semibold">DR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">David Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Personal Trainer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto fade-in-up animate-in duration-700">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to Transform Your Training?</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Join thousands of athletes following structured roadmaps to master advanced calisthenics skills with NOW.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <Link href="/auth">
                  Start Your Journey{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent border-2 border-secondary/30 text-foreground hover:bg-secondary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/analyze">Try Form Analyzer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center fade-in-up animate-in duration-700">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 transition-transform duration-300 hover:scale-105">
              <Image src="/kuzan-logo.png" alt="Now Logo" width={32} height={32} className="rounded-lg" />
              <span className="font-heading text-xl font-bold text-foreground">NOW</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-secondary transition-all duration-300 hover:scale-105">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-all duration-300 hover:scale-105">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-secondary transition-all duration-300 hover:scale-105">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 NOW. All rights reserved. Elevate your calisthenics journey.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translate(0);
        }
        
        .stagger-children > * {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .stagger-children > *.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
