"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { useNotification } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CardFooter } from "@/components/ui/card"

const statuses = ["pending", "accepted", "completed"]

const initialRequests = [
  { id: 1, title: "Need a lawnmower", description: "For this weekend", status: "pending", requester: "Alice" },
  { id: 2, title: "Looking for Spanish tutor", description: "Beginner level", status: "accepted", requester: "Bob" },
  { id: 3, title: "Graphic design help", description: "Logo design needed", status: "completed", requester: "Charlie" },
  {
    id: 4,
    title: "Borrow a power drill",
    description: "For home renovation project",
    status: "pending",
    requester: "Diana",
  },
  {
    id: 5,
    title: "Math tutor needed",
    description: "For high school calculus",
    status: "accepted",
    requester: "Ethan",
  },
  {
    id: 6,
    title: "Camping gear",
    description: "Tent and sleeping bags for weekend trip",
    status: "pending",
    requester: "Fiona",
  },
  {
    id: 7,
    title: "Moving assistance",
    description: "Need help with heavy lifting",
    status: "completed",
    requester: "George",
  },
  {
    id: 8,
    title: "Camera for event",
    description: "For a wedding next month",
    status: "accepted",
    requester: "Hannah",
  },
  { id: 9, title: "Bicycle for commuting", description: "Needed for a week", status: "pending", requester: "Ian" },
  {
    id: 10,
    title: "Web development advice",
    description: "Help with React project",
    status: "completed",
    requester: "Julia",
  },
]

export default function RequestsPage() {
  const { userInfo, updateUserInfo } = useUser()
  const { showNotification } = useNotification()
  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [newRequest, setNewRequest] = useState({ title: "", description: "", status: "pending" as const })

  useEffect(() => {
    setRequests(userInfo.requests)
  }, [userInfo.requests])

  const filteredRequests = requests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || request.status === statusFilter),
  )

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.description) {
      const updatedRequests = [...userInfo.requests, { ...newRequest, id: userInfo.requests.length + 1 }]
      updateUserInfo({ requests: updatedRequests })
      setNewRequest({ title: "", description: "", status: "pending" })
      showNotification("New request created successfully!")
    }
  }

  const handleUpdateStatus = (id: number, newStatus: string) => {
    const updatedRequests = userInfo.requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request,
    )
    updateUserInfo({ requests: updatedRequests })
    showNotification(`Request status updated to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Request System</h1>

      <div className="flex space-x-2">
        <Input
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Request</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Request</DialogTitle>
            <DialogDescription>Submit a new request for an item or service.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{request.title}</CardTitle>
                <Badge
                  variant={
                    request.status === "pending" ? "secondary" : request.status === "accepted" ? "default" : "outline"
                  }
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p>{request.description}</p>
            </CardContent>
            <CardFooter>
              <Select value={request.status} onValueChange={(value) => handleUpdateStatus(request.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

