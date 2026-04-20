'use client';

import type { CSSProperties } from 'react';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import { useTheme } from './contexts/ThemeContext';

const TOTAL_WAVE_SECTIONS = 7;
const WAVE_WINDOW = 1.15;
const ORIGIN_RGB = [59, 130, 246] as const;
const IMPACT_RGB = [249, 115, 22] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getWaveProgress(sectionIndex: number, masterProgress: number) {
  const travel = TOTAL_WAVE_SECTIONS - 1 + WAVE_WINDOW;
  const raw = (masterProgress * travel - sectionIndex) / WAVE_WINDOW;
  const clamped = clamp(raw, 0, 1);

  return clamped * clamped * (3 - 2 * clamped);
}

function getMixedRgb(progress: number) {
  return ORIGIN_RGB.map((channel, index) =>
    Math.round(channel + (IMPACT_RGB[index] - channel) * progress)
  );
}

function getSectionStyle(sectionIndex: number, masterProgress: number) {
  const progress = getWaveProgress(sectionIndex, masterProgress);
  const rgb = getMixedRgb(progress).join(', ');

  return {
    ['--section-accent-rgb' as string]: rgb,
    ['--section-accent-color' as string]: `rgb(${rgb})`,
  } as CSSProperties;
}

const professionalSummary =
  'Desenvolvedor Full Stack com solida base tecnica e cursando Engenharia de Software, com experiencia pratica em projetos web e mobile. Atua na criacao de interfaces com React, Angular, Next.js, React Native e FlutterFlow, alem de back-end com Node.js, NestJS e bancos de dados MySQL e PostgreSQL via Prisma. Focado em entregas funcionais, escalaveis e boas praticas de arquitetura, possui perfil proativo, orientado a resultados, experiencia em lideranca e compartilhamento de conhecimento, alem de perfil empreendedor na gestao de uma clinica de psicologia.';

