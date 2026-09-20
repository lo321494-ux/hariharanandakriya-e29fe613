import { createFileRoute } from "@tanstack/react-router";
import kriyaBaba from "@/assets/kriya-baba.png.asset.json";

export const Route = createFileRoute("/kriya-yoga")({
  head: () => ({
    meta: [
      { title: "Kriya Yoga | Fundación Hariharananda Kriya Yoga" },
      {
        name: "description",
        content:
          "Enseñanzas sobre Kriya Yoga de Paramahamsa Hariharananda y Rajarshi Raghabananda: sushumna, kutastha, pranayama, kundalini y consciencia cósmica.",
      },
      { property: "og:title", content: "Kriya Yoga | FHKY" },
      {
        property: "og:description",
        content:
          "El Kriya Yoga es una ciencia de la respiración correcta. Enseñanzas de los maestros del linaje.",
      },
      { property: "og:image", content: kriyaBaba.url },
      { name: "twitter:image", content: kriyaBaba.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KriyaYoga,
});

const ensenanzas: { texto: string; fuente?: string }[] = [
  {
    texto:
      "El bote de la vida debe estar anclado en la Consciencia Cósmica. Si se ancla el bote al fondo, se puede remar toda la noche, pero ¿adónde llegará? Sri Yukteswar dijo que muchos practican Kriya Yoga así, sin saber el propósito verdadero de la técnica. Se debe primero levar el ancla y buscar al capitán. El bote del cuerpo no puede navegar con su solo poder. Todos sus movimientos vienen del Todopoderoso. Siempre debe anclarse en el Todopoderoso.",
    fuente: "P. Hariharananda",
  },
  {
    texto:
      "Yogiraj elucidó que “la realización se da a través de Kutastha”. Logrando la permanencia en Kutastha, el yogui adquiere el conocimiento verdadero. Ya que es semejante al cielo, se le conoce como la Caverna de la Unión con el Vacío Absoluto. Si se logra la permanencia en esta Caverna, el yogui adquiere conocimiento profundo de las esencias de la religión.",
    fuente: "Del libro Puran Purusha",
  },
  {
    texto:
      "“Mientras se practica este Pranayama, emana un sonido extremadamente melifluo. Solamente este, es el que se conoce como el sonido Pranava. Si se detalla cuidadosamente la flauta que Krishna toca, se observan 6 agujeros. Para explicar el dulce sonido producto de este Pranayama a lo largo del camino de los 6 chakras, se representa el símbolo de Bhagavan Krishna sosteniendo la flauta en sus manos. Esta no es una flauta física. Esta flauta es el símbolo del Pranayama interno a lo largo del cordón espinal a través del medio de los 6 chakras”.",
    fuente:
      "Ashoke Kumar Chatterjee en Who Is This Shama Churn (nieto de Lahiri Mahasaya, autor de Puran Purusha)",
  },
  {
    texto:
      "“El poder serpenteante (kundalini) es el asiento de la fuerza de vida en la sushumna. Los practicantes de Kriya Yoga experimentan el poder serpenteante (kundalini shakti) como una luz dorada extremadamente brillante. El practicante la experimenta como fuego en el centro muladhara”.",
    fuente: "Rajarshi Raghabananda en The Essence of Kriya Yoga",
  },
  {
    texto:
      "“El Kriya Yoga es una ciencia de la respiración correcta. Al inhalar de forma apropiada, cuando la calma desciende, el devoto permanece en pleno gozo, luz divina y la vibración divina”.",
    fuente: "Paramahansa Hariharananda",
  },
  {
    texto:
      "“Un día el Poder Cósmico ya no respirará por tu nariz y tendrás que dejar inmediatamente todas las propiedades y la prosperidad, el ego y la vanidad, la fortuna y la familia, los amigos y los conocidos, todo (...). Ofrece todo a la Consciencia Cósmica y a los maestros”.",
    fuente: "Paramahansa Hariharananda",
  },
  {
    texto:
      "“Tomando este cuerpo como nuestro laboratorio, podemos realizar una experimentación sistemática y nos podemos dar cuenta del profundo significado y eficacia del Kriya Yoga”.",
    fuente: "Baba Hariharananda",
  },
  {
    texto:
      "En el yogui, la fuerza de vida se mueve en la sushumna. Pero en el hombre ordinario, la sushumna está cerrada. El prana fluye por ida y pingala. La regulación de la respiración en ida y pingala provoca estabilidad en la sushumna. Cuando inhalamos, el nervio ida se activa. Cuando exhalamos, el nervio pingala se activa. El estado de equilibrio de la respiración en la ida y pingala está en la sushumna. Un yogui puede fácilmente mantenerse en la sushumna.",
    fuente: "Rajarshi Raghabananda en The essence of Kriya Yoga",
  },
  {
    texto:
      "Superconsciencia y consciencia cósmica significan que el cuerpo y el alma se perciben como uno. Este es el so-ham, o estado de hamsa, que significa “Yo y Él (el alma) somos uno”; en otras palabras, el alma y la naturaleza del cuerpo son uno. En este estado, los yoguis sienten al ser humano en Dios y a Dios en el ser humano. Ellos constantemente disfrutan de gozo divino, dicha y paz. Ellos sienten al alma funcionando a través de sus cuerpos. Este es el real conocimiento de la yoga.",
    fuente:
      "El maestro Hariharananda en Life and Teachings of Paramahansa Hariharananda, escrito por algunos de sus discípulos",
  },
  {
    texto:
      "“El estado en el cual el practicante se libera del apego y alcanza la calma y un estado estable de Conciencia de Dios es llamado estado de shambhavi. La mente se funde en el alma profunda. La introversión de la mente es shambhavi mudra”.",
    fuente: "Rajarshi Raghabananda en The Essence of Kriya Yoga (pág. 65)",
  },
  {
    texto: "“La mente emerge de la energía vital, el punto de nacimiento de la mente es la respiración”.",
    fuente: "Así dice Baba",
  },
];

function KriyaYoga() {
  return (
    <div className="section-x py-16 md:py-24">
      <h1 className="text-center font-display text-4xl text-foreground md:text-5xl">
        KRIYA YOGA
      </h1>

      <img
        src={kriyaBaba.url}
        alt="Baba enseñando Kriya Yoga"
        className="image-depth mx-auto mt-10 w-full max-w-md"
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        {ensenanzas.map((e) => (
          <blockquote
            key={e.texto.slice(0, 40)}
            className="rounded-r-md border-l-2 border-primary/50 bg-card/55 py-5 pl-5 pr-4 text-base leading-relaxed text-muted-foreground backdrop-blur-sm md:pl-7 md:pr-7"
          >
            <p>{e.texto}</p>
            {e.fuente && (
              <footer className="mt-2 text-sm tracking-wide text-primary">{e.fuente}</footer>
            )}
          </blockquote>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-3xl rounded-lg border border-border bg-sand p-8">
        <h2 className="font-display text-2xl text-primary">
          Mi último consejo — Baba Raghabananda
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Sambalpur, 12 de febrero de 2016</p>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Esta es la última recomendación que les doy, ya que no voy a estar mucho tiempo
            en esta tierra. Este consejo es para todos. Yo no soy nadie para dar consejos. No
            lo doy yo, lo da Hariharananda, a través de mi boca:
          </p>
          <p>
            Si alguna vez tiene un problema de dinero, concéntrese en el medio del primer
            centro, hasta que el problema se haya resuelto. Si tiene problemas de sexo,
            concéntrese en el punto central del segundo chacra. Si tiene problemas
            digestivos, concéntrese en el centro del tercer chacra. Si tiene problemas
            emocionales, o padece alguna emoción negativa, mantenga su atención en el punto
            medio del cuarto chacra. Si tiene una enfermedad de la garganta, o de la
            tiroides, concéntrese en el medio del quinto chacra. Así mismo, si tiene
            dificultades de comunicación. Si hay algún problema mental, mantenga la atención
            en el centro de la pituitaria. Si tiene problemas que atañen diversos órganos, o
            varios centros, mantenga su atención en la cima de la cabeza.
          </p>
          <p>
            En el medio de cada chacra hay un fuerte, una fortaleza inexpugnable. En ese
            punto central de equilibrio, somos invulnerables. Mantener la atención
            concentrada ahí, llevará esa armonía a todos los órganos y a los reinos dominados
            por ese chacra. Para eso, la concentración ahí deberá ser constante, durante la
            práctica y durante todo el día, todos los días que sea necesario. El fuerte mayor
            está en la fontanela.
          </p>
        </div>
      </section>

      <p className="mt-10 text-center font-display text-2xl text-foreground">¡Jai Gurú!</p>
    </div>
  );
}
