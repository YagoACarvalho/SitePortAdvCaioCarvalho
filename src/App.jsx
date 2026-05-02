import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Home,
  MessageCircle,
  Phone,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

// Save the two photos inside: public/images/
// caio-close.png
// caio-full.png

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
    label: "Problema com empresa ou produto",
    short: "Cobrança indevida, produto com defeito, serviço mal prestado ou negativa da empresa.",
    title: "Direito do Consumidor",
    diagnosis: "Esse tipo de situação costuma envolver falha na prestação de serviço, prática abusiva, descumprimento de oferta ou dano causado ao consumidor.",
    rights: ["Troca, reparo ou reembolso", "Cancelamento de cobrança indevida", "Indenização por danos materiais ou morais", "Cumprimento da oferta feita pela empresa"],
    firstSteps: ["Separe nota fiscal, contrato, protocolos ou prints", "Anote datas e nomes de atendentes", "Guarde provas da tentativa de solução"],
    questions: ["Você tem comprovante da compra ou contratação?", "Já tentou resolver com a empresa?", "Houve prejuízo financeiro ou constrangimento?"],
  },
  {
    id: "contrato",
    icon: FileText,
    label: "Contrato descumprido",
    short: "Alguém não cumpriu uma obrigação combinada em contrato.",
    title: "Responsabilidade Civil Contratual",
    diagnosis: "Quando existe um contrato válido e uma parte descumpre sua obrigação, pode surgir o direito de exigir o cumprimento ou buscar reparação pelo prejuízo sofrido.",
    rights: ["Cumprimento da obrigação", "Rescisão contratual", "Cobrança de multa contratual", "Reparação por prejuízos comprovados"],
    firstSteps: ["Separe o contrato assinado", "Organize comprovantes de pagamento", "Guarde mensagens, e-mails e notificações"],
    questions: ["Existe contrato escrito?", "Qual obrigação deixou de ser cumprida?", "Você consegue comprovar o prejuízo?"],
  },
  {
    id: "bpc",
    icon: ShieldCheck,
    label: "BPC/LOAS",
    short: "Benefício assistencial para idoso ou pessoa com deficiência.",
    title: "Benefício de Prestação Continuada",
    diagnosis: "O BPC/LOAS é um benefício assistencial de um salário mínimo para idosos ou pessoas com deficiência que não possuem meios de prover a própria manutenção.",
    rights: ["Pedido administrativo do benefício", "Revisão de negativa", "Organização de documentos médicos e sociais", "Acompanhamento jurídico em caso de indeferimento"],
    firstSteps: ["Atualize o CadÚnico", "Separe laudos e exames, quando houver", "Organize documentos de todos da casa"],
    questions: ["A pessoa tem 65 anos ou possui deficiência?", "O CadÚnico está atualizado?", "A renda familiar está dentro do limite exigido?"],
  },
  {
    id: "imovel",
    icon: Home,
    label: "Imóvel irregular",
    short: "Posse sem escritura, imóvel antigo ou documentação incompleta.",
    title: "Regularização de Imóveis",
    diagnosis: "A regularização busca transformar uma posse insegura em uma situação juridicamente protegida, seja por REURB, usucapião judicial ou extrajudicial.",
    rights: ["Análise de usucapião", "Regularização fundiária urbana", "Segurança jurídica da posse", "Caminho para escritura definitiva"],
    firstSteps: ["Separe contas antigas do imóvel", "Reúna contratos, recibos e fotos", "Liste há quanto tempo existe a posse"],
    questions: ["Há quanto tempo você ocupa o imóvel?", "Alguém contesta essa posse?", "Você possui contas ou documentos no seu nome?"],
  },
  {
    id: "inventario",
    icon: ScrollText,
    label: "Inventário",
    short: "Transferência de bens após falecimento.",
    title: "Inventários Judiciais e Extrajudiciais",
    diagnosis: "O inventário formaliza a transferência de bens e direitos aos herdeiros. Quando todos são maiores, capazes e estão de acordo, pode ser possível resolver em cartório.",
    rights: ["Inventário em cartório", "Inventário judicial", "Partilha de bens", "Regularização patrimonial da família"],
    firstSteps: ["Separe certidão de óbito", "Liste bens, dívidas e herdeiros", "Verifique se há consenso entre os herdeiros"],
    questions: ["Todos os herdeiros estão de acordo?", "Há herdeiro menor ou incapaz?", "Existem bens imóveis ou dívidas?"],
  },
  {
    id: "divorcio",
    icon: Users,
    label: "Divórcio e partilha",
    short: "Separação, divisão de bens e organização familiar.",
    title: "Divórcio e Partilha de Bens",
    diagnosis: "O divórcio pode ser conduzido de forma consensual ou litigiosa. A análise do regime de bens e da situação familiar define o caminho mais adequado.",
    rights: ["Divórcio em cartório, quando possível", "Partilha de patrimônio", "Definição de direitos patrimoniais", "Orientação em casos com filhos menores"],
    firstSteps: ["Separe certidão de casamento atualizada", "Liste bens adquiridos durante o casamento", "Reúna documentos dos cônjuges e filhos"],
    questions: ["Existe acordo entre as partes?", "Há filhos menores ou incapazes?", "Qual é o regime de bens do casamento?"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ProblemButton({ problem, active, onClick }) {
  const Icon = problem.icon;

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition duration-300 ${
        active
          ? "border-amber-300 bg-amber-300 text-zinc-950 shadow-2xl shadow-amber-950/20"
          : "border-white/10 bg-white/[0.04] text-white hover:border-amber-300/50 hover:bg-white/[0.07]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-zinc-950 text-amber-300" : "bg-amber-300/10 text-amber-300"}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="font-semibold leading-snug">{problem.label}</p>
          <p className={`mt-2 text-sm leading-6 ${active ? "text-zinc-800" : "text-zinc-400"}`}>{problem.short}</p>
        </div>
      </div>
    </button>
  );
}

function ConsultationPanel({ problem }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={problem.id}
        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
        transition={{ duration: 0.35 }}
        className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-xl md:p-8"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
          <Scale size={17} /> Possível caminho jurídico
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{problem.title}</h2>
        <p className="mt-5 text-lg leading-8 text-zinc-300">{problem.diagnosis}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-white/[0.04] p-5">
            <p className="font-semibold text-amber-200">Você pode buscar:</p>
            <div className="mt-4 space-y-3">
              {problem.rights.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={18} /> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/[0.04] p-5">
            <p className="font-semibold text-amber-200">Primeiros documentos:</p>
            <div className="mt-4 space-y-3">
              {problem.firstSteps.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <FileText className="mt-0.5 shrink-0 text-amber-300" size={18} /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
          <p className="font-semibold text-amber-100">Para avaliar melhor, o advogado provavelmente vai te perguntar:</p>
          <div className="mt-4 grid gap-3">
            {problem.questions.map((question) => (
              <p key={question} className="rounded-2xl bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200">
                → {question}
              </p>
            ))}
          </div>
        </div>

        <a
          href={makeWhatsappLink(problem.title)}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 font-semibold text-zinc-950 transition hover:bg-amber-200 md:w-auto"
        >
          Enviar esse caso no WhatsApp <MessageCircle size={20} />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

function HeroConsultation() {
  const [selectedId, setSelectedId] = useState("consumidor");
  const selectedProblem = useMemo(() => problems.find((item) => item.id === selectedId), [selectedId]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-5 py-8 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_10%,rgba(217,180,92,0.22),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.10),transparent_35%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:auto,auto,42px_42px,42px_42px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="flex items-center justify-between py-5">
          <div>
            <p className="text-sm font-bold tracking-[0.36em] text-amber-300">CAIO CARVALHO</p>
            <p className="mt-1 text-xs text-zinc-400">Advogado • OAB/RJ 262212</p>
          </div>

          <a
            href={makeWhatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/[0.08] sm:inline-flex"
          >
            WhatsApp
          </a>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="lg:sticky lg:top-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              <Scale size={17} /> consulta guiada inicial
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Qual é o seu problema jurídico hoje?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Selecione uma situação abaixo. O site organiza o caminho inicial, os documentos e as perguntas mais importantes antes do atendimento.
            </p>

            <div className="mt-9 grid gap-3">
              {problems.map((problem) => (
                <ProblemButton
                  key={problem.id}
                  problem={problem}
                  active={selectedId === problem.id}
                  onClick={() => setSelectedId(problem.id)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6, delay: 0.15 }}>
            {selectedProblem && <ConsultationPanel problem={selectedProblem} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LawyerReveal() {
  return (
    <section className="bg-[#f3efe7] px-5 py-24 text-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-amber-700/10 blur-3xl" />
          <img
            src="/images/caio-full.png"
            alt="Caio Carvalho dos Santos, advogado"
            className="relative h-[680px] w-full rounded-[2rem] object-cover object-top shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-amber-700">Quem analisa seu caso</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Caio Carvalho dos Santos</h2>
          <p className="mt-3 text-lg font-medium text-zinc-700">Advogado inscrito na OAB/RJ sob nº 262212</p>

          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-zinc-700">
            <p>
              Atendimento direto com o advogado. Sem intermediários. Sem linguagem complicada.
            </p>
            <p>
              A proposta é entender o seu caso, organizar as informações importantes e indicar o caminho jurídico com clareza, estratégia e responsabilidade.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Clareza", "Estratégia", "Atendimento direto"].map((item) => (
              <div key={item} className="rounded-3xl border border-zinc-900/10 bg-white/60 p-5 shadow-sm">
                <CheckCircle2 className="text-amber-700" />
                <p className="mt-4 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-zinc-950 px-5 py-24 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-amber-300">Próximo passo</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Agora que você entendeu o caminho, fale com o advogado.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Envie uma mensagem com o resumo do seu caso. O atendimento começa pela análise das informações e documentos disponíveis.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={makeWhatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-8 py-4 font-semibold text-zinc-950 transition hover:bg-amber-200"
            >
              Chamar no WhatsApp <MessageCircle size={20} />
            </a>
            <div className="inline-flex items-center gap-2 text-zinc-300">
              <Phone size={18} className="text-amber-300" /> (24) 98126-0178
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingBackTop() {
  return (
    <a
      href="#top"
      className="fixed bottom-5 left-5 z-50 hidden items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-xl transition hover:border-amber-300/40 md:inline-flex"
    >
      <ArrowLeft size={16} /> início
    </a>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={makeWhatsappLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105 hover:bg-green-600"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 px-5 pb-10 text-zinc-500">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">Caio Carvalho dos Santos</p>
          <p className="text-sm">Advogado • OAB/RJ 262212</p>
        </div>
        <p className="max-w-2xl text-sm leading-6 md:text-right">
          As informações deste site possuem caráter informativo e não substituem a análise individual do caso por profissional habilitado.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main id="top" className="min-h-screen font-sans">
      <HeroConsultation />
      <LawyerReveal />
      <FinalCTA />
      <Footer />
      <FloatingBackTop />
      <WhatsAppFloat />
    </main>
  );
}
