import Navbar from "@/components/navbar";
import Banner from "@/components/find-property/Banner";
import ExploreProperties from "@/components/find-property/ExploreProperties";

import Footer from "@/components/Footer";
import PropertyChatbot from "@/components/find-property/PropertyChatbot";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      {/* <Banner /> */}
      {/* <ExploreProperties /> */}
      <PropertyChatbot />
      {/* <Footer /> */}

    </div>
  );
}
