"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import type { Mesh, Group } from "three"
import { Button } from "@/components/ui/button"
import {
  Mic,
  Mic2,
  FileText,
  Menu,
  X,
  Copy,
  MessageCircle,
  Bot,
  Waves,
  Headphones,
  Radio,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Rocket,
  Globe,
  Settings,
  BookOpen,
  TestTube,
  UserCheck,
  Languages,
  Cpu,
  Palette,
  Coins,
  BrainCircuit,
  MessagesSquare,
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

function VoiceWaveField() {
  const groupRef = useRef<Group>(null)
  const wavesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }

    wavesRef.current.forEach((wave, i) => {
      if (wave) {
        const time = state.clock.elapsedTime
        wave.position.y = Math.sin(time * 2 + i * 0.5) * 0.5
        wave.scale.y = 1 + Math.sin(time * 3 + i * 0.3) * 0.3
        wave.material.opacity = 0.6 + Math.sin(time * 2 + i * 0.2) * 0.2
      }
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 3 + Math.sin(i * 0.5) * 1
        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.1} floatIntensity={0.3}>
            <mesh
              ref={(el) => {
                if (el) wavesRef.current[i] = el
              }}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              rotation={[0, angle, 0]}
              scale={[0.1, 1, 0.1]}
            >
              <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#ff6b35" : i % 3 === 1 ? "#1a1a1a" : "#fdf8e8"}
                transparent
                opacity={0.7}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function AudioVisualization() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 2
        return (
          <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
            <mesh
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.3, -1]}
              rotation={[0, 0, angle]}
              scale={[0.08, 0.5 + Math.sin(i * 0.5) * 0.3, 0.08]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#ff6b35" : "#fdf8e8"}
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function FloatingElements() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh
            position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15]}
            scale={0.1 + Math.random() * 0.15}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#ff6b35" : i % 3 === 1 ? "#1a1a1a" : "#fdf8e8"}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Scene3D() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ff6b35" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#fdf8e8" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#ff6b35" castShadow />

      <VoiceWaveField />
      <AudioVisualization />
      <FloatingElements />
    </>
  )
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "roadmap", "tokenomics", "usecases"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Roadmap", id: "roadmap" },
    { name: "Tokenomics", id: "tokenomics" },
    { name: "Use Cases", id: "usecases" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black-950/95 backdrop-blur-xl border-b border-orange-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 transform hover:scale-105 transition-all duration-300">
              <Image
                src="/images/halo-logo.png"
                alt="HALO AI Logo"
                width={48}
                height={48}
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-cream-300 bg-clip-text text-transparent">
                HALO AI
              </span>
              <p className="text-[10px] sm:text-xs text-cream-300/70 font-medium">Voice Intelligence</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-semibold text-sm transition-all duration-300 hover:scale-105 relative group py-2 px-1 ${
                  activeSection === item.id ? "text-orange-500 scale-105" : "text-cream-200 hover:text-orange-400"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-cream-400 transition-all duration-300 rounded-full ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold px-4 lg:px-6 py-2 text-sm rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
              Open Dapp
            </Button>
            <Button
              variant="outline"
              className="bg-cream-100/5 border-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300 font-semibold px-4 lg:px-6 py-2 text-sm rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105"
            >
              <FileText className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              Whitepaper
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-cream-200">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id)
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left font-semibold py-3 px-4 rounded-lg transition-colors duration-300 ${
                  activeSection === item.id 
                    ? "text-orange-500 bg-orange-500/10" 
                    : "text-cream-200 hover:text-orange-400 hover:bg-cream-100/5"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="flex flex-col space-y-3 pt-4 px-4 border-t border-orange-500/20">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold">
                Open Dapp
              </Button>
              <Button
                variant="outline"
                className="w-full bg-cream-100/5 border-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Whitepaper
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function AnimatedButton({ children, variant = "default", className = "", ...props }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      className={`relative overflow-hidden group transition-all duration-500 transform hover:scale-105 font-semibold ${
        variant === "primary"
          ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg hover:shadow-orange-500/30"
          : "border-2 border-orange-500 text-orange-500 hover:text-white bg-transparent hover:bg-orange-500/10 shadow-lg hover:shadow-orange-500/20"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-cream-300/20 to-orange-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10 flex items-center justify-center space-x-2">{children}</span>
    </Button>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: any
  title: string
  description: string
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-white/95 to-cream-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-orange-200/50 transition-all duration-700 hover:shadow-orange-500/20 hover:border-orange-400/60 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? "translateY(-8px) scale(1.02)"
          : isVisible
            ? "translateY(0) scale(1)"
            : "translateY(48px) scale(0.95)",
        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-cream-100/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/0 via-orange-400/50 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Floating Particles on Hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/60 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      {/* Icon Container with Enhanced Animation */}
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-xl ${
            isHovered ? "rotate-6 scale-110 shadow-orange-500/40" : ""
          }`}
          style={{
            transform: isHovered ? "rotate(6deg) scale(1.1)" : "rotate(0deg) scale(1)",
            boxShadow: isHovered
              ? "0 20px 40px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 107, 53, 0.2)"
              : "0 10px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Pulsing Ring Effect */}
        {isHovered && <div className="absolute inset-0 rounded-2xl border-4 border-orange-400/60 animate-ping" />}

        {/* Orbiting Dots */}
        {isHovered && (
          <>
            <div
              className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-0 left-0 w-2 h-2 bg-cream-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}
      </div>

      {/* Content with Enhanced Typography */}
      <div className="relative z-10">
        <h3
          className={`text-2xl font-bold text-black-900 mb-6 transition-all duration-500 ${
            isHovered ? "text-orange-700 transform translate-x-1" : ""
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-black-700 leading-relaxed transition-all duration-500 ${
            isHovered ? "text-black-600 transform translate-x-1" : ""
          }`}
        >
          {description}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-cream-400 rounded-b-3xl transition-all duration-500 ${
          isHovered ? "w-full" : "w-0"
        }`}
      />

      {/* Corner Decorations */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-300/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-300/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "Rent a Voice Agent",
      description:
        "Enable users to rent AI-powered voice agents for hosting Telegram AMAs, speaking in podcasts or featuring in videos all trained with their own custom data for a personalized experience.",
    },
    {
      icon: Copy,
      title: "Voice Cloning Studio",
      description:
        "Clone any voice with a short sample. Maintain tone, accent and emotion to create realistic personalized audio for dubbing, narration or character voice replication.",
    },
    {
      icon: MessageCircle,
      title: "Conversational AI",
      description:
        "HALO AI agents integrate Whisper ASR for real-time speech-to-text conversion, GPT-based LLMs for natural language understanding, and TTS for generating spoken responses, enabling smooth, real-time voice interactions. They support dynamic back-and-forth dialogue, memory retention, interrupt handling, and emotion tagging for more context-aware and human-like conversations.",
    },
    {
      icon: Waves,
      title: "Voice Design",
      description:
        "Transform your voice in real-time. Change tone, age, gender or accent. Perfect for content creators, streamers or anyone exploring voice-based creative expression.",
    },
    {
      icon: Bot,
      title: "Custom Voice Agents",
      description:
        "Build AI voice agents trained on your own data (human-like ) to deliver personalized, human-like responses for any use case.",
    },
    {
      icon: Radio,
      title: "Text-to-Speech",
      description:
        "HALO AI uses a low-latency neural TTS engine (FastSpeech2 + HiFi-GAN) to deliver fluent, human-like speech across 38+ languages. Emotionally responsive, multilingual and optimised for real-time interactions.",
    },
  ]

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-black-950 via-black-900 to-cream-50/10 relative overflow-hidden"
    >
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-orange-500/20 to-cream-400/20 blur-xl animate-float"
            style={{
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={`grid-${i}`}
                className="border border-orange-500/20 animate-pulse"
                style={{
                  animationDelay: `${(i * 50) % 3000}ms`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Gradient Waves */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-pulse" />
          <div
            className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream-400/30 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Particle System */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-cream-400/20 rounded-full text-orange-400 text-sm font-semibold border border-orange-500/30 backdrop-blur-sm">
              Our Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-cream-100 mb-6">
            What{" "}
            <span className="bg-gradient-to-r from-orange-500 to-cream-300 bg-clip-text text-transparent">Halo AI</span>{" "}
            Offers?
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-cream-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-cream-200 max-w-4xl mx-auto leading-relaxed">
            Transforming the voice layer of Web3 with advanced AI voice agents, intelligent automation and immersive speech technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Alpha Launch",
      items: [
        "Token Launch with website V1",
        "Release of technical documentation and whitepaper V1",
        "Providing core updates and sneak peeks on the utility",
        "Coin Gecko listing",
        "KOL Promotions",
        "Internal testing of Dapp with Conversational AI and STS modules",
        "Onboarding initial users for closed testing and feedback",
      ],
      color: "from-orange-500 to-orange-600",
      icons: [Rocket, BookOpen, Settings, Globe, Users, TestTube, UserCheck],
    },
    {
      phase: "Phase 2",
      title: "Voice Tech Public Beta",
      items: [
        "Multilingual TTS system (38+ languages)",
        "Launch of real-time Conversational AI Agents",
        "Voice Cloning (Instant + Professional Tier)",
        "Voice Changer (beta): Modify tone, gender and age",
        "Website V2, White-paper v2",
      ],
      color: "from-orange-500 to-orange-600",
      icons: [Languages, Cpu, Copy, Palette, FileText],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="py-24 bg-gradient-to-b from-black-950 via-black-900 to-black-800 relative overflow-hidden"
    >
      {/* Enhanced Professional Background Animation */}
      <div className="absolute inset-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`mesh-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-orange-500/20 via-cream-400/10 to-orange-600/20 blur-3xl animate-pulse"
              style={{
                width: `${200 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 300}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Moving Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`diamond-${i}`}
                className="absolute border border-orange-500/40 rotate-45 animate-float"
                style={{
                  width: "20px",
                  height: "20px",
                  left: `${(i % 8) * 12.5}%`,
                  top: `${Math.floor(i / 8) * 20}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Flowing Energy Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`energy-line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-pulse"
              style={{
                top: `${10 + i * 10}%`,
                left: "0%",
                right: "0%",
                animationDelay: `${i * 0.8}s`,
                animationDuration: "4s",
                transform: `translateX(${Math.sin(i) * 20}px)`,
              }}
            />
          ))}
        </div>

        {/* Orbiting Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`orbit-particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-br from-orange-400/60 to-cream-400/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Radial Gradient Overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-orange-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-cream-400/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-scan" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-cream-400/20 rounded-full text-orange-400 text-sm font-semibold border border-orange-500/30 backdrop-blur-sm">
              Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-cream-100 mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-cream-300 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-cream-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-cream-200 max-w-4xl mx-auto leading-relaxed">
            Our strategic roadmap outlines the key milestones and innovations that will shape the future of voice AI
            technology
          </p>
        </div>

        <div className="space-y-16">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="flex flex-col lg:flex-row items-start gap-12">
                {/* Phase Header */}
                <div className="lg:w-1/3">
                  <div className="sticky top-32">
                    <div
                      className={`inline-block px-8 py-4 bg-gradient-to-r ${item.color} text-white rounded-2xl text-lg font-bold shadow-xl mb-6`}
                    >
                      {item.phase}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">{item.title}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-cream-400 rounded-full" />
                  </div>
                </div>

                {/* Phase Content */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 gap-4">
                    {item.items.map((feature, featureIndex) => {
                      const IconComponent = item.icons[featureIndex] || Settings
                      return (
                        <div
                          key={featureIndex}
                          className={`group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-white/95 to-cream-50/90 backdrop-blur-xl border border-orange-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                          }`}
                          style={{ transitionDelay: `${index * 300 + featureIndex * 100}ms` }}
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-black-800 font-semibold text-lg group-hover:text-orange-700 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              {index < roadmapItems.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-cream-400 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TokenomicsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const tokenomicsData = [
    { label: "Name", value: "HALO AI", icon: DollarSign, color: "from-orange-500 to-orange-600" },
    { label: "Token Name", value: "$HALO", icon: TrendingUp, color: "from-cream-400 to-cream-500" },
    { label: "Decimal", value: "9", icon: Zap, color: "from-black-600 to-black-700" },
    { label: "Total Supply", value: "1M", icon: Users, color: "from-orange-600 to-cream-400" },
  ]

  return (
    <section
      ref={sectionRef}
      id="tokenomics"
      className="py-20 bg-gradient-to-b from-black-900 to-black-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-6">
            <span className="block bg-gradient-to-r from-orange-500 to-cream-300 bg-clip-text text-transparent">
              TOKENOMICS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-cream-400 mx-auto rounded-full" />
          <p className="text-lg text-cream-200 mt-6 max-w-3xl mx-auto">
            Sustainable tokenomics designed for long-term growth and community value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {tokenomicsData.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`group relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-black-800/80 to-black-700/60 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/50 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 text-center">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-cream-100 mb-1 sm:mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {item.label}
                  </h3>

                  <p className="text-xl sm:text-2xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                    {item.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black-800/80 to-black-700/60 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/50 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-cream-100 mb-2 group-hover:text-orange-300 transition-colors duration-300">
                Chain
              </h3>
              <p className="text-2xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                Ethereum
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const useCases = [
    {
      title: "AMA Hosting",
      description: "Rent a HALO voice agent trained on your project content and let it host or co-host your AMA sessions on Telegram or even as a podcast guest.",
      icon: Headphones,
      color: "from-orange-500 to-orange-600",
      features: [
        "Save time without losing presence",
        "Deliver consistent, brand-aligned messaging",
        "Use your own cloned voice for authenticity"
      ],
    },
    {
      title: "Voice-Based Tokenomics Explainers",
      description: "Train an AI agent on your whitepaper and tokenomics. Let it speak to new users in simple, engaging language.",
      icon: Radio,
      color: "from-cream-400 to-cream-500",
      features: [
        "Available 24/7",
        "Works across languages",
        "Reduces manual explanation effort"
      ],
    },
    {
      title: "Voice Cloning for Content Creation",
      description: "Clone your voice once then generate narrations, intros, voiceovers and ad reads in minutes.",
      icon: Bot,
      color: "from-black-600 to-black-700",
      features: [
        "Create short-form and long-form content hands-free",
        "Translate and voice content into multiple languages",
        "Maintain consistency even when scaling production"
      ],
    },
    {
      title: "Podcast & Video Narration",
      description: "Use HALO's text-to-speech or speech-to-speech features to narrate scripts, automate episode summaries or clone your voice for multilingual audio distribution.",
      icon: MessageCircle,
      color: "from-orange-600 to-cream-400",
      features: [
        "Ideal for growth-stage media brands",
        "Supports storytelling, promotional and educational tones"
      ],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="usecases"
      className="py-20 bg-gradient-to-b from-black-950 to-black-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-6">
            <span className="block bg-gradient-to-r from-orange-500 to-cream-300 bg-clip-text text-transparent">
              Use Cases
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-cream-400 mx-auto rounded-full" />
          <p className="text-lg text-cream-200 mt-6 max-w-3xl mx-auto">
            Transforming industries with cutting-edge voice AI technology and intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <div
                key={index}
                className={`group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-black-800/80 to-black-700/60 backdrop-blur-xl border border-orange-500/20 hover:border-orange-400/50 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-center sm:text-left text-lg sm:text-xl font-bold text-cream-100 group-hover:text-orange-300 transition-colors duration-300">
                      {useCase.title}
                    </h3>
                  </div>

                  <p className="text-cream-200 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-cream-100 transition-colors duration-300">
                    {useCase.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg bg-black-900/60 border border-orange-500/20"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span className="text-cream-200 font-medium text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function InfiniteSwiperSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      title: "Custom Voice Agents",
      icon: BrainCircuit,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Rent a Voice Agent",
      icon: Mic2,
      color: "from-cream-400 to-cream-500",
    },
    {
      title: "Conversational AI",
      icon: MessagesSquare,
      color: "from-orange-600 to-orange-700",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-black-950 to-black-900 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute w-full h-24 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-wave"
              style={{
                top: `${25 + i * 25}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${i * 2}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex overflow-hidden">
          <div
            className="flex animate-infinite-scroll whitespace-nowrap"
            style={{ animationDuration: "20s" }}
          >
            {[...features, ...features].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`inline-flex items-center justify-center space-x-4 mx-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index % features.length) * 200}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-cream-100">{feature.title}</span>
                </div>
              )
            })}
          </div>
          <div
            className="flex animate-infinite-scroll whitespace-nowrap"
            style={{ animationDelay: "10s", animationDuration: "20s" }}
          >
            {[...features, ...features].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={`second-${index}`}
                  className={`inline-flex items-center justify-center space-x-4 mx-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index % features.length) * 200}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-cream-100">{feature.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )

  const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-black-950 via-black-900 to-black-950 text-cream-100 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-black-700 rounded-xl flex items-center justify-center shadow-lg p-2">
                <Image
                  src="/images/halo-logo.png"
                  alt="HALO AI Logo"
                  width={48}
                  height={48}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-cream-200 bg-clip-text text-transparent">
                  HALO AI
                </h3>
                <p className="text-xs sm:text-sm text-cream-300">Voice Intelligence Platform</p>
              </div>
            </div>
            <p className="text-cream-200 text-sm sm:text-base leading-relaxed text-center sm:text-left">
              Transforming the voice layer of Web3 with advanced AI voice agents, intelligent automation and immersive speech technology
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-cream-100 text-center sm:text-left">Connect With Us</h4>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://t.me/haloaiportal"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-center text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 p-4 rounded-xl bg-cream-100/5 backdrop-blur-sm border border-orange-400/20 hover:bg-cream-100/10 hover:border-orange-400/40 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <TelegramIcon />
                </div>
                <div>
                  <h5 className="font-semibold text-cream-100 group-hover:text-white transition-colors duration-300">
                    Telegram
                  </h5>
                  <p className="text-cream-300 text-sm group-hover:text-cream-200 transition-colors duration-300">
                    Join our community
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fhaloaieth"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-center text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 p-4 rounded-xl bg-cream-100/5 backdrop-blur-sm border border-orange-400/20 hover:bg-cream-100/10 hover:border-orange-400/40 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-black-800 to-black-950 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <TwitterIcon />
                </div>
                <div>
                  <h5 className="font-semibold text-cream-100 group-hover:text-white transition-colors duration-300">
                    Twitter
                  </h5>
                  <p className="text-cream-300 text-sm group-hover:text-cream-200 transition-colors duration-300">
                    Follow for updates
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-400/20 my-6 sm:my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-cream-200 text-xs sm:text-sm">© 2024 HALO AI. All rights reserved.</p>
            <div className="flex space-x-4 text-cream-300 text-xs sm:text-sm">
              <a href="#" className="hover:text-cream-100 transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-cream-100 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-cream-200 text-xs sm:text-sm">Powered by Voice AI</span>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function HaloAIHero() {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }
      
      * {
        scroll-behavior: smooth;
      }
      
      body {
        overflow-x: hidden;
      }
      
      @keyframes scan {
  0% { 
    transform: translateY(-100vh) scaleX(0.5); 
    opacity: 0;
  }
  50% { 
    opacity: 1;
    transform: translateY(50vh) scaleX(1);
  }
  100% { 
    transform: translateY(200vh) scaleX(0.5); 
    opacity: 0;
  }
}

.animate-scan {
  animation: scan 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  33% { 
    transform: translateY(-20px) rotate(1deg); 
  }
  66% { 
    transform: translateY(-10px) rotate(-1deg); 
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes wave {
  0% {
    transform: translateX(-100%) translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateX(0) translateY(-20px) rotate(0deg);
  }
  100% {
    transform: translateX(100%) translateY(0) rotate(2deg);
  }
}

.animate-wave {
  animation: wave 8s linear infinite;
}

@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll linear infinite;
}
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="relative">
      <Navigation />

      <div
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-orange-950/20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} shadows>
            <Suspense fallback={null}>
              <Scene3D />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 text-center pt-16 sm:pt-20">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-cream-100 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-orange-500 via-cream-300 to-orange-400 bg-clip-text text-transparent">
                  Voice Intelligence
                </span>
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cream-200 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
                Transforming the voice layer of Web3 with advanced AI voice agents, intelligent automation and immersive speech technology
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 w-full max-w-lg mx-auto px-3 sm:px-0">
              <div className="flex items-center justify-center space-x-2 bg-cream-100/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-orange-400/20">
                <span className="text-cream-200 text-xs sm:text-sm whitespace-nowrap">CA: </span>
                <div className="flex-1 overflow-hidden">
                  <code className="text-orange-400 text-[10px] xs:text-xs sm:text-sm block truncate">0xd8213956452dcb73e6085a6189f38e60a5e065f0</code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("0xd8213956452dcb73e6085a6189f38e60a5e065f0")
                    toast.success("Contract address copied to clipboard!")
                  }}
                  className="ml-1 sm:ml-2 p-1 sm:p-1.5 rounded-md hover:bg-cream-100/10 transition-colors duration-300 flex-shrink-0"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-cream-300" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-3 sm:px-0">
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto min-w-[200px] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-lg"
              >
                <span>Buy $HALO</span>
              </AnimatedButton>

              <a 
                href="https://t.me/haloaiportal" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AnimatedButton 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[200px] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-lg"
                >
                  <span>Join Us</span>
                </AnimatedButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <RoadmapSection />
      <TokenomicsSection />
      <UseCasesSection />
      <InfiniteSwiperSection />
      <Footer />
    </div>
  )
}
