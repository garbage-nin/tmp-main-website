import HeroSection from "./_components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Spacer for the form that overflows from the hero on desktop */}
      <div className="hidden md:block bg-slate-50 py-36" />
    </>
  );
}
