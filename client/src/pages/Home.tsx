import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  Check,
  ClipboardCheck,
  Landmark,
  LockKeyhole,
  Menu,
  MessageSquareText,
  PenTool,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const WHITE_LOGO = "/manus-storage/logo-compliance-horizontal-branca_2c783a9f.png";
const BLUE_LOGO = "/manus-storage/logo-compliance-azul_c9d8f74f.webp";

const serviceModules = [
  {
    title: "Fiscal",
    text: "Rotinas, obrigações e acompanhamento tributário para sustentar a sua entrega.",
    icon: Landmark,
  },
  {
    title: "Contábil",
    text: "Escrituração, conciliações e informações contábeis tratadas com método.",
    icon: Calculator,
  },
  {
    title: "Financeiro",
    text: "Processos financeiros organizados para dar previsibilidade ao cliente final.",
    icon: WalletCards,
  },
  {
    title: "HCM",
    text: "Rotinas de pessoas e folha que acompanham a evolução da carteira.",
    icon: UsersRound,
  },
  {
    title: "Administrativo",
    text: "Apoio operacional para reduzir o atrito da rotina e ganhar consistência.",
    icon: Building2,
  },
];

const processSteps = [
  { number: "01", title: "Diagnóstico", text: "Entendemos sua carteira, gargalos e prioridades." },
  { number: "02", title: "Desenho", text: "Definimos escopo, fluxo, acessos e pontos de controle." },
  { number: "03", title: "Execução", text: "Nossa estrutura assume a rotina combinada nos bastidores." },
  { number: "04", title: "Retorno ao escritório", text: "Você mantém o cliente informado com segurança e contexto." },
];

function AnchorButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-[#09D2D4] text-[#0B2437] hover:bg-[#16e4e6]"
      : "border border-white/35 text-white hover:border-[#09D2D4] hover:text-[#09D2D4]";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const leadMutation = trpc.leads.create.useMutation({
    onSuccess: () => {
      setFormSubmitted(true);
    },
    onError: () => {
      toast.error("Não foi possível enviar sua solicitação agora. Tente novamente em instantes.");
    },
  });

  const closeMenu = () => setMenuOpen(false);
  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    leadMutation.mutate({
      name: String(formData.get("name") ?? ""),
      office: String(formData.get("office") ?? ""),
      email: String(formData.get("email") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      bottleneck: String(formData.get("bottleneck") ?? "") as "capacidade" | "fiscal" | "contabil" | "financeiro" | "hcm" | "outro",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] text-[#0B2437] selection:bg-[#09D2D4] selection:text-[#0B2437]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B2437]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" aria-label="Compliance Parcerias" className="flex items-center" onClick={closeMenu}>
            <img src={WHITE_LOGO} alt="Compliance Contabilidade" className="h-9 w-[168px] object-contain object-left" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/80 lg:flex" aria-label="Navegação principal">
            <a className="transition hover:text-[#09D2D4]" href="#desafios">Desafios</a>
            <a className="transition hover:text-[#09D2D4]" href="#modelo">O modelo</a>
            <a className="transition hover:text-[#09D2D4]" href="#servicos">Serviços</a>
            <a className="transition hover:text-[#09D2D4]" href="#governanca">Governança</a>
            <AnchorButton href="#diagnostico" className="!px-4 !py-2.5">Agendar diagnóstico</AnchorButton>
          </nav>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(value => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#0B2437] px-5 py-5 lg:hidden" aria-label="Navegação mobile">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-semibold text-white/85">
              <a href="#desafios" onClick={closeMenu}>Desafios</a>
              <a href="#modelo" onClick={closeMenu}>O modelo</a>
              <a href="#servicos" onClick={closeMenu}>Serviços</a>
              <a href="#governanca" onClick={closeMenu}>Governança</a>
              <a href="#diagnostico" onClick={closeMenu} className="mt-2 text-[#09D2D4]">Agendar diagnóstico</a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-grid relative overflow-hidden bg-[#0B2437] pb-20 pt-16 text-white lg:pb-28 lg:pt-24">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#09D2D4]/30 bg-[#09D2D4]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#09D2D4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB703]" />
                Parceria operacional white label
              </div>
              <h1 className="max-w-3xl font-display text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Escale seu escritório <span className="text-[#09D2D4]">sem ampliar</span> a complexidade.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/78 sm:text-2xl">
                Sua marca na frente. Nossa estrutura nos bastidores.
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                A Compliance atua como extensão operacional do seu escritório para absorver rotinas especializadas com método, confidencialidade e clareza de fluxo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <AnchorButton href="#diagnostico">Agendar diagnóstico gratuito</AnchorButton>
                <AnchorButton href="#modelo" variant="outline">Conhecer o modelo</AnchorButton>
              </div>
              <div className="mt-12 flex items-center gap-3 text-sm text-white/65">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><ShieldCheck className="h-4 w-4 text-[#09D2D4]" /></span>
                A sua relação com o cliente final permanece preservada.
              </div>
            </div>

            <div className="relative z-10">
              <div className="hero-panel relative overflow-hidden border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-8">
                <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Operação integrada</span>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#09D2D4]"><span className="h-2 w-2 rounded-full bg-[#09D2D4]" /> Ativa nos bastidores</span>
                </div>
                <div className="space-y-5">
                  {[
                    ["Seu escritório", "Relacionamento, contexto e marca", "border-[#09D2D4]"],
                    ["Compliance", "Método, especialização e execução", "border-[#FFB703]"],
                    ["Cliente final", "Percepção de uma entrega consistente", "border-white/50"],
                  ].map(([title, description, borderClass], index) => (
                    <div key={title} className="flex items-center gap-4">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 ${borderClass} text-sm font-black text-white`}>0{index + 1}</div>
                      <div>
                        <div className="font-display text-xl font-extrabold">{title}</div>
                        <div className="mt-0.5 text-sm text-white/60">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 border-t border-white/15 pt-5 text-sm font-semibold text-white/80">
                  Uma estrutura coordenada. Uma marca sempre na frente.
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-20 w-20 border-l border-b border-[#FFB703]" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="desafios" className="bg-[#F7FAFA] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
              <div>
                <p className="eyebrow">O ponto de tensão</p>
                <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-0.035em] text-[#0B2437] sm:text-5xl">Quando a carteira cresce, a operação não pode virar gargalo.</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { count: "01", title: "Carteira em expansão", text: "Mais clientes elevam o volume e a variedade das rotinas que precisam ser entregues." },
                  { count: "02", title: "Especialização exigida", text: "Demandas fiscais, contábeis e financeiras pedem profundidade técnica crescente." },
                  { count: "03", title: "Pressão por escala", text: "A operação precisa acompanhar o crescimento sem comprometer prazos ou margem." },
                ].map(item => (
                  <article key={item.count} className="border-t-2 border-[#0B2437] bg-white px-5 pb-6 pt-5 shadow-[0_18px_35px_rgba(11,36,55,.05)]">
                    <span className="font-display text-sm font-black tracking-[.18em] text-[#FFB703]">{item.count}</span>
                    <h3 className="mt-6 font-display text-2xl font-black leading-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="modelo" className="relative overflow-hidden bg-[#EAF4F3] py-20 lg:py-28">
          <div className="absolute right-0 top-0 h-full w-[30%] bg-[#09D2D4]/10" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
              <div>
                <p className="eyebrow">Como funciona</p>
                <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-0.035em] text-[#0B2437] sm:text-5xl">Uma extensão operacional desenhada para o seu escritório.</h2>
                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Você preserva o relacionamento e a marca. Nós assumimos a execução de acordo com o escopo definido, integrados ao seu jeito de operar.</p>
                <div className="mt-8 inline-flex items-center gap-2 border-l-2 border-[#FFB703] pl-4 text-sm font-bold text-[#0B2437]">A parceria começa por um módulo prioritário e evolui no ritmo da sua carteira.</div>
              </div>
              <ol className="grid gap-0 md:grid-cols-2">
                {processSteps.map((step, index) => (
                  <li key={step.number} className="relative border-l border-t border-[#0B2437]/20 bg-white p-7 last:border-b md:[&:nth-child(2)]:border-r md:[&:nth-child(3)]:border-b md:[&:nth-child(4)]:border-b md:[&:nth-child(4)]:border-r">
                    <span className="font-display text-xs font-black tracking-[.2em] text-[#09A8AA]">{step.number}</span>
                    <h3 className="mt-6 font-display text-2xl font-black leading-tight text-[#0B2437]">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">{step.text}</p>
                    {index < processSteps.length - 1 && <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-[#FFB703]" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="servicos" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-8 border-b border-[#0B2437]/15 pb-10 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow">Módulos de serviço</p>
                <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-0.035em] text-[#0B2437] sm:text-5xl">Ative a estrutura de que sua carteira precisa.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-600">Os módulos podem ser combinados conforme as demandas da sua operação, sem exigir uma mudança brusca no seu modelo de atendimento.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {serviceModules.map(module => {
                const Icon = module.icon;
                return (
                  <article key={module.title} className="group min-h-[252px] border border-[#0B2437]/15 bg-[#F7FAFA] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#09D2D4] hover:bg-[#0B2437]">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#09D2D4] text-[#0B2437]"><Icon className="h-5 w-5" /></div>
                    <h3 className="mt-8 font-display text-2xl font-black text-[#0B2437] transition group-hover:text-white">{module.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 transition group-hover:text-white/65">{module.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="governanca" className="bg-[#0B2437] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-end">
              <div>
                <p className="eyebrow !text-[#09D2D4]">Governança e segurança</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl">A sua confiança é tratada como parte da operação.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">A parceria white label funciona quando os limites estão claros, os processos são rastreáveis e cada parte sabe exatamente como atuar.</p>
              </div>
              <div className="border-l-2 border-[#FFB703] pl-6 text-lg font-semibold leading-8 text-white/90">“Seu cliente continua sendo seu. Nossa estrutura existe para fortalecer a sua entrega.”</div>
            </div>
            <div className="mt-14 grid gap-px bg-white/15 md:grid-cols-3">
              {[
                { icon: LockKeyhole, title: "Confidencialidade", text: "Processos e informações tratados conforme os acordos firmados entre as partes." },
                { icon: MessageSquareText, title: "Canais restritos", text: "Fluxos de comunicação definidos para preservar a relação com o cliente final." },
                { icon: ClipboardCheck, title: "Responsabilidade técnica", text: "Escopo, controles e responsabilidades delimitados em contrato e nos registros aplicáveis." },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="bg-[#0B2437] px-6 py-8">
                    <Icon className="h-7 w-7 text-[#FFB703]" />
                    <h3 className="mt-9 font-display text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diagnostico" className="relative overflow-hidden bg-[#FFB703] py-20 lg:py-28">
          <div className="diagnostic-dots" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            <div className="max-w-xl">
              <p className="eyebrow !text-[#0B2437]">Comece pelo diagnóstico</p>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-0.035em] text-[#0B2437] sm:text-5xl">Vamos desenhar uma operação à altura da sua carteira.</h2>
              <p className="mt-6 text-lg leading-8 text-[#0B2437]/75">Conte qual é o desafio que mais pressiona sua operação hoje. Nossa equipe entrará em contato para entender o contexto e identificar um primeiro módulo de parceria.</p>
              <div className="mt-10 space-y-3 text-sm font-semibold text-[#0B2437]">
                {["Conversa inicial sem compromisso", "Leitura de prioridades e capacidade", "Proposta de fluxo e escopo inicial"].map(item => <div key={item} className="flex items-center gap-3"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#0B2437] text-[#FFB703]"><Check className="h-3.5 w-3.5" /></span>{item}</div>)}
              </div>
            </div>

            <form className="bg-white p-6 shadow-[14px_14px_0_#0B2437] sm:p-8" onSubmit={handleLeadSubmit}>
              <div className="mb-7 flex items-center justify-between border-b border-[#0B2437]/15 pb-5">
                <div>
                  <h3 className="font-display text-2xl font-black text-[#0B2437]">Solicite seu diagnóstico</h3>
                  <p className="mt-1 text-sm text-slate-600">Leva menos de um minuto.</p>
                </div>
                <BarChart3 className="h-7 w-7 text-[#09A8AA]" />
              </div>
              {formSubmitted ? (
                <div className="border-l-4 border-[#09D2D4] bg-[#EAF4F3] px-5 py-8" role="status" aria-live="polite">
                  <ShieldCheck className="h-8 w-8 text-[#0B2437]" />
                  <h4 className="mt-5 font-display text-2xl font-black text-[#0B2437]">Recebemos sua solicitação.</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Nossa equipe entrará em contato para entender a sua operação e organizar o próximo passo.</p>
                  <button type="button" onClick={() => setFormSubmitted(false)} className="mt-6 text-sm font-bold text-[#0B2437] underline decoration-[#09D2D4] underline-offset-4">Enviar outra solicitação</button>
                </div>
              ) : <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-bold text-[#0B2437]">Nome<input required name="name" placeholder="Seu nome" className="mt-2 w-full border-b border-[#0B2437]/25 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-[#09A8AA]" /></label>
                <label className="block text-sm font-bold text-[#0B2437]">Escritório<input required name="office" placeholder="Nome do escritório" className="mt-2 w-full border-b border-[#0B2437]/25 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-[#09A8AA]" /></label>
                <label className="block text-sm font-bold text-[#0B2437]">E-mail<input required type="email" name="email" placeholder="voce@escritorio.com.br" className="mt-2 w-full border-b border-[#0B2437]/25 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-[#09A8AA]" /></label>
                <label className="block text-sm font-bold text-[#0B2437]">WhatsApp<input required name="whatsapp" placeholder="(00) 00000-0000" className="mt-2 w-full border-b border-[#0B2437]/25 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-[#09A8AA]" /></label>
                <label className="block text-sm font-bold text-[#0B2437] sm:col-span-2">Qual é o principal gargalo do seu escritório?<select required name="bottleneck" defaultValue="" className="mt-2 w-full border-b border-[#0B2437]/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition focus:border-[#09A8AA]"><option value="" disabled>Selecione uma opção</option><option value="capacidade">Capacidade da equipe</option><option value="fiscal">Rotina fiscal</option><option value="contabil">Rotina contábil</option><option value="financeiro">Rotina financeira</option><option value="hcm">HCM e folha</option><option value="outro">Outro desafio</option></select></label>
              </div>
              <button disabled={leadMutation.isPending} type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-[#0B2437] px-5 py-4 text-sm font-black text-white transition hover:bg-[#163d5b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">{leadMutation.isPending ? "Enviando solicitação..." : "Quero agendar meu diagnóstico"}<ArrowRight className="h-4 w-4" /></button>
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">Ao enviar, você autoriza o contato da Compliance sobre esta solicitação de parceria.</p>
              </>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#071927] py-8 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <img src={WHITE_LOGO} alt="Compliance Contabilidade" className="h-8 w-[150px] object-contain object-left opacity-90" />
          <div className="flex flex-wrap gap-x-5 gap-y-2"><a href="#desafios" className="hover:text-[#09D2D4]">Desafios</a><a href="#modelo" className="hover:text-[#09D2D4]">O modelo</a><a href="#servicos" className="hover:text-[#09D2D4]">Serviços</a><a href="#governanca" className="hover:text-[#09D2D4]">Governança</a><a href="#diagnostico" className="hover:text-[#09D2D4]">Diagnóstico</a></div>
          <span>Compliance Contabilidade</span>
        </div>
      </footer>
    </div>
  );
}
