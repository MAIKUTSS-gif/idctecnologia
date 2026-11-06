import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { POLITICA_PRIVACIDAD_SECTIONS } from "@/lib/politica-privacidad-text";

const URL = "https://idctecnologia.vercel.app/politica-privacidad";
const DESCRIPTION =
  "Política de privacidad de IDC Tecnología: qué datos tratamos, con qué finalidad, durante cuánto tiempo y cómo ejercer sus derechos.";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad | IDC Tecnología" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Política de privacidad | IDC Tecnología" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PoliticaPrivacidadPage,
});

const linkClass = "text-electric underline-offset-2 hover:underline";

function linkify(text: string, keyBase: string): ReactNode[] {
  const re = /(\(\+34\) 91 879 60 46|www\.aepd\.es|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/g;
  return text.split(re).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part === "(+34) 91 879 60 46")
      return <a key={key} href="tel:+34918796046" className={linkClass}>{part}</a>;
    if (part === "www.aepd.es")
      return (
        <a key={key} href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part))
      return <a key={key} href={`mailto:${part}`} className={linkClass}>{part}</a>;
    return part;
  });
}

function Rich({ text, id }: { text: string; id: string }) {
  const m = text.match(/^\*\*(.+?)\*\*(.*)$/s);
  if (m) {
    return (
      <>
        <strong className="font-semibold text-foreground">{m[1]}</strong>
        {linkify(m[2], id)}
      </>
    );
  }
  return <>{linkify(text, id)}</>;
}

function PoliticaPrivacidadPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-graphite pb-20 pt-36 text-graphite-foreground lg:pt-44">
        <div className="absolute inset-0 grid-bg-dark opacity-25" aria-hidden />
        <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-electric/20 blur-[120px]" aria-hidden />
        <div className="container relative mx-auto max-w-5xl px-4">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <ShieldCheck className="h-3.5 w-3.5 text-electric" />
              Información legal
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Política de privacidad
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10 md:p-12">
            {POLITICA_PRIVACIDAD_SECTIONS.map((s, si) => (
              <section key={s.title} className={si > 0 ? "mt-12" : undefined}>
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-5 text-base leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                  {s.blocks.map((b, bi) => {
                    const id = `${si}-${bi}`;
                    if (b.type === "h3")
                      return (
                        <h3 key={id} className="pt-3 font-display text-lg font-semibold text-foreground">
                          {b.text}
                        </h3>
                      );
                    if (b.type === "ul")
                      return (
                        <ul key={id} className="list-disc space-y-2 pl-5 marker:text-electric">
                          {b.items.map((it, ii) => (
                            <li key={ii}>
                              <Rich text={it} id={`${id}-${ii}`} />
                            </li>
                          ))}
                        </ul>
                      );
                    return (
                      <p key={id}>
                        <Rich text={b.text} id={id} />
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
