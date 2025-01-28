"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { useNotification } from "@/contexts/notification-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const categories = ["Tools", "Services", "Education", "Electronics", "Furniture", "Other"]

export default function ProfilePage() {
  const { userInfo, updateUserInfo, addResource, addRequest } = useUser()
  const { showNotification } = useNotification()
  const [newResource, setNewResource] = useState({ title: "", description: "", category: "" })
  const [newRequest, setNewRequest] = useState({ title: "", description: "", status: "pending" as const })

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserInfo({ [e.target.id]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          updateUserInfo({ avatar: e.target.result })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSaveChanges = () => {
    console.log("Saving changes:", userInfo)
    showNotification("Profile updated successfully!")
  }

  const handleAddResource = () => {
    if (newResource.title && newResource.description && newResource.category) {
      addResource(newResource)
      setNewResource({ title: "", description: "", category: "" })
      showNotification("New resource added successfully!")
    }
  }

  const handleAddRequest = () => {
    if (newRequest.title && newRequest.description) {
      addRequest(newRequest)
      setNewRequest({ title: "", description: "", status: "pending" })
      showNotification("New request added successfully!")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
          <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
          <p className="text-muted-foreground">{userInfo.email}</p>
        </div>
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="resources">My Resources</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={userInfo.name} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userInfo.email} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>My Resources</CardTitle>
              <CardDescription>Manage your shared resources here.</CardDescription>
            </CardHeader>
            <CardContent>
              {userInfo.resources.length > 0 ? (
                <ul className="space-y-2">
                  {userInfo.resources.map((resource) => (
                    <li key={resource.id} className="bg-secondary p-2 rounded">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <p className="text-xs text-muted-foreground">Category: {resource.category}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't shared any resources yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Resource</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Resource</DialogTitle>
                    <DialogDescription>Share a new resource with the community.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resourceTitle">Title</Label>
                      <Input
                        id="resourceTitle"
                        value={newResource.title}
                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resourceDescription">Description</Label>
                      <Textarea
                        id="resourceDescription"
                        value={newResource.description}
                        onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resourceCategory">Category</Label>
                      <Select
                        value={newResource.category}
                        onValueChange={(value) => setNewResource({ ...newResource, category: value })}
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
                    <Button onClick={handleAddResource}>Add Resource</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>Manage your resource requests here.</CardDescription>
            </CardHeader>
            <CardContent>
              {userInfo.requests.length > 0 ? (
                <ul className="space-y-2">
                  {userInfo.requests.map((request) => (
                    <li key={request.id} className="bg-secondary p-2 rounded">
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                      <p className="text-xs text-muted-foreground">Status: {request.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't made any requests yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Make New Request</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make New Request</DialogTitle>
                    <DialogDescription>Request a resource from the community.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="requestTitle">Title</Label>
                      <Input
                        id="requestTitle"
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestDescription">Description</Label>
                      <Textarea
                        id="requestDescription"
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddRequest}>Make Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

