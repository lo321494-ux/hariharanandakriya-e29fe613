import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Facebook, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";

const fhky = [
  { to: "/empoderamiento", label: "Empoderamiento" },
  { to: "/antecedentes", label: "Antecedentes" },
  { to: "/documentos", label: "Documentos" },
  { to: "/libros", label: "Libros" },
] as const;

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/raghabananda", label: "Raghabananda" },
  { to: "/hariharananda", label: "Hariharananda" },
  { to: "/kriya-yoga", label: "KriyaYoga" },
  { to: "/noticias", label: "Noticias" },
] as const;

const FACEBOOK = "https://www.facebook.com/pg/HariharanandaKriyaYoga/";
const BLOGSPOT = "http://raghabananda.blogspot.com/";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-background/95 shadow-[0_12px_30px_-24px_var(--color-foreground)] backdrop-blur-2xl">
      <div className="section-x flex h-[4.5rem] items-center justify-between gap-3 md:h-24">
        <Link to="/" className="group flex min-w-0 items-center" onClick={close} aria-label="Fundación Hariharananda Kriya Yoga — Inicio">
          <img
            src={logo.url}
            alt="Fundación Hariharananda Kriya Yoga"
            className="h-12 w-auto drop-shadow-lg transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110 md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          <div className="group relative">
            <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">
              FHKY <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <ul className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-md border border-border/70 bg-background/95 p-2 opacity-0 shadow-xl backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {fhky.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block rounded-sm px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary [&.active]:bg-accent [&.active]:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="story-link px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={FACEBOOK}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={BLOGSPOT}
            target="_blank"
            rel="noreferrer"
            aria-label="Blog Raghabananda"
            title="Blog Raghabananda"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <Button asChild className="rounded-full px-5 shadow-md shadow-primary/20">
            <Link to="/contacto">Contacto</Link>
          </Button>
        </nav>

        <Button
          variant="outline"
          size="icon"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border-gold/40 bg-background/80 shadow-md xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-gold/25 bg-background/95 shadow-2xl backdrop-blur-2xl xl:hidden">
          <nav className="section-x grid max-h-[calc(100vh-4.5rem)] grid-cols-2 gap-1 overflow-y-auto py-5 sm:grid-cols-3">
            {[...nav, ...fhky].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-primary [&.active]:bg-accent [&.active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={close}
              className="col-span-2 mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground sm:col-span-1"
            >
              Contacto
            </Link>
            <div className="col-span-2 mt-3 flex gap-5 px-2 text-sm text-muted-foreground sm:col-span-3">
              <a className="flex items-center gap-2 hover:text-primary" href={FACEBOOK} target="_blank" rel="noreferrer"><Facebook className="h-4 w-4" />Facebook</a>
              <a className="flex items-center gap-2 hover:text-primary" href={BLOGSPOT} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />Blog Raghabananda</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
