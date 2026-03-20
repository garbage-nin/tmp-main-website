import Container from "@/components/ui/Container";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative z-10 bg-primary py-12 md:py-12 border-b-4 border-accent overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Text Content */}
          <div>
            <span className="inline-block bg-accent text-primary text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Druckprodukte &amp; Auskünfte zur Rente
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight font-[family-name:var(--font-barlow)]">
              Rentenauskunft online beantragen
            </h1>
            <p className="mt-3 text-lg text-slate-100 leading-relaxed">
              Rentenauskunft, Renteninformation, Versicherungsverlauf oder
              Bescheinigungen – erfassen Sie Ihre Daten zentral an einem Ort.
              Wir strukturieren die Angaben, damit Sie Ihre Rente bei der
              Deutschen Rentenversicherung einfacher beantragen können.
            </p>
            <a
              href="#formular"
              className="mt-6 inline-flex items-center justify-center rounded-xl px-10 py-3.5 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-accent text-white hover:bg-accent-dark focus:ring-accent"
            >
              Jetzt beantragen
            </a>
          </div>

          {/* Hero Images */}
          <div className="relative hidden md:block z-10">
            <div className="relative mx-auto w-fit">
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-accent">
                <Image
                  src="/hero2.jpg"
                  alt="Deutsche Rentenversicherung"
                  width={340}
                  height={240}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-32 -right-32 rounded-xl overflow-hidden shadow-2xl border-4 border-accent">
                <Image
                  src="/hero1.jpg"
                  alt="Rentenauskunft Dokument"
                  width={300}
                  height={210}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
