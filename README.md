# NOW - AI-Powered Calisthenics Training Platform

A comprehensive calisthenics training platform that combines structured learning roadmaps with AI-powered form analysis and gamified progress tracking. Perfect for beginners and intermediate athletes looking to master static holds like planches, levers, and L-sits.

## 🏗️ Architecture Overview

NOW is a full-stack application with a modern frontend, Python-based AI/ML backend, and sophisticated computer vision capabilities for real-time movement analysis.

### Frontend (Next.js 15 + TypeScript)
- **Framework**: Next.js 15 with App Router for optimal performance
- **Language**: TypeScript for type safety and developer experience
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React hooks with local state management
- **File Upload**: React Dropzone for drag-and-drop photo uploads

### Backend (Python + FastAPI)
- **API Framework**: FastAPI with CORS middleware for cross-origin requests
- **Main Endpoint**: `POST /analyze` - Processes uploaded photos for form analysis
- **Architecture**: Microservices approach with modular Python scripts
- **Integration**: RESTful API connecting frontend to AI/ML pipeline

### AI/ML Pipeline (Computer Vision + LLM)
- **Pose Detection**: Google MediaPipe for human pose estimation
- **Computer Vision**: OpenCV for image processing and analysis
- **Mathematical Engine**: NumPy for precise angle calculations
- **AI Coaching**: Google Gemini 2.5 Flash LLM for personalized feedback
- **Scoring Algorithm**: Custom ML scoring system with exponential decay

## 🎯 Features

### 🗺️ **Structured Learning Roadmaps**
- **Push Static Mastery**: Elbow Lever → L-Sit → Planche progressions
- **Pull Static Mastery**: Back Lever → Front Lever progressions
- Progressive skill unlocking with prerequisites and timelines
- Detailed sub-skill breakdowns (tuck → advanced tuck → straddle → full)
- Interactive training guides with weekly progression plans

### 🔬 **AI-Powered Form Analysis**
- Photo upload with drag-and-drop interface
- Real-time pose detection using MediaPipe ML models
- Biomechanical angle analysis for 16 different calisthenics skills
- AI coaching feedback with personalized improvement suggestions
- Skill-specific analysis with locked mode for focused practice
- Performance scoring (0-100) with 65% proficiency threshold

### 📈 **Progress Tracking & Gamification**
- Individual skill progress monitoring with percentage completion
- Session logging with duration, difficulty ratings, and notes
- Achievement system with unlockable badges and streak tracking
- Visual progress indicators and motivational feedback
- Celebration animations using canvas-confetti

### 🎨 **Modern Design System**
- Clean, minimalistic interface with warm terracotta and sage color palette
- Responsive design optimized for all devices (mobile-first approach)
- Smooth animations and hover effects with Tailwind CSS
- Accessibility-focused with proper contrast ratios and ARIA labels
- Custom typography using Plus Jakarta Sans and DM Sans fonts

## 🛠️ Tech Stack

