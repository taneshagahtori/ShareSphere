"use client"

import { useState } from "react"
import { ResourceCard } from "@/components/resource-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for resources
const initialResources = [
  { id: 1, title: "Lawnmower", description: "Available for weekend use", owner: "John Doe" },
  { id: 2, title: "Drill", description: "Cordless power drill", owner: "Jane Smith" },
  { id: 3, title: "Ladder", description: "8-foot aluminum ladder", owner: "Bob Johnson" },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState(initialResources)
  const [newResource, setNewResource] = useState({ title: "", description: "" })

  const handleAddResource = () => {
    if (newResource.title && newResource.description) {
      setResources([...resources, { ...newResource, id: resources.length + 1, owner: "Current User" }])
      setNewResource({ title: "", description: "" })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Community Resources</h1>
      <div className="flex space-x-2">
        <Input placeholder="Search resources..." className="max-w-sm" />
        <Button className="bg-green-600 hover:bg-green-700">Search</Button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">Add New Resource</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Resource Title"
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            />
            <Textarea
              placeholder="Resource Description"
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            />
            <Button onClick={handleAddResource} className="w-full bg-green-600 hover:bg-green-700">
              Save Resource
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}

