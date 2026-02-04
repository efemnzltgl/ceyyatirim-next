import { client } from '@/sanity/lib/client';
import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROJECTS_QUERY = `*[_type == "project" && category == "completed"] | order(order asc) {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  category,
  slug,
  "imageUrl": mainImage.asset->url
}`;

const FALLBACK_PROJECTS = [
    {
        _id: 'f1',
        title_tr: 'Akdeniz Üniversitesi Ceypark',
        title_en: 'Akdeniz University Ceypark',
        description_tr: 'Öğrenci Yurtları ve Yaşam Merkezi - ANTALYA',
        description_en: 'Student Dormitories and Living Center - ANTALYA',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop',
        slug: { current: 'akdeniz-universitesi-ceypark' },
        category: 'completed'
    },
    {
        _id: 'f2',
        title_tr: 'Mustafa Kemal Üniversitesi Ceypark',
        title_en: 'MKU Ceypark',
        description_tr: 'Öğrenci Yurdu ve Yaşam Merkezi – HATAY',
        description_en: 'Student Dormitory and Living Center – HATAY',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'mku-ceypark' },
        category: 'completed'
    },
    {
        _id: 'f3',
        title_tr: 'İzmir Katip Çelebi Ünv. Yurdu',
        title_en: 'Izmir Katip Celebi Univ. Dormitory',
        description_tr: 'Çiğli Kampüsü Öğrenci Yurdu - İZMİR',
        description_en: 'Cigli Campus Student Dormitory - IZMIR',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'katip-celebi-yurdu' },
        category: 'completed'
    },
    {
        _id: 'f4',
        title_tr: 'Celal Bayar Üniversitesi Ceypark',
        title_en: 'Celal Bayar University Ceypark',
        description_tr: 'Muradiye Kampüsü Öğrenci Yurdu - MANİSA',
        description_en: 'Muradiye Campus Student Dormitory - MANISA',
        imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'cbu-ceypark' },
        category: 'completed'
    },
    {
        _id: 'f5',
        title_tr: 'TBMM Hizmet Binası',
        title_en: 'Turkish Parliament Service Building',
        description_tr: 'Kütüphane, Araştırma Merkezi ve Ziyaretçi Kabul Binası',
        description_en: 'Library, Research Center and Visitor Center',
        imageUrl: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?q=80&w=2071&auto=format&fit=crop',
        slug: { current: 'tbmm-hizmet-binasi' },
        category: 'completed'
    },
    {
        _id: 'f6',
        title_tr: 'Kayseri Fiber Optik Altyapı',
        title_en: 'Kayseri Fiber Optic Infrastructure',
        description_tr: 'Fiber Optik Kablo Erişim Şebekesi - KAYSERİ',
        description_en: 'Fiber Optic Cable Network Access - KAYSERI',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'kayseri-fiber-optik' },
        category: 'completed'
    },
    {
        _id: 'f7',
        title_tr: 'Bursa Kent Güvenlik Sistemi',
        title_en: 'Bursa City Security System',
        description_tr: 'Bursa İli KGYS Alt Yapı İşi',
        description_en: 'Bursa City Security Management System Infrastructure',
        imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2068&auto=format&fit=crop',
        slug: { current: 'bursa-kent-guvenlik' },
        category: 'completed'
    },
    {
        _id: 'f8',
        title_tr: '17 Adet Bölge Md. Network',
        title_en: '17 Regional Directorate Networks',
        description_tr: 'Network Alt Yapısı ve Aktif Cihaz Kurulumu',
        description_en: 'Network Infrastructure and Active Device Installation',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2013&auto=format&fit=crop',
        slug: { current: 'regional-network-infrastructure' },
        category: 'completed'
    },
    {
        _id: 'f9',
        title_tr: 'İçişleri Bakanlığı NVİGM',
        title_en: 'Ministry of Interior NVIGM',
        description_tr: 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü Projesi',
        description_en: 'Directorate of Population and Citizenship Affairs Project',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
        slug: { current: 'nufus-isleri-projesi' },
        category: 'completed'
    },
    {
        _id: 'f10',
        title_tr: '750 km Fiber Optik Kurulumu',
        title_en: '750 km Fiber Optic Installation',
        description_tr: 'Kayseri-Diyarbakır-Adana Arası Fiber Hattı',
        description_en: 'Fiber Line Between Kayseri-Diyarbakir-Adana',
        imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=2070&auto=format&fit=crop',
        slug: { current: '750-km-fiber-line' },
        category: 'completed'
    },
    {
        _id: 'f11',
        title_tr: 'Mavi Masa Çağrı Merkezi',
        title_en: 'Blue Desk Call Center',
        description_tr: 'Büyükşehir Belediyesi Mavi Masa Çağrı Merkezi Hizmeti',
        description_en: 'Metropolitan Municipality Blue Desk Call Center Service',
        imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop',
        slug: { current: 'mavi-masa-call-center' },
        category: 'completed'
    },
    {
        _id: 'f12',
        title_tr: '955 Kişilik Personel Alımı',
        title_en: '955 Personnel Recruitment',
        description_tr: 'Nitelikli Personel Hizmet Alımı İşi',
        description_en: 'Qualified Personnel Service Recruitment Work',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop',
        slug: { current: 'personnel-service-recruitment' },
        category: 'completed'
    },
    {
        _id: 'f13',
        title_tr: 'Gebze Kampüsü IP Kamera',
        title_en: 'Gebze Campus IP Camera',
        description_tr: 'PDKS, IP Kamera ve Plaka Okuma Sistemi Yapımı',
        description_en: 'PACS, IP Camera and Plate Reading System Construction',
        imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2068&auto=format&fit=crop',
        slug: { current: 'gebze-campus-security' },
        category: 'completed'
    }
];

export default async function CompletedProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sanityProjects = await client.fetch(PROJECTS_QUERY);

    // Use sanity data if exists, otherwise fallback
    const projects = sanityProjects.length > 0 ? sanityProjects : FALLBACK_PROJECTS;

    const t = {
        tr: {
            title: 'Tamamlanan Projeler',
            subtitle: 'BAŞARIYLA HAYATA GEÇİRİLEN DEĞERLER',
            description: 'Cey Yatırım olarak, uzmanlık alanlarımızda dünya standartlarında projeleri başarıyla tamamlamanın gururunu taşıyoruz.'
        },
        en: {
            title: 'Completed Projects',
            subtitle: 'SUCCESSFULLY REALIZED VALUES',
            description: 'As Cey Investment, we take pride in successfully completing world-class projects in our areas of expertise.'
        }
    }[lang as 'tr' | 'en'] || {
        title: 'Tamamlanan Projeler',
        subtitle: 'BAŞARIYLA HAYATA GEÇİRİLEN DEĞERLER',
        description: 'Cey Yatırım olarak, uzmanlık alanlarımızda dünya standartlarında projeleri başarıyla tamamlamanın gururunu taşıyoruz.'
    };

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-[#0a0a0b] overflow-hidden">
                <Image
                    src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                    alt="Completed Projects"
                    fill
                    className="object-cover opacity-40 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {t.subtitle}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none italic">
                            {t.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-20 max-w-2xl">
                        {t.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
                        {projects.map((project: any, index: number) => (
                            <div
                                key={project._id}
                                className="group reveal-item"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <ProjectCard project={project} lang={lang} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
