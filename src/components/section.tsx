import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-4 text-balance-title text-3xl leading-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero text-ink-foreground">
      <div className="section-x relative z-10 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-balance-title text-4xl leading-[1.1] md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
          {intro}
        </p>
        {children}
      </div>
    </section>
  );
}
