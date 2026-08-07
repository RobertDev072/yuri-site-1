import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VanReveal from "@/components/VanReveal";
import Solutions from "@/components/Solutions";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import FeatureStrip from "@/components/FeatureStrip";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LiveryDivider from "@/components/LiveryDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VanReveal />
        <Solutions />
        <Stats />
        <LiveryDivider />
        <WhyUs />
        <Process />
        <Projects />
        <LiveryDivider />
        <FeatureStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
