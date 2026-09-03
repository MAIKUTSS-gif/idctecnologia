import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Briefcase, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedOffer } from "@/lib/jobs";
import { ApplicationForm } from "@/components/jobs/ApplicationForm";

export const Route = createFileRoute("/empleo/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Detalle de oferta de empleo — IDC Tecnología" },
      {
        name: "description",
        content:
          "Consulta los detalles de esta vacante en IDC Tecnología: funciones, requisitos y beneficios.",
      },
      { property: "og:title", content: "Detalle de oferta de empleo — IDC Tecnología" },
      {
        property: "og:description",
        content: "Funciones, requisitos y beneficios de la vacante en IDC Tecnología.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobDetailPage,
});

function Block({ title, content }: { title: string; content: string | null }) {
  if (!content) return null;
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {content}
      </p>
    </div>
  );
}

function JobDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-offer", id],
    queryFn: () => getPublishedOffer(id),
  });

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          to="/trabaja-con-nosotros"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a ofertas
        </Link>

        {isLoading && (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && (isError || !data) && (
          <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <h1 className="font-display text-2xl font-semibold">Oferta no disponible</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Esta oferta no existe o ya no está publicada.
            </p>
            <Button asChild variant="hero" className="mt-6">
              <Link to="/trabaja-con-nosotros">Ver ofertas activas</Link>
            </Button>
          </div>
        )}

        {!isLoading && data && (
          <article className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-electric">Empleo</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {data.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {data.location && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" /> {data.location}
                </span>
              )}
              {data.department && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                  <Building2 className="h-3.5 w-3.5" /> {data.department}
                </span>
              )}
              {data.contract_type && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                  <Briefcase className="h-3.5 w-3.5" /> {data.contract_type}
                </span>
              )}
            </div>

            <Block title="Descripción" content={data.description} />
            <Block title="Requisitos" content={data.requirements} />
            <Block title="Beneficios" content={data.benefits} />
          </article>
        )}
      </div>
    </section>
  );
}
