'use client';

import React, { CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  highlight: string;
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "PontoMais ERP Web",
    description: "Sistema web de gestao empresarial para pequenos comercios com operacao centralizada entre vendas, estoque e financeiro.",
    category: "ERP",
    technologies: ["Next.js", "TailwindCSS", "API Routes", "Supabase"],
    highlight: "Gestao para operacao real",
    metrics: "Controle de caixa, despesas, lucro e ticket medio",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Loytag Hospitality Manager",
    description: "Sistema de gestao para hospedagens com automacao de acesso e suporte, pensado para reduzir operacao manual.",
    category: "Hospitality",
    technologies: ["React", "Node.js", "Prisma", "MySQL"],
    highlight: "Automacao e acompanhamento em tempo real",
    metrics: "QR Code, NFC, tickets automatizados e chatbot com IA",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Scardua Finance & Assets",
    description: "Aplicacao web para gestao patrimonial e financeira, substituindo processos antigos e melhorando a rotina operacional.",
    category: "Financeiro",
    technologies: ["Next.js", "TypeScript", "Prisma", "MySQL"],
    highlight: "Clareza de operacao e usabilidade",
    metrics: "Melhoria de caixa, vendedores externos e patrimonios",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "SouVips Mobile Experience",
    description: "Projeto mobile com foco em usabilidade e responsividade, com lideranca tecnica do fluxo de interfaces.",
    category: "Mobile",
    technologies: ["FlutterFlow", "UI/UX", "Design System", "Prototipacao"],
    highlight: "Entrega acelerada com lideranca",
    metrics: "30 por cento menos tempo de entrega e 40 por cento mais retencao em testes",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Clinica Lunar Operations",
    description: "Estruturacao operacional completa de uma clinica com foco em processos, agenda, atendimento e crescimento sustentavel.",
    category: "Operacao",
    technologies: ["Gestao", "Processos", "Atendimento", "Lideranca"],
    highlight: "Visao empreendedora aplicada na pratica",
    metrics: "Melhoria da eficiencia operacional e experiencia dos pacientes",
    liveUrl: "#",
    githubUrl: "#"
  }
];

interface ProjectsSectionProps {
  accentColor?: string;
  accentRgb?: string;
  sectionStyle?: CSSProperties;
  sectionRef?: React.Ref<HTMLElement>;
}

export default function ProjectsSection({
  accentColor: accentColorProp,
  accentRgb: accentRgbProp,
  sectionStyle,
  sectionRef,
}: ProjectsSectionProps) {
  const { accentColor: themeAccentColor, accentRgb: themeAccentRgb } = useTheme();
  const accentColor = accentColorProp ?? themeAccentColor;
  const accentRgb = accentRgbProp ?? themeAccentRgb;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.06,
        duration: 0.5
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 28, opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 16,
        mass: 0.8,
        duration: 0.55
      }
    }
  };

  return (
    <section id="projetos" ref={sectionRef} className="relative py-24" style={sectionStyle}>
      <div className="section-backdrop absolute inset-0" />
      
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-eyebrow mb-4 inline-block">Projetos em destaque</span>
          <h2 className="mb-4 text-5xl font-bold lg:text-6xl">
            <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-gray-300 lg:text-xl">
            Casos reais que conectam produto, operacao, interface e engenharia com foco em resultado.
          </p>
        </motion.div>

        <motion.div 
          className="section-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="glass project-card overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.006,
                y: -6,
                boxShadow: `0 24px 54px rgba(${accentRgb}, 0.16)`
              }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            >
              <div className="project-preview relative overflow-hidden">
                <div className="project-preview-grid absolute inset-0" />
                <div className="project-preview-glow absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}55, transparent 55%)` }} />
                <div className="project-image-overlay absolute inset-0 transition-opacity duration-300" />
                <div className="project-preview-orb project-preview-orb-main" style={{ backgroundColor: accentColor }} />
                <div className="project-preview-orb project-preview-orb-side" />
                <div className="project-preview-bars">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="project-preview-chip">{project.category}</div>
              </div>
              
              <div className="p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-400">{project.highlight}</p>
                <h3 className="project-title mb-3 text-2xl font-bold text-white">
                  {project.title}
                </h3>
                
                <p className="mb-5 text-gray-300">
                  {project.description}
                </p>

                <div className="project-metric mb-5">
                  <span className="project-metric-line" style={{ backgroundColor: accentColor }} />
                  <span>{project.metrics}</span>
                </div>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="rounded-full px-3 py-1 text-sm"
                      style={{ 
                        backgroundColor: `rgba(${accentRgb}, 0.12)`,
                        color: accentColor
                      }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      transition={{ type: "spring", stiffness: 210, damping: 22 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      className="project-action-primary flex-1 text-center"
                      style={{ backgroundColor: accentColor }}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 210, damping: 24 }}
                    >
                      Ver Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      className="project-action-secondary flex-1 text-center"
                      style={{ borderColor: accentColor, color: accentColor }}
                      whileHover={{ 
                        scale: 1.01,
                        backgroundColor: accentColor,
                        color: 'white'
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 210, damping: 24 }}
                    >
                      GitHub
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
