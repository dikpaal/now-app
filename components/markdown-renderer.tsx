"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-1">{children}</h1>
          ),
          h2: ({ children }) => <h2 className="text-base font-medium text-foreground mb-2 mt-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-medium text-foreground mb-2 mt-3">{children}</h3>,
          p: ({ children }) => <p className="text-sm text-foreground mb-2 leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-0.5 mb-3 text-sm text-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-0.5 mb-3 text-sm text-foreground">{children}</ol>
          ),
          li: ({ children }) => <li className="text-sm text-foreground">{children}</li>,
          strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
          code: ({ children }) => (
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground">{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-border pl-3 text-sm text-muted-foreground mb-3">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
