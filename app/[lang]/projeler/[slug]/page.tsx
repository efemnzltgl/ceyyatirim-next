import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectInfo from '@/components/ProjectInfo';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

import ScrollReveal from '@/components/ScrollReveal';

const PROJECT_DETAIL_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  content_tr, content_en,
  category,
  location,
  completionDate,
  year,
  constructionArea,
  installedPower,
  investor,
  client,
  projectValue,
  "mainImage": mainImage.asset->url,
  gallery[] {
    "caption": caption,
    "url": asset->url
  }
}`;

export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const project = await client.fetch(PROJECT_DETAIL_QUERY, { slug });

    if (!project) return <div className="pt-40 text-center text-black bg-[#f8f8f8] h-screen">Proje Bulunamadı. / Project Not Found.</div>;

    const content = lang === 'tr' ? project.content_tr : (project.content_en || project.content_tr);

    // Prepare images array for the gallery component
    const images = [];
    if (project.mainImage) {
        images.push({ url: project.mainImage, caption: 'Main View' });
    }
    if (project.gallery) {
        images.push(...project.gallery);
    }

    const title = lang === 'tr' ? project.title_tr : (project.title_en || project.title_tr);
    const categoryTitle = project.category === 'completed'
        ? (lang === 'tr' ? 'Tamamlanan Projeler' : 'Completed Projects')
        : (lang === 'tr' ? 'Devam Eden Projeler' : 'Ongoing Projects');

    return (
        <main className="bg-[#f8f8f8] min-h-screen text-slate-600">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] w-full bg-[#fcfcfc] overflow-hidden flex items-end pb-20 border-b border-black/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.mainImage || "http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"}
                        alt={title}
                        fill
                        className="object-cover opacity-10 scale-105 transition-transform duration-[20s] ease-linear hover:scale-110 object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8] via-[#f8f8f8]/80 to-transparent"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                    <ScrollReveal>
                        <div className="flex flex-col gap-4">
                            <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase">
                                {categoryTitle}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-semibold text-black tracking-tight">
                                {title}
                            </h1>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Back Link */}
                    <div className="mb-16">
                        <Link
                            href={`/${lang}/projeler/${project.category === 'completed' ? 'tamamlanan-projeler' : 'devam-eden-projeler'}`}
                            className="inline-flex items-center text-black/50 hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase font-bold"
                        >
                            <ChevronLeft size={16} className="mr-2" />
                            {lang === 'tr' ? 'Listeye Dön' : 'Back to List'}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Left Column: Gallery & Detailed Content (span-8) */}
                        <div className="lg:col-span-8 space-y-24">
                            
                            <ScrollReveal>
                                <ProjectGallery images={images} title={title} />
                            </ScrollReveal>

                            {/* Extended Project Details */}
                            <ScrollReveal>
                                <div className="bg-white p-10 md:p-16 rounded-[24px] border border-black/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                                    <h3 className="text-[10px] tracking-[0.3em] font-bold text-gold mb-8 uppercase">
                                        {lang === 'tr' ? 'PROJE HAKKINDA' : 'ABOUT THE PROJECT'}
                                    </h3>
                                    <p className="text-black/70 font-medium leading-relaxed md:text-lg mb-10">
                                        {lang === 'tr' ? project.description_tr : (project.description_en || project.description_tr)}
                                    </p>
                                    
                                    {content && (
                                        <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-black prose-p:text-black/60 prose-p:font-medium prose-p:leading-relaxed prose-a:text-gold prose-img:rounded-[24px] pt-10 border-t border-black/5">
                                            <RichTextRenderer content={content} />
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Column: Info Sidebar (span-4) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32">
                                <ScrollReveal>
                                    <ProjectInfo project={project} lang={lang} />
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
