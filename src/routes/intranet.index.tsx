import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listPublishedNews, getPublishedNewsImageUrls, type NewsItem } from "@/lib/news";
import { NewsShell, NewsLoading, NewsCategoryLabel, NewsDate, NewsImage } from "@/components/intranet/NewsShell";

export const Route = createFileRoute("/intranet/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Noticias internas — Intranet IDC Tecnología" },
      { name: "description", content: "La actualidad del equipo de IDC Tecnología: comunicados, éxitos y cambios organizativos." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Noticias internas — Intranet IDC Tecnología" },
      { property: "og:description", content: "La actualidad del equipo de IDC Tecnología." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntranetPage,
});

function IntranetPage() {
  return <NewsShell><NewsFrontPage /></NewsShell>;
}

function NewsFrontPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const rows = await listPublishedNews();
        const urls = await getPublishedNewsImageUrls(rows);
        if (active) { setNews(rows); setImages(urls); }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  if (loading) return <NewsLoading />;
  if (loadError) return <p className="py-12 text-center text-sm text-muted-foreground">No se han podido cargar las noticias. Inténtalo de nuevo más tarde.</p>;
  const [lead, ...rest] = news;
  if (!lead) return <p className="py-12 text-center text-sm text-muted-foreground">Todavía no hay noticias publicadas.</p>;

  return (
    <div className="mt-8">
      <NewsPreview item={lead} imageUrl={lead.image_path ? images[lead.image_path] : undefined} lead />
      {rest.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-2">
          {rest.map((item) => <NewsPreview key={String(item.id)} item={item} imageUrl={item.image_path ? images[item.image_path] : undefined} />)}
        </div>
      )}
    </div>
  );
}

function NewsPreview({ item, imageUrl, lead = false }: { item: NewsItem; imageUrl?: string; lead?: boolean }) {
  return (
    <article className={lead ? "min-w-0" : "min-w-0 overflow-hidden rounded-lg border border-border bg-card"}>
      <Link to="/intranet/noticias/$id" params={{ id: String(item.id) }} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        {imageUrl && <NewsImage key={imageUrl} url={imageUrl} title={item.title} />}
        <div className={lead ? "pt-6" : "p-5 sm:p-6"}>
          <NewsCategoryLabel category={item.category} />
          <h2 className={`mt-3 break-words font-editorial font-bold tracking-normal transition-colors group-hover:text-primary ${lead ? "text-3xl leading-tight sm:text-5xl" : "text-2xl leading-snug"}`}>{item.title}</h2>
          {item.subtitle && <p className={`mt-3 break-words leading-relaxed text-muted-foreground ${lead ? "max-w-3xl text-lg" : "line-clamp-3 text-sm"}`}>{item.subtitle}</p>}
          <div className="mt-5"><NewsDate item={item} /></div>
        </div>
      </Link>
    </article>
  );
}
