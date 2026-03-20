import Container from "@/components/ui/Container";
import EmbeddedFormSection from "./EmbeddedFormSection";

export default function HeroSection() {
  return (
    <section className="relative z-10 bg-gradient-to-br from-primary to-primary-dark py-12 md:py-16 border-b-4 border-accent overflow-x-clip">
      <Container className="relative">
        {/* Text Content — determines hero height on md+ */}
        <div className="md:w-[45%] md:pr-10">
          <span className="inline-block bg-accent text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            Druckprodukte &amp; Auskünfte zur Rente
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight font-[family-name:var(--font-barlow)]">
            Lorem ipsum dolor sit amet consectetur
          </h1>
          <p className="mt-3 text-lg text-slate-100 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Form — stacks on mobile, overlaps on md+ */}
        <div
          id="formular"
          className="mt-10 md:mt-0 md:absolute md:top-0 md:right-0 md:w-[60%] md:px-6 lg:px-8"
        >
          <EmbeddedFormSection />
        </div>
      </Container>
    </section>
  );
}
