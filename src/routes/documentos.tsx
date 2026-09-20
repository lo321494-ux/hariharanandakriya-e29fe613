import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { DOCS_BASE, documentos } from "@/data/documentos";

export const Route = createFileRoute("/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Documentos públicos de la Fundación Hariharananda Kriya Yoga: estatutos, actas de asamblea, estados financieros, informes de gestión, presupuestos y certificaciones por año.",
      },
      { property: "og:title", content: "Documentos públicos | FHKY" },
      {
        property: "og:description",
        content:
          "Transparencia: estatutos, actas, estados financieros, informes de gestión y certificaciones de la FHKY.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Documentos,
});

function Documentos() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        Documentos
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
        Seleccione el documento para consultar.
      </p>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        {documentos.map((grupo) => (
          <section key={grupo.year}>
            <h2 className="font-display text-2xl text-primary">AÑO {grupo.year}</h2>
            <ul className="mt-4 divide-y divide-border rounded-lg border border-aqua/30 bg-card/85 backdrop-blur-xl">
              {grupo.items.map((doc) => (
                <li key={grupo.year + doc.file}>
                  <a
                    href={DOCS_BASE + encodeURIComponent(doc.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  >
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{doc.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
