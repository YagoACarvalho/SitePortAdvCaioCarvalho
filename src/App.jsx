import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
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

// === DESIGN TOKENS (NEW SYSTEM) ===
// Graphite / Sand palette + editorial typography
const COLORS = {
  bgDark: "#0B0B0C",
  bgLight: "#F7F7F5",
  sand: "#C2A878",
  blueGray: "#8A94A6",
  textPrimary: "#111111",
  textSecondary: "#6B7280",
};

// === WHATSAPP ===
const WHATSAPP_NUMBER = "5524981260178";
const baseMessage = "Olá, Dr. Caio! Vim pelo site e gostaria de atendimento jurídico.";
function makeWhatsappLink(problemTitle = "") {
  const message = problemTitle
    ? `${baseMessage}\n\nMeu caso parece ser sobre: ${problemTitle}`
    : baseMessage;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// === DATA ===
const problems = [
  {
    id: "consumidor",
    icon: WalletCards,
    label: "Problema com empresa ou produto",
    short: "Cobrança indevida, produto com defeito, serviço mal prestado.",
    title: "Direito do Consumidor",
    diagnosis: "Situações envolvendo falha de serviço, prática abusiva ou descumprimento de oferta.",
    rights: [
      "Reembolso ou troca",
      "Cancelamento de cobrança",
      "Indenização",
    ],
    questions: [
      "Você tem comprovante?",
      "Já tentou resolver?",
      "Houve prejuízo?",
    ],
  },
  {
    id: "contrato",
    icon: FileText,
    label: "Contrato descumprido",
    short: "Uma das partes não cumpriu o combinado.",
    title: "Responsabilidade Contratual",
    diagnosis: "Quando há contrato e descumprimento, pode haver obrigação de reparar.",
    rights: ["Cumprimento", "Rescisão", "Indenização"],
    questions: ["Existe contrato?", "Qual falha ocorreu?"],
  },
  {
    id: "imovel",
    icon: Home,
    label: "Imóvel irregular",
    short: "Sem escritura ou documentação incompleta.",
    title: "Regularização de Imóveis",
    diagnosis: "Regularização da posse para garantir segurança jurídica.",
    rights: ["Usucapião", "Regularização"],
    questions: ["Há quanto tempo ocupa?", "Tem documentos?"],
  },
  {
    id: "inventario",
    icon: ScrollText,
    label: "Inventário",
    short: "Transferência de bens após falecimento.",
    title: "Inventário",
    diagnosis: "Formalização da partilha entre herdeiros.",
    rights: ["Inventário cartório", "Inventário judicial"],
    questions: ["Há acordo?", "Existem bens?"],
  },
  {
    id: "divorcio",
    icon: Users,
    label: "Divórcio",
    short: "Separação e divisão de bens.",
    title: "Divórcio e Partilha",
    diagnosis: "Dissolução do vínculo com análise patrimonial.",
    rights: ["Divórcio", "Partilha"],
    questions: ["Há acordo?", "Tem filhos?"],
  },
  {
    id: "bpc",
    icon: ShieldCheck,
    label: "BPC/LOAS",
    short: "Benefício assistencial.",
    title: "Benefício Assistencial",
    diagnosis: "Auxílio para quem não pode prover sustento.",
    rights: ["Solicitação", "Revisão"],
    questions: ["Idade ou deficiência?", "CadÚnico atualizado?"],
  },
];

// === COMPONENTS ===

function ProblemButton({ problem, active, onClick }) {
  const Icon = problem.icon;
  return (
    <button
      onClick={onClick}
      className={`text-left py-4 transition ${
        active ? "text-black" : "text-gray-400"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium">{problem.label}</span>
      </div>
    </button>
  );
}

function ConsultationPanel({ problem }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={problem.id}
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        transition={{ duration: 0.4 }}
        className="max-w-xl"
      >
        <h2 className="text-4xl font-serif">{problem.title}</h2>
        <p className="mt-4 text-gray-500">{problem.diagnosis}</p>

        <div className="mt-8 space-y-3">
          {problem.rights.map((r) => (
            <p key={r} className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} /> {r}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          {problem.questions.map((q) => (
            <p key={q} className="text-sm text-gray-600">→ {q}</p>
          ))}
        </div>

        <a
          href={makeWhatsappLink(problem.title)}
          target="_blank"
          className="mt-8 inline-block text-sm underline"
        >
          Start your case →
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

function Hero() {
  const [selected, setSelected] = useState(problems[0].id);
  const problem = useMemo(() => problems.find((p) => p.id === selected), [selected]);

  return (
    <section className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">Legal clarity</p>

          <h1 className="text-5xl font-serif mt-4 leading-tight">
            Understand your situation before taking action.
          </h1>

          <div className="mt-10 space-y-2">
            {problems.map((p) => (
              <ProblemButton
                key={p.id}
                problem={p}
                active={selected === p.id}
                onClick={() => setSelected(p.id)}
              />
            ))}
          </div>
        </div>

        <ConsultationPanel problem={problem} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div>
          <p className="text-black font-semibold">Caio Carvalho</p>
          <p>OAB/RJ 262212</p>
        </div>
        <p>Informational only.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="font-sans">
      <Hero />
      <Footer />
    </main>
  );
}
