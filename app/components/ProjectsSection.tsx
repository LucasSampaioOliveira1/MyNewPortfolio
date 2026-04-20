'use client';

import React, { CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  FiExternalLink,
  FiGithub,
  FiFolder,
  FiLayers,
  FiSmartphone,
  FiPieChart,
  FiBriefcase,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

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

const categoryIcons: Record<string, IconType> = {
  ERP: FiLayers,
  Hospitality: FiFolder,
  Financeiro: FiPieChart,
  Mobile: FiSmartphone,
  Operacao: FiBriefcase,
};

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
          {projects.map((project) => {
            const Icon = categoryIcons[project.category] || FiFolder;
            return (
              <motion.article
                key={project.id}
                className="glass project-card-minimal"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.01,
                  y: -4,
                  boxShadow: `0 24px 54px rgba(${accentRgb}, 0.12)`
                }}
                transition={{ type: "spring", stiffness: 200, damping: 28 }}
              >
                <div className="project-card-minimal-header">
                  <div 
                    className="project-icon-box"
                    style={{
                      background: `linear-gradient(135deg, rgba(${accentRgb}, 0.15), transparent)`,
                      color: accentColor,
                      borderColor: `rgba(${accentRgb}, 0.2)`
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="project-actions-minimal">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        className="project-action-icon"
                        whileHover={{ scale: 1.1, color: accentColor }}
                        whileTap={{ scale: 0.95 }}
                        title="GitHub"
                      >
                        <FiGithub size={18} />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        className="project-action-icon"
                        whileHover={{ scale: 1.1, color: accentColor }}
                        whileTap={{ scale: 0.95 }}
                        title="Live Demo"
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>
                
                <div className="project-card-minimal-content">
                  <p className="project-minimal-category" style={{ color: accentColor }}>
                    {project.category}
                  </p>
                  <h3 className="project-minimal-title">
                    {project.title}
                  </h3>
                  
                  <p className="project-minimal-desc">
                    {project.description}
                  </p>

                  <div className="project-minimal-metrics">
                    <p className="project-minimal-highlight">{project.highlight}</p>
                    <p className="project-minimal-metric-text">{project.metrics}</p>
                  </div>
                  
                  <div className="project-minimal-techs">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="project-tech-pill"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