const experiences = [
  {
    company: 'Clinica Lunar Psicologia',
    role: 'CEO',
    period: '11/2024 - Atual',
    details: [
      'Estruturei e gerenciei a operacao completa da clinica, dos processos internos a contratacao de profissionais.',
      'Organizei agenda, fluxo de atendimentos e rotinas administrativas.',
      'Melhorei a eficiencia operacional e a experiencia dos pacientes.',
      'Atuei em decisoes estrategicas com foco em crescimento do negocio.',
    ],
    stack: ['Gestao', 'Operacao', 'Lideranca', 'Estrategia'],
  },
  {
    company: 'PontoMais',
    role: 'Desenvolvedor Full Stack',
    period: '09/2025 - 04/2026',
    details: [
      'Desenvolvi um sistema web de gestao empresarial para pequenos comercios, centralizando vendas, estoque e financeiro.',
      'Implementei controle de caixa, vendas com multiplos metodos de pagamento e gestao de despesas.',
      'Estruturei hierarquia de usuarios com controle de permissoes e visao por colaborador.',
      'Criei relatorios financeiros e indicadores como faturamento, lucro e ticket medio.',
    ],
    stack: ['Next.js', 'TailwindCSS', 'API Routes', 'Supabase'],
  },
  {
    company: 'Loytag',
    role: 'Desenvolvedor Full Stack',
    period: '08/2025 - 02/2026',
    details: [
      'Desenvolvi sistema de gestao de hospedagens com automacao via QR Code e NFC.',
      'Implementei chatbot com IA e sistema de abertura de tickets automatizados.',
      'Criei painel administrativo para gerenciamento de imoveis e acompanhamento em tempo real.',
      'Reduzi interacoes manuais e melhorei a experiencia de hospedes e gestores.',
    ],
    stack: ['React', 'Node.js', 'Prisma', 'MySQL'],
  },
  {
    company: 'Comercial Scardua',
    role: 'Desenvolvedor Full Stack',
    period: '03/2025 - 07/2025',
    details: [
      'Desenvolvi sistema web para gestao patrimonial e financeira, substituindo uma solucao anterior em Power BI.',
      'Melhorei o controle de caixa, a organizacao de vendedores externos e a gestao de patrimonios.',
      'Aumentei a usabilidade e a eficiencia operacional do sistema.',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL'],
  },
  {
    company: 'SouVips',
    role: 'Desenvolvedor Front End',
    period: '09/2024 - 01/2025',
    details: [
      'Liderei a equipe de desenvolvimento em projeto mobile utilizando FlutterFlow.',
      'Desenvolvi interfaces e fluxos UI/UX focados em usabilidade e responsividade.',
      'Reduzi o tempo de entrega em 30 por cento.',
      'Aumentei a retencao de usuarios em 40 por cento durante a fase de testes.',
    ],
    stack: ['FlutterFlow', 'UI/UX', 'Lideranca', 'Mobile'],
  },
  {
    company: 'Compilando Ja',
    role: 'Professor',
    period: '12/2023 - 04/2024',
    details: [
      'Ministrei aulas teoricas e praticas de desenvolvimento web com HTML, CSS e JavaScript.',
      'Estruturei conteudos didaticos e projetos praticos para os alunos.',
      'Aumentei a taxa de conclusao dos modulos em 40 por cento.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Ensino'],
  },
];

const education = [
  {
    institution: 'Uninter',
    title: 'Bacharelado em Engenharia de Software',
    period: '05/2024 - Cursando',
  },
  {
    institution: 'Antonio Jose Peixoto Miguel',
    title: 'Ensino Medio Completo',
    period: 'Concluido',
  },
];

const courses = [
  'SENAI - Tecnico em Desenvolvimento de Sistemas',
  'Udemy - JavaScript e TypeScript do basico ao avancado',
  'Alura - Docker: criando e gerenciando containers',
  'Alura - Next.js Full stack: arquitetura de componentes Front-end',
];

const skills = [
  {
    title: 'Front-end',
    items: ['HTML', 'CSS', 'Sass', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Angular', 'TailwindCSS', 'StyledComponents'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'FlutterFlow'],
  },
  {
    title: 'Back-end',
    items: ['Node.js', 'NestJS', 'Java', 'Prisma'],
  },
  {
    title: 'Banco de dados',
    items: ['MySQL', 'PostgreSQL'],
  },
  {
    title: 'Outros',
    items: ['Docker', 'GraphQL', 'Apollo', 'Figma'],
  },
];

export default function Home() {
  const { impactMix } = useTheme();
  const heroProgress = getWaveProgress(0, impactMix);
  const heroRgb = getMixedRgb(heroProgress).join(', ');
  const heroAccentColor = `rgb(${heroRgb})`;
  const projectsProgress = getWaveProgress(4, impactMix);
  const projectsRgb = getMixedRgb(projectsProgress).join(', ');
  const projectsAccentColor = `rgb(${projectsRgb})`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HeroSection
        accentColor={heroAccentColor}
        accentRgb={heroRgb}
        impactMix={heroProgress}
        sectionStyle={getSectionStyle(0, impactMix)}
      />

      <section
        id="resumo"
        className="relative border-t border-white/8 py-24"
        style={getSectionStyle(1, impactMix)}
      >
        <div className="section-backdrop absolute inset-0 opacity-60" />
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow mb-4 inline-block">Resumo</span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Perfil tecnico com foco em execucao, clareza e crescimento.
            </h2>
            <p className="text-lg text-gray-300">{professionalSummary}</p>
          </div>
        </div>
      </section>

      <section
        id="experiencia"
        className="relative border-t border-white/8 py-24"
        style={getSectionStyle(2, impactMix)}
      >
        <div className="section-backdrop absolute inset-0 opacity-70" />
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow mb-4 inline-block">Experiencia profissional</span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Historico de entregas em produto, operacao e lideranca.
            </h2>
            <p className="text-lg text-gray-300">
              Atuacao em sistemas internos, produtos SaaS, interfaces mobile e organizacao de operacoes.
            </p>
          </div>

          <div className="timeline-list">
            {experiences.map((experience) => (
              <article key={`${experience.company}-${experience.period}`} className="glass timeline-card">
                <div className="timeline-top">
                  <div>
                    <span className="timeline-period">{experience.period}</span>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{experience.role}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-gray-400">
                      {experience.company}
                    </p>
                  </div>
                  <div className="timeline-stack">
                    {experience.stack.map((item) => (
                      <span key={item} className="timeline-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="timeline-points">
                  {experience.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="formacao"
        className="relative border-t border-white/8 py-24"
        style={getSectionStyle(3, impactMix)}
      >
        <div className="section-backdrop absolute inset-0 opacity-60" />
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow mb-4 inline-block">Formacao e cursos</span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Base academica e aprendizado continuo.
            </h2>
          </div>

          <div className="info-grid">
            <div className="glass info-card">
              <h3 className="info-card-title">Formacao academica</h3>
              <div className="info-list">
                {education.map((item) => (
                  <article key={`${item.institution}-${item.title}`} className="info-list-item">
                    <span className="info-overline">{item.period}</span>
                    <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.institution}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="glass info-card">
              <h3 className="info-card-title">Cursos</h3>
              <ul className="simple-list">
                {courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection
        accentColor={projectsAccentColor}
        accentRgb={projectsRgb}
        sectionStyle={getSectionStyle(4, impactMix)}
      />

      <section
        id="competencias"
        className="relative border-t border-white/8 py-24"
        style={getSectionStyle(5, impactMix)}
      >
        <div className="section-backdrop absolute inset-0 opacity-70" />
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow mb-4 inline-block">Competencias tecnicas</span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Stack orientada a interfaces modernas e sistemas escalaveis.
            </h2>
          </div>

          <div className="skill-grid">
            {skills.map((group) => (
              <article key={group.title} className="glass skill-card">
                <h3 className="skill-title">{group.title}</h3>
                <div className="skill-chip-list">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="relative flex justify-center border-t border-white/10 pb-36 pt-24"
        style={getSectionStyle(6, impactMix)}
      >
        <div className="section-backdrop absolute inset-0 opacity-70" />
        <div className="relative z-10 w-full max-w-6xl px-4">
          <div className="contact-content">
            <div className="contact-text">
              <span className="section-eyebrow mb-4 inline-block">Contato</span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Vamos transformar ideia em produto com identidade forte e execucao de verdade.
              </h2>
              <p className="text-base text-gray-300 sm:text-lg">
                Se voce busca uma interface premium, um sistema escalavel ou uma operacao digital
                melhor estruturada, podemos construir isso com clareza tecnica e boa experiencia.
              </p>
            </div>

            <div className="contact-actions">
              <a href="mailto:lucassampaio@email.com" className="hero-primary-button">
                Enviar e-mail
              </a>
              <a href="#" className="hero-secondary-button">
                LinkedIn
              </a>
              <a href="#" className="hero-secondary-button">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
