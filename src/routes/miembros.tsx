import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  CircleUserRound,
  Download,
  ExternalLink,
  GraduationCap,
  Headphones,
  Home,
  Library,
  LockKeyhole,
  LogOut,
  Play,
  Search,
  Users,
  Video,
  X,
} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  MEMBER_DRIVE_URL,
  driveDownloadUrl,
  drivePreviewUrl,
  driveViewUrl,
  memberAudios,
  memberDocuments,
  type MemberResource,
} from "@/data/member-library";
import { courseModules, satsangas, upcomingSessions } from "@/data/member-program";

export const Route = createFileRoute("/miembros")({
  head: () => ({
    meta: [
      { title: "Área de miembros | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Campus de estudio para miembros kriyabanes: audios, biblioteca, satsangas y clases de Kriya Yoga.",
      },
      { property: "og:title", content: "Área de miembros | FHKY" },
      {
        property: "og:description",
        content: "Biblioteca privada de audios, libros, satsangas y clases de Kriya Yoga.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MembersPage,
});

type View = "inicio" | "audios" | "biblioteca" | "videos" | "satsangas" | "proximos" | "clases";

const SESSION_KEY = "fhky-member-session";
const PROGRESS_KEY = "fhky-member-progress";

type NavItem = { id: View; label: string; icon: typeof Home };

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Campus",
    items: [
      { id: "inicio", label: "Inicio", icon: Home },
      { id: "clases", label: "Clases", icon: GraduationCap },
    ],
  },
  {
    title: "Comunidad",
    items: [
      { id: "satsangas", label: "Satsangas", icon: Users },
      { id: "proximos", label: "Próximos satsangas", icon: CalendarDays },
    ],
  },
  {
    title: "Material de estudio",
    items: [
      { id: "audios", label: "Audios", icon: Headphones },
      { id: "biblioteca", label: "Biblioteca", icon: Library },
      { id: "videos", label: "Videos", icon: Video },
    ],
  },
];

const allNavItems = navGroups.flatMap((group) => group.items);

function MembersPage() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem(SESSION_KEY) === "active");
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="min-h-[60vh] bg-ink" aria-label="Cargando área de miembros" />;
  }

  if (!authenticated) {
    return <MemberLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <MemberApp
      onLogout={() => {
        window.sessionStorage.removeItem(SESSION_KEY);
        setAuthenticated(false);
      }}
    />
  );
}

function MemberLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().toLowerCase() === "hariharanada" && password === "baba") {
      window.sessionStorage.setItem(SESSION_KEY, "active");
      setError("");
      onSuccess();
      return;
    }
    setError("El usuario o la contraseña no son correctos.");
  };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden bg-ink px-5 py-16 text-ink-foreground md:min-h-[calc(100svh-6rem)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,var(--color-primary)/0.22,transparent_34rem)]"
        aria-hidden="true"
      />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-lg border border-gold/25 bg-background shadow-2xl lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hidden min-h-[35rem] flex-col justify-between bg-ink p-12 lg:flex">
          <img src={logo.url} alt="Fundación Hariharananda Kriya Yoga" className="w-52" />
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Espacio de estudio</p>
            <h1 className="mt-5 max-w-md font-display text-5xl leading-tight text-ink-foreground">
              Profundiza en la práctica de Kriya Yoga
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-ink-foreground/65">
              Un lugar reservado para escuchar, leer y continuar el camino interior.
            </p>
          </div>
        </div>

        <div className="flex items-center p-7 sm:p-12">
          <form className="mx-auto w-full max-w-sm" onSubmit={submit}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-7 text-xs uppercase tracking-[0.24em] text-primary">Área de miembros</p>
            <h1 className="mt-2 font-display text-4xl text-foreground">Bienvenido</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ingresa tus datos para acceder al material de estudiantes kriyabanes.
            </p>

            <label className="mt-8 block text-sm font-medium text-foreground" htmlFor="member-user">
              Usuario
            </label>
            <Input
              id="member-user"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="mt-2 h-11 bg-card"
              required
            />
            <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="member-password">
              Contraseña
            </label>
            <Input
              id="member-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-2 h-11 bg-card"
              required
            />
            {error ? (
              <p className="mt-4 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="mt-7 h-11 w-full">
              Ingresar <CircleUserRound className="h-4 w-4" />
            </Button>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              Acceso exclusivo para miembros autorizados.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function MemberApp({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<View>("inicio");
  const [query, setQuery] = useState("");
  const [activeAudio, setActiveAudio] = useState<MemberResource | null>(null);
  const [activeDocument, setActiveDocument] = useState<MemberResource | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(PROGRESS_KEY);
    if (!stored) return;
    try {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) setCompleted(parsed);
    } catch {
      window.localStorage.removeItem(PROGRESS_KEY);
    }
  }, []);

  const toggleComplete = (id: string) => {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const normalized = query.trim().toLocaleLowerCase("es");
  const filteredAudios = useMemo(
    () => memberAudios.filter((item) => item.title.toLocaleLowerCase("es").includes(normalized)),
    [normalized],
  );
  const filteredDocuments = useMemo(
    () => memberDocuments.filter((item) => item.title.toLocaleLowerCase("es").includes(normalized)),
    [normalized],
  );
  const total = memberAudios.length + memberDocuments.length;
  const progress = total ? Math.round((completed.length / total) * 100) : 0;

  const goTo = (next: View) => {
    setView(next);
    setQuery("");
  };

  return (
    <div className="relative z-10 min-h-[calc(100svh-4.5rem)] bg-background md:min-h-[calc(100svh-6rem)]">
      <div className="mx-auto grid max-w-[95rem] lg:grid-cols-[17rem_1fr]">
        <aside className="relative border-b border-border bg-ink text-ink-foreground lg:min-h-[calc(100svh-6rem)] lg:border-b-0 lg:border-r lg:border-border/20">
          <div className="hidden px-6 py-8 lg:block">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Campus Kriya</p>
            <p className="mt-1 font-display text-xl">Escuela kriyaban</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-foreground/55">
              Programa de estudio, práctica y comunidad.
            </p>
          </div>

          <nav className="px-3 py-4 lg:px-4 lg:pb-6 lg:pt-0">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-4 last:mb-0">
                <p className="hidden px-3 pb-2 text-[0.68rem] uppercase tracking-[0.2em] text-ink-foreground/40 lg:block">
                  {group.title}
                </p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:block lg:space-y-1">
                  {group.items.map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      type="button"
                      variant="ghost"
                      onClick={() => goTo(id)}
                      className={`min-w-0 justify-start ${
                        view === id
                          ? "bg-ink-foreground/12 text-gold"
                          : "text-ink-foreground/65 hover:bg-ink-foreground/10 hover:text-ink-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="absolute right-4 top-4 text-ink-foreground/70 hover:bg-ink-foreground/10 hover:text-ink-foreground lg:hidden"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          <div className="hidden px-6 py-7 lg:block">
            <div className="flex items-center justify-between text-xs text-ink-foreground/60">
              <span>Tu recorrido</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="mt-3 bg-ink-foreground/10" />
            <Button
              variant="ghost"
              onClick={onLogout}
              className="mt-8 w-full justify-start text-ink-foreground/60 hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">Fundación Hariharananda</p>
              <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                {allNavItems.find((item) => item.id === view)?.label}
              </h1>
            </div>
            {view === "audios" || view === "biblioteca" ? (
              <label className="relative block w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <span className="sr-only">Buscar material</span>
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar material"
                  className="h-10 bg-background pl-10"
                />
              </label>
            ) : null}
          </header>

          {view === "inicio" ? (
            <DashboardHome progress={progress} completed={completed.length} onNavigate={goTo} />
          ) : null}
          {view === "clases" ? <ClassesView /> : null}
          {view === "satsangas" ? <SatsangasView onNavigate={goTo} /> : null}
          {view === "proximos" ? <UpcomingView /> : null}
          {view === "audios" ? (
            <AudioLibrary
              items={filteredAudios}
              active={activeAudio}
              completed={completed}
              onPlay={setActiveAudio}
              onToggle={toggleComplete}
            />
          ) : null}
          {view === "biblioteca" ? (
            <DocumentLibrary
              items={filteredDocuments}
              completed={completed}
              onToggle={toggleComplete}
              onRead={setActiveDocument}
            />
          ) : null}
          {view === "videos" ? <VideoLibrary /> : null}
        </section>
      </div>

      {activeDocument ? (
        <DocumentReader document={activeDocument} onClose={() => setActiveDocument(null)} />
      ) : null}
    </div>
  );
}

function DashboardHome({
  progress,
  completed,
  onNavigate,
}: {
  progress: number;
  completed: number;
  onNavigate: (view: View) => void;
}) {
  return (
    <div className="py-8">
      <div className="max-w-3xl">
        <p className="font-display text-2xl text-foreground">Bienvenido a tu espacio de estudio.</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Aquí encuentras el programa de clases, los satsangas de la comunidad y toda la biblioteca de
          enseñanzas del linaje de Kriya Yoga.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={GraduationCap} value={courseModules.length} label="Módulos de clase" />
        <Stat icon={Headphones} value={memberAudios.length} label="Audios" />
        <Stat icon={BookOpen} value={memberDocuments.length} label="Documentos" />
        <Stat icon={Check} value={completed} label="Completados" />
      </div>
      <section className="mt-10 border-y border-border py-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-foreground">Tu recorrido</p>
            <p className="mt-1 text-sm text-muted-foreground">El progreso se guarda en este dispositivo.</p>
          </div>
          <span className="font-display text-3xl text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="mt-5 h-2.5" />
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-foreground">Agenda de la comunidad</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {upcomingSessions.slice(0, 2).map((item) => (
            <SessionCard key={item.id} session={item} />
          ))}
        </div>
        <Button variant="link" className="mt-3 px-0" onClick={() => onNavigate("proximos")}>
          Ver todos los próximos satsangas
        </Button>
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <ModuleButton
          icon={GraduationCap}
          title="Entrar a clases"
          detail={`${courseModules.length} módulos guiados`}
          onClick={() => onNavigate("clases")}
        />
        <ModuleButton
          icon={Headphones}
          title="Escuchar enseñanzas"
          detail={`${memberAudios.length} audios disponibles`}
          onClick={() => onNavigate("audios")}
        />
        <ModuleButton
          icon={Library}
          title="Explorar la biblioteca"
          detail={`${memberDocuments.length} libros y documentos`}
          onClick={() => onNavigate("biblioteca")}
        />
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Home; value: number; label: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-5 shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-5 font-display text-3xl text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ModuleButton({
  icon: Icon,
  title,
  detail,
  onClick,
}: {
  icon: typeof Home;
  title: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-auto justify-start gap-4 border-gold/30 bg-background p-5 text-left shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg text-foreground">{title}</span>
        <span className="mt-1 block text-xs font-normal text-muted-foreground">{detail}</span>
      </span>
    </Button>
  );
}

function ClassesView() {
  return (
    <div className="py-8">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        Plan de formación en tres niveles. Cada módulo reúne las lecciones del tema y una práctica
        concreta para la semana; el material de apoyo está en la biblioteca y en los audios.
      </p>
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        {courseModules.map((module, index) => (
          <article key={module.id} className="rounded-md border border-border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">{module.level}</p>
              <span className="font-display text-2xl text-muted-foreground/50">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl text-foreground">{module.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{module.summary}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5">
              {module.lessons.map((lesson) => (
                <li key={lesson} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {lesson}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-md bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
              <span className="font-medium">Práctica de la semana: </span>
              {module.practice}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SatsangasView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="py-8">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        El satsanga es el encuentro de la comunidad alrededor de la enseñanza. Estos son los cuatro
        encuentros regulares de la Fundación.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {satsangas.map((item) => (
          <article key={item.id} className="rounded-md border border-border bg-background p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-display text-xl text-foreground">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.focus}</p>
            <dl className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Guía:</dt>
                <dd className="text-foreground">{item.guide}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Modalidad:</dt>
                <dd className="text-foreground">{item.modality}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <Button variant="outline" className="mt-8" onClick={() => onNavigate("proximos")}>
        <CalendarDays className="h-4 w-4" /> Ver próximos satsangas
      </Button>
    </div>
  );
}

function UpcomingView() {
  return (
    <div className="py-8">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        Calendario regular de encuentros. La coordinación confirma cada fecha por los canales de la
        Fundación antes de la reunión.
      </p>
      <div className="mt-8 grid gap-3">
        {upcomingSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: (typeof upcomingSessions)[number] }) {
  return (
    <article className="grid gap-4 rounded-md border border-border bg-background p-5 shadow-sm sm:grid-cols-[3rem_1fr_auto] sm:items-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
        <CalendarDays className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="font-display text-lg text-foreground">{session.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{session.detail}</p>
      </div>
      <div className="text-sm sm:text-right">
        <p className="text-foreground">{session.weekday}</p>
        <p className="text-muted-foreground">
          {session.time} · {session.modality}
        </p>
      </div>
    </article>
  );
}

function AudioLibrary({
  items,
  active,
  completed,
  onPlay,
  onToggle,
}: {
  items: MemberResource[];
  active: MemberResource | null;
  completed: string[];
  onPlay: (item: MemberResource) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="py-8">
      {active ? (
        <div className="mb-8 border-b border-gold/30 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Reproduciendo ahora</p>
          <h2 className="mt-2 font-display text-2xl text-foreground">{active.title}</h2>
          <iframe
            title={`Audio: ${active.title}`}
            src={drivePreviewUrl(active.id)}
            className="mt-5 h-20 w-full rounded-md border border-border bg-background"
            allow="autoplay"
          />
        </div>
      ) : null}
      <p className="mb-5 text-sm text-muted-foreground">{items.length} grabaciones encontradas</p>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid items-center gap-4 rounded-md border border-border bg-background p-4 shadow-sm sm:grid-cols-[3rem_1fr_auto]"
          >
            <Button
              size="icon"
              variant={active?.id === item.id ? "default" : "outline"}
              onClick={() => onPlay(item)}
              aria-label={`Reproducir ${item.title}`}
              title="Reproducir"
            >
              <Play className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Pista {String(index + 1).padStart(2, "0")} · {item.collection}
              </p>
              <h2 className="mt-1 truncate font-medium text-foreground">{item.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle(item.id)}
              className={completed.includes(item.id) ? "text-primary" : "text-muted-foreground"}
            >
              <Check className="h-4 w-4" /> {completed.includes(item.id) ? "Completado" : "Marcar"}
            </Button>
          </article>
        ))}
        {!items.length ? <EmptySearch /> : null}
      </div>
    </div>
  );
}

function DocumentLibrary({
  items,
  completed,
  onToggle,
  onRead,
}: {
  items: MemberResource[];
  completed: string[];
  onToggle: (id: string) => void;
  onRead: (item: MemberResource) => void;
}) {
  return (
    <div className="py-8">
      <p className="mb-5 text-sm text-muted-foreground">
        {items.length} lecturas encontradas · se abren dentro de la página
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex min-h-56 flex-col rounded-md border border-border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggle(item.id)}
                className={completed.includes(item.id) ? "text-primary" : "text-muted-foreground"}
                aria-label={completed.includes(item.id) ? "Marcar como pendiente" : "Marcar como leído"}
                title={completed.includes(item.id) ? "Leído" : "Marcar como leído"}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.collection}</p>
            <h2 className="mt-2 line-clamp-3 font-display text-lg leading-snug text-foreground">{item.title}</h2>
            <div className="mt-auto flex gap-2 pt-6">
              <Button size="sm" className="flex-1" onClick={() => onRead(item)}>
                <BookOpen className="h-4 w-4" /> Leer aquí
              </Button>
              <Button asChild size="icon" variant="outline">
                <a
                  href={driveDownloadUrl(item.id)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Descargar ${item.title}`}
                  title="Descargar"
                >
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </article>
        ))}
        {!items.length ? <EmptySearch /> : null}
      </div>
    </div>
  );
}

