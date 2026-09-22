import { createFileRoute } from "@tanstack/react-router";
import palpitar1 from "@/assets/palpitar1.jpg.asset.json";
import palpitar2 from "@/assets/palpitar2.jpg.asset.json";
import esencia1 from "@/assets/esencia1.jpg.asset.json";
import esencia2 from "@/assets/esencia2.jpg.asset.json";
import esenciaPagina60 from "@/assets/books/esencia-pagina-02.jpg.asset.json";
import esenciaPagina61 from "@/assets/books/esencia-pagina-01.jpg.asset.json";
import esenciaPagina62 from "@/assets/books/esencia-pagina-04.jpg.asset.json";
import esenciaPagina63 from "@/assets/books/esencia-pagina-03.jpg.asset.json";

export const Route = createFileRoute("/libros")({
  head: () => ({
    meta: [
      { title: "Libros | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Libros de Kriya Yoga: Un Palpitar de Eternidad y La Esencia de la Yoga, con páginas seleccionadas para lectura en línea.",
      },
      { property: "og:title", content: "Libros | FHKY" },
      {
        property: "og:description",
        content:
          "Un Palpitar de Eternidad y La Esencia de la Yoga, con páginas seleccionadas para lectura.",
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

function Libros() {
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
          <div className="book-cover-pair book-cover-pair--green">
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

        <section className="book-volume book-volume--reading" aria-labelledby="esencia-title">
          <div className="book-volume__heading">
            <span>Libro II · Lectura</span>
            <h2 id="esencia-title">La Esencia de la Yoga</h2>
            <p>Unidad III · Kundalini y Kriya Yoga</p>
          </div>

          <div className="book-orange-layout">
            <div className="book-cover-pair book-cover-pair--orange">
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
          </div>
        </section>
      </div>
    </div>
  );
}
