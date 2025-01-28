import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function MainNav() {
  const { t } = useLanguage()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-xl font-bold text-primary">
        ShareSphere
      </Link>
      <Link
        href="/resources"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t("resources")}
      </Link>
      <Link href="/listings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("listings")}
      </Link>
      <Link href="/requests" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("requests")}
      </Link>
      <Link href="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("profile")}
      </Link>
      <Link href="/stats" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("stats")}
      </Link>
      <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("contact")}
      </Link>
    </nav>
  )
}

