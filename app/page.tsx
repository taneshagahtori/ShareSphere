"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Share2, Users, Recycle } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to ShareSphere
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Join our community-driven platform to share resources, skills, and services. Together, we can build a more
          connected and sustainable future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="/resources">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Resources <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative h-[400px] rounded-lg overflow-hidden"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cup-of-couple-6963622.jpg-MxhLxqXF7pHllcBVDxDsN17PS8fL4L.jpeg"
          alt="Global community sharing"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Share2,
            title: "Share Resources",
            description: "Lend items, offer skills, or provide services to your community.",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rdne-6646869.jpg-OdZBOIzcN6580Ik4ATroUufKuzXPvt.jpeg",
          },
          {
            icon: Users,
            title: "Build Connections",
            description: "Meet like-minded individuals and strengthen community bonds.",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ivan-samkov-5676744.jpg-WGTKMy7JkzENvYuLT5jPu97uWQpER1.jpeg",
          },
          {
            icon: Recycle,
            title: "Promote Sustainability",
            description: "Reduce waste and environmental impact through local sharing.",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-tima-miroshnichenko-6860390.jpg-aJNHglCh4ol3yHVtQxn2nyEz3wCN1D.jpeg",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
          >
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="bg-primary/10 rounded-full p-4 inline-block">
              <item.icon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-primary">{item.title}</h2>
            <p className="text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

