import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  FileText,
  Home,
  MessageCircle,
  Phone,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

const WHATSAPP_NUMBER = "5524981260178";
const baseMessage = "Olá, Dr. Caio! Vim pelo site e gostaria de atendimento jurídico.";

function makeWhatsappLink(problemTitle = "") {
  const message = problemTitle
    ? `${baseMessage}\n\nMeu caso parece ser sobre: ${problemTitle}`
    : baseMessage;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const problems = [
  {
    id: "consumidor",
    icon: WalletCards,
    label: "Consumidor",
    eyebrow: "Produto, cobrança ou serviço",
    accent: "#C6A96B",
    title: "Direito do Consumidor",
    short: "Cobrança indevida, produto com defeito, negativa da empresa ou serviço mal prestado.",
    diagnosis:
      "Quando a empresa falha, descumpre uma oferta ou causa prejuízo, o consumidor pode buscar reparação com base nas provas disponíveis.",
    rights: ["Reembolso, troca ou reparo", "Cancelamento de cobrança indevida", "Indenização por danos materiais ou morais"],
    documents: ["Nota fiscal, contrato ou comprovante", "Protocolos, e-mails ou conversas", "Registros do prejuízo sofrido"],
  },
  {
    id: "contrato",
    icon: FileText,
    label: "Contratos",
    eyebrow: "Acordos descumpridos",
    accent: "#A88C5A",
    title: "Responsabilidade Contratual",
    short: "Uma das partes não cumpriu aquilo que estava combinado.",
    diagnosis:
      "Quando há contrato válido e descumprimento, o caminho pode envolver cumprimento da obrigação, rescisão ou reparação financeira.",
    rights: ["Cumprimento da obrigação", "Rescisão contratual", "Reparação por prejuízos"],
    documents: ["Contrato assinado", "Comprovantes de pagamento", "Mensagens, e-mails ou notificações"],
  },
  {
    id: "imovel",
    icon: Home,
    label: "Imóveis",
    eyebrow: "Posse e regularização",
    accent: "#60758A",
    title: "Regularização de Imóveis",
    short: "Imóvel sem escritura, posse antiga ou documentação incompleta.",
    diagnosis:
      "A regularização busca transformar uma posse insegura em uma situação juridicamente protegida, seja por REURB, usucapião judicial ou extrajudicial.",
    rights: ["Análise de usucapião", "Regularização fundiária", "Caminho para escritura definitiva"],
    documents: ["Contas antigas do imóvel", "Contratos, recibos e fotos", "Histórico da posse"],
  },
  {
    id: "inventario",
    icon: ScrollText,
    label: "Inventário",
    eyebrow: "Bens e herdeiros",
    accent: "#C6A96B",
    title: "Inventários",
    short: "Transferência de bens após falecimento.",
    diagnosis:
      "O inventário formaliza a transferência de bens e direitos aos herdeiros. Em alguns casos, é possível resolver de forma extrajudicial, diretamente em cartório.",
    rights: ["Inventário em cartório", "Inventário judicial", "Partilha de bens"],
    documents: ["Certidão de óbito", "Documentos dos herdeiros", "Relação de bens e dívidas"],
  },
  {
    id: "divorcio",
    icon: Users,
    label: "Família",
    eyebrow: "Divórcio e partilha",
    accent: "#2F4054",
    title: "Divórcio e Partilha",
    short: "Separação, patrimônio e organização familiar.",
    diagnosis:
      "O divórcio pode ser consensual ou litigioso. A definição do caminho depende do regime de bens, existência de filhos menores e acordo entre as partes.",
    rights: ["Divórcio em cartório, quando possível", "Partilha de bens", "Orientação em casos com filhos menores"],
    documents: ["Certidão de casamento atualizada", "Documentos dos cônjuges", "Relação de bens"],
  },
  {
    id: "bpc",
    icon: ShieldCheck,
    label: "BPC/LOAS",
    eyebrow: "Benefício assistencial",
    accent: "#6B7280",
    title: "BPC/LOAS",
    short: "Benefício para idoso ou pessoa com deficiência.",
    diagnosis:
      "Benefício assistencial de um salário mínimo destinado a idosos ou pessoas com deficiência que não possuem meios de prover a própria manutenção.",
    rights: ["Pedido administrativo", "Revisão de negativa", "Organização documental"],
    documents: ["CadÚnico atualizado", "Laudos e exames, quando houver", "Documentos do grupo familiar"],
  },
];

const trustItems = [
  {
    title: "Clareza na orientação",
    text: "Você entende o cenário, os documentos necessários e os próximos passos antes de tomar uma decisão.",
  },
  {
    title: "Análise individual",
    text: "Cada caso é avaliado conforme sua realidade, sem respostas prontas ou caminhos genéricos.",
  },
  {
    title: "Atendimento direto",
    text: "O contato acontece de forma objetiva, com comunicação simples e foco em solução.",
  },
  {
    title: "Estratégia jurídica",
    text: "A atuação considera riscos, provas, urgência e o caminho mais adequado para o caso.",
  },
];

function LiquidGlass({ children, className = "", light = false }) {
  return (
    <div
      className={`relative overflow-hidden border backdrop-blur-2xl ${
        light ? "border-white/70 bg-white/45" : "border-white/16 bg-white/[0.075]"
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.03)_42%,rgba(255,255,255,0.10))]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function WhatsAppButton({ href, children = "Falar no WhatsApp", className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1ebe5d] ${className}`}
    >
      {children} <FaWhatsapp size={18} />
    </a>
  );
}

function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-full border border-[#0A2540]/10 bg-[#F7F6F2]/86 px-6 py-4 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-5">
          <a href="#inicio" className="flex items-center">
            <img
              src="/images/logo-original.png"
              alt="Caio Carvalho"
              className="h-16 w-auto max-w-[260px] object-contain md:h-20 md:max-w-[340px]"
            />
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#atuacao" className="text-sm text-[#0A2540]/58 hover:text-[#0A2540]">Atuação</a>
            <a href="#sobre" className="text-sm text-[#0A2540]/58 hover:text-[#0A2540]">Sobre</a>
            <a href="#contato" className="text-sm text-[#0A2540]/58 hover:text-[#0A2540]">Contato</a>
          </nav>

          <WhatsAppButton href={makeWhatsappLink()} className="hidden px-5 py-2.5 sm:inline-flex">
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}

function getRelativeOffset(index, activeIndex, length) {
  let offset = index - activeIndex;

  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;

  return offset;
}

function VerticalServiceCarousel({ selected, setSelected }) {
  const activeIndex = problems.findIndex((item) => item.id === selected);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % problems.length;
      setSelected(problems[nextIndex].id);
    }, 5200);

    return () => clearInterval(timer);
  }, [activeIndex, setSelected]);

  const movePrevious = () => {
    const previousIndex = activeIndex === 0 ? problems.length - 1 : activeIndex - 1;
    setSelected(problems[previousIndex].id);
  };

  const moveNext = () => {
    const nextIndex = (activeIndex + 1) % problems.length;
    setSelected(problems[nextIndex].id);
  };

  return (
    <LiquidGlass className="rounded-[42px] p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">Áreas de atuação</p>
          <p className="mt-2 text-sm text-white/50">Use as setas ou clique em uma área.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={movePrevious}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
            aria-label="Área anterior"
          >
            <ChevronUp size={18} />
          </button>
          <button
            type="button"
            onClick={moveNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
            aria-label="Próxima área"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      <div className="relative h-[520px] overflow-hidden rounded-[34px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-gradient-to-b from-[#0A2540]/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-[#0A2540]/55 to-transparent" />

        {problems.map((problem, index) => {
          const Icon = problem.icon;
          const offset = getRelativeOffset(index, activeIndex, problems.length);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <motion.button
              key={problem.id}
              type="button"
              onClick={() => setSelected(problem.id)}
              animate={{
                y: 182 + offset * 94,
                scale: isActive ? 1 : 0.9,
                opacity: isVisible ? (isActive ? 1 : 0.45) : 0,
                filter: isActive ? "blur(0px)" : "blur(1px)",
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute left-0 right-0 top-0 mx-auto w-full rounded-[30px] border p-5 text-left backdrop-blur-2xl transition-colors ${
                isActive
                  ? "border-white/35 bg-[#F7F6F2] text-[#0A2540]"
                  : "border-white/10 bg-white/[0.055] text-white hover:bg-white/[0.09]"
              }`}
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    isActive ? "bg-[#0A2540] text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  <span className={`absolute inset-0 rounded-2xl border ${isActive ? "border-[#C6A96B]/40" : "border-white/10"}`} />
                  <Icon size={22} />
                </span>

                <div className="flex-1">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${isActive ? "text-[#0A2540]/50" : "text-white/40"}`}>
                    {problem.eyebrow}
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-tight">{problem.label}</p>
                  <p className={`mt-2 text-sm leading-6 ${isActive ? "text-[#0A2540]/70" : "text-white/54"}`}>
                    {problem.short}
                  </p>
                </div>
              </div>

              <div className={`mt-5 h-px w-full ${isActive ? "bg-[#C6A96B]" : "bg-white/10"}`} />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {problems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`h-2 rounded-full transition-all ${selected === item.id ? "w-10 bg-[#C6A96B]" : "w-2 bg-white/25 hover:bg-white/45"}`}
            aria-label={`Selecionar ${item.label}`}
          />
        ))}
      </div>
    </LiquidGlass>
  );
}

function ConsultationPanel({ problem }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={problem.id}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
        transition={{ duration: 0.42 }}
      >
        <LiquidGlass className="rounded-[42px] p-6 md:p-8">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-xl">
            <Sparkles size={15} style={{ color: problem.accent }} /> análise inicial
          </div>

          <h2 className="max-w-xl font-serif text-4xl leading-tight text-white md:text-5xl">{problem.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">{problem.diagnosis}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">Pode envolver</p>
              <div className="mt-4 space-y-3">
                {problem.rights.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                    <CheckCircle2 size={17} style={{ color: problem.accent }} className="mt-0.5 shrink-0" /> {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">Primeiros documentos</p>
              <div className="mt-4 space-y-3">
                {problem.documents.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                    <FileText size={17} style={{ color: problem.accent }} className="mt-0.5 shrink-0" /> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton href={makeWhatsappLink(problem.title)}>Iniciar análise</WhatsAppButton>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.055] px-6 py-4 text-sm font-semibold text-white/75 transition hover:bg-white/[0.095]"
            >
              Conhecer o advogado <ArrowRight size={18} />
            </a>
          </div>
        </LiquidGlass>
      </motion.div>
    </AnimatePresence>
  );
}

function Hero() {
  const [selected, setSelected] = useState("consumidor");
  const problem = useMemo(() => problems.find((p) => p.id === selected), [selected]);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#0A2540] px-5 pt-32 text-white md:pt-36">
      <motion.div
        className="pointer-events-none absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[#C6A96B]/14 blur-[120px]"
        animate={{ x: [0, 35, 0], y: [0, 24, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-[#DDE7F0]/12 blur-[130px]"
        animate={{ x: [0, -34, 0], y: [0, -18, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0A2540_0%,#12304D_58%,#0A2540_100%)]" />

      <Header />

      <div className="relative mx-auto max-w-7xl pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-4 py-2 text-xs font-medium text-white/58 backdrop-blur-xl"
          >
            <Scale size={15} /> atendimento jurídico direto
          </motion.div>

          <h1 className="mx-auto max-w-5xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            Entenda seu caso antes de tomar uma decisão.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60">
            Uma experiência inicial para organizar o problema, identificar documentos importantes e dar o próximo passo com segurança.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="mt-16 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start"
        >
          <div id="atuacao" className="lg:sticky lg:top-32">
            <VerticalServiceCarousel selected={selected} setSelected={setSelected} />
          </div>

          <div className="grid gap-6">
            {problem && <ConsultationPanel problem={problem} />}

            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <LiquidGlass className="rounded-[38px] p-2">
                <img
                  src="/images/caio-full.png"
                  alt="Caio Carvalho dos Santos"
                  className="h-[390px] w-full rounded-[32px] object-cover object-center grayscale-[4%] contrast-105 saturate-[0.94]"
                />
              </LiquidGlass>

              <LiquidGlass className="rounded-[38px] p-7">
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white">
                  <Scale size={22} />
                </div>
                <p className="font-serif text-3xl leading-tight text-white">Caio Carvalho dos Santos</p>
                <p className="mt-3 text-sm font-medium text-white/48">Advogado • OAB/RJ 262212</p>
                <p className="mt-6 text-base leading-8 text-white/62">
                  Atendimento com clareza, estratégia e linguagem simples para orientar decisões jurídicas reais.
                </p>
              </LiquidGlass>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % trustItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const previous = () => setActiveIndex((current) => (current === 0 ? trustItems.length - 1 : current - 1));
  const next = () => setActiveIndex((current) => (current + 1) % trustItems.length);

  return (
    <div className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B7280]">Diferenciais</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={previous} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A2540]/10 bg-white/45 text-[#0A2540] backdrop-blur-xl transition hover:bg-white" aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A2540]/10 bg-white/45 text-[#0A2540] backdrop-blur-xl transition hover:bg-white" aria-label="Próximo">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[34px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 32, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -32, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <LiquidGlass light className="rounded-[34px] p-7 md:p-8">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A2540] text-white">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl leading-tight text-[#0A2540] md:text-4xl">{trustItems[activeIndex].title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#4B5563]">{trustItems[activeIndex].text}</p>
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex gap-2">
        {trustItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-10 bg-[#0A2540]" : "w-2 bg-[#0A2540]/20 hover:bg-[#0A2540]/40"}`}
            aria-label={`Ir para ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-[#F7F6F2] px-5 py-24 text-[#0A2540]">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#DDE7F0]/45 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-white/80 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <LiquidGlass light className="rounded-[44px] p-2">
            <img src="/images/caio-full.png" alt="Advogado Caio Carvalho em ambiente institucional" className="h-[680px] w-full rounded-[38px] object-cover object-top grayscale-[4%] contrast-105 saturate-[0.94]" />
          </LiquidGlass>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#6B7280]">Quem analisa seu caso</p>
          <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight tracking-tight md:text-7xl">Direto com o advogado. Sem juridiquês.</h2>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-[#4B5563]">
            <p>Caio Carvalho dos Santos é advogado inscrito na OAB/RJ sob nº 262212 e atua com foco em soluções jurídicas claras, acessíveis e estratégicas.</p>
            <p>O objetivo é transformar uma situação confusa em um caminho compreensível: quais documentos reunir, quais riscos observar e qual medida faz sentido para o caso.</p>
          </div>

          <TrustCarousel />

          <WhatsAppButton href={makeWhatsappLink()} className="mt-10">
            Falar com Caio
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#0A2540] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(221,231,240,0.18),transparent_38%),linear-gradient(180deg,#0A2540_0%,#061727_100%)]" />
      <div className="relative mx-auto max-w-5xl">
        <LiquidGlass className="rounded-[48px] p-8 text-center md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/42">Próximo passo</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-tight tracking-tight md:text-7xl">Seu caso precisa de direção, não de dúvida.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60">Envie uma mensagem com um resumo da situação e os documentos que você já possui.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppButton href={makeWhatsappLink()}>Iniciar atendimento</WhatsAppButton>
            <span className="inline-flex items-center gap-2 text-sm text-white/52"><Phone size={17} /> (24) 98126-0178</span>
          </div>
        </LiquidGlass>
      </div>
    </section>
  );
}

function Footer() {
  const footerAreas = [
    { label: "Consumidor", icon: Scale },
    { label: "Contratos", icon: FileText },
    { label: "Imóveis", icon: Home },
    { label: "Família", icon: Users },
    { label: "Inventário", icon: ScrollText },
    { label: "BPC/LOAS", icon: ShieldCheck },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#061727] px-5 py-16 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#C8B6FF]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F7F6F2]/8 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_1.1fr_1fr]">
          <div>
            <p className="font-serif text-3xl leading-tight text-white">Caio Carvalho dos Santos</p>
            <p className="mt-3 text-sm font-medium text-white/52">Advogado • OAB/RJ 262212</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/48">Atendimento jurídico direto, com clareza e estratégia para orientar decisões em casos cíveis, familiares, imobiliários e assistenciais.</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/36">Navegação</p>
            <div className="mt-5 space-y-3 text-sm">
              <a href="#inicio" className="block text-white/56 transition hover:text-white">Início</a>
              <a href="#atuacao" className="block text-white/56 transition hover:text-white">Áreas de atuação</a>
              <a href="#sobre" className="block text-white/56 transition hover:text-white">Sobre o advogado</a>
              <a href="#contato" className="block text-white/56 transition hover:text-white">Contato</a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/36">Atuação</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {footerAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href="#atuacao" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition hover:bg-white/[0.08]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition group-hover:bg-[#F7F6F2] group-hover:text-[#0A2540]"><Icon size={16} /></span>
                    <span className="text-sm text-white/70 transition group-hover:text-white">{item.label}</span>
                  </a>
                );
              })}
            </div>
            <a href="#atuacao" className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">Ver detalhes <ArrowRight size={16} /></a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/36">Contato</p>
            <div className="mt-5 space-y-4 text-sm text-white/56">
              <p className="flex items-center gap-3"><Phone size={17} className="text-[#C8B6FF]" /> (24) 98126-0178</p>
              <p className="flex items-center gap-3"><Scale size={17} className="text-[#C8B6FF]" /> OAB/RJ 262212</p>
            </div>
            <WhatsAppButton href={makeWhatsappLink()} className="mt-7 px-6 py-3">Falar no WhatsApp</WhatsAppButton>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-xs leading-6 text-white/38">As informações deste site possuem caráter exclusivamente informativo e não substituem a análise individual do caso por profissional habilitado. O envio de mensagem não implica contratação automática de serviços advocatícios.</p>
          <p className="text-xs text-white/32 md:text-right">© 2026 Caio Carvalho dos Santos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a href={makeWhatsappLink()} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 hover:bg-[#1ebe5d]" aria-label="Falar no WhatsApp">
      <FaWhatsapp size={27} />
    </a>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#0A2540] font-sans antialiased">
      <Hero />
      <About />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
