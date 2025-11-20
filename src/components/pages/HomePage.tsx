import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import { useScrollStore } from "@/store/scrollStore";
import TechStackMarquee from "../sections/TechStackMarquee";

// HomePage.tsx
export default function HomePage() {
  const setScrollY = useScrollStore((state) => state.setScrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollY]);
  

  return (
    <main className="w-full h-full overflow-x-hidden relative">
      <HeroSection />

      {/* Tech Stack Marquee Section */}
      <section className="relative w-full mt-48 py-12 h-[160vh] bg-background">
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold">Tech Stack</h2>
          </div>
          <TechStackMarquee />
        </div>
      </section>

      {/* Companies Visited */}
      <section className="py-20 bg-muted text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">Companies I've Visited</h2>
        {/* logos grid placeholder */}
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">Gallery</h2>
        {/* gallery grid placeholder */}
      </section>
    </main>
  );
}