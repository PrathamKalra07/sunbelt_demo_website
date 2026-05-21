"use client";

import Image from "next/image";

const Banner = () => {

  return (
<section className="relative w-full h-[80vh] overflow-hidden bg-black">

      {/* Hero image — low opacity, desaturated */}
      <Image
        src={'/building.jpg'}
        alt="Find Property Banner"
        fill
        priority
        className="object-cover object-center"
        // style={{ opacity: 1 }}
      />

      {/* Dark gradient from left */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 10%, rgba(0,0,0,0.0) 80%)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center"
        style={{ minHeight: "80vh", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="max-w-lg mb-10">

          {/* Eyebrow */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-5">
            Premium Real Estate
          </p>

          {/* Heading */}
          <span className="text-lg leading-relaxed">Welcome to </span><br/>
          <h1
            className="font-bold leading-[1.05] mb-4 text-white"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Sunbelt Properties
          </h1>

          {/* Subheading */}
          <p className="text-sm leading-relaxed font-light text-white/50" style={{ maxWidth: "400px" }}>
            Discover your dream property with us. Explore our exclusive listings and find the perfect home or commercial space tailored to your needs.
            </p>
        </div>


        {/* Stats */}
        <div className="flex items-center gap-8 mt-10 flex-wrap">
          {[
            { value: "12,000+", label: "Properties" },
            { value: "98%", label: "Satisfaction" },
            { value: "15", label: "Cities" },
          ].map(({ value, label }, i) => (
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