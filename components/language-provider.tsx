"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type Language = "en" | "es" | "fr"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    home: "Home",
    resources: "Resources",
    listings: "Listings",
    requests: "Requests",
    profile: "Profile",
    stats: "Stats",
    contact: "Contact",
    settings: "Settings",
    // Add more translations as needed
  },
  es: {
    home: "Inicio",
    resources: "Recursos",
    listings: "Listados",
    requests: "Solicitudes",
    profile: "Perfil",
    stats: "Estadísticas",
    contact: "Contacto",
    settings: "Ajustes",
    // Add more translations as needed
  },
  fr: {
    home: "Accueil",
    resources: "Ressources",
    listings: "Annonces",
    requests: "Demandes",
    profile: "Profil",
    stats: "Statistiques",
    contact: "Contact",
    settings: "Paramètres",
    // Add more translations as needed
  },
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

