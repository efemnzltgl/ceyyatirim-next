import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
    project: {
        _id: string
        slug: { current: string }
        title_tr?: string
        title_en?: string
        title?: string
        description_tr?: string
        description_en?: string
        description?: string
        imageUrl?: string
        category?: 'completed' | 'ongoing'
    }
    lang: string
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
    const title = lang === 'tr'
        ? (project.title_tr || project.title)
        : (project.title_en || project.title_tr || project.title)

    const description = lang === 'tr'
        ? (project.description_tr || project.description)
        : (project.description_en || project.description_tr || project.description)

    return (
        <Link
            href={`/${lang}/projeler/${project.slug?.current || '#'}`}
            className="group cursor-pointer block"
        >
            <div className="relative h-[500px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                {project.imageUrl ? (
                    <Image
                        src={project.imageUrl}
                        alt={title || 'Project'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#b39359] font-light italic">
                        Görsel Bekleniyor
                    </div>
                )}
                <div className="absolute inset-0 bg-[#1a1c1e]/20 group-hover:bg-transparent transition-all duration-500"></div>
            </div>
            <div className="mt-8 space-y-4">
                <h3 className="text-xl font-medium text-[#1a1c1e] tracking-tight group-hover:text-[#b39359] transition-colors">
                    {title}
                </h3>
                <p className="text-slate-400 line-clamp-2 text-sm font-light leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#b39359] pt-2">
                    {lang === 'tr' ? 'İNCELE' : 'EXPLORE'}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}
