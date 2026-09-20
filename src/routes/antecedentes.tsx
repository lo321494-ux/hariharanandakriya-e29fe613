import { createFileRoute } from "@tanstack/react-router";
import hariharananda1 from "@/assets/hariharananda1.jpg.asset.json";
import foto3 from "@/assets/foto3.jpg.asset.json";

export const Route = createFileRoute("/antecedentes")({
  head: () => ({
    meta: [
      { title: "Antecedentes | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Antecedentes, objeto, carácter, localización y actividades de la Fundación Hariharananda Kriya Yoga (FHKY), con domicilio en Envigado, Antioquia, Colombia.",
      },
      { property: "og:title", content: "Antecedentes | FHKY" },
      {
        property: "og:description",
        content:
          "Entidad sin ánimo de lucro, apolítica y sin sectarismos, dedicada a diseminar las enseñanzas de Kriya Yoga.",
      },
      { property: "og:image", content: hariharananda1.url },
      { name: "twitter:image", content: hariharananda1.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Antecedentes,
});

const bloques = [
  {
    titulo: "ANTECEDENTES",
    texto:
      "Paramahamsa Hariharananda, uno de los más grandes yoguis que ha dado la India y su sucesor espiritual, Brahmarshi Raghabananda, heredaron la misión de los Maestros de Kriya Yoga de diseminar la enseñanza de Kriya Yoga como el medio más potente para lograr la paz y la elevación de la humanidad. Continuar esa tarea es la razón de ser de la Fundación Hariharananda Kriya Yoga. Y entendiendo que la práctica de Kriya Yoga es fuente de salud física y mental, enseñar y propiciar dicha práctica es un aporte a la paz de la región y del mundo.",
  },
  {
    titulo: "OBJETO",
    texto:
      "El Objeto de La Fundación es diseminar las enseñanzas de Kriya Yoga de Paramahamsa Hariharananda, Brahmarshi Raghabananda y los maestros del linaje de Babaji Maharaj.",
  },
  {
    titulo: "CARÁCTER",
    texto:
      "\"La Fundación Hariharananda Kriya Yoga\" es absolutamente apolítica, carente de sectarismos; no pertenece a ninguna religión o movimiento. Está dirigida a toda clase de personas, sea cual fuere su creencia, nacionalidad, sexo, raza o condición. Es sin ánimo de lucro, de carácter privado, denominada “Fundación Hariharananda Kriya Yoga”, la cual podrá también designarse con la sigla FHKY.",
  },
  {
    titulo: "LOCALIZACIÓN",
    texto:
      "La Fundación tiene su domicilio en Envigado, Antioquia, su nacionalidad es Colombiana y podrá ejercer su objeto en el territorio de Colombia y aún en el exterior si lo juzgare necesario. Hasta ahora ha desarrollado su objeto dentro del Valle de Aburrá.",
  },
];


function Antecedentes() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        ANTECEDENTES
      </h1>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {bloques.map((b) => (
            <section key={b.titulo} className="border-l border-primary/30 pl-5 md:pl-7">
              <h2 className="font-display text-2xl text-primary">{b.titulo}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{b.texto}</p>
            </section>
          ))}

          <section>
            <h2 className="font-display text-2xl text-primary">ACTIVIDADES</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Preparación para la Kriya Yoga a personas interesadas.</li>
              <li>Enseñanza directa de la técnica de Kriya Yoga.</li>
              <li>Conferencias sobre yoga y sobre los Vedas.</li>
              <li>Trabajo con la energía vital.</li>
              <li>
                Difusión de literatura y documentos diversos producidos por los maestros de
                Kriya Yoga (traducción, edición, impresión y distribución de libros, textos,
                grabaciones, videos, etc).
              </li>
            </ul>
          </section>
        </div>

        <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <img
            src={hariharananda1.url}
            alt="Paramahamsa Hariharananda"
            className="w-full rounded-lg border-4 border-primary/40 p-1"
          />
          <img
            src={foto3.url}
            alt="Actividades de la Fundación Hariharananda Kriya Yoga"
            className="w-full rounded-lg border-4 border-primary/40 p-1"
          />
        </div>
      </div>
    </div>
  );
}
