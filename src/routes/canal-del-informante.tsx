import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Shield,
  Lock,
  Users,
  Building2,
  UserCog,
  HardHat,
  Briefcase,
  Scale,
  Gavel,
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  ArrowRight,
  MessageSquareText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/canal-del-informante")({
  head: () => ({
    meta: [
      { title: "Canal del Informante | IDC Tecnología" },
      {
        name: "description",
        content:
          "Canal confidencial de IDC Tecnología para comunicar posibles irregularidades o incumplimientos de forma segura y confidencial.",
      },
      {
        property: "og:title",
        content: "Canal del Informante | IDC Tecnología",
      },
      {
        property: "og:description",
        content:
          "Canal confidencial de IDC Tecnología para comunicar posibles irregularidades o incumplimientos de forma segura y confidencial.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://idctecnologia.lovable.app/canal-del-informante" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://idctecnologia.lovable.app/canal-del-informante",
      },
    ],
  }),
  component: CanalInformantePage,
});

const LEGALSENDING_URL =
  "https://compliance.legalsending.com/canal/?C=48603469019031486";

function CanalInformantePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite pb-28 pt-36 text-graphite-foreground lg:pt-44">
        <div className="absolute inset-0 grid-bg-dark opacity-25" aria-hidden />
        <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-electric/20 blur-[120px]" aria-hidden />
        <div className="container relative mx-auto max-w-5xl px-4">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <Shield className="h-3.5 w-3.5 text-electric" />
              Compliance corporativo
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Canal del Informante
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Un espacio seguro y confidencial para comunicar posibles incumplimientos o conductas irregulares.
            </p>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-fade-up rounded-2xl border border-border bg-card p-8 shadow-soft md:p-12">
            <p className="text-lg leading-relaxed text-foreground/80">
              IDC Tecnología de Instalaciones Industriales, S.L. pone a disposición de las personas vinculadas a la organización un Canal del Informante que permite comunicar de forma confidencial posibles irregularidades, incumplimientos o conductas que pudieran ser contrarias a la normativa aplicable o a las políticas internas de la empresa.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              El canal permite realizar comunicaciones preservando la confidencialidad del informante y, cuando corresponda, de forma anónima.
            </p>
          </div>
        </div>
      </section>

      {/* ¿Quién puede utilizarlo? */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              ¿Quién puede utilizarlo?
            </h2>
            <p className="mt-4 text-muted-foreground">
              El canal está abierto a todas las personas vinculadas profesionalmente con IDC Tecnología.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {USERS.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-electric/10 text-electric">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Qué se puede comunicar? */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              ¿Qué se puede comunicar?
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              El canal está destinado a comunicar posibles infracciones o incumplimientos relacionados con la actividad de la organización.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {COMMUNICATIONS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-electric/10 text-electric">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-xl border border-dashed border-border bg-muted/50 p-5">
            <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Este canal no está destinado a consultas comerciales, solicitudes de información, reclamaciones de clientes o envío de currículums.
            </p>
          </div>
        </div>
      </section>

      {/* Confidencialidad */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft md:p-12">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-electric/10 text-electric">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Confidencialidad y anonimato
              </h2>
            </div>

            <div className="mt-8 space-y-5 text-foreground/80">
              <p className="leading-relaxed">
                Las comunicaciones serán tratadas bajo estrictos criterios de confidencialidad. La plataforma permite preservar el anonimato del informante y realizar el seguimiento de la comunicación mediante un código individual.
              </p>
              <p className="leading-relaxed">
                Es importante conservar el código proporcionado al realizar una comunicación, ya que permite consultar su estado y mantener el contacto con la entidad.
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-muted/50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-tech-green" />
              <p className="text-sm text-muted-foreground">
                La gestión de las comunicaciones y su seguimiento se realiza exclusivamente a través de la plataforma externa segura de Legalsending.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botones de acceso */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-elevated md:p-14">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-electric/10 text-electric">
              <ExternalLink className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Acceso al Canal del Informante
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Las comunicaciones y su seguimiento se realizan exclusivamente a través de nuestra plataforma externa segura.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <a
                  href="https://compliance.legalsending.com/canal/communication.php?C=48603469019031486"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hacer una comunicación <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <a
                  href="https://compliance.legalsending.com/canal/query.php?C=48603469019031486"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar una comunicación
                </a>
              </Button>
            </div>

            <p className="mt-8 text-xs text-muted-foreground">
              Al acceder, será redirigido a la plataforma oficial de Legalsending. La gestión de la comunicación se realiza fuera de este sitio web.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const USERS = [
  {
    icon: Users,
    label: "Empleados y personal interno",
    description: "Todas las personas que forman parte de la plantilla de IDC Tecnología.",
  },
  {
    icon: Briefcase,
    label: "Profesionales autónomos",
    description: "Colaboradores externos vinculados profesionalmente a la empresa.",
  },
  {
    icon: Building2,
    label: "Accionistas y órganos sociales",
    description: "Miembros de la administración, dirección o supervisión de la organización.",
  },
  {
    icon: HardHat,
    label: "Contratistas y subcontratistas",
    description: "Empresas y profesionales que prestan servicios para IDC Tecnología.",
  },
  {
    icon: UserCog,
    label: "Proveedores",
    description: "Entidades que mantienen una relación comercial con la empresa.",
  },
  {
    icon: Scale,
    label: "Personas bajo supervisión",
    description: "Aquellas que trabajen bajo la supervisión de cualquiera de los anteriores.",
  },
];

const COMMUNICATIONS = [
  {
    icon: Scale,
    label: "Infracciones del Derecho de la Unión Europea",
    description: "Incumplimientos de normativa comunitaria aplicable a la actividad empresarial.",
  },
  {
    icon: Gavel,
    label: "Infracciones penales",
    description: "Conductas que puedan constituir un delito según el ordenamiento jurídico.",
  },
  {
    icon: AlertTriangle,
    label: "Infracciones administrativas graves",
    description: "Infracciones administrativas calificadas como graves o muy graves.",
  },
  {
    icon: FileWarning,
    label: "Incumplimientos de políticas internas",
    description: "Violaciones de los procedimientos, protocolos o políticas internas de IDC.",
  },
  {
    icon: Shield,
    label: "Prevención de riesgos laborales",
    description: "Incumplimientos relacionados con la seguridad y salud en el trabajo.",
  },
  {
    icon: Lock,
    label: "Protección de datos",
    description: "Incumplimientos de las políticas de privacidad y protección de datos.",
  },
];
