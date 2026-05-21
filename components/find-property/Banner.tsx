"use client";

import Image from "next/image";
import { useState } from "react";
import { FindProperty_BANNERS } from "@/lib/contants";
import { BannerSearch } from "@/app/find-property/page"; // adjust to your actual path

const Banner = ({ onSearch }: { onSearch: (s: BannerSearch) => void }) => {
  const banner = FindProperty_BANNERS[0];

  const [location, setLocation] = useState("");
  const [type, setType]         = useState("");
  const [budget, setBudget]     = useState("");
  const [bedrooms, setBedrooms] = useState("");

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black">
      <Image src="/building.jpg" alt="Find Property Banner" fill priority className="object-cover object-center" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 10%, rgba(0,0,0,0.0) 80%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center" style={{ minHeight: "80vh", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="max-w-lg mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-5">Premium Real Estate</p>
          <h1 className="font-bold leading-[1.05] mb-4 text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
            {banner.heading}
          </h1>
          <p className="text-sm leading-relaxed font-light text-white/50" style={{ maxWidth: "400px" }}>{banner.subheading}</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl overflow-hidden" style={{ maxWidth: "740px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#E5E5E5" }}>

            <div className="flex flex-col px-5 pt-3.5 pb-3" style={{ borderColor: "#E5E5E5" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-black/40">Location</span>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                placeholder={banner.searchFields.location}
                className="text-sm bg-transparent outline-none text-black placeholder:text-black/30" />
            </div>

            <div className="flex flex-col px-5 pt-3.5 pb-3" style={{ borderColor: "#E5E5E5" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-black/40">Type</span>
              <select value={type} onChange={e => setType(e.target.value)}
                className="text-sm bg-transparent outline-none appearance-none cursor-pointer text-black">
                <option value="">{banner.searchFields.type}</option>
                {["Residential", "Commercial", "Land"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="flex flex-col px-5 pt-3.5 pb-3" style={{ borderColor: "#E5E5E5" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-black/40">Budget</span>
              <input type="text" value={budget} onChange={e => setBudget(e.target.value)}
                placeholder={banner.searchFields.budget}
                className="text-sm bg-transparent outline-none text-black placeholder:text-black/30" />
            </div>

            <div className="flex flex-col px-5 pt-3.5 pb-3" style={{ borderColor: "#E5E5E5" }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5 text-black/40">Bedrooms</span>
              <select value={bedrooms} onChange={e => setBedrooms(e.target.value)}
                className="text-sm bg-transparent outline-none appearance-none cursor-pointer text-black">
                <option value="">{banner.searchFields.bedrooms}</option>
                {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

          </div>
          <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #E5E5E5", background: "#FAFAFA" }}>
            <span className="text-xs text-black/30">12,000+ listings across 15 cities</span>
            <button
              onClick={() => onSearch({ location, type, budget, bedrooms })}
              className="flex items-center gap-2 bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:opacity-75 transition-opacity duration-150"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {banner.buttonText}
            </button>
          </div>
        </div>

        {/* Stats — unchanged */}
        <div className="flex items-center gap-8 mt-10 flex-wrap">
          {[{ value: "12,000+", label: "Properties" }, { value: "98%", label: "Satisfaction" }, { value: "15", label: "Cities" }].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-4">
              {i > 0 && <div className="w-px h-6 hidden sm:block bg-white/10" />}
              <div>
                <div className="text-base font-bold text-white">{value}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;