"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  editable?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({ rating, editable = false, onChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseEnter = (index: number) => {
    if (editable) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0)
    }
  }

  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index)
    }
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          } ${editable ? "cursor-pointer" : ""}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

