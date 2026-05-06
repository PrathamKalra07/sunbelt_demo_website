"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Building, Building2, House } from "lucide-react";

const NAV_LINKS = [
  { label: "Login", href: process.env.NEXT_PUBLIC_SUNBELT_AI_URL || '/' },
  { label: "Find Property", href: "/find-property" },
  { label: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white" style={{ borderBottom: "1px solid #E5E5E5" }}>
      <div className="mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-xl">
          <Building2 color="white"  size={18} />
          </div>
          <span className="text-sm font-semibold text-black tracking-tight">
            Sunbelt Properties
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-colors duration-150"
              style={{ color: "#737373" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#000")}
              onMouseLeave={e => (e.currentTarget.style.color = "#737373")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className="block w-4 h-px bg-black transition-all duration-200" style={{ transform: isOpen ? "rotate(45deg) translateY(3px)" : "" }} />
          <span className="block h-px bg-black transition-all duration-200" style={{ width: isOpen ? "0" : "16px" }} />
          <span className="block w-4 h-px bg-black transition-all duration-200" style={{ transform: isOpen ? "rotate(-45deg) translateY(-3px)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col" style={{ borderTop: "1px solid #E5E5E5" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="py-3.5 text-sm text-black border-b"
              style={{ borderColor: "#E5E5E5" }}
            >
              {label}
            </Link>
          ))}
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;