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
        <section className="py-40 relative overflow-hidden bg-[#0a0a0b]">
            {/* Ambient Background (Ken Burns) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0b]">
                <div 
                  className="w-full h-full bg-cover bg-center opacity-10"
                  style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop")',
                    animation: 'kenBurnsProject 30s infinite alternate ease-in-out'
                  }}
                />
                 
                <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-30">
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-[#0a0a0b]"></div>
                
                <style jsx>{`
                  @keyframes kenBurnsProject {
                    0% { transform: scale(1.0) translate(0, 0); }
                    100% { transform: scale(1.15) translate(-1%, -1%); }
                  }
                `}</style>
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-2xl">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {header}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-tight italic drop-shadow-lg">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href={`/${lang}/projeler`}
                        className="group flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-white hover:text-gold transition-all pb-2 border-b border-transparent hover:border-gold"
                    >
                        {viewAllText}
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="relative group/slider z-10">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination, Parallax]}
                    parallax={true}
                    speed={1200}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={false}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} project-bullet"></span>`;
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
                        <SwiperSlide key={project._id} className="overflow-hidden bg-dark project-slide rounded-xl">
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
                                            className="w-full h-full object-cover project-img"
                                        />
                                        <div className="absolute inset-0 project-overlay"></div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                                        <div className="max-w-3xl project-text-reveal" data-swiper-parallax="-200">
                                            <h3 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight drop-shadow-lg">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed max-w-xl mb-8 uppercase tracking-[0.2em]">
                                                {project.desc}
                                            </p>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-gold tracking-[0.4em]">
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
                    <button className="project-prev w-16 h-16 rounded-full border border-white/20 bg-[#0a0a0b]/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all -translate-x-12 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 duration-500">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-20">
                    <button className="project-next w-16 h-16 rounded-full border border-white/20 bg-[#0a0a0b]/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all translate-x-12 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 duration-500">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .project-swiper .swiper-pagination {
                  bottom: -10px !important;
                }
                
                /* Bullet Customization */
                .project-bullet {
                  display: inline-block;
                  background: #dfc18c !important;
                  height: 2px !important;
                  width: 24px !important;
                  border-radius: 0 !important;
                  opacity: 0.2 !important;
                  margin: 0 8px !important;
                  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
                  cursor: pointer;
                }
                
                .project-bullet:hover {
                  opacity: 0.7 !important;
                }
                
                .project-bullet.swiper-pagination-bullet-active {
                  opacity: 1 !important;
                  width: 64px !important;
                  box-shadow: 0 0 15px rgba(223, 193, 140, 0.9) !important;
                }
                
                /* Temel Slide Görünümü - Soluk/Uzak */
                .project-swiper .swiper-slide {
                  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s;
                  opacity: 0.3;
                  transform: scale(0.9);
                }
                
                .project-swiper .project-img {
                  filter: grayscale(100%) brightness(0.4);
                  transform: scale(1);
                  transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .project-swiper .project-overlay {
                  background: rgba(10, 10, 11, 0.8);
                  transition: all 1.5s;
                }
                
                .project-swiper .project-text-reveal {
                  opacity: 0;
                  transform: translateY(40px);
                  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                /* Aktif Slide - Tam Aydınlık, Açılmış */
                .project-swiper .swiper-slide-active {
                  opacity: 1;
                  transform: scale(1.05);
                  z-index: 10;
                  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
                }
                
                .project-swiper .swiper-slide-active .project-img {
                  filter: grayscale(0%) brightness(1);
                  transform: scale(1.1);
                }
                
                .project-swiper .swiper-slide-active .project-overlay {
                  background: rgba(10, 10, 11, 0.1);
                }
                
                .project-swiper .swiper-slide-active .project-text-reveal {
                  opacity: 1;
                  transform: translateY(0);
                  transition-delay: 0.3s;
                }
            `}} />
        </section>
    );
}
