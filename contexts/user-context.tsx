"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Resource {
  id: number
  title: string
  description: string
  category: string
}

interface Request {
  id: number
  title: string
  description: string
  status: "pending" | "accepted" | "completed"
}

interface UserInfo {
  name: string
  email: string
  avatar: string
  resources: Resource[]
  requests: Request[]
}

interface UserContextType {
  userInfo: UserInfo
  updateUserInfo: (info: Partial<UserInfo>) => void
  addResource: (resource: Omit<Resource, "id">) => void
  addRequest: (request: Omit<Request, "id">) => void
}

const defaultUserInfo: UserInfo = {
  name: "Sarah Connor",
  email: "sarah.connor@example.com",
  avatar: "/avatars/01.png",
  resources: [],
  requests: [],
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo)

  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo((current) => ({ ...current, ...info }))
  }

  const addResource = (resource: Omit<Resource, "id">) => {
    setUserInfo((current) => ({
      ...current,
      resources: [...current.resources, { ...resource, id: current.resources.length + 1 }],
    }))
  }

  const addRequest = (request: Omit<Request, "id">) => {
    setUserInfo((current) => ({
      ...current,
      requests: [...current.requests, { ...request, id: current.requests.length + 1 }],
    }))
  }

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, addResource, addRequest }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

