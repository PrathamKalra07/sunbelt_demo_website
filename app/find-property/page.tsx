"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Banner from "@/components/find-property/Banner";
import ExploreProperties from "@/components/find-property/ExploreProperties";
import Footer from "@/components/Footer";

export type BannerSearch = {
  location: string;
  type: string;
  budget: string;
  bedrooms: string;
};

export default function Home() {
  const [bannerSearch, setBannerSearch] = useState<BannerSearch | null>(null);

  return (
    <div className="bg-black">
      <Navbar />
      <Banner onSearch={(s) => {
        setBannerSearch(s);
        document.getElementById("explore-properties")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <div id="explore-properties">
        <ExploreProperties bannerSearch={bannerSearch} />
      </div>
      <Footer />
    </div>
  );
}