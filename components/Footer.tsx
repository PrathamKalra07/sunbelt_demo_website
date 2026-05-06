"use client";

import Link from "next/link";
import { FOOTER_DATA } from "@/lib/contants";

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.09 6.09l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h2 className="text-base font-medium mb-3 text-white">
            {FOOTER_DATA.about.title}
          </h2>
          <p className="text-[13px] text-gray-400 mb-5 leading-relaxed">
            {FOOTER_DATA.about.description}
          </p>

          {/* Social Icons */}
          <div className="flex gap-2">
            {FOOTER_DATA.about.social.map((s, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center border border-[#333] rounded-full cursor-pointer hover:border-white hover:text-white text-gray-400 transition-colors"
              >
                <span className="text-[11px] uppercase">{s[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-200">Quick Links</h3>
          <ul className="space-y-2">
            {FOOTER_DATA.quickLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="text-[13px] text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Types */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-200">Property Types</h3>
          <ul className="space-y-2">
            {FOOTER_DATA.propertyTypes.map((type, i) => (
              <li
                key={i}
                className="text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-200">Contact Us</h3>

          <div className="flex flex-col gap-2.5 mb-5 text-gray-400">
            <div className="flex items-start gap-2">
              <PhoneIcon />
              <span className="text-[13px]">{FOOTER_DATA.contact.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MailIcon />
              <span className="text-[13px]">{FOOTER_DATA.contact.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <PinIcon />
              <span className="text-[13px] leading-relaxed">{FOOTER_DATA.contact.address}</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex border border-[#333] rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-[#1a1a1a] text-gray-200 placeholder-gray-600 text-[12px] px-3 py-2 outline-none border-none"
            />
            <button className="bg-white text-black text-[12px] font-medium px-4 py-2 hover:bg-gray-100 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-600 text-[12px] mt-8 border-t border-[#222] pt-4">
        © 2024 Sunbelt Properties. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;