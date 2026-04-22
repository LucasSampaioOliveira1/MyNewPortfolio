'use client';

import React, { CSSProperties, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => <div className="hero-globe-loading" />,
});

interface HeroSectionProps {
  accentColor?: string;
  accentRgb?: string;
  impactMix?: number;
  sectionStyle?: CSSProperties;
  sectionRef?: React.Ref<HTMLElement>;
}

export default function HeroSection({
  accentColor: accentColorProp,
  accentRgb: accentRgbProp,
  impactMix,
  sectionStyle,
  sectionRef,
}: HeroSectionProps) {
  const { accentColor: themeAccentColor, accentRgb: themeAccentRgb } = useTheme();
  const accentColor = accentColorProp ?? themeAccentColor;
  const accentRgb = accentRgbProp ?? themeAccentRgb;
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: (i * 19.4 + 8) % 100,
        top: (i * 23.8 + 12) % 100,
        duration: 4.2 + ((i * 0.31) % 1.6),
        delay: (i * 0.22) % 2,
        size: 3 + ((i * 1.4) % 4),
      })),
    []
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
        duration: 0.68,
        ease: [0.16, 1, 0.3, 1],
      },
    },
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
        damping: 14,
        mass: 0.8,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="inicio"
      className="relative isolate min-h-screen overflow-hidden"
      style={sectionStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-backdrop absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="hero-aurora absolute inset-0" />

      <div className="hero-content">
        <div className="hero-left relative z-10">
          <motion.div className="hero-text-block" variants={itemVariants}>
            <motion.p className="hero-kicker" variants={itemVariants}>
              Lucas Sampaio
            </motion.p>

            <motion.h1
              className="hero-title"
              whileHover={{ scale: 1.006 }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
              variants={itemVariants}
            >
              Desenvolvedor
              <span className="gradient-text hero-title-line">Fullstack</span>
              Engenheiro de Software
            </motion.h1>

            {/* <motion.p className="hero-copy" variants={itemVariants}>
              Desenvolvedor Full Stack cursando Engenharia de Software, com experiencia em
              produtos web e mobile usando React, Angular, Next.js, React Native, FlutterFlow,
              Node.js, NestJS, Prisma, MySQL e PostgreSQL.
            </motion.p> */}

            <motion.div
              className="hero-actions"
              variants={itemVariants}
            >
              <motion.a
                href="#projetos"
                className="hero-primary-button"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 20px 60px rgba(${accentRgb}, 0.28)`,
                }}
                whileHover={{ scale: 1.015, y: -1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver projetos
              </motion.a>

              <motion.a
                href="#contato"
                className="hero-secondary-button"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
                whileHover={{ scale: 1.015, y: -1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                whileTap={{ scale: 0.98 }}
              >
                Falar comigo
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-right relative z-10">
          <motion.div
            className="hero-visual-block"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-globe-frame">
              <div className="hero-globe-slot">
                <GlobeScene impactMix={impactMix} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hero-particles" aria-hidden="true">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="hero-particle absolute rounded-full"
            style={{
              backgroundColor: accentColor,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              boxShadow: `0 0 16px ${accentColor}`,
            }}
            animate={{
              y: [0, -48, 0],
              opacity: [0.06, 0.45, 0.06],
              scale: [0.96, 1.06, 0.96],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}
