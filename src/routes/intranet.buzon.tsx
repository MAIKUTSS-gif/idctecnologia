import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { NewsLoading, NewsShell } from "@/components/intranet/NewsShell";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSuggestion } from "@/lib/suggestions";

export const Route = createFileRoute("/intranet/buzon")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Buzón de sugerencias — Intranet IDC Tecnología" },
    { name: "description", content: "Buzón privado de sugerencias de los empleados de IDC Tecnología." },
    { property: "og:title", content: "Buzón de sugerencias — Intranet IDC Tecnología" },
    { property: "og:description", content: "Sugerencias del equipo de IDC Tecnología." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: SuggestionsPage,
});

function SuggestionsPage() {
  return <NewsShell title="Buzón de sugerencias"><SuggestionGate /></NewsShell>;
}

function SuggestionGate() {
  const [isEmployee, setIsEmployee] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    supabase.rpc("is_intranet_user").then(({ data, error }) => {
      if (active) setIsEmployee(!error && data === true);
    });
    return () => { active = false; };
  }, []);

  if (isEmployee === null) return <NewsLoading />;
  if (!isEmployee) {
    return (
      <p role="status" className="mt-8 max-w-2xl rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
        Estás conectado como administrador. El buzón es para la cuenta de empleados; para probarlo, cierra sesión y entra con la contraseña de empleados.
      </p>
    );
  }
  return <SuggestionForm />;
}

function SuggestionForm() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFeedback(null);
    try {
      await createSuggestion(message, name);
      setMessage("");
      setName("");
      setFeedback("success");
    } catch {
      setFeedback("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="mt-8 max-w-2xl space-y-6" onSubmit={submit}>
      <div className="space-y-2">
        <Label htmlFor="suggestion-message">Mensaje</Label>
        <Textarea id="suggestion-message" required maxLength={5000} rows={8} value={message} disabled={sending} onChange={(event) => setMessage(event.target.value)} />
        <p className="text-right text-xs text-muted-foreground">{message.length}/5000</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="suggestion-name">Nombre (opcional)</Label>
        <Input id="suggestion-name" maxLength={120} value={name} disabled={sending} aria-describedby="suggestion-name-help" onChange={(event) => setName(event.target.value)} />
        <p id="suggestion-name-help" className="text-sm text-muted-foreground">Si no escribes tu nombre, la sugerencia será anónima.</p>
      </div>
      {feedback === "success" && <p role="status" className="text-sm text-primary">Tu sugerencia se ha enviado correctamente. Gracias por compartirla.</p>}
      {feedback === "error" && <p role="alert" className="text-sm text-destructive">No se ha podido enviar la sugerencia. Inténtalo de nuevo.</p>}
      <Button type="submit" disabled={sending || !message.trim()}>{sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Enviar sugerencia</Button>
    </form>
  );
}