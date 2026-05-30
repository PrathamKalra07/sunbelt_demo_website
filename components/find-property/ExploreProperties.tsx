"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { EXPLORE_PROPERTIES } from "@/lib/contants";
import { fetchProperties } from "@/api/api.chat";
import PropertyChatbot from "./PropertyChatbot";

export type BannerSearch = { location: string; type: string; budget: string; bedrooms: string };

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&auto=format",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format",
];

const TAGS = ["Featured", "New", "Hot Deal", "Premium", "Exclusive"];
const BED_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const BATH_OPTIONS = ["1", "2", "3", "4+"];
const AREA_OPTIONS = ["520 sqft", "850 sqft", "980 sqft", "1,200 sqft", "1,450 sqft", "1,800 sqft", "2,200 sqft", "3,100 sqft"];

function mapApiProperty(p: any, idx: number) {
  return {
    id: p.id,
    title: p.name,
    address: [p.address, p.city, p.state].filter(Boolean).join(", "),
    price: p.total_units ? `${p.total_units} Units` : "Price on Request",
    tag: TAGS[idx % TAGS.length],
    beds: p.property_type === "commercial" ? "—" : BED_OPTIONS[idx % BED_OPTIONS.length],
    baths: BATH_OPTIONS[idx % BATH_OPTIONS.length],
    area: AREA_OPTIONS[idx % AREA_OPTIONS.length],
    type: p.property_type ?? "Residential",
    status: "Ready to Move",
    image: PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length],
    description: p.description,
    city: p.city,
  };
}

const BedIcon  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 14h20M7 14V8m10 6V8"/></svg>;
const BathIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM6 12V5a2 2 0 014 0v1"/></svg>;
const AreaIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>;
const PinIcon  = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const GridIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const ListIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const ChevronLeft  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;

const SkeletonCard = ({ view }: { view: "grid" | "list" }) => {
  if (view === "list") {
    return (
      <div className="bg-white flex overflow-hidden animate-pulse" style={{ border: "1px solid #E5E5E5", borderRadius: "12px" }}>
        <div className="flex-shrink-0 bg-gray-100" style={{ width: "220px", height: "160px" }} />
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
          <div className="h-3 bg-gray-100 rounded w-1/4 mt-auto" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white overflow-hidden animate-pulse" style={{ border: "1px solid #E5E5E5", borderRadius: "12px" }}>
      <div className="bg-gray-100" style={{ height: "200px" }} />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-full mt-2" />
      </div>
    </div>
  );
};

const PropertyCard = ({ property, view, onClick }: { property: any; view: "grid" | "list"; onClick: () => void }) => {
  if (view === "list") {
    return (
      <div
        onClick={onClick}
        className="group bg-white flex overflow-hidden cursor-pointer"
        style={{ border: "1px solid #E5E5E5", borderRadius: "12px", transition: "border-color 0.2s, box-shadow 0.2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#000"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E5E5"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
      >
        <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "200px", height: "140px" }}>
          <Image src={property.image} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-black" style={{ border: "1px solid #E5E5E5" }}>
            {property.tag}
          </span>
        </div>
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <p className="text-sm font-bold text-black mb-1">{property.title}</p>
            <div className="flex items-center gap-1.5 text-xs text-black/40"><PinIcon />{property.address}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-black/40">
            <span className="px-2 py-0.5 rounded bg-gray-50 border border-gray-100">{property.type}</span>
            <span>{property.total_units ?? "—"} units</span>
          </div>
        </div>
        <div className="flex items-center pr-5 text-black/20 group-hover:text-black transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white overflow-hidden cursor-pointer flex flex-col"
      style={{ border: "1px solid #E5E5E5", borderRadius: "12px", transition: "border-color 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#000"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E5E5"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "180px" }}>
        <Image src={property.image} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-black" style={{ border: "1px solid #E5E5E5" }}>
          {property.tag}
        </span>
        <span className="absolute bottom-3 right-3 text-[10px] text-white/80">{property.type}</span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm font-bold text-black mb-1">{property.title}</p>
        <div className="flex items-center gap-1.5 text-xs text-black/40 mb-3"><PinIcon /><span className="truncate">{property.address}</span></div>
        <div className="flex items-center justify-between text-xs text-black/30 pt-3 mt-auto" style={{ borderTop: "1px solid #F0F0F0" }}>
          <span>{property.total_units ?? "—"} units</span>
          <span className="flex items-center gap-1 text-black/50 font-medium group-hover:gap-2 transition-all">
            View details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
      </div>
    </div>
  );
};

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  available:   { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" },
  occupied:    { bg: "#EFF6FF", text: "#2563EB", dot: "#3B82F6" },
  maintenance: { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B" },
  waitlist:    { bg: "#FAF5FF", text: "#9333EA", dot: "#A855F7" },
};

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format",
];

function PropertyDetailPanel({ property, onClose }: { property: any; onClose: () => void }) {
  const [units, setUnits]               = useState<any[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [activeImg, setActiveImg]       = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");

  const gallery = [property.image, ...EXTRA_IMAGES.slice(0, 3)];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${property.id}/units`)
      .then(r => r.json())
      .then(d => setUnits(d.units ?? d ?? []))
      .catch(() => setUnits([]))
      .finally(() => setLoadingUnits(false));
    return () => { document.body.style.overflow = ""; };
  }, [property.id]);

  const unitCounts = useMemo(() => {
    const counts: Record<string, number> = { all: units.length };
    units.forEach(u => {
      const s = (u.status ?? "available").toLowerCase();
      counts[s] = (counts[s] ?? 0) + 1;
    });
    return counts;
  }, [units]);

  const filteredUnits = statusFilter === "all"
    ? units
    : units.filter(u => (u.status ?? "available").toLowerCase() === statusFilter);

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
        onClick={onClose}
      >
        <div
          className="relative bg-white flex flex-col overflow-hidden w-full"
          style={{
            maxWidth: "900px",
            maxHeight: "80vh",
            borderRadius: "16px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            animation: "popIn 0.22s ease",
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative flex-shrink-0 overflow-hidden" style={{ height: "240px" }}>
            <Image src={gallery[activeImg]} alt={property.title} fill className="object-cover transition-opacity duration-300" unoptimized />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }} />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="absolute bottom-3 left-4 flex gap-2">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className="relative overflow-hidden rounded-md transition-all"
                  style={{ width: i === activeImg ? "52px" : "40px", height: "32px", border: i === activeImg ? "2px solid white" : "2px solid transparent", opacity: i === activeImg ? 1 : 0.6 }}>
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
            <div className="absolute bottom-3 right-4 text-right">
              <p className="text-white font-bold text-lg leading-tight">{property.title}</p>
              <p className="text-white/70 text-xs flex items-center gap-1 justify-end"><PinIcon />{property.address}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 flex items-center gap-3 flex-wrap" style={{ borderBottom: "1px solid #F0F0F0" }}>
              {[
                { label: "Type",        value: property.type },
                { label: "Year Built",  value: property.year_built ?? "—" },
                { label: "Total Units", value: property.total_units ?? units.length ?? "—" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center px-4 py-2 rounded-lg" style={{ background: "#F9F9F9", border: "1px solid #F0F0F0" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-black/30 mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-black">{value}</p>
                </div>
              ))}
              {property.amenities?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {property.amenities.slice(0, 4).map((a: string) => (
                    <span key={a} className="text-[10px] px-2.5 py-1 rounded-full text-black/60" style={{ border: "1px solid #E5E5E5" }}>{a}</span>
                  ))}
                </div>
              )}
            </div>

            {property.description && (
              <div className="px-6 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
                <p className="text-xs text-black/50 leading-relaxed">{property.description}</p>
              </div>
            )}

            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-black">Units & Availability</h3>
                <span className="text-xs text-black/40">{units.length} total</span>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  { key: "all",         label: "All" },
                  { key: "available",   label: "Available" },
                  { key: "occupied",    label: "Occupied" },
                  { key: "maintenance", label: "Maintenance" },
                  { key: "waitlist",    label: "Waitlist" },
                ].map(({ key, label }) => {
                  const count = unitCounts[key] ?? 0;
                  if (key !== "all" && count === 0) return null;
                  const colors = key === "all" ? null : STATUS_COLORS[key];
                  const isActive = statusFilter === key;
                  return (
                    <button key={key} onClick={() => setStatusFilter(key)}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                      style={{ border: "1px solid", borderColor: isActive ? "#000" : "#E5E5E5", background: isActive ? "#000" : "#fff", color: isActive ? "#fff" : "#555" }}>
                      {colors && <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.dot }} />}
                      {label} <span className="opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>

              {loadingUnits ? (
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse rounded-xl p-4 flex items-center justify-between" style={{ background: "#F9F9F9" }}>
                      <div className="flex flex-col gap-2">
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                        <div className="h-2.5 w-36 bg-gray-100 rounded" />
                      </div>
                      <div className="h-5 w-16 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : filteredUnits.length === 0 ? (
                <p className="text-xs text-black/30 text-center py-10">No units with this status</p>
              ) : (
                <div className="flex flex-col gap-2 pb-4">
                  {filteredUnits.map((unit: any) => {
                    const status = (unit.status ?? "available").toLowerCase();
                    const colors = STATUS_COLORS[status] ?? STATUS_COLORS.available;
                    return (
                      <div key={unit.id} className="flex items-center justify-between px-4 py-3.5 rounded-xl"
                        style={{ border: "1px solid #F0F0F0", background: "#FAFAFA" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F0F0F0" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8">
                              <rect x="3" y="10" width="18" height="11" rx="1"/><path d="M9 10V6a3 3 0 016 0v4"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-black">Unit {unit.unit_number ?? unit.number ?? unit.name}</p>
                            <p className="text-xs text-black/40">
                              {[unit.bedroom_count && `${unit.bedroom_count}-Bedroom`, unit.unit_type, unit.square_feet && `${unit.square_feet} sqft`].filter(Boolean).join(" · ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                            {status.toUpperCase()}
                          </span>
                          {unit.monthly_rent && (
                            <div className="text-right">
                              <p className="text-[9px] font-semibold uppercase tracking-widest text-black/30">Monthly Rent</p>
                              <p className="text-sm font-bold text-black">${Number(unit.monthly_rent).toLocaleString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes popIn  { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}

const PAGE_SIZE = 9;

const Pagination = ({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) => {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors disabled:opacity-30"
        style={{ border: "1px solid #E5E5E5" }}><ChevronLeft /></button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-black/30">…</span>
        ) : (
          <button key={p} onClick={() => onChange(p as number)}
            className="w-8 h-8 rounded-lg text-xs font-medium transition-colors"
            style={{ border: "1px solid", borderColor: page === p ? "#000" : "#E5E5E5", background: page === p ? "#000" : "#fff", color: page === p ? "#fff" : "#000" }}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors disabled:opacity-30"
        style={{ border: "1px solid #E5E5E5" }}><ChevronRight /></button>
    </div>
  );
};

const FilterSidebar = ({ data, activeFilters, setActiveFilters }: any) => {
  const toggle = (group: string, val: string) => {
    setActiveFilters((prev: any) => {
      const cur: string[] = prev[group] ?? [];
      return { ...prev, [group]: cur.includes(val) ? cur.filter((v: string) => v !== val) : [...cur, val] };
    });
  };
  const isActive = (group: string, val: string) => (activeFilters[group] ?? []).includes(val);

  return (
    <aside className="rounded-xl p-5 sticky top-20" style={{ border: "1px solid #E5E5E5", background: "#fff" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-black">Filters</h3>
        <button onClick={() => setActiveFilters({})} className="text-[10px] font-semibold uppercase tracking-wider text-black/40 hover:text-black transition-colors">
          Clear all
        </button>
      </div>
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Price Range</p>
        <div className="flex gap-2">
          <input type="text" placeholder="Min" className="w-full text-xs px-3 py-2 rounded-lg outline-none" style={{ border: "1px solid #E5E5E5" }} />
          <input type="text" placeholder="Max" className="w-full text-xs px-3 py-2 rounded-lg outline-none" style={{ border: "1px solid #E5E5E5" }} />
        </div>
      </div>
      <div style={{ borderTop: "1px solid #F0F0F0", marginBottom: "1.5rem" }} />
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Property Type</p>
        <div className="space-y-2">
          {data.filters.propertyTypes.map((item: string, idx: number) => (
            <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 accent-black" checked={isActive("propertyTypes", item)} onChange={() => toggle("propertyTypes", item)} />
              <span className="text-sm text-black/70">{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #F0F0F0", marginBottom: "1.5rem" }} />
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Bedrooms</p>
        <div className="flex flex-wrap gap-1.5">
          {data.filters.bedrooms.map((item: string, idx: number) => (
            <button key={idx} onClick={() => toggle("bedrooms", item)}
              className="text-xs px-3 py-1.5 rounded-md transition-colors duration-150"
              style={{ border: "1px solid", borderColor: isActive("bedrooms", item) ? "#000" : "#E5E5E5", background: isActive("bedrooms", item) ? "#000" : "#fff", color: isActive("bedrooms", item) ? "#fff" : "#000" }}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Bathrooms</p>
        <div className="flex flex-wrap gap-1.5">
          {data.filters.bathrooms.map((item: string, idx: number) => (
            <button key={idx} onClick={() => toggle("bathrooms", item)}
              className="text-xs px-3 py-1.5 rounded-md transition-colors duration-150"
              style={{ border: "1px solid", borderColor: isActive("bathrooms", item) ? "#000" : "#E5E5E5", background: isActive("bathrooms", item) ? "#000" : "#fff", color: isActive("bathrooms", item) ? "#fff" : "#000" }}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #F0F0F0", marginBottom: "1.5rem" }} />
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black/40 mb-3">Status</p>
        <div className="space-y-2">
          {data.filters.propertyStatus.map((item: string, idx: number) => (
            <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 accent-black" checked={isActive("propertyStatus", item)} onChange={() => toggle("propertyStatus", item)} />
              <span className="text-sm text-black/70">{item}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-black text-white hover:opacity-75 transition-opacity duration-150">
        Apply Filters
      </button>
    </aside>
  );
};

const FindPropertyPage = ({ bannerSearch }: { bannerSearch: BannerSearch | null }) => {
  const data = EXPLORE_PROPERTIES;
  const [view, setView]                         = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters]        = useState<Record<string, string[]>>({});
  const [search, setSearch]                      = useState("");
  const [properties, setProperties]             = useState<any[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [page, setPage]                         = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProperties({ limit: 200 })
      .then(res => setProperties((res.properties ?? []).map(mapApiProperty)))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [bannerSearch, activeFilters, search]);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (bannerSearch?.location) {
        const q = bannerSearch.location.toLowerCase();
        if (!p.address.toLowerCase().includes(q) && !p.title.toLowerCase().includes(q)) return false;
      }
      if (bannerSearch?.type && p.type.toLowerCase() !== bannerSearch.type.toLowerCase()) return false;
      if (bannerSearch?.bedrooms && p.beds !== bannerSearch.bedrooms) return false;
      if (activeFilters.propertyTypes?.length && !activeFilters.propertyTypes.some(t => p.type.toLowerCase().includes(t.toLowerCase()))) return false;
      if (activeFilters.bedrooms?.length && !activeFilters.bedrooms.includes(p.beds)) return false;
      if (activeFilters.propertyStatus?.length && !activeFilters.propertyStatus.includes(p.status)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [bannerSearch, activeFilters, search, properties]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-12 pt-10 pb-8 max-w-screen-xl mx-auto" style={{ borderBottom: "1px solid #E5E5E5" }}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 mb-2">Browse Listings</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Available Properties</h1>
            <p className="text-xs text-black/40 mt-1">
              {loading ? "Loading…" : `${filtered.length} properties found`}
            </p>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search by location or name…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-xs pl-8 pr-4 py-2.5 rounded-lg text-black outline-none w-64"
              style={{ border: "1px solid #E5E5E5" }} />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
        <FilterSidebar data={data} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <select className="text-xs px-3 py-2 rounded-lg outline-none cursor-pointer" style={{ border: "1px solid #E5E5E5" }}>
                {data.sortOptions.map((o: string, i: number) => <option key={i}>{o}</option>)}
              </select>
              {(bannerSearch?.location || bannerSearch?.type || bannerSearch?.bedrooms) && (
                <div className="flex gap-1.5 flex-wrap">
                  {bannerSearch.location && <span className="text-[10px] px-2.5 py-1 rounded-full bg-black text-white">📍 {bannerSearch.location}</span>}
                  {bannerSearch.type     && <span className="text-[10px] px-2.5 py-1 rounded-full bg-black text-white">{bannerSearch.type}</span>}
                  {bannerSearch.bedrooms && <span className="text-[10px] px-2.5 py-1 rounded-full bg-black text-white">{bannerSearch.bedrooms}</span>}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ border: "1px solid #E5E5E5" }}>
              <button onClick={() => setView("grid")} className="p-1.5 rounded-md transition-colors"
                style={{ background: view === "grid" ? "#000" : "transparent", color: view === "grid" ? "#fff" : "#A3A3A3" }}><GridIcon /></button>
              <button onClick={() => setView("list")} className="p-1.5 rounded-md transition-colors"
                style={{ background: view === "list" ? "#000" : "transparent", color: view === "list" ? "#fff" : "#A3A3A3" }}><ListIcon /></button>
            </div>
          </div>

          {loading ? (
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} view={view} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-black/30">
              <p className="text-4xl mb-3">🏠</p>
              <p className="text-sm font-medium text-black/50">No properties match your search</p>
              <p className="text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
                {paginated.map((p: any) => (
                  <PropertyCard key={p.id} property={p} view={view} onClick={() => setSelectedProperty(p)} />
                ))}
              </div>
              <Pagination page={page} total={filtered.length} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              <p className="text-center text-xs text-black/30 mt-4">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} properties
              </p>
            </>
          )}
        </div>
      </div>

      {selectedProperty && (
        <PropertyDetailPanel property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      {/* Floating chatbot — always mounted, manages its own open/close state */}
      <PropertyChatbot />
    </div>
  );
};

export default FindPropertyPage;