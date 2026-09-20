import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Contacte a la Fundación Hariharananda Kriya Yoga: Yogacharya Lía Cristina Upegui G., fundacionhariharananda@gmail.com, Cel. 317 429 3044, Envigado, Antioquia.",
      },
      { property: "og:title", content: "Contacto | FHKY" },
      {
        property: "og:description",
        content:
          "Escríbanos a fundacionhariharananda@gmail.com o llame al 317 429 3044.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [comentario, setComentario] = useState("");

  const mailto =
    "mailto:fundacionhariharananda@gmail.com" +
    `?subject=${encodeURIComponent(`Contacto web: ${nombre} ${apellido}`.trim())}` +
    `&body=${encodeURIComponent(
      `Nombre: ${nombre} ${apellido}\nCorreo: ${correo}\n\n${comentario}`,
    )}`;

  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        Contacto
      </h1>

      <div className="mx-auto mt-10 grid max-w-4xl gap-12 md:grid-cols-2">
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p className="font-display text-2xl text-foreground">
            Yogacharya Lía Cristina Upegui G.
          </p>
          <p>
            E-mail:{" "}
            <a
              href="mailto:fundacionhariharananda@gmail.com"
              className="text-primary hover:underline"
            >
              fundacionhariharananda@gmail.com
            </a>
          </p>
          <p>
            Cel:{" "}
            <a href="tel:+573174293044" className="text-primary hover:underline">
              317 429 3044
            </a>
          </p>
          <p>Envigado, Antioquia — Colombia</p>
          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="https://www.facebook.com/pg/HariharanandaKriyaYoga/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-primary transition-colors hover:bg-accent"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href="http://raghabananda.blogspot.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-primary transition-colors hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" /> Blog Raghabananda
            </a>
          </div>
        </div>

        <form
          className="space-y-5 rounded-lg border border-aqua/30 bg-card/85 p-6 shadow-xl shadow-aqua/10 backdrop-blur-xl md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input
              id="correo"
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario</Label>
            <Textarea
              id="comentario"
              rows={5}
              required
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
          >
            <Mail /> Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
