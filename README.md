# Calisthenics Skill Analyzer

A modern web app for calisthenics beginners to upload photos of their skills and receive AI-powered feedback to improve their form.

## Features

- **Photo Upload**: Drag-and-drop interface for skill photos
- **AI Analysis**: Processing with real-time progress tracking
- **Detailed Feedback**: Markdown-formatted analysis with strengths, improvements, and training plans
- **Minimalist Design**: Clean, cozy interface with neutral colors
- **Responsive**: Works seamlessly on all device sizes

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Markdown**: React Markdown with custom styling
- **Fonts**: Geist Sans & Mono

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page component
├── components/
│   ├── skill-analyzer.tsx   # Main analyzer component
│   ├── photo-upload.tsx     # Upload interface
│   ├── analysis-results.tsx # Results display
│   └── markdown-renderer.tsx # Markdown formatting
├── lib/
│   └── utils.ts             # Utility functions
└── public/
    └── calisthenics-skill-analysis-overlay.jpg # Sample processed image
\`\`\`

## Usage

1. Upload a clear, well-lit photo of your calisthenics skill
2. Click "Analyze" to process the image
3. View the AI-enhanced image and detailed feedback
4. Follow the personalized training recommendations

## Development

This project uses dummy API endpoints for demonstration. To integrate with a real backend:

1. Replace the mock analysis in `components/skill-analyzer.tsx`
2. Update the API endpoints to your actual image processing service
3. Configure environment variables for your AI/ML services
