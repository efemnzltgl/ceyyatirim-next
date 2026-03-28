'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
    _id: string;
    title: string;
    desc: string;
    slug: string;
    imageUrl: string;
    category?: string;
}

interface ProjectShowcaseProps {
    projects: Project[];
    lang: string;
    header: string;
    title: string;
    viewAllText: string;
}

export default function ProjectShowcase({ projects, lang, header, title, viewAllText }: ProjectShowcaseProps) {
    const [filter, setFilter] = useState('all');

    if (!projects || projects.length === 0) return null;

    // Filter projects visually if category exists, else show all
    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        return project.category === filter;
    });

    // Ana sayfa için başlıklar (görsel isteğe göre)
    const displayTitle = lang === 'tr' ? 'Hayata geçirdiğimiz projeler' : 'Distinguished projects we realized';
    const displayHeader = lang === 'tr' ? 'PROJELER' : 'PROJECTS';

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header & Title - Centered */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-black/40 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
                        {displayHeader}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight leading-tight max-w-2xl mb-12">
                        {displayTitle}
                    </h2>
                    
                    {/* Filters (Pills) */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                        <button 
                            onClick={() => setFilter('all')}
                            className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${filter === 'all' ? 'bg-[#1a1c1e] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-black'}`}
                        >
                            {lang === 'tr' ? 'Tümü' : 'All'}
                        </button>
                        <button 
                            onClick={() => setFilter('completed')}
                            className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${filter === 'completed' ? 'bg-[#1a1c1e] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-black'}`}
                        >
                            {lang === 'tr' ? 'Tamamlanan' : 'Completed'}
                        </button>
                        <button 
                            onClick={() => setFilter('ongoing')}
                            className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${filter === 'ongoing' ? 'bg-[#1a1c1e] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-black'}`}
                        >
                            {lang === 'tr' ? 'Devam Eden' : 'Ongoing'}
                        </button>
                    </div>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project) => (
                        <Link key={project._id} href={`/${lang}/projeler/${project.slug}`} className="group block">
                            <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 pb-4 md:pb-6 relative border border-black/[0.03] group-hover:-translate-y-2">
                                {/* Image Area */}
                                <div className="relative h-[250px] sm:h-[350px] w-full overflow-hidden rounded-t-[24px]">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                                    />
                                </div>
                                {/* Content Area */}
                                <div className="pt-6 px-1 lg:px-2">
                                    <h3 className="text-xl font-bold text-[#1a1c1e] mb-4 tracking-tight group-hover:opacity-80 transition-opacity">
                                        {project.title}
                                    </h3>
                                    <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] rounded-md uppercase tracking-wider font-medium">
                                        {project.category === 'ongoing' ? (lang === 'tr' ? 'Devam Eden' : 'Ongoing') : (lang === 'tr' ? 'Tamamlanan' : 'Completed')}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Buton - Tümünü Gör */}
                {projects.length > 0 && (
                    <div className="mt-20 text-center">
                        <Link
                            href={`/${lang}/projeler`}
                            className="inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-black hover:text-gold transition-all pb-2 border-b border-black/30 hover:border-gold uppercase"
                        >
                            {viewAllText}
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
