'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
    _id: string;
    title: string;
    desc: string;
    slug: string;
    imageUrl: string;
}

interface ProjectShowcaseProps {
    projects: Project[];
    lang: string;
    header: string;
    title: string;
    viewAllText: string;
}

export default function ProjectShowcase({ projects, lang, header, title, viewAllText }: ProjectShowcaseProps) {
    if (!projects || projects.length === 0) return null;

    return (
        <section className="py-40 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-2xl">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {header}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-light text-dark tracking-tighter leading-tight italic">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href={`/${lang}/projeler`}
                        className="group flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-dark hover:text-gold transition-all pb-2 border-b border-transparent hover:border-gold"
                    >
                        {viewAllText}
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="relative group/slider">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, Parallax]}
                    parallax={true}
                    speed={1200}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} !bg-gold !w-12 !h-[2px] !rounded-none !opacity-20 hover:!opacity-100 transition-all"></span>`;
                        }
                    }}
                    navigation={{
                        prevEl: '.project-prev',
                        nextEl: '.project-next',
                    }}
                    breakpoints={{
                        1024: { slidesPerView: 1.5 },
                    }}
                    className="project-swiper !pb-24"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project._id} className="overflow-hidden bg-dark group/card">
                            <Link href={`/${lang}/projeler/${project.slug}`}>
                                <div className="relative h-[500px] md:h-[700px] overflow-hidden">
                                    {/* Parallax Image Buffer */}
                                    <div
                                        className="absolute inset-0 w-full h-full"
                                        data-swiper-parallax="20%"
                                    >
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-[2s]"
                                        />
                                        <div className="absolute inset-0 bg-dark/20 group-hover/card:bg-dark/10 transition-all"></div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                                        <div className="max-w-3xl" data-swiper-parallax="-200">
                                            <h3 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight group-hover/card:text-gold transition-colors duration-500">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xl mb-8 uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-active:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700 delay-100">
                                                {project.desc}
                                            </p>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-gold tracking-[0.4em] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-300">
                                                {lang === 'tr' ? 'PROJEYİ İNCELE' : 'VIEW PROJECT'}
                                                <div className="w-12 h-[1px] bg-gold"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20">
                    <button className="project-prev w-16 h-16 rounded-full border border-white/20 bg-dark/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all -translate-x-12 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 duration-500">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-20">
                    <button className="project-next w-16 h-16 rounded-full border border-white/20 bg-dark/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all translate-x-12 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 duration-500">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <style jsx global>{`
        .project-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .project-swiper .swiper-slide {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-swiper .swiper-slide-active {
            box-shadow: 0 40px 100px rgba(0,0,0,0.1);
        }
      `}</style>
        </section>
    );
}
