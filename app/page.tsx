'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import { useTheme } from './contexts/ThemeContext';

const ORIGIN_RGB = [59, 130, 246] as const;
const IMPACT_RGB = [249, 115, 22] as const;
const SECTION_KEYS = ['hero', 'resumo', 'experiencia', 'formacao', 'projetos', 'competencias', 'contato'] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

type PageMetrics = {
  documentHeight: number;
  viewportHeight: number;
};

type SectionAnchors = Record<SectionKey, number>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value: number) {
  const clamped = clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function getMixedRgb(progress: number) {
  return ORIGIN_RGB.map((channel, index) =>
    Math.round(channel + (IMPACT_RGB[index] - channel) * progress)
  );
}

function getSectionProgress(anchorPx: number, waveFrontPx: number, waveBandPx: number) {
  const raw = (waveFrontPx - anchorPx + waveBandPx * 0.5) / (waveBandPx * 1.15);
  return smoothstep(raw);
}

function getSectionStyle(progress: number) {
  const rgb = getMixedRgb(progress).join(', ');

  return {
    ['--section-accent-rgb' as string]: rgb,
    ['--section-accent-color' as string]: `rgb(${rgb})`,
    ['--section-surface-border' as string]: `rgba(${rgb}, ${0.12 + progress * 0.12})`,
  } as CSSProperties;
}

// const professionalSummary =
//   'Desenvolvedor Full Stack com experiência no desenvolvimento de sistemas web e mobile, com foco em arquitetura, performance e experiência do usuário. Possui perfil empreendedor e visão de negócio, aplicando essas habilidades na criação de soluções mais eficientes e alinhadas às necessidades reais.';

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
  const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    hero: null,
    resumo: null,
    experiencia: null,
    formacao: null,
    projetos: null,
    competencias: null,
    contato: null,
  });
  const [pageMetrics, setPageMetrics] = useState<PageMetrics>({
    documentHeight: 1,
    viewportHeight: 1,
  });
  const [sectionAnchors, setSectionAnchors] = useState<SectionAnchors>({
    hero: 220,
    resumo: 820,
    experiencia: 1420,
    formacao: 2060,
    projetos: 2720,
    competencias: 3420,
    contato: 4140,
  });

  const measureSections = useCallback(() => {
    const documentHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    const viewportHeight = window.innerHeight;

    setPageMetrics((current) => {
      if (
        Math.abs(current.documentHeight - documentHeight) < 2 &&
        Math.abs(current.viewportHeight - viewportHeight) < 2
      ) {
        return current;
      }

      return { documentHeight, viewportHeight };
    });

    const nextAnchors = {} as SectionAnchors;
    SECTION_KEYS.forEach((key, index) => {
      const node = sectionRefs.current[key];
      if (node) {
        nextAnchors[key] = node.offsetTop + node.offsetHeight * (key === 'hero' ? 0.28 : 0.22);
      } else {
        nextAnchors[key] = viewportHeight * (0.45 + index * 0.72);
      }
    });

    setSectionAnchors((current) => {
      const changed = SECTION_KEYS.some((key) => Math.abs(current[key] - nextAnchors[key]) > 2);
      return changed ? nextAnchors : current;
    });
  }, []);

  const measureFrameRef = useRef<number | null>(null);
  const scheduleMeasure = useCallback(() => {
    if (measureFrameRef.current !== null) {
      cancelAnimationFrame(measureFrameRef.current);
    }

    measureFrameRef.current = requestAnimationFrame(() => {
      measureFrameRef.current = null;
      measureSections();
    });
  }, [measureSections]);

  useEffect(() => {
    scheduleMeasure();
    window.addEventListener('resize', scheduleMeasure);

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(document.documentElement);

    return () => {
      if (measureFrameRef.current !== null) {
        cancelAnimationFrame(measureFrameRef.current);
        measureFrameRef.current = null;
      }
      window.removeEventListener('resize', scheduleMeasure);
      observer.disconnect();
    };
  }, [scheduleMeasure]);

  const setSectionRef = useCallback(
    (key: SectionKey) => (node: HTMLElement | null) => {
      sectionRefs.current[key] = node;
      scheduleMeasure();
    },
    [scheduleMeasure]
  );

  const waveBandPx = Math.max(pageMetrics.viewportHeight * 0.34, 380);
  const waveCorePx = Math.max(pageMetrics.viewportHeight * 0.075, 72);
  const waveOriginPx = Math.max(pageMetrics.viewportHeight * 0.22, 180);
  const waveStartPx = waveOriginPx - waveBandPx * 0.72;
  const waveFrontPx =
    waveStartPx + impactMix * Math.max(pageMetrics.documentHeight - waveStartPx + waveBandPx * 1.1, 1);
  const waveGlowOpacity = smoothstep(clamp(impactMix * 1.25, 0, 1));

  const sectionProgress = useMemo(
    () =>
      SECTION_KEYS.reduce((acc, key) => {
        acc[key] = getSectionProgress(sectionAnchors[key], waveFrontPx, waveBandPx);
        return acc;
      }, {} as Record<SectionKey, number>),
    [sectionAnchors, waveBandPx, waveFrontPx]
  );

  const heroRgb = getMixedRgb(sectionProgress.hero).join(', ');
  const heroAccentColor = `rgb(${heroRgb})`;
  const projectsRgb = getMixedRgb(sectionProgress.projetos).join(', ');
  const projectsAccentColor = `rgb(${projectsRgb})`;
  const waveStyle = {
    ['--impact-wave-front' as string]: `${waveFrontPx}px`,
    ['--impact-wave-band' as string]: `${waveBandPx}px`,
    ['--impact-wave-core' as string]: `${waveCorePx}px`,
    ['--impact-wave-opacity' as string]: `${waveGlowOpacity}`,
  } as CSSProperties;

  return (
    <main className="relative min-h-screen w-full overflow-hidden isolate">
      <div className="page-impact-tint" style={waveStyle} aria-hidden="true" />
      <div className="page-impact-wave" style={waveStyle} aria-hidden="true" />
      <HeroSection
        sectionRef={setSectionRef('hero')}
        accentColor={heroAccentColor}
        accentRgb={heroRgb}
        impactMix={sectionProgress.hero}
        sectionStyle={getSectionStyle(sectionProgress.hero)}
      />

      {/* <section
        id="resumo"
        className="relative border-t border-white/8 py-24"
        ref={setSectionRef('resumo')}
        style={getSectionStyle(sectionProgress.resumo)}
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
      </section> */}

      <section
        id="experiencia"
        className="relative border-t border-white/8 py-24"
        ref={setSectionRef('experiencia')}
        style={getSectionStyle(sectionProgress.experiencia)}
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
        ref={setSectionRef('formacao')}
        style={getSectionStyle(sectionProgress.formacao)}
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
        sectionRef={setSectionRef('projetos')}
        accentColor={projectsAccentColor}
        accentRgb={projectsRgb}
        sectionStyle={getSectionStyle(sectionProgress.projetos)}
      />

      <section
        id="competencias"
        className="relative border-t border-white/8 py-24"
        ref={setSectionRef('competencias')}
        style={getSectionStyle(sectionProgress.competencias)}
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
        ref={setSectionRef('contato')}
        style={getSectionStyle(sectionProgress.contato)}
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
