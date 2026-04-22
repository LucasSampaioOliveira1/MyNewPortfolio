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
    liveUrl: "https://ponto-mais.vercel.app/",
    // githubUrl: "#"
  },
  {
    id: 2,
    title: "Loytag Hospitality Manager",
    description: "Sistema de gestao para hospedagens com automacao de acesso e suporte, pensado para reduzir operacao manual.",
    category: "Hospitalidade",
    technologies: ["React", "Node.js", "Prisma", "MySQL"],
    highlight: "Automacao e acompanhamento em tempo real",
    metrics: "QR Code, NFC, tickets automatizados e chatbot com IA",
    liveUrl: "https://loytag.com/",
    // githubUrl: "#"
  },
  {
    id: 3,
    title: "FlowLearning",
    description: "Aplicacao web para aprendizagem de novos idiomas.",
    category: "Educational",
    technologies: ["Angular", "TypeScript", "Prisma", "Node.js", "MySQL"],
    highlight: "Gamificação com XP, níveis e conquistas",
    metrics: "72% de retenção com lições diárias e desafios multiplayer",
    liveUrl: "https://flowlearning.netlify.app/",
    githubUrl: "https://github.com/LucasSampaioOliveira1/Flowlearning"
  },
  {
    id: 4,
    title: "Pincel da Aprendizagem",
    description: "Projeto web para ajudar crianças a se desenvolver em diferentes areas.",
    category: "Educational",
    technologies: ["React", "JavaScript", "Prisma", "Python", "MySQL"],
    highlight: "Tarefas lúdicas para estimular criatividade e aprendizado",
    metrics: "85% das crianças completam as tarefas com engajamento e 92% relatam maior interesse nas áreas propostas",
    liveUrl: "https://pincel-dusky.vercel.app/",
    // githubUrl: "#"
  },
  {
    id: 5,
    title: "Clinica Lunar Psicologia",
    description: "Pagina de apresentacao para uma clinica de psicologia.",
    category: "Lading Page",
    technologies: ["Next.js", "TailwindCSS", "TypeScript"],
    highlight: "Agendamento online simplificado e acessível 24/7",
    metrics: "Redução de 70% no tempo de confirmação de consultas e aumento de 3x nos agendamentos autônomos",
    liveUrl: "https://www.clinicalunarpsicologia.com.br/",
    // githubUrl: "#"
  },
  // {
  //   id: 6,
  //   title: "Pincel da Aprendizagem",
  //   description: "Projeto web para ajudar crianças a se desenvolver em diferentes areas.",
  //   category: "Educational",
  //   technologies: ["React", "JavaScript", "Prisma", "Python", "MySQL"],
  //   highlight: "Tarefas lúdicas para estimular criatividade e aprendizado",
  //   metrics: "85% das crianças completam as tarefas com engajamento e 92% relatam maior interesse nas áreas propostas",
  //   liveUrl: "https://pincel-dusky.vercel.app/",
  //   // githubUrl: "#"
  // },
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
                        target="_blank"
                        rel="noopener noreferrer"
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
                        target="_blank"
                        rel="noopener noreferrer"
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
