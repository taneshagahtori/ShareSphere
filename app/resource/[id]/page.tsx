"use client"

import { useState } from "react"
import { StarRating } from "@/components/star-rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Mock data for a resource
const resource = {
  id: 1,
  title: "Lawnmower",
  description: "Available for weekend use",
  owner: "John Doe",
  averageRating: 4.5,
}

// Mock data for reviews
const initialReviews = [
  { id: 1, user: "Alice", rating: 5, comment: "Great lawnmower, works perfectly!" },
  { id: 2, user: "Bob", rating: 4, comment: "Good condition, but a bit loud." },
]

export default function ResourcePage({ params }: { params: { id: string } }) {
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" })

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.comment) {
      setReviews([...reviews, { id: reviews.length + 1, user: "Current User", ...newReview }])
      setNewReview({ rating: 0, comment: "" })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{resource.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Owner: {resource.owner}</p>
          <div className="flex items-center mt-2">
            <StarRating rating={resource.averageRating} />
            <span className="ml-2 text-sm text-muted-foreground">({resource.averageRating.toFixed(1)})</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Request to Borrow</Button>
        </CardFooter>
      </Card>
      <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{review.user[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{review.user}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <StarRating rating={review.rating} />
              <p className="mt-2">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <StarRating
              rating={newReview.rating}
              editable
              onChange={(rating) => setNewReview({ ...newReview, rating })}
            />
            <Textarea
              placeholder="Write your review here..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitReview}>Submit Review</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

