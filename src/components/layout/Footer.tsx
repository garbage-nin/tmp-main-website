import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <Container className="py-8">
        <div className="text-center">
          <p className="text-sm text-white/70">
            &copy; 2026 REGIS DATASEC LTD. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </footer>
  );
}
