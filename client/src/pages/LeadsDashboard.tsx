import { useMemo } from "react";
import { ArrowLeft, CalendarDays, Inbox, Loader2, LogIn, Mail, Phone, ShieldAlert } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

const bottleneckLabels: Record<string, string> = {
  capacidade: "Capacidade da equipe",
  fiscal: "Rotina fiscal",
  contabil: "Rotina contábil",
  financeiro: "Rotina financeira",
  hcm: "HCM e folha",
  outro: "Outro desafio",
};

export default function LeadsDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";
  const leadsQuery = trpc.leads.list.useQuery(undefined, { enabled: isAuthenticated && isAdmin });
  const leadCountLabel = useMemo(() => {
    const count = leadsQuery.data?.length ?? 0;
    return `${count} ${count === 1 ? "contato recebido" : "contatos recebidos"}`;
  }, [leadsQuery.data]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-[#F7FAFA] text-[#0B2437]"><Loader2 className="h-7 w-7 animate-spin text-[#09A8AA]" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0B2437] px-5 text-white">
        <section className="max-w-md border border-white/15 bg-white/[0.05] p-8">
          <p className="eyebrow !text-[#09D2D4]">Área do dono</p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-[-0.04em]">Leads de parceria</h1>
          <p className="mt-5 leading-7 text-white/65">Entre com a conta proprietária para visualizar os contatos enviados pelo formulário.</p>
          <button type="button" onClick={() => startLogin()} className="mt-8 inline-flex items-center gap-2 bg-[#09D2D4] px-5 py-3 text-sm font-black text-[#0B2437] transition hover:bg-[#16e4e6]"><LogIn className="h-4 w-4" />Acessar painel</button>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F7FAFA] px-5 text-[#0B2437]">
        <section className="max-w-md border border-[#0B2437]/15 bg-white p-8 shadow-[12px_12px_0_#FFB703]">
          <ShieldAlert className="h-9 w-9 text-[#FFB703]" />
          <h1 className="mt-5 font-display text-3xl font-black">Acesso restrito</h1>
          <p className="mt-3 leading-7 text-slate-600">Esta área está disponível apenas para o proprietário do projeto.</p>
          <a href="/" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0B2437]"><ArrowLeft className="h-4 w-4" />Voltar à landing page</a>
        </section>
      </main>
    );
  }

  if (leadsQuery.error?.data?.code === "FORBIDDEN") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F7FAFA] px-5 text-[#0B2437]">
        <section className="max-w-md border border-[#0B2437]/15 bg-white p-8 shadow-[12px_12px_0_#FFB703]">
          <ShieldAlert className="h-9 w-9 text-[#FFB703]" />
          <h1 className="mt-5 font-display text-3xl font-black">Acesso exclusivo do dono</h1>
          <p className="mt-3 leading-7 text-slate-600">Mesmo usuários administrativos não podem visualizar os dados de contato desta landing page.</p>
          <a href="/" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0B2437]"><ArrowLeft className="h-4 w-4" />Voltar à landing page</a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7FAFA] text-[#0B2437]">
      <header className="border-b border-[#0B2437]/10 bg-[#0B2437] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#09D2D4]">Compliance</p><h1 className="mt-1 font-display text-2xl font-black">Leads de parceria</h1></div>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-[#09D2D4]"><ArrowLeft className="h-4 w-4" />Ver landing page</a>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Painel administrativo</p><h2 className="mt-2 font-display text-4xl font-black tracking-[-0.04em]">{leadCountLabel}</h2></div><div className="inline-flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-[#09A8AA]" />Ordenado do mais recente para o mais antigo</div></div>
        {leadsQuery.isLoading ? <div className="grid min-h-64 place-items-center border border-[#0B2437]/10 bg-white"><Loader2 className="h-6 w-6 animate-spin text-[#09A8AA]" /></div> : leadsQuery.error ? <div className="border-l-4 border-[#FFB703] bg-white p-6 text-slate-700">Não foi possível carregar os leads agora. Atualize a página para tentar novamente.</div> : leadsQuery.data?.length ? (
          <div className="overflow-x-auto border border-[#0B2437]/10 bg-white">
            <table className="min-w-[860px] w-full border-collapse text-left text-sm">
              <thead className="bg-[#EAF4F3] text-xs uppercase tracking-[.12em] text-[#0B2437]"><tr><th className="px-5 py-4">Contato</th><th className="px-5 py-4">Escritório</th><th className="px-5 py-4">Principal gargalo</th><th className="px-5 py-4">Recebido em</th></tr></thead>
              <tbody>{leadsQuery.data.map(lead => <tr key={lead.id} className="border-t border-[#0B2437]/10 align-top"><td className="px-5 py-5"><div className="font-bold">{lead.name}</div><a className="mt-2 flex items-center gap-2 text-slate-600 hover:text-[#09A8AA]" href={`mailto:${lead.email}`}><Mail className="h-3.5 w-3.5" />{lead.email}</a><a className="mt-1 flex items-center gap-2 text-slate-600 hover:text-[#09A8AA]" href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><Phone className="h-3.5 w-3.5" />{lead.whatsapp}</a></td><td className="px-5 py-5 font-semibold">{lead.office}</td><td className="px-5 py-5">{bottleneckLabels[lead.bottleneck] ?? lead.bottleneck}</td><td className="px-5 py-5 text-slate-600">{new Date(lead.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <div className="border border-dashed border-[#0B2437]/25 bg-white px-6 py-16 text-center"><Inbox className="mx-auto h-9 w-9 text-[#09A8AA]" /><h3 className="mt-5 font-display text-2xl font-black">Nenhum lead recebido ainda</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">Quando um escritório enviar o formulário da landing page, o contato aparecerá aqui.</p></div>}
      </div>
    </main>
  );
}
