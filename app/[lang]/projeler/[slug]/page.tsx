import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const PROJECT_DETAIL_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  content_tr, content_en,
  category,
  location,
  completionDate,
  client,
  projectValue,
  "imageUrl": mainImage.asset->url,
  gallery[] {
    ...,
    "url": asset->url
  }
}`;

export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const project = await client.fetch(PROJECT_DETAIL_QUERY, { slug });

    if (!project) return <div className="pt-40 text-center">Proje Bulunamadı.</div>;

    const title = lang === 'tr' ? project.title_tr : (project.title_en || project.title_tr);
    const description = lang === 'tr' ? project.description_tr : (project.description_en || project.description_tr);
    const content = lang === 'tr' ? project.content_tr : (project.content_en || project.content_tr);

    return (
        <main className="pt-40 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <div>
                        <span className="text-[#b39359] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                            {project.category === 'completed'
                                ? (lang === 'tr' ? 'Tamamlanan Proje' : 'Completed Project')
                                : (lang === 'tr' ? 'Devam Eden Proje' : 'Ongoing Project')
                            }
                        </span>
                        <h1 className="text-4xl md:text-6xl font-light text-[#1a1c1e] mb-8 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-500 font-light leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                        {project.location && (
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#b39359] uppercase mb-2">
                                    {lang === 'tr' ? 'LOKASYON' : 'LOCATION'}
                                </h4>
                                <p className="text-slate-800 font-light">{project.location}</p>
                            </div>
                        )}
                        {project.completionDate && (
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#b39359] uppercase mb-2">
                                    {lang === 'tr' ? 'TAMAMLANMA' : 'COMPLETION'}
                                </h4>
                                <p className="text-slate-800 font-light">{project.completionDate}</p>
                            </div>
                        )}
                        {project.client && (
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#b39359] uppercase mb-2">
                                    {lang === 'tr' ? 'MÜŞTERİ' : 'CLIENT'}
                                </h4>
                                <p className="text-slate-800 font-light">{project.client}</p>
                            </div>
                        )}
                        {project.projectValue && (
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#b39359] uppercase mb-2">
                                    {lang === 'tr' ? 'PROJE DEĞERİ' : 'PROJECT VALUE'}
                                </h4>
                                <p className="text-slate-800 font-light">{project.projectValue}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Image */}
                <div className="relative h-[600px] w-full mb-24 grayscale hover:grayscale-0 transition-all duration-1000">
                    {project.imageUrl && (
                        <Image
                            src={project.imageUrl}
                            alt={title || 'Project Image'}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto mb-24">
                    {content && <RichTextRenderer content={content} />}
                </div>

                {/* Gallery Section */}
                {project.gallery && project.gallery.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-light text-[#1a1c1e] mb-12 border-b border-slate-100 pb-4">
                            {lang === 'tr' ? 'Proje Galerisi' : 'Project Gallery'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {project.gallery.map((item: any, index: number) => (
                                <div key={index} className="relative h-80 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
                                    <Image
                                        src={item.url}
                                        alt={item.caption || `${title} Gallery ${index}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                    />
                                    {item.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-xs font-light translate-y-full group-hover:translate-y-0 transition-transform">
                                            {item.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
