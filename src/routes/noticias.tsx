import { createFileRoute } from "@tanstack/react-router";
import construccionPaz from "@/assets/construccion-paz.jpg.asset.json";
import diaYoga from "@/assets/dia-yoga.jpg.asset.json";
import lunaLlena from "@/assets/luna-llena.jpg.asset.json";
import lunaCristo from "@/assets/luna-cristo.png.asset.json";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Noticias y eventos | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Noticias, afiches y eventos de la Fundación Hariharananda Kriya Yoga: Construcción de Paz, Día Internacional del Yoga y meditaciones de luna llena.",
      },
      { property: "og:title", content: "Noticias y eventos | FHKY" },
      {
        property: "og:description",
        content:
          "Eventos y meditaciones de la Fundación Hariharananda Kriya Yoga en Colombia.",
      },
      { property: "og:image", content: construccionPaz.url },
      { name: "twitter:image", content: construccionPaz.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Noticias,
});

function Noticias() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        Noticias
      </h1>

      <div className="mx-auto mt-10 max-w-4xl space-y-12">
        <img
          src={construccionPaz.url}
          alt="Construcción de Paz — evento de la Fundación Hariharananda Kriya Yoga"
          className="w-full rounded-lg border-4 border-primary/40 p-1"
        />

        <img
          src={diaYoga.url}
          alt="Día Internacional del Yoga"
          className="w-full rounded-lg border-4 border-primary/40 p-1"
        />

        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src={lunaLlena.url}
            alt="Luna llena del Buda, 24 de abril de 2024"
            className="w-full rounded-lg border-4 border-primary/40 p-1"
          />
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Usando la energía de la luna llena del Budha, reflexionamos sobre la enseñanza
              que no da nuestro amado Gurú Paramahansa Hariharananda en su libro El espíritu
              de las religiones: “El camino intermedio es un concepto místico. Primero
              significa liberarse de todos los extremos. Mucha gente se entrega al placer
              olvidándose de la realidad; otros se involucran en austeridades, torturando el
              cuerpo. La disciplina y la moderación es el camino intermedio.
            </p>
            <p>
              En segundo lugar, el camino intermedio se refiere al camino de la meditación.
              En la meditación uno abre el camino medio de la sushumna para estar con el
              espíritu cósmico”.
            </p>
            <p>
              Kriya Yoga es la técnica más poderosa de realización del ser, completamente
              adaptada a las necesidades del hombre moderno.
            </p>
            <p>
              En este importante día, honramos la amada técnica de Kriya Yoga y a todos los
              maestros que la enseñaron.
            </p>
          </div>
        </div>

        <img
          src={lunaCristo.url}
          alt="Luna llena del Cristo, 25 de marzo de 2024"
          className="w-full rounded-lg border-4 border-primary/40 p-1"
        />
      </div>
    </div>
  );
}
