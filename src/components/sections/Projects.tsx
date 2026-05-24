import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Truck,
  GitPullRequest,
  Stethoscope,
  LayoutDashboard,
  Package,
  Sparkles,
  type LucideProps,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { projects } from '../../data/projects'
import type { ProjectItem, ProjectStatus } from '../../types'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  Truck,
  GitPullRequest,
  Stethoscope,
  LayoutDashboard,
  Package,
  Sparkles,
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={project.key} project={project} index={idx} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: ProjectItem
  index: number
  t: TFunction
}

function ProjectCard({ project, index, t }: ProjectCardProps) {
  const Icon = ICONS[project.icon] || Sparkles

  const statusColors: Record<ProjectStatus, string> = {
    production: 'bg-accent-green/15 text-accent-green border-accent-green/30',
    'open-source': 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
    delivered: 'bg-accent-pink/15 text-accent-pink border-accent-pink/30',
    internal: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
    live: 'bg-accent-violet/15 text-accent-violet border-accent-violet/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative card card-hover overflow-hidden flex flex-col"
    >
      {/* Gradient header */}
      <div
        className={`relative h-40 -mx-6 -mt-6 mb-5 bg-gradient-to-br ${project.gradient} overflow-hidden rounded-t-2xl`}
      >
        <div className="absolute inset-0 bg-bg-primary/30 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-bg-primary/40 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-full border backdrop-blur-md ${
            statusColors[project.status] || statusColors.live
          }`}
        >
          {project.status}
        </span>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-noise" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
          {t(`projects.items.${project.key}.role`)}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:gradient-text transition-colors">
          {t(`projects.items.${project.key}.title`)}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 text-pretty flex-1">
          {t(`projects.items.${project.key}.description`)}
        </p>

        {/* Techs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techs.map((tech) => (
            <span key={tech} className="chip text-[10px]">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        {(project.link || project.repo) && (
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            {project.link && (
              <a
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('projects.viewProject')}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-violet transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                {t('projects.viewCode')}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