### Frontend Technologies
\`\`\`json
{
  "framework": "Next.js 15.2.4",
  "language": "TypeScript 5",
  "styling": "Tailwind CSS v4.1.9",
  "ui_library": "Radix UI + shadcn/ui",
  "icons": "Lucide React",
  "fonts": "Plus Jakarta Sans, DM Sans",
  "animations": "Tailwind CSS Animate + Canvas Confetti",
  "file_upload": "React Dropzone",
  "markdown": "React Markdown",
  "charts": "Recharts",
  "analytics": "Vercel Analytics"
}
\`\`\`

### Backend Technologies
\`\`\`json
{
  "api_framework": "FastAPI",
  "language": "Python 3.8+",
  "computer_vision": "OpenCV + MediaPipe",
  "ai_model": "Google Gemini 2.5 Flash",
  "mathematics": "NumPy",
  "http_client": "Requests",
  "cors": "FastAPI CORS Middleware"
}
\`\`\`

### Development Tools
\`\`\`json
{
  "package_manager": "npm",
  "bundler": "Next.js built-in (Turbopack)",
  "linting": "ESLint + Next.js",
  "type_checking": "TypeScript",
  "css_processing": "PostCSS + Autoprefixer"
}
\`\`\`

## 📁 Project Structure

\`\`\`
├── 📁 app/                          # Next.js App Router
│   ├── 🎨 globals.css              # Global styles & design tokens
│   ├── ⚙️ layout.tsx               # Root layout with fonts & metadata
│   ├── 🏠 page.tsx                 # Landing page
│   ├── 📊 dashboard/
│   │   └── page.tsx                # Main dashboard with roadmap progress
│   ├── 🔍 analyze/
│   │   └── page.tsx                # AI form analyzer interface
│   ├── 🎯 skills/
│   │   └── page.tsx                # Roadmap selection & skill overview
│   ├── 📈 progress/
│   │   └── page.tsx                # Progress tracking & achievements
│   ├── 🔐 auth/
│   │   └── page.tsx                # Authentication page
│   └── 📝 login/ & signup/         # Auth flow pages
├── 📁 components/                   # React Components
│   ├── 🏠 landing-page.tsx         # Marketing landing page
│   ├── 🔍 skill-analyzer.tsx       # Form analysis component
│   ├── 📊 progress-tracker.tsx     # Progress logging interface
│   ├── 📷 photo-upload.tsx         # File upload interface
│   ├── 📋 analysis-results.tsx     # AI feedback display
│   └── 📁 ui/                      # Reusable UI components (shadcn/ui)
├── 📁 backend/                      # Python AI/ML Backend
│   ├── 🚀 api.py                   # FastAPI application & routes
│   ├── 🧠 analyze.py               # Main analysis orchestrator
│   ├── 👁️ pose_detector.py         # MediaPipe pose detection
│   ├── 🤖 call_llm.py              # Google Gemini LLM integration
│   ├── 📊 calculate_skill_score.py # ML scoring algorithm
│   ├── 📐 calculate_angle.py       # Mathematical angle calculations
│   └── 📚 skill_rules.py           # Exercise database (16 skills)
├── 📁 lib/
│   └── 🛠️ utils.ts                 # Utility functions & helpers
├── 📁 hooks/                       # Custom React hooks
│   ├── 📱 use-mobile.tsx           # Mobile detection hook
│   └── 🍞 use-toast.ts             # Toast notification hook
└── 📁 public/                      # Static assets
    └── 🖼️ images/                  # Sample images & placeholders
\`\`\`

## 🔬 AI/ML Components Deep Dive

### 1. **Pose Detection Engine** (`pose_detector.py`)
- **Technology**: Google MediaPipe Pose solution
- **Capability**: Extracts 33 body landmarks from uploaded photos
- **Accuracy**: Sub-pixel precision with normalized coordinates
- **Processing**: Real-time pose estimation with confidence scoring

### 2. **Biomechanical Analysis** (`calculate_angle.py`)
- **Mathematics**: Vector-based angle calculations using NumPy
- **Precision**: Calculates joint angles between three body points
- **Application**: Analyzes form for 16 different calisthenics movements

### 3. **Skill Scoring Algorithm** (`calculate_skill_score.py`)
- **Method**: Exponential decay scoring system
- **Range**: 0-100 performance scores for each body angle
- **Threshold**: 65% proficiency required for skill completion
- **Weighting**: Different body angles weighted by importance

### 4. **Exercise Database** (`skill_rules.py`)
- **Coverage**: 16 calisthenics skills (planches, levers, L-sits, etc.)
- **Data**: Optimal angle ranges for each movement pattern
- **Accuracy**: Biomechanically validated movement standards

### 5. **AI Coaching System** (`call_llm.py`)
- **Model**: Google Gemini 2.5 Flash (latest multimodal LLM)
- **Persona**: "FRIEND" - Expert calisthenics coach
- **Capabilities**: Personalized form feedback, safety protocols, progression advice
- **Context**: Comprehensive coaching instructions with movement expertise

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18+ (for frontend)
- **Python**: 3.8+ (for AI/ML backend)
- **Package Manager**: npm or yarn

### Frontend Setup
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd now-calisthenics-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
\`\`\`

### Backend Setup
\`\`\`bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install fastapi uvicorn opencv-python mediapipe numpy requests google-generativeai

# Run FastAPI server
uvicorn api:app --reload --port 8000

# Backend available at http://localhost:8000
\`\`\`

### Environment Variables
\`\`\`bash
# Create .env file in backend/
GOOGLE_API_KEY=your_gemini_api_key_here
\`\`\`

## 🎮 User Journey

1. **Landing Page** (`/`) - Learn about features and get started
2. **Authentication** (`/auth`) - Sign up or log in to track progress
3. **Skills Selection** (`/skills`) - Choose your training roadmap
4. **Dashboard** (`/dashboard`) - Track progress and access current skills
5. **Form Analyzer** (`/analyze`) - Upload photos for AI feedback
6. **Progress Tracking** (`/progress`) - Log sessions and view achievements

## 🎨 Design System

### Color Palette
\`\`\`css
/* Warm, earthy color scheme inspired by natural movement */
--primary: #c17b5a;      /* Terracotta - main actions */
--secondary: #7a8471;    /* Sage green - accents */
--background: #f5f2ed;   /* Light beige - warmth */
--foreground: #3a3a3a;   /* Dark charcoal - text */
--card: #ffffff;         /* Clean white - cards */
--muted: #e8e4dc;        /* Muted beige - subtle backgrounds */
\`\`\`

### Typography
- **Headings**: Plus Jakarta Sans (modern, friendly)
- **Body**: DM Sans (readable, clean)
- **Monospace**: JetBrains Mono (code, technical content)

### Layout Principles
- **Mobile-first**: Responsive design starting from 320px
- **Flexbox**: Primary layout method for most components
- **Grid**: Used for complex 2D layouts (skill cards, dashboards)
- **Spacing**: Consistent 4px base unit with Tailwind scale

## 🔧 Key Components

### Dashboard (`/dashboard`)
- **Roadmap Selection**: Toggle between Push and Pull static training paths
- **Progress Overview**: Visual progress bars with percentage completion
- **Skill Hierarchy**: Expandable cards with sub-progressions
- **Quick Actions**: Direct access to analyzer and training guides
- **Celebration System**: Confetti animations for achievements

### Form Analyzer (`/analyze`)
- **Movement Selection**: Dropdown menus for skill type and progression
- **Photo Processing**: AI analysis with real-time progress indicators
- **Results Display**: Processed image overlay with improvement suggestions
- **Integration**: Seamless access from dashboard for specific skills

### Progress Tracker (`/progress`)
- **Session Logging**: Duration, difficulty rating, and training notes
- **Achievement System**: Unlockable badges for milestones and consistency
- **Statistics**: Overall progress, skills mastered, total training time
- **Quick Updates**: Fast progress increment buttons

## 🔌 API Endpoints

### Backend API (`FastAPI`)
\`\`\`python
# Main analysis endpoint
POST /analyze
{
  "image": "base64_encoded_image",
  "skill": "planche_tuck",
  "user_id": "optional_user_id"
}

# Response
{
  "score": 85,
  "feedback": "Great form! Focus on...",
  "angles": {...},
  "suggestions": [...]
}

# Health check
GET /
{
  "message": "Calisthenics Analysis API",
  "status": "healthy"
}
\`\`\`

## 🧪 Development Notes

### Mock Data
The frontend currently uses realistic mock data for:
- AI analysis results with detailed feedback simulation
- User progress and achievement tracking
- Skill completion status and progression

### Future Integrations
Architecture ready for:
- Real-time database integration (Supabase, PostgreSQL)
- User authentication systems (Auth0, NextAuth.js)
- Social features and community challenges
- Mobile app development (React Native)
- Advanced ML models (custom pose estimation)

### Performance Optimizations
- **Images**: Next.js Image component with automatic optimization
- **Loading**: Lazy loading for better initial page load times
- **State**: Efficient state management with React hooks
- **Bundle**: Tree-shaking and code splitting for minimal bundle size
- **Caching**: Static generation where possible

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling (avoid custom CSS)
- Implement proper error handling
- Add JSDoc comments for complex functions
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Calisthenics Community** - Movement progressions and training insights
- **Google MediaPipe** - Advanced pose detection technology
- **Radix UI & shadcn/ui** - Excellent component primitives
- **Vercel** - Hosting and analytics platform
- **OpenAI & Google** - AI/ML model capabilities

---

**Built with ❤️ for the calisthenics community**
