"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", { theme, language })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("settings")}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t("General Settings")}</CardTitle>
          <CardDescription>{t("Manage Account Settings")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">{t("Dark Mode")}</Label>
            <Switch
              id="darkMode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">{t("language")}</Label>
            <Select value={language} onValueChange={(value: "en" | "es" | "fr") => setLanguage(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("Select Language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>{t("Save")}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

