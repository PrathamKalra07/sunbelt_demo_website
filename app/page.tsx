import Navbar from "@/components/navbar";
import Banner from "@/components/Home/Banner";
import ExplorHandpickedProperty from "@/components/Home/ExplorHandpickedProperty";
import Footer from "@/components/Footer";
import InsightMarket from "@/components/Home/InsightMarket";
import QAChatBot from "@/components/Home/QAChatBot";
export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Banner />
      <InsightMarket />
      <QAChatBot />
      <Footer />
    </div>
  );
}
