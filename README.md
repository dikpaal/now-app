# Now - Calisthenics Skill Analyzer

A comprehensive calisthenics training platform that combines structured learning roadmaps with AI-powered form analysis and gamified progress tracking. Perfect for beginners and intermediate athletes looking to master static holds like planches, levers, and L-sits.

## Features

### 🎯 **Structured Learning Roadmaps**
- **Push Static Mastery**: Elbow Lever → L-Sit → Planche progressions
- **Pull Static Mastery**: Back Lever → Front Lever progressions
- Progressive skill unlocking with prerequisites
- Detailed sub-skill breakdowns (tuck → advanced tuck → straddle → full)

### 🔬 **AI-Powered Form Analysis**
- Photo upload with drag-and-drop interface
- Real-time processing with progress indicators
- Detailed feedback with strengths, improvements, and training plans
- Skill-specific analysis for precise movement assessment
- Locked mode for focused skill practice

### 📈 **Progress Tracking & Gamification**
- Individual skill progress monitoring with percentage completion
- Session logging with duration, difficulty, and notes
- Achievement system with unlockable badges
- Streak tracking and consistency rewards
- Visual progress indicators and motivational feedback

### 🎨 **Modern Design**
- Clean, minimalistic interface with warm color palette
- Responsive design optimized for all devices
- Smooth animations and hover effects
- Accessibility-focused with proper contrast ratios

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd now-calisthenics-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## User Journey

1. **Landing Page** (`/`) - Learn about features and get started
2. **Skills Selection** (`/skills`) - Choose your training roadmap
3. **Dashboard** (`/dashboard`) - Track progress and access current skills
4. **Form Analyzer** (`/analyze`) - Upload photos for AI feedback
5. **Progress Tracking** (`/progress`) - Log sessions and view achievements

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with custom design system
- **Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Markdown**: React Markdown with custom styling
- **Fonts**: Plus Jakarta Sans (headings) & DM Sans (body)
- **Analytics**: Vercel Analytics

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Landing page
│   ├── dashboard/
│   │   └── page.tsx         # Main dashboard with roadmap progress
│   ├── analyze/
│   │   └── page.tsx         # AI form analyzer
│   ├── skills/
│   │   └── page.tsx         # Roadmap selection and overview
│   └── progress/
│       └── page.tsx         # Progress tracking and achievements
├── components/
│   ├── landing-page.tsx     # Marketing landing page
│   ├── skill-analyzer.tsx   # Form analysis component
│   ├── progress-tracker.tsx # Progress logging interface
│   ├── photo-upload.tsx     # File upload interface
│   ├── analysis-results.tsx # AI feedback display
│   └── ui/                  # Reusable UI components
├── lib/
│   └── utils.ts             # Utility functions
└── public/
    └── images/              # Static assets and sample images
\`\`\`

## Key Components

### Dashboard (`/dashboard`)
- **Roadmap Selection**: Switch between Push and Pull static training paths
- **Progress Overview**: Visual progress bars and completion status
- **Quick Actions**: Direct access to analyzer and training guides
- **Skill Hierarchy**: Expandable skill cards with sub-progressions

### Form Analyzer (`/analyze`)
- **Movement Selection**: Dropdown menus for skill type and progression
- **Photo Processing**: AI analysis simulation with detailed feedback
- **Results Display**: Processed image overlay with improvement suggestions
- **Integration**: Seamless access from dashboard for specific skills

### Progress Tracker (`/progress`)
- **Session Logging**: Duration, difficulty rating, and training notes
- **Achievement System**: Unlockable badges for milestones and consistency
- **Statistics**: Overall progress, skills mastered, total training time
- **Quick Updates**: Fast progress increment buttons

## Customization

### Color Scheme
The app uses a warm, earthy color palette defined in `app/globals.css`:
- **Primary**: Terracotta (#c17b5a) for main actions
- **Secondary**: Sage green (#7a8471) for accents
- **Background**: Light beige (#f5f2ed) for warmth
- **Foreground**: Dark charcoal (#3a3a3a) for text

### Adding New Skills
1. Update the roadmap data in `app/dashboard/page.tsx`
2. Add skill progressions with prerequisites and timeframes
3. Include skill-specific analysis prompts in the analyzer

### Extending Achievements
1. Define new achievement criteria in `app/progress/page.tsx`
2. Add badge designs with rarity levels
3. Implement unlock conditions based on user progress

## Development Notes

### Mock Data
The app currently uses mock data for:
- AI analysis results (realistic feedback simulation)
- User progress and achievements
- Skill completion status

### Future Integrations
Ready for integration with:
- Real AI/ML image processing APIs
- User authentication systems
- Backend progress persistence
- Social features and community challenges

### Performance
- Optimized images with Next.js Image component
- Lazy loading for better initial page load
- Efficient state management with React hooks
- Minimal bundle size with tree-shaking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Calisthenics community for movement progressions and training insights
- Radix UI and shadcn/ui for excellent component primitives
- Vercel for hosting and analytics platform
