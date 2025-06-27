"use client"

import { Github, Twitter, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppFooterProps {
  className?: string
}

export default function AppFooter({ className }: AppFooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: Github,
      hoverColor: "hover:text-gray-300",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      hoverColor: "hover:text-blue-400",
    },
  ]

  return (
    <footer
      className={cn(
        "bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800 transition-colors duration-300",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Left Section - Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <nav className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-6">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Powered by IQAir */}
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Powered by</span>
                <a
                  href="https://www.iqair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 flex items-center space-x-1 group"
                >
                  <span>IQAir</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>
            </div>

            {/* Right Section - Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-gray-400 transition-all duration-200 p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800",
                      social.hoverColor,
                    )}
                    aria-label={`Follow us on ${social.name}`}
                    title={`Follow us on ${social.name}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="mt-4 pt-4 border-t border-gray-700 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <p className="text-gray-400 text-xs">© {currentYear} RuralAir. All rights reserved.</p>
              <p className="text-gray-500 text-xs">Air quality data updated every hour</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
