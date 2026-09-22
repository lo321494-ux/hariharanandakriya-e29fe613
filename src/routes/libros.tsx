import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PdfBookReader } from "@/components/pdf-book-reader";
import palpitar1 from "@/assets/palpitar1.jpg.asset.json";
import palpitar2 from "@/assets/palpitar2.jpg.asset.json";
import esencia1 from "@/assets/esencia1.jpg.asset.json";
import esencia2 from "@/assets/esencia2.jpg.asset.json";
import esenciaPagina60 from "@/assets/books/esencia-pagina-02.jpg.asset.json";
import esenciaPagina61 from "@/assets/books/esencia-pagina-01.jpg.asset.json";
import esenciaPagina62 from "@/assets/books/esencia-pagina-04.jpg.asset.json";
import esenciaPagina63 from "@/assets/books/esencia-pagina-03.jpg.asset.json";
import discourses from "@/assets/books/discourses.asset.json";
import equanimous from "@/assets/books/equanimous.asset.json";

export const Route = createFileRoute("/libros")({
  head: () => ({
    meta: [
      { title: "Libros | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Libros de Kriya Yoga: Un Palpitar de Eternidad y La Esencia de la Yoga, con páginas seleccionadas y lecturas en línea.",
      },
      { property: "og:title", content: "Libros | FHKY" },
      {
        property: "og:description",
        content:
          "Un Palpitar de Eternidad y La Esencia de la Yoga, con páginas seleccionadas y lecturas en línea.",
      },
      { property: "og:image", content: palpitar1.url },
      { name: "twitter:image", content: palpitar1.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Libros,
});

const paginasEsencia = [
  { src: esenciaPagina60.url, page: 60 },
  { src: esenciaPagina61.url, page: 61 },
  { src: esenciaPagina62.url, page: 62 },
  { src: esenciaPagina63.url, page: 63 },
];

type Lectura = { label: string; url: string; note: string };

const lecturas: Lectura[] = [
  {
    label: "Discourses on Kriya Yoga",
    url: discourses.url,
    note: "Paramahamsa Hariharananda · lectura completa",
  },
  {
    label: "Equanimous Yoga Philosophy",
    url: equanimous.url,
    note: "Enseñanzas del linaje · lectura completa",
  },
];

function BookReader({ lectura, onClose }: { lectura: Lectura; onClose: () => void }) {
  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={`Lectura: ${lectura.label}`}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
            Libro para leer
          </p>
          <p className="line-clamp-2 font-display text-lg text-foreground">{lectura.label}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href={lectura.url} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" /> Pantalla completa
          </a>
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          <X className="size-4" /> Cerrar libro
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-muted/40 px-2 py-4 sm:px-5">
        <PdfBookReader url={lectura.url} title={lectura.label} />
      </div>
    </div>,
    document.body,
  );
}

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

      <div className="book-display mx-auto mt-12 max-w-6xl">
        <section className="book-volume" aria-labelledby="palpitar-title">
          <div className="book-volume__heading">
            <span>Libro I</span>
            <h2 id="palpitar-title">Un Palpitar de Eternidad</h2>
          </div>
          <div className="book-cover-pair">
            <figure className="book-object">
              <img src={palpitar1.url} alt="Un Palpitar de Eternidad, portada" className="book-cover" />
              <figcaption>Portada</figcaption>
            </figure>
            <figure className="book-object book-object--lifted">
              <img src={palpitar2.url} alt="Un Palpitar de Eternidad, contraportada" className="book-cover" />
              <figcaption>Contraportada</figcaption>
            </figure>
          </div>
        </section>

        <section className="book-volume" aria-labelledby="esencia-title">
          <div className="book-volume__heading">
            <span>Libro II · Lectura</span>
            <h2 id="esencia-title">La Esencia de la Yoga</h2>
            <p>Unidad III · Kundalini y Kriya Yoga</p>
          </div>

          <div className="book-cover-pair">
            <figure className="book-object">
              <img src={esencia1.url} alt="La Esencia de la Yoga, portada" className="book-cover" />
              <figcaption>Portada</figcaption>
            </figure>
            <figure className="book-object book-object--lifted">
              <img src={esencia2.url} alt="La Esencia de la Yoga, contraportada" className="book-cover" />
              <figcaption>Contraportada</figcaption>
            </figure>
          </div>

          <div className="book-pages" aria-label="Páginas 60 a 63 de La Esencia de la Yoga">
            {paginasEsencia.map((pagina) => (
              <figure key={pagina.page} className="book-page">
                <img
                  src={pagina.src}
                  alt={`La Esencia de la Yoga, página ${pagina.page}`}
                  loading="lazy"
                />
                <figcaption>Página {pagina.page}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="book-volume" aria-labelledby="lecturas-title">
          <div className="book-volume__heading">
            <span>Lecturas en línea</span>
            <h2 id="lecturas-title">Libros para leer aquí mismo</h2>
            <p>Haz clic en un título y se abrirá dentro de la página.</p>
          </div>

          <div className="book-reading-list">
            {lecturas.map((lectura) => (
              <button
                key={lectura.label}
                type="button"
                className="book-reading-item"
                onClick={() => setLecturaActiva(lectura)}
              >
                <span className="book-reading-item__icon">
                  <BookOpen className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg text-foreground">{lectura.label}</span>
                  <span className="block text-sm text-muted-foreground">{lectura.note}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {lecturaActiva && (
        <BookReader lectura={lecturaActiva} onClose={() => setLecturaActiva(null)} />
      )}
    </div>
  );
}
