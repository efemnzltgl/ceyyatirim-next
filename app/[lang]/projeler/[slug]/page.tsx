import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectInfo from '@/components/ProjectInfo';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

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

    if (!project) return <div className="pt-40 text-center">Proje Bulunamadı. / Project Not Found.</div>;

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
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[300px] w-full bg-[#0a0a0b] overflow-hidden flex items-end pb-12">
                <Image
                    src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                    alt={title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-[#b39359] font-bold tracking-[0.2em] text-xs uppercase">
                            {categoryTitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="py-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Back Link */}
                    <div className="mb-12">
                        <Link
                            href={`/${lang}/projeler/${project.category === 'completed' ? 'tamamlanan-projeler' : 'devam-eden-projeler'}`}
                            className="inline-flex items-center text-slate-500 hover:text-[#b39359] transition-colors text-sm font-medium"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            {lang === 'tr' ? 'Listeye Dön' : 'Back to List'}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Gallery & Detailed Content (span-8) */}
                        <div className="lg:col-span-8 space-y-16">

                            <ProjectGallery images={images} title={title} />

                            {/* Detailed Content */}
                            {content && (
                                <div className="prose prose-slate max-w-none prose-headings:font-light prose-headings:text-[#1a1c1e] prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#b39359] prose-img:rounded-sm">
                                    <RichTextRenderer content={content} />
                                </div>
                            )}
                        </div>

                        {/* Right Column: Info Sidebar (span-4) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32">
                                <ProjectInfo project={project} lang={lang} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
