import { createFileRoute } from "@tanstack/react-router";
import babar1 from "@/assets/babar1.jpg.asset.json";
import { DocumentViewer } from "@/components/document-viewer";
import { raghabanandaPages } from "@/data/raghabananda-pages";

export const Route = createFileRoute("/raghabananda")({
  head: () => ({
    meta: [
      { title: "Raghabananda | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Brahmarshi Raghabananda: significado de su nombre y su mahasamadhi. Sucesor espiritual de Paramahamsa Hariharananda.",
      },
      { property: "og:title", content: "Raghabananda | FHKY" },
      {
        property: "og:description",
        content:
          "Raghabananda es quien encuentra la bienaventuranza como Rama, encarnación de Visnu, el preservador, la bondad.",
      },
      { property: "og:image", content: babar1.url },
      { name: "twitter:image", content: babar1.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Raghabananda,
});

function Raghabananda() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        RAGHABANANDA
      </h1>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            <b className="text-foreground">RAGHAV = RAGHAB = RAGHAVAN = RAGHABAN</b> = dios
            Rama, encarnación de Visnu
          </p>
          <p>
            <b className="text-foreground">ANANDA</b> = dicha, bienaventuranza
          </p>
          <p>
            <b className="text-foreground">RAGHABANANDA</b> es quien encuentra la
            bienaventuranza como Rama, encarnación de Visnu, el preservador, la bondad.
          </p>
          <p>Su Gurú Hariharananda siempre lo vió como el Señor Rama.</p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl text-center">
        <h2 className="font-display text-2xl text-primary">MAHASAMADHI</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Baba Raghabananda abandonó su cuerpo físico definitivamente el segundo día de
          Shukla Paksha del mes de Kartik, en el calendario hindú. En 2018 corresponde al 9
          de noviembre.
        </p>
        <p className="mt-8 font-display text-2xl text-foreground">¡JAI GURÚ!</p>
      </div>

      <img
        src={babar1.url}
        alt="Brahmarshi Raghabananda"
        className="image-depth mx-auto mt-10 w-full max-w-sm"
      />

      <DocumentViewer pages={raghabanandaPages} title="Biografía de Brahmarshi Raghabananda" />
    </div>
  );
}
