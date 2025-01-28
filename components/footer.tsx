import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card/80 backdrop-blur-sm text-card-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ShareSphere</h3>
            <p className="text-sm">
              ShareSphere is an innovative community platform that revolutionizes the way we share and utilize
              resources. Our mission is to create a sustainable, connected community where members can easily share
              skills, tools, and knowledge. Through our platform, we're reducing waste, building stronger community
              bonds, and making resources more accessible to everyone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm hover:text-primary">
                  {t("resources")}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm hover:text-primary">
                  {t("profile")}
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-sm hover:text-primary">
                  {t("communityStats")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: iamtanesha13@gmail.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm mt-4">Developed with ❤️ by Tanesha</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">© 2025 ShareSphere. All rights reserved.</div>
      </div>
    </footer>
  )
}

