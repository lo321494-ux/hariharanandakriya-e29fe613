import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import palpitar1 from "@/assets/palpitar1.jpg.asset.json";
import palpitar2 from "@/assets/palpitar2.jpg.asset.json";
import esencia1 from "@/assets/esencia1.jpg.asset.json";
import esencia2 from "@/assets/esencia2.jpg.asset.json";

export const Route = createFileRoute("/libros")({
  head: () => ({
    meta: [
      { title: "Libros | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Libros de Kriya Yoga: Un Palpitar de Eternidad y La Esencia de la Yoga. Además, lectura en línea de Discursos sobre Kriya Yoga y Equanimous Yoga Philosophy.",
      },
      { property: "og:title", content: "Libros | FHKY" },
      {
        property: "og:description",
        content:
          "Un Palpitar de Eternidad, La Esencia de la Yoga y libros en inglés disponibles para lectura.",
      },
      { property: "og:image", content: palpitar1.url },
      { name: "twitter:image", content: palpitar1.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Libros,
});

const lecturas = [
  { file: "DiscoursesOnKriyaYoga.pdf", label: "DISCURSOS SOBRE KRIYA YOGA (Inglés)" },
  { file: "EquanimousYogaPhilosophy.pdf", label: "EQUANIMOUS YOGA PHILOSOPHY (Inglés)" },
];

type Lectura = (typeof lecturas)[number];

const libroUrl = (file: string) =>
  `https://hariharanandakriya.org/libros/${encodeURIComponent(file)}`;

const portadas = [
  { src: palpitar1.url, alt: "Un Palpitar de Eternidad, portada" },
  { src: palpitar2.url, alt: "Un Palpitar de Eternidad, contraportada" },
  { src: esencia1.url, alt: "La Esencia de la Yoga, portada" },
  { src: esencia2.url, alt: "La Esencia de la Yoga, contraportada" },
];

const portadaPrincipal = portadas[0];

function Libros() {
  const [lecturaActiva, setLecturaActiva] = useState<Lectura | null>(null);

  return (
    <div className="section-x py-16 md:py-24">
      <header className="editorial-heading mx-auto max-w-4xl">
        <h1 className="font-display text-5xl text-foreground md:text-7xl">LIBROS</h1>
      </header>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
        Para adquirir los libros <b className="text-foreground">Un Palpitar de Eternidad</b> y{" "}
        <b className="text-foreground">La Esencia de la Yoga</b>, contactar a Wilder Guzmán{" "}
        <a href="tel:+573192137474" className="text-primary hover:underline">
          +57 319 2137474
        </a>
        .
      </p>

      <div className="book-display mx-auto mt-12 max-w-4xl">
        {portadaPrincipal ? (
          <figure className="book-featured">
            <img src={portadaPrincipal.src} alt={portadaPrincipal.alt} className="book-cover" />
          </figure>
        ) : null}
        <div className="book-secondary">
          {portadas.slice(1).map((p, index) => (
            <figure key={p.alt} className={index % 2 ? "book-object book-object--lifted" : "book-object"}>
              <img src={p.src} alt={p.alt} className="book-cover" />
            </figure>
          ))}
        </div>
      </div>

      <section className="paper-panel mx-auto mt-16 max-w-2xl">
        <h2 className="font-display text-2xl text-primary">
          Seleccione el libro para leer
        </h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-gold/30 bg-card/85 backdrop-blur-xl">
          {lecturas.map((l) => (
            <li key={l.file}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setLecturaActiva(l)}
                className="h-auto w-full justify-start rounded-none px-4 py-3 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-primary"
              >
                <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-left">{l.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {lecturaActiva ? (
        <BookReader lectura={lecturaActiva} onClose={() => setLecturaActiva(null)} />
      ) : null}
    </div>
  );
}

function BookReader({ lectura, onClose }: { lectura: Lectura; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = window.document.documentElement.style.overflow;
    window.document.documentElement.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.document.documentElement.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  const url = libroUrl(lectura.file);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Lectura: ${lectura.label}`}
    >
      <div className="flex h-[100dvh] w-full max-w-6xl flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:rounded-lg sm:border sm:border-gold/25 lg:h-full">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-3 sm:p-5">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Libro para leer</p>
            <h2 className="mt-1 line-clamp-2 font-display text-base leading-snug text-foreground sm:text-xl">
              {lectura.label}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="icon" variant="outline">
              <a href={url} target="_blank" rel="noreferrer" aria-label="Abrir en pantalla completa" title="Abrir en pantalla completa">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" onClick={onClose} aria-label="Cerrar libro" title="Cerrar">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <iframe title={`Libro: ${lectura.label}`} src={url} className="min-h-0 w-full flex-1 bg-muted" />
      </div>
    </div>,
    window.document.body,
  );
}
