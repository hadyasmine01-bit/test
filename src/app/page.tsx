import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CreativeCoworkHub from "@/components/CreativeCoworkHub";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProgressSavedModal from "@/components/ProgressSavedModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <CreativeCoworkHub />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ProgressSavedModal />
    </>
  );
}
