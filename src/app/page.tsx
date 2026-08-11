import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FocusSoundPlayer from "@/components/FocusSoundPlayer";
import ProgressSavedModal from "@/components/ProgressSavedModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <WhyChooseUs />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FocusSoundPlayer />
      <ProgressSavedModal />
    </>
  );
}
