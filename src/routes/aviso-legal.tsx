import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Scale } from "lucide-react";
import { AVISO_LEGAL_SECTIONS } from "@/lib/aviso-legal-text";

const URL = "https://idctecnologia.vercel.app/aviso-legal";
const DESCRIPTION =
  "Aviso legal de IDC Tecnología: datos identificativos, condiciones de uso del sitio web, propiedad intelectual y responsabilidades.";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal | IDC Tecnología" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Aviso legal | IDC Tecnología" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AvisoLegalPage,
});

const linkClass = "text-electric underline-offset-2 hover:underline";

function linkify(text: string, keyBase: string): ReactNode[] {
  const re = /(\(\+34\) 91 879 60 46|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/g;
  return text.split(re).map((part, i) => {
    if (part === "(+34) 91 879 60 46")
      return <a key={`${keyBase}-${i}`} href="tel:+34918796046" className={linkClass}>{part}</a>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part))
      return <a key={`${keyBase}-${i}`} href={`mailto:${part}`} className={linkClass}>{part}</a>;
    return part;
  });
}

function Paragraph({ text, id }: { text: string; id: string }) {
  const m = text.match(/^\*\*(.+?)\*\*(.*)$/s);
  if (m) {
    return (
      <p>
        <strong className="font-semibold text-foreground">{m[1]}</strong>
        {linkify(m[2], id)}
      </p>
    );
  }
  return <p>{linkify(text, id)}</p>;
}

function AvisoLegalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-36 text-graphite-foreground lg:pt-44">
        <div className="absolute inset-0 grid-bg-dark opacity-25" aria-hidden />
        <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-electric/20 blur-[120px]" aria-hidden />
        <div className="container relative mx-auto max-w-5xl px-4">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <Scale className="h-3.5 w-3.5 text-electric" />
              Información legal
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Aviso legal
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10 md:p-12">
            {AVISO_LEGAL_SECTIONS.map((s, si) => (
              <section key={s.title} className={si > 0 ? "mt-12" : undefined}>
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-5 text-base leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                  {s.paragraphs.map((p, pi) => (
                    <Paragraph key={pi} text={p} id={`${si}-${pi}`} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
