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

const FALLBACK_PROJECTS: Record<string, any> = {
    'otoreyon-sanliurfa': {
        title_tr: 'Otoreyon - ŞANLIURFA',
        title_en: 'Otoreyon - SANLIURFA',
        description_tr: 'Otomotiv ve ticaret merkezi projesi.',
        description_en: 'Automotive and trade center project.',
        mainImage: 'https://images.unsplash.com/photo-1542362567-b05503f3f7f4?q=80&w=2070&auto=format&fit=crop',
        category: 'ongoing'
    },
    'baskoy-hes': {
        title_tr: 'Başköy Regülatörü ve HES',
        title_en: 'Baskoy Regulator and HEPP',
        description_tr: 'Yenilenebilir enerji ve hidroelektrik santrali projesi.',
        description_en: 'Renewable energy and hydroelectric power plant project.',
        mainImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        category: 'ongoing'
    },
    'sirnak-elektrik-altyapi': {
        title_tr: 'Şırnak AG/OG Elektrik Tesis Yapımı',
        title_en: 'Sirnak LV/MV Electrical Facility Construction',
        description_tr: 'Şırnak 4.Grup 2021 Yılı Elektrik Altyapı İşleri.',
        description_en: 'Sirnak Group 4 2021 Electrical Infrastructure Works.',
        mainImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        category: 'ongoing'
    },
    'akdeniz-universitesi-ceypark': {
        title_tr: 'Akdeniz Üniversitesi Ceypark',
        title_en: 'Akdeniz University Ceypark',
        description_tr: 'Öğrenci Yurtları ve Yaşam Merkezi - ANTALYA',
        description_en: 'Student Dormitories and Living Center - ANTALYA',
        mainImage: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop',
        category: 'completed'
    },
    'mku-ceypark': {
        title_tr: 'Mustafa Kemal Üniversitesi Ceypark',
        title_en: 'MKU Ceypark',
        description_tr: 'Öğrenci Yurdu ve Yaşam Merkezi – HATAY',
        description_en: 'Student Dormitory and Living Center – HATAY',
        mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        category: 'completed'
    },
    'katip-celebi-yurdu': {
        title_tr: 'İzmir Katip Çelebi Ünv. Yurdu',
        title_en: 'Izmir Katip Celebi Univ. Dormitory',
        description_tr: 'Çiğli Kampüsü Öğrenci Yurdu - İZMİR',
        description_en: 'Cigli Campus Student Dormitory - IZMIR',
        mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        category: 'completed'
    },
    'cbu-ceypark': {
        title_tr: 'Celal Bayar Üniversitesi Ceypark',
        title_en: 'Celal Bayar University Ceypark',
        description_tr: 'Muradiye Kampüsü Öğrenci Yurdu - MANİSA',
        description_en: 'Muradiye Campus Student Dormitory - MANISA',
        mainImage: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        category: 'completed'
    },
    'tbmm-hizmet-binasi': {
        title_tr: 'TBMM Hizmet Binası',
        title_en: 'Turkish Parliament Service Building',
        description_tr: 'Kütüphane, Araştırma Merkezi ve Ziyaretçi Kabul Binası',
        description_en: 'Library, Research Center and Visitor Center',
        mainImage: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?q=80&w=2071&auto=format&fit=crop',
        category: 'completed'
    },
    'kayseri-fiber-optik': {
        title_tr: 'Kayseri Fiber Optik Altyapı',
        title_en: 'Kayseri Fiber Optic Infrastructure',
        description_tr: 'Fiber Optik Kablo Erişim Şebekesi - KAYSERİ',
        description_en: 'Fiber Optic Cable Network Access - KAYSERI',
        mainImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
        category: 'completed'
    },
    'bursa-kent-guvenlik': {
        title_tr: 'Bursa Kent Güvenlik Sistemi',
        title_en: 'Bursa City Security System',
        description_tr: 'Bursa İli KGYS Alt Yapı İşi',
        description_en: 'Bursa City Security Management System Infrastructure',
        mainImage: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2068&auto=format&fit=crop',
        category: 'completed'
    },
    'regional-network-infrastructure': {
        title_tr: '17 Adet Bölge Md. Network',
        title_en: '17 Regional Directorate Networks',
        description_tr: 'Network Alt Yapısı ve Aktif Cihaz Kurulumu',
        description_en: 'Network Infrastructure and Active Device Installation',
        mainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2013&auto=format&fit=crop',
        category: 'completed'
    },
    'nufus-isleri-projesi': {
        title_tr: 'İçişleri Bakanlığı NVİGM',
        title_en: 'Ministry of Interior NVIGM',
        description_tr: 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü Projesi',
        description_en: 'Directorate of Population and Citizenship Affairs Project',
        mainImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
        category: 'completed'
    },
    '750-km-fiber-line': {
        title_tr: '750 km Fiber Optik Kurulumu',
        title_en: '750 km Fiber Optic Installation',
        description_tr: 'Kayseri-Diyarbakır-Adana Arası Fiber Hattı',
        description_en: 'Fiber Line Between Kayseri-Diyarbakir-Adana',
        mainImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=2070&auto=format&fit=crop',
        category: 'completed'
    },
    'mavi-masa-call-center': {
        title_tr: 'Mavi Masa Çağrı Merkezi',
        title_en: 'Blue Desk Call Center',
        description_tr: 'Büyükşehir Belediyesi Mavi Masa Çağrı Merkezi Hizmeti',
        description_en: 'Metropolitan Municipality Blue Desk Call Center Service',
        mainImage: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop',
        category: 'completed'
    },
    'personnel-service-recruitment': {
        title_tr: '955 Kişilik Personel Alımı',
        title_en: '955 Personnel Recruitment',
        description_tr: 'Nitelikli Personel Hizmet Alımı İşi',
        description_en: 'Qualified Personnel Service Recruitment Work',
        mainImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop',
        category: 'completed'
    },
    'gebze-campus-security': {
        title_tr: 'Gebze Kampüsü IP Kamera',
        title_en: 'Gebze Campus IP Camera',
        description_tr: 'PDKS, IP Kamera ve Plaka Okuma Sistemi Yapımı',
        description_en: 'PACS, IP Camera and Plate Reading System Construction',
        mainImage: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2068&auto=format&fit=crop',
        category: 'completed'
    }
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    
    // Check if user manually appended a hyphen or made a typo
    let normalizedSlug = slug;
    if (normalizedSlug.endsWith('-')) {
        normalizedSlug = normalizedSlug.slice(0, -1);
    }

    const sanityProject = await client.fetch(PROJECT_DETAIL_QUERY, { slug: normalizedSlug });
    
    const project = sanityProject || FALLBACK_PROJECTS[normalizedSlug];

    if (!project) return <div className="pt-40 text-center text-black bg-[#f8f8f8] h-screen font-light tracking-[0.3em] uppercase opacity-30">PROJE BULUNAMADI / PROJECT NOT FOUND</div>;

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
            <div className="relative pt-48 pb-24 w-full bg-[#f8f8f8] flex items-end border-b border-black/5">
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
