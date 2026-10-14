import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedNews, getPublishedNewsImageUrls, type NewsItem } from "@/lib/news";
import { NewsShell, NewsLoading, NewsCategoryLabel, NewsDate, NewsImage } from "@/components/intranet/NewsShell";

export const Route = createFileRoute("/intranet/noticias/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Noticia del equipo — Intranet IDC Tecnología" },
      { name: "description", content: "Lectura completa de las noticias privadas del equipo de IDC Tecnología." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Noticia del equipo — Intranet IDC Tecnología" },
      { property: "og:description", content: "Noticias privadas del equipo de IDC Tecnología." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { id } = Route.useParams();
  return <NewsShell><NewsDetail key={id} id={id} /></NewsShell>;
}

function NewsDetail({ id }: { id: string }) {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const row = await getPublishedNews(id);
        if (!row) return;
        const urls = await getPublishedNewsImageUrls([row]);
        if (active) {
          setItem(row);
          setImageUrl(row.image_path ? urls[row.image_path] : undefined);
        }
      } catch {
        if (active) setItem(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  return (
    <div className="mt-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/intranet/"><ArrowLeft className="h-4 w-4" />Volver a noticias</Link>
      </Button>
      {loading ? <NewsLoading /> : !item ? (
        <p className="py-12 text-center text-muted-foreground">Noticia no disponible</p>
      ) : (
        <article className="mt-8 min-w-0">
          <NewsCategoryLabel category={item.category} />
          <h2 className="mt-3 break-words font-editorial text-3xl font-bold leading-tight tracking-normal sm:text-5xl">{item.title}</h2>
          {item.subtitle && <p className="mt-5 max-w-3xl break-words text-lg leading-relaxed text-muted-foreground">{item.subtitle}</p>}
          <div className="mt-5"><NewsDate item={item} /></div>
          {imageUrl && (
            <figure className="mt-8">
              <NewsImage key={imageUrl} url={imageUrl} title={item.title} />
              {item.image_caption && <figcaption className="mt-3 break-words text-sm leading-relaxed text-muted-foreground">{item.image_caption}</figcaption>}
            </figure>
          )}
          {item.body && <p className="mt-8 max-w-3xl whitespace-pre-wrap break-words text-base leading-8 text-foreground">{item.body}</p>}
        </article>
      )}
    </div>
  );
}
