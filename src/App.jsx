import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  FileText,
  Home,
  HeartHandshake,
  ScrollText,
  Users,
  MessageCircle,
  CheckCircle2,
  Menu,
  X,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";



const WHATSAPP_NUMBER = "5524981260178";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, Dr. Caio! Vim pelo site e gostaria de atendimento jurídico."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const services = [
  {
    icon: HeartHandshake,
    problem: "Problemas com empresa ou produto?",
    title: "Direito do Consumidor",
    description:
      "Atuação em casos de práticas abusivas, falha na prestação de serviços, produtos com defeito, cancelamentos, cobranças indevidas e pedidos de indenização.",
    requirements:
      "Documentos úteis: notas fiscais, contratos, protocolos, conversas, comprovantes e registros da tentativa de solução.",
  },
  {
    icon: FileText,
    problem: "Contrato descumprido?",
    title: "Responsabilidade Civil Contratual",
    description:
      "Assessoria jurídica quando uma das partes descumpre o combinado e causa prejuízo, buscando o cumprimento da obrigação ou reparação financeira.",
    requirements:
      "Documentos úteis: contrato, comprovantes do descumprimento e provas do prejuízo sofrido.",
  },
  {
    icon: ShieldCheck,
    problem: "Precisa solicitar BPC/LOAS?",
    title: "Benefício de Prestação Continuada",
    description:
      "Orientação para idosos e pessoas com deficiência que precisam buscar o benefício assistencial de um salário mínimo.",
    requirements:
      "Requisitos comuns: idade mínima de 65 anos ou deficiência, renda familiar dentro do limite legal e CadÚnico atualizado.",
  },
  {
    icon: Home,
    problem: "Seu imóvel ainda não tem escritura?",
    title: "Regularização de Imóveis",
    description:
      "Soluções para trazer segurança jurídica à propriedade por meio de REURB, usucapião judicial ou extrajudicial.",
    requirements:
      "Documentos úteis: comprovantes de posse, contas do imóvel, contratos, fotos, testemunhas e histórico da ocupação.",
  },
  {
    icon: ScrollText,
    problem: "Precisa resolver inventário?",
    title: "Inventários Judiciais e Extrajudiciais",
    description:
      "Formalização da transferência de bens e direitos aos herdeiros, buscando o caminho mais rápido e adequado para cada família.",
    requirements:
      "Documentos úteis: certidão de óbito, documentos dos herdeiros, relação de bens e informações sobre dívidas.",
  },
  {
    icon: Users,
    problem: "Vai passar por divórcio ou partilha?",
    title: "Divórcio e Partilha de Bens",
    description:
      "Acompanhamento na dissolução do vínculo matrimonial e divisão patrimonial com cuidado, clareza e proteção dos direitos envolvidos.",
    requirements:
      "Documentos úteis: certidão de casamento atualizada, documentos dos cônjuges, informações sobre filhos e bens.",
  },
];

const differentials = [
  {
    title: "Atendimento direto",
    text: "Você fala com quem entende o seu caso e pode orientar os próximos passos com clareza.",
  },
  {
    title: "Linguagem simples",
    text: "Explicação objetiva, sem juridiquês desnecessário, para você entender seus direitos.",
  },
  {
    title: "Estratégia para cada caso",
    text: "Cada situação é analisada individualmente antes da definição do melhor caminho jurídico.",
  },
];

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Atuação", href: "#atuacao" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="group">
          <p className="text-sm font-semibold tracking-[0.35em] text-amber-300">CAIO CARVALHO</p>
          <p className="text-xs text-slate-300">Advogado • OAB/RJ 262212</p>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Falar no WhatsApp
          </a>
        </nav>

        <button className="text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-200">
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-amber-300 px-5 py-3 text-center font-semibold text-slate-950"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-950 pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
            <Scale size={18} /> Atendimento jurídico em Miguel Pereira e região
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Direito sem complicação para quem precisa resolver de verdade.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Atendimento jurídico claro, estratégico e humanizado nas áreas cível, consumidor, família, benefícios assistenciais e regularização de imóveis.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Falar com o advogado <MessageCircle size={20} />
            </a>
            <a
              href="#atuacao"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Ver áreas de atuação <ArrowRight size={20} />
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-amber-200">OAB/RJ</p>
              <p className="mt-1 text-xs text-slate-400">262212</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-amber-200">6+</p>
              <p className="mt-1 text-xs text-slate-400">áreas de atuação</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-bold text-amber-200">Direto</p>
              <p className="mt-1 text-xs text-slate-400">com o advogado</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-amber-300/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
            <img src="/images/caio-close.png" alt="Caio Carvalho dos Santos, advogado" className="h-[560px] w-full rounded-[1.5rem] object-cover object-center" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-xl">
              <p className="font-semibold text-white">Caio Carvalho dos Santos</p>
              <p className="mt-1 text-sm text-slate-300">Advogado • OAB/RJ 262212</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="atuacao" className="bg-slate-50 px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">Áreas de atuação</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">Como o Dr. Caio pode te ajudar?</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Em vez de explicar o direito de forma difícil, o atendimento começa pelo seu problema e pelo caminho mais adequado para resolvê-lo.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-amber-300 transition group-hover:bg-amber-300 group-hover:text-slate-950">
                  <Icon size={26} />
                </div>
                <p className="text-sm font-semibold text-amber-700">{service.problem}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">{service.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <strong className="text-slate-950">Para começar:</strong> {service.requirements}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">Atendimento</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">Jurídico claro, humano e estratégico.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            O objetivo é que você entenda o seu caso, saiba quais documentos reunir e tenha uma visão realista dos próximos passos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {differentials.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <CheckCircle2 className="text-amber-600" size={28} />
              <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="overflow-hidden bg-slate-950 px-5 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-amber-300/10 blur-3xl" />
          <img src="/images/caio-full.png" alt="Advogado Caio Carvalho em ambiente institucional da OAB" className="relative h-[640px] w-full rounded-[2rem] object-cover object-top shadow-2xl" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">Sobre o advogado</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Caio Carvalho dos Santos</h2>
          <p className="mt-2 text-amber-200">Advogado inscrito na OAB/RJ sob nº 262212</p>

          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-300">
            <p>
              Atuo com foco em oferecer soluções jurídicas acessíveis, com clareza e estratégia, sempre buscando o melhor caminho para cada cliente.
            </p>
            <p>
              Meu trabalho é transformar situações complexas em orientações simples, para que você entenda seus direitos e tome decisões com mais segurança.
            </p>
            <p>
              O atendimento é direcionado para demandas cíveis, consumidor, família, inventários, regularização de imóveis e benefícios assistenciais.
            </p>
          </div>

          <div className="mt-9 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xl font-semibold text-white">Antes de entrar com uma ação, entenda o caminho.</p>
            <p className="mt-3 leading-7 text-slate-300">
              Uma boa orientação jurídica evita perda de tempo, documentos incompletos e decisões tomadas no impulso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contato" className="bg-slate-50 px-5 py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl md:p-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">Contato</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Está com um problema jurídico?</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Quanto antes você entender seus direitos e organizar os documentos, maiores são as chances de resolver da melhor forma.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <div className="space-y-4 text-slate-200">
              <p className="flex items-center gap-3"><Phone size={20} className="text-amber-300" /> (24) 98126-0178</p>
              <p className="flex items-center gap-3"><MapPin size={20} className="text-amber-300" /> Miguel Pereira/RJ e região</p>
              <p className="flex items-center gap-3"><Scale size={20} className="text-amber-300" /> OAB/RJ 262212</p>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Chamar no WhatsApp <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">Caio Carvalho dos Santos</p>
          <p className="text-sm">Advogado • OAB/RJ 262212</p>
        </div>
        <p className="max-w-2xl text-sm leading-6 md:text-right">
          As informações deste site possuem caráter informativo e não substituem a análise individual do caso por um profissional habilitado.
        </p>
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105 hover:bg-green-600"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <main className="font-sans">
      <Header />
      <Hero />
      <Services />
      <Differentials />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
