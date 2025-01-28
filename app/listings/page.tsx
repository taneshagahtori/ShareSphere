"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { useNotification } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const initialListings = [
  { id: 1, title: "Lawnmower", description: "Available for weekend use", category: "Tools", owner: "John Doe" },
  {
    id: 2,
    title: "Graphic Design Services",
    description: "Logo and branding design",
    category: "Services",
    owner: "Jane Smith",
  },
  {
    id: 3,
    title: "Spanish Lessons",
    description: "One-on-one Spanish tutoring",
    category: "Education",
    owner: "Maria Garcia",
  },
  { id: 4, title: "Power Drill", description: "Cordless drill, barely used", category: "Tools", owner: "Mike Johnson" },
  {
    id: 5,
    title: "Camping Tent",
    description: "4-person tent, great condition",
    category: "Outdoor",
    owner: "Emily Brown",
  },
  {
    id: 6,
    title: "Math Tutoring",
    description: "High school and college level",
    category: "Education",
    owner: "David Lee",
  },
  {
    id: 7,
    title: "Professional Camera",
    description: "DSLR camera for events",
    category: "Electronics",
    owner: "Sarah Wilson",
  },
  { id: 8, title: "Moving Boxes", description: "Various sizes available", category: "Home", owner: "Chris Taylor" },
  {
    id: 9,
    title: "Bicycle",
    description: "Mountain bike, good for trails",
    category: "Sports",
    owner: "Lisa Anderson",
  },
  {
    id: 10,
    title: "Coding Help",
    description: "Assistance with web development",
    category: "Services",
    owner: "Alex Martinez",
  },
]

const categories = ["Tools", "Services", "Education", "Outdoor", "Electronics", "Home", "Sports"]

export default function ListingsPage() {
  const { userInfo, updateUserInfo } = useUser()
  const { showNotification } = useNotification()
  const [listings, setListings] = useState(initialListings)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [newListing, setNewListing] = useState({ title: "", description: "", category: "" })
  const [editingListing, setEditingListing] = useState<(typeof listings)[0] | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    setListings(initialListings)
  }, [])

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || listing.category === categoryFilter),
  )

  const handleCreateListing = () => {
    if (newListing.title && newListing.description && newListing.category) {
      const updatedResources = [...userInfo.resources, { ...newListing, id: userInfo.resources.length + 1 }]
      updateUserInfo({ resources: updatedResources })
      setNewListing({ title: "", description: "", category: "" })
      showNotification("New resource created successfully!")
    }
  }

  const handleUpdateListing = () => {
    if (editingListing) {
      const updatedResources = userInfo.resources.map((resource) =>
        resource.id === editingListing.id ? { ...resource, ...editingListing } : resource,
      )
      updateUserInfo({ resources: updatedResources })
      setEditingListing(null)
      setIsEditDialogOpen(false)
      showNotification("Resource updated successfully!")
    }
  }

  const handleEditClick = (listing: (typeof listings)[0]) => {
    setEditingListing(listing)
    setIsEditDialogOpen(true)
  }

  const handleDeleteListing = (id: number) => {
    const updatedResources = userInfo.resources.filter((resource) => resource.id !== id)
    updateUserInfo({ resources: updatedResources })
    showNotification("Resource deleted successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Listings Management</h1>

      <div className="flex space-x-2">
        <Input
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Listing</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>Add a new listing to share with the community.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newListing.category}
                onValueChange={(value) => setNewListing({ ...newListing, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateListing}>Create Listing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>{listing.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{listing.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog open={isEditDialogOpen && editingListing?.id === listing.id} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => handleEditClick(listing)}>
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Listing</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={editingListing?.title}
                        onChange={(e) =>
                          setEditingListing(editingListing ? { ...editingListing, title: e.target.value } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingListing?.description}
                        onChange={(e) =>
                          setEditingListing(editingListing ? { ...editingListing, description: e.target.value } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Select
                        value={editingListing?.category}
                        onValueChange={(value) =>
                          setEditingListing(editingListing ? { ...editingListing, category: value } : null)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUpdateListing}>Update Listing</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => handleDeleteListing(listing.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

