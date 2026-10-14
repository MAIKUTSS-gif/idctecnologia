import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { checkIntranetAccess, INTRANET_EMAIL } from "@/lib/intranet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/intranet/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acceso empleados — IDC Tecnología" },
      { name: "description", content: "Acceso al área privada de empleados de IDC Tecnología." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Acceso empleados — IDC Tecnología" },
      { property: "og:description", content: "Área privada de empleados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntranetLoginPage,
});

function IntranetLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: INTRANET_EMAIL,
        password,
      });
      if (authError) {
        setError("Contraseña incorrecta.");
        return;
      }
      if (!(await checkIntranetAccess())) {
        await supabase.auth.signOut();
        setError("Acceso no autorizado");
        return;
      }
      navigate({ to: "/intranet", replace: true });
    } catch {
      setError("No se ha podido iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 pb-16 pt-44">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">Área de empleados</h1>
            <p className="text-xs text-muted-foreground">Noticias internas de IDC Tecnología</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
