import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  Headphones,
  Home,
  Library,
  LockKeyhole,
  LogOut,
  Play,
  Search,
  ShieldCheck,
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
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().toLocaleLowerCase("es") === "hariharananda" && password === "baba") {
      window.sessionStorage.setItem(SESSION_KEY, "active");
      setError("");
      onSuccess();
      return;
    }
    setError("El usuario o la contraseña no son correctos.");
  };

  return (
    <section className="member-app-shell relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden bg-ink px-4 py-12 text-ink-foreground sm:px-5 sm:py-16 md:min-h-[calc(100svh-6rem)]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,var(--color-primary)/0.22,transparent_34rem)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-xl border border-gold/30 bg-background shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden min-h-[35rem] flex-col justify-between overflow-hidden bg-ink p-12 lg:flex">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,var(--color-gold)/0.16,transparent_28rem)]"
            aria-hidden="true"
          />
          <img src={logo.url} alt="Fundación Hariharananda Kriya Yoga" className="relative mb-10 w-44" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Espacio de estudio</p>
            <h1 className="mt-5 max-w-md font-display text-5xl leading-tight text-ink-foreground">
              Profundiza en la práctica de Kriya Yoga
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-ink-foreground/65">
              Un lugar reservado para escuchar, leer y continuar el camino interior.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink-foreground/15 pt-7">
              <LoginHighlight icon={Headphones} value={`${memberAudios.length}`} label="Audios" />
              <LoginHighlight icon={Library} value={`${memberDocuments.length}`} label="Documentos" />
              <LoginHighlight icon={GraduationCap} value={`${courseModules.length}`} label="Módulos" />
            </div>
          </div>
        </div>

        <div className="relative flex items-center bg-card/40 p-6 sm:p-12">
          <form className="mx-auto w-full max-w-sm" onSubmit={submit}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-primary/10 text-primary">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <img src={logo.url} alt="" className="h-10 w-auto lg:hidden" aria-hidden="true" />
            </div>
            <p className="mt-7 text-xs uppercase tracking-[0.24em] text-primary">Área de miembros</p>
            <h1 className="mt-2 font-display text-4xl text-foreground">Bienvenido</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ingresa tus datos para acceder al material de estudiantes kriyabanes.
            </p>

            <label className="mt-8 block text-sm font-medium text-foreground" htmlFor="member-user">
              Usuario
            </label>
            <div className="relative mt-2">
              <CircleUserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="member-user"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="Tu usuario"
                className="h-12 bg-background pl-10 text-foreground caret-primary"
                required
              />
            </div>
            <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="member-password">
              Contraseña
            </label>
            <div className="relative mt-2">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="member-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                className="h-12 bg-background pl-10 pr-11 text-foreground caret-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error ? (
              <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="mt-7 h-12 w-full text-base">
              Ingresar <CircleUserRound className="h-4 w-4" />
            </Button>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Acceso exclusivo para miembros autorizados.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function LoginHighlight({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Home;
  value: string;
  label: string;
}) {
  return (
    <div>
      <Icon className="h-4 w-4 text-gold" />
      <p className="mt-2 font-display text-2xl text-ink-foreground">{value}</p>
      <p className="text-xs uppercase tracking-[0.16em] text-ink-foreground/55">{label}</p>
    </div>
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
     <div className="member-app-shell relative z-10 min-h-[calc(100svh-4.5rem)] bg-background md:min-h-[calc(100svh-6rem)]">
       <div className="mx-auto grid w-full min-w-0 max-w-[95rem] lg:grid-cols-[17rem_minmax(0,1fr)]">
         <aside className="relative min-w-0 max-w-full overflow-hidden border-b border-border bg-ink text-ink-foreground lg:min-h-[calc(100svh-6rem)] lg:border-b-0 lg:border-r lg:border-border/20">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-ink-foreground/10 px-4 py-3 lg:hidden">
            <div className="min-w-0">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">Campus Kriya</p>
              <p className="truncate font-display text-base text-ink-foreground">Escuela kriyaban</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="shrink-0 text-ink-foreground/70 hover:bg-ink-foreground/10 hover:text-ink-foreground"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden px-6 py-8 lg:block">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Campus Kriya</p>
            <p className="mt-1 font-display text-xl">Escuela kriyaban</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-foreground/55">
              Programa de estudio, práctica y comunidad.
            </p>
          </div>

           <nav className="flex w-full min-w-0 max-w-full snap-x gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:overflow-visible lg:px-4 lg:pb-6 lg:pt-0">
            {navGroups.map((group) => (
              <div key={group.title} className="contents lg:mb-4 lg:block lg:last:mb-0">
                <p className="hidden px-3 pb-2 text-[0.68rem] uppercase tracking-[0.2em] text-ink-foreground/40 lg:block">
                  {group.title}
                </p>
                <div className="contents lg:block lg:space-y-1">
                  {group.items.map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      type="button"
                      variant="ghost"
                      onClick={() => goTo(id)}
                      data-active={view === id}
                      className={`member-nav-item h-10 shrink-0 snap-start justify-start px-3 lg:h-9 lg:w-full ${
                        view === id
                          ? "bg-ink-foreground/12 text-gold"
                          : "text-ink-foreground/65 hover:bg-ink-foreground/10 hover:text-ink-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

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

        <section className="member-study-surface min-w-0 px-4 py-6 sm:px-7 sm:py-8 lg:px-12 lg:py-10">
          <header className="member-page-header grid grid-cols-1 gap-4 pb-6 sm:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)] sm:items-end sm:gap-6 lg:pb-8">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">Fundación Hariharananda</p>
              <h1 className="member-view-title mt-1 truncate font-display text-3xl text-foreground sm:mt-2 sm:text-5xl">
                {allNavItems.find((item) => item.id === view)?.label}
              </h1>
            </div>
            {view === "audios" || view === "biblioteca" ? (
               <label className="relative block w-full">
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

          <div key={view} className="member-rise">
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
          </div>

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
     <div className="py-6 sm:py-8">
      <div className="member-banner member-rise rounded-lg border border-gold/25 p-6 text-ink-foreground shadow-lg sm:p-9 lg:p-11">
        <div className="relative z-10 max-w-3xl">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">Campus kriyaban</p>
          <p className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-5xl">
            Bienvenido a tu espacio de estudio.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-foreground/70">
            Aquí encuentras el programa de clases, los satsangas de la comunidad y toda la biblioteca de
            enseñanzas del linaje de Kriya Yoga.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => onNavigate("clases")}>
              <GraduationCap className="h-4 w-4" /> Continuar el programa
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate("audios")}
              className="border-gold/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <Headphones className="h-4 w-4" /> Escuchar enseñanzas
            </Button>
          </div>
        </div>
      </div>

       <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 xl:grid-cols-4">
        <Stat
          icon={GraduationCap}
          value={courseModules.length}
          label="Módulos de clase"
          onClick={() => onNavigate("clases")}
        />
        <Stat
          icon={Headphones}
          value={memberAudios.length}
          label="Audios"
          onClick={() => onNavigate("audios")}
        />
        <Stat
          icon={BookOpen}
          value={memberDocuments.length}
          label="Documentos"
          onClick={() => onNavigate("biblioteca")}
        />
        <Stat icon={Check} value={completed} label="Completados" />
      </div>
       <section className="member-progress-panel mt-8 rounded-lg border border-gold/25 p-5 sm:mt-10 sm:p-7">
         <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Tu recorrido</p>
            <p className="mt-1 text-sm text-muted-foreground">El progreso se guarda en este dispositivo.</p>
          </div>
          <span className="font-display text-3xl text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="mt-5 h-2.5" />
      </section>

       <section className="mt-8 sm:mt-10">
        <SectionHeading eyebrow="Próximamente" title="Agenda de la comunidad" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {upcomingSessions.slice(0, 2).map((item) => (
            <SessionCard key={item.id} session={item} />
          ))}
        </div>
        <Button variant="link" className="mt-3 px-0" onClick={() => onNavigate("proximos")}>
          Ver todos los próximos satsangas
        </Button>
      </section>

       <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 xl:grid-cols-3">
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

function Stat({
  icon: Icon,
  value,
  label,
  onClick,
}: {
  icon: typeof Home;
  value: number;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <span className="member-stat-icon"><Icon className="h-5 w-5" /></span>
      <p className="mt-4 font-display text-3xl text-foreground sm:mt-6 sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="member-card member-stat-card rounded-lg border border-border bg-card p-4 text-left shadow-sm sm:p-5"
      >
        {content}
      </button>
    );
  }

  return (
     <div className="member-stat-card rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
      {content}
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
       className="member-card member-module-link h-auto min-w-0 justify-start gap-3 whitespace-normal border-gold/30 bg-card p-4 text-left shadow-sm sm:gap-4 sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-xl text-foreground">{title}</span>
        <span className="mt-1 block text-xs font-normal text-muted-foreground">{detail}</span>
      </span>
      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-primary" />
    </Button>
  );
}

function ClassesView() {
  return (
     <div className="py-6 sm:py-8">
       <SectionIntroduction
         eyebrow="Ruta formativa"
         title="Un camino de estudio en tres niveles"
         description="Cada módulo reúne las lecciones del tema y una práctica concreta para la semana; el material de apoyo está en la biblioteca y en los audios."
       />
       <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 xl:grid-cols-2">
        {courseModules.map((module, index) => (
            <article key={module.id} className="member-card member-course-card rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
               <p className="member-level-pill text-xs font-medium uppercase tracking-[0.18em] text-primary">{module.level}</p>
               <span className="font-display text-4xl text-primary/25">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
             <h2 className="mt-5 font-display text-2xl leading-tight text-foreground">{module.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{module.summary}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5">
              {module.lessons.map((lesson) => (
                <li key={lesson} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {lesson}
                </li>
              ))}
            </ul>
             <p className="member-practice-note mt-5 rounded-md border-l-2 border-gold bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
               <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary">Práctica de la semana</span>
               <span className="mt-2 block">
              {module.practice}
               </span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SatsangasView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
     <div className="py-6 sm:py-8">
       <SectionIntroduction eyebrow="Comunidad" title="Encuentros para compartir la práctica" description="El satsanga es el encuentro de la comunidad alrededor de la enseñanza. Estos son los cuatro encuentros regulares de la Fundación." />
       <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
        {satsangas.map((item) => (
            <article key={item.id} className="member-card member-community-card rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </span>
             <h2 className="mt-5 font-display text-2xl text-foreground">{item.title}</h2>
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
     <div className="py-6 sm:py-8">
       <SectionIntroduction eyebrow="Agenda" title="Próximos encuentros" description="Calendario regular de encuentros. La coordinación confirma cada fecha por los canales de la Fundación antes de la reunión." />
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
     <article className="member-card member-session-card grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-5 sm:p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
        <CalendarDays className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="font-display text-lg text-foreground">{session.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{session.detail}</p>
      </div>
       <div className="col-span-2 border-t border-border pt-3 text-sm sm:col-span-1 sm:border-0 sm:pt-0 sm:text-right">
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
     <div className="py-6 sm:py-8">
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
       <SectionIntroduction eyebrow="Escucha consciente" title="Enseñanzas para acompañar tu práctica" description={`${items.length} grabaciones encontradas. Reproduce cada enseñanza y marca tu avance.`} compact />
      <div className="grid gap-3">
        {items.map((item, index) => (
          <article
            key={item.id}
             className="member-card member-audio-row grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-4 sm:p-4"
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
               <h2 className="mt-1 line-clamp-2 font-medium leading-snug text-foreground sm:truncate">{item.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle(item.id)}
               className={`col-span-2 justify-self-end sm:col-span-1 ${completed.includes(item.id) ? "text-primary" : "text-muted-foreground"}`}
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
     <div className="py-6 sm:py-8">
       <SectionIntroduction eyebrow="Biblioteca del linaje" title="Lecturas para profundizar" description={`${items.length} lecturas encontradas · se abren dentro de la página`} compact />
       <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
             className="member-card member-document-card flex min-h-0 flex-col rounded-lg border border-border bg-card p-4 shadow-sm sm:min-h-64 sm:p-6"
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
             <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground sm:mt-5">{item.collection}</p>
             <h2 className="mt-2 line-clamp-3 font-display text-xl leading-snug text-foreground">{item.title}</h2>
             <div className="mt-auto flex gap-2 pt-5 sm:pt-6">
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
    const previousOverflow = documentElementOverflow();
    window.document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.document.documentElement.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Lectura: ${document.title}`}
    >
       <div className="flex h-[100dvh] w-full max-w-6xl flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:rounded-lg sm:border sm:border-gold/25 lg:h-full">
         <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border p-3 sm:p-5">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">{document.collection}</p>
             <h2 className="mt-1 line-clamp-2 font-display text-base leading-snug text-foreground sm:text-xl">{document.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
             <Button asChild size="icon" variant="outline">
              <a href={driveDownloadUrl(document.id)} target="_blank" rel="noreferrer" aria-label="Descargar" title="Descargar">
                <Download className="h-4 w-4" />
              </a>
            </Button>
             <Button asChild size="icon" variant="outline" className="hidden min-[430px]:inline-flex">
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
           className="min-h-0 w-full flex-1 bg-muted"
          allow="autoplay"
        />
      </div>
    </div>,
    window.document.body,
  );
}

function documentElementOverflow() {
  return window.document.documentElement.style.overflow;
}

function VideoLibrary() {
  return (
     <div className="flex min-h-[22rem] items-center justify-center py-10 text-center sm:min-h-[28rem] sm:py-12">
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

function SectionIntroduction({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={`member-section-intro ${compact ? "mb-6" : ""}`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 max-w-3xl font-display text-2xl leading-tight text-foreground sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl text-foreground">{title}</h2>
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
