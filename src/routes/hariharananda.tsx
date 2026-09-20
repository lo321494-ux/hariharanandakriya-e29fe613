import { createFileRoute } from "@tanstack/react-router";
import hariharananda2 from "@/assets/hariharananda2.png.asset.json";
import { DocumentViewer } from "@/components/document-viewer";
import { hariharanandaPages } from "@/data/hariharananda-pages";

export const Route = createFileRoute("/hariharananda")({
  head: () => ({
    meta: [
      { title: "Hariharananda | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Significado del nombre Hariharananda y enseñanzas de Paramahamsa Hariharananda sobre la meditación sincera y la Realización Suprema.",
      },
      { property: "og:title", content: "Hariharananda | FHKY" },
      {
        property: "og:description",
        content:
          "Hariharananda es el estado de bienaventuranza divina emergiendo del estado real sin forma.",
      },
      { property: "og:image", content: hariharananda2.url },
      { name: "twitter:image", content: hariharananda2.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hariharananda,
});

const significados = [
  ["HARI", "es la divinidad que mantiene"],
  ["HARA", "es la divinidad que disuelve"],
  ["ANANDA", "es bienaventuranza"],
  ["HA", "representa el color supremo del sol naciente"],
  ["RA", "es el brillo de la llama"],
  ["I", "es la fuente de la energía"],
];

function Hariharananda() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        HARIHARANANDA
      </h1>

      <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <img
          src={hariharananda2.url}
          alt="Paramahamsa Hariharananda"
          className="image-depth w-full"
        />

        <div>
          <dl className="space-y-3">
            {significados.map(([t, d]) => (
              <div key={t} className="flex gap-3 border-b border-border/70 py-3">
                <dt className="min-w-24 font-display text-lg text-primary">{t}</dt>
                <dd className="text-base leading-relaxed text-muted-foreground">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            <b className="text-foreground">HARIHARANANDA</b> es así, el estado de
            bienaventuranza divina emergiendo del estado real sin forma.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl space-y-8">
        <blockquote className="border-l-4 border-primary/50 pl-5 font-display text-xl leading-relaxed text-foreground">
          “El Ser no se conoce con las buenas obras o con los sacrificios. Tampoco se revela
          en los Vedas, ni a través del intelecto o el aprendizaje. Sólo se conoce con la
          meditación sincera”
          <footer className="mt-2 text-sm tracking-wide text-muted-foreground">
            P. Hariharananda
          </footer>
        </blockquote>

        <blockquote className="border-l-4 border-primary/50 pl-5 font-display text-xl leading-relaxed text-foreground">
          “Para la Realización Suprema no se necesitan flores, frutas o dulces. Su corazón es
          su única flor. Si usted entrega su corazón (durante la iniciación y durante la
          meditación) no tendrá más sentido del cuerpo físico y estará entregando todo”
        </blockquote>
      </div>

      <DocumentViewer pages={hariharanandaPages} title="Biografía de Paramahamsa Hariharananda" />
    </div>
  );
}
