"use client";

import Image from "next/image";
import { EXPLORE_PROPERTIES } from "@/lib/contants";

const BedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 14h20M7 14V8m10 6V8" />
  </svg>
);
const BathIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM6 12V5a2 2 0 014 0v1" />
  </svg>
);
const AreaIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

const PropertyCard = ({ property }: { property: any }) => (
  <div
    className="group bg-white overflow-hidden cursor-pointer flex flex-col"
    style={{
      border: "1px solid #E5E5E5",
      borderRadius: "12px",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "#000";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E5E5";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
    }}
  >
    {/* Image */}
    <div className="relative overflow-hidden flex-shrink-0" style={{ height: "200px" }}>
      <Image
        src={property.image}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ filter: "grayscale(20%)" }}
      />

      {/* Tag */}
      <span
        className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
        style={{ background: "rgba(255,255,255,0.95)", color: "#000", border: "1px solid #E5E5E5" }}
      >
        {property.tag}
      </span>
     
    </div>

    {/* Body */}
    <div className="p-4 flex flex-col flex-1">
      <p className="text-lg font-bold text-black mb-1">{property.price}</p>
      <p className="text-sm font-medium text-black mb-1">{property.title}</p>
      <p className="text-xs text-black/40 mb-4 truncate">{property.address}</p>

      {/* Specs */}
      <div
        className="flex items-center justify-between text-xs text-black/40 pt-3 mt-auto"
        style={{ borderTop: "1px solid #F0F0F0" }}
      >
        <span className="flex items-center gap-1.5"><BedIcon />{property.beds}</span>
        <span className="flex items-center gap-1.5"><BathIcon />{property.baths}</span>
        <span className="flex items-center gap-1.5"><AreaIcon />{property.area}</span>
      </div>
    </div>
  </div>
);

const ExploreProperties = () => {
  const data = EXPLORE_PROPERTIES;

  return (
    <section className="px-6 md:px-12 py-14 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 items-start">

        {/* ── Left ── */}
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-3">
            <div>
              <h2 className="text-xl font-bold text-black">{data.heading}</h2>
              <p className="text-xs text-black/40 mt-1">{data.results}</p>
            </div>
            <select
              className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
              style={{ border: "1px solid #E5E5E5", color: "#000", background: "#fff" }}
            >
              {data.sortOptions.map((o: string, i: number) => <option key={i}>{o}</option>)}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.properties.map((p: any) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="rounded-xl p-5 sticky top-20" style={{ border: "1px solid #E5E5E5" }}>
          <h3 className="text-sm font-bold text-black mb-6">Filters</h3>

          {/* Property Type */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Property Type</p>
            <div className="space-y-2">
              {data.filters.propertyTypes.map((item: string, idx: number) => (
                <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-black" />
                  <span className="text-sm text-black/70">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="my-5" style={{ borderTop: "1px solid #F0F0F0" }} />

          {/* Bedrooms */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Bedrooms</p>
            <div className="flex flex-wrap gap-1.5">
              {data.filters.bedrooms.map((item: string, idx: number) => (
                <button
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-md transition-colors duration-150"
                  style={{ border: "1px solid #E5E5E5", color: "#000", background: "#fff" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#E5E5E5"; }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Bathrooms</p>
            <div className="flex flex-wrap gap-1.5">
              {data.filters.bathrooms.map((item: string, idx: number) => (
                <button
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-md transition-colors duration-150"
                  style={{ border: "1px solid #E5E5E5", color: "#000", background: "#fff" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#E5E5E5"; }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="my-5" style={{ borderTop: "1px solid #F0F0F0" }} />

          {/* Property Status */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Status</p>
            <div className="space-y-2">
              {data.filters.propertyStatus.map((item: string, idx: number) => (
                <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-black" />
                  <span className="text-sm text-black/70">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-black text-white hover:opacity-75 transition-opacity duration-150">
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreProperties;