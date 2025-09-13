"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export function PhotoUpload({ onImageUpload }: PhotoUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onImageUpload(result)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border border-dashed rounded-md p-6 text-center cursor-pointer transition-colors",
        "hover:border-primary/60 hover:bg-muted/30",
        isDragActive && "border-primary bg-muted/50",
        isDragAccept && "border-primary bg-muted/50",
        isDragReject && "border-destructive bg-destructive/5",
      )}
    >
      <input {...getInputProps()} />

      <div className="space-y-3">
        <div className="flex justify-center">
          {isDragActive ? (
            <ImageIcon className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{isDragActive ? "Drop here" : "Upload photo"}</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WebP • Max 10MB</p>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Best results: clear, well-lit, side view</p>
        </div>
      </div>
    </div>
  )
}