function DocumentReader({ document, onClose }: { document: MemberResource; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Lectura: ${document.title}`}
    >
      <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-gold/25 bg-background shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">{document.collection}</p>
            <h2 className="mt-1 truncate font-display text-lg text-foreground sm:text-xl">{document.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="icon" variant="outline" className="hidden sm:inline-flex">
              <a href={driveDownloadUrl(document.id)} target="_blank" rel="noreferrer" aria-label="Descargar" title="Descargar">
                <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="icon" variant="outline" className="hidden sm:inline-flex">
              <a href={driveViewUrl(document.id)} target="_blank" rel="noreferrer" aria-label="Abrir en pestaña nueva" title="Abrir en pestaña nueva">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" onClick={onClose} aria-label="Cerrar lectura" title="Cerrar">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <iframe
          title={`Documento: ${document.title}`}
          src={drivePreviewUrl(document.id)}
          className="h-full w-full flex-1 bg-muted"
          allow="autoplay"
        />
      </div>
    </div>
  );
}

function VideoLibrary() {
  return (
    <div className="flex min-h-[28rem] items-center justify-center py-12 text-center">
      <div className="max-w-md">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Video className="h-7 w-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl text-foreground">Videoteca en preparación</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          La carpeta compartida todavía no contiene videos públicos. Cuando se añadan, estarán disponibles
          en este módulo.
        </p>
        <Button asChild variant="outline" className="mt-7">
          <a href={MEMBER_DRIVE_URL} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" /> Abrir material original
          </a>
        </Button>
      </div>
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="col-span-full border-y border-border py-16 text-center">
      <Search className="mx-auto h-7 w-7 text-muted-foreground" />
      <p className="mt-4 text-sm text-muted-foreground">No encontramos material con ese nombre.</p>
    </div>
  );
}
