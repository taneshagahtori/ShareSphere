"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface NotificationContextType {
  showNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  const showNotification = (message: string) => {
    toast({
      description: message,
    })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

