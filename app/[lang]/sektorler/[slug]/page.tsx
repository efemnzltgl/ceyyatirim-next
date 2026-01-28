import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';
import Link from 'next/link';

const SECTOR_DETAIL_QUERY = `*[_type == "sector" && slug.current == $slug][0] {
  _id,
  title_tr, title_en,
  content_tr, content_en,
  "imageUrl": featuredImage.asset->url,
  "relatedProjects": relatedProjects[]-> {
    _id,
    title_tr, title_en,
    description_tr, description_en,
    slug,
    category,
    "imageUrl": mainImage.asset->url
  }
}`;

const SECTOR_FALLBACK_CONTENT: Record<string, any> = {
    'insaat-ve-gayrimenkul': {
        title_tr: 'İnşaat ve Gayrimenkul',
        title_en: 'Construction and Real Estate',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Cey Yatırım olarak inşaat ve gayrimenkul sektöründe; üniversite kampüsleri, öğrenci yurtları, otel ve yaşam merkezleri gibi vizyoner projelerle geleceğe değer katıyoruz. Mühendislik ve mimari mükemmellik ilkesiyle, sürdürülebilir yaşam alanları inşa ediyor, her projemizde modern hayatın tüm gereksinimlerini karşılıyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    },
    'enerji': {
        title_tr: 'Enerji',
        title_en: 'Energy',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Yenilenebilir enerji alanında yaptığımız yatırımlarla, doğanın gücünü insanlığın hizmetine sunuyoruz. Hidroelektrik santralleri ve sürdürülebilir enerji projelerimizle, çevreye duyarlı, güvenilir ve temiz enerji üretimi konusunda sektörde öncü adımlar atmaya devam ediyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop'
    },
    'petrol-dogal-gaz': {
        title_tr: 'Petrol & Doğal Gaz',
        title_en: 'Oil & Natural Gas',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Petrol ve doğal gaz sektöründe global standartlarda yürüttüğümüz projelerimizle, enerji arz güvenliği ve verimliliği üzerine odaklanıyoruz. Stratejik referans çalışmalarımız ve alanında uzman kadromuzla, sektörün ihtiyaçlarına yenilikçi ve güvenilir çözümler üretiyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
    },
    'bilisim-telekomunikasyon': {
        title_tr: 'Bilişim & Telekomünikasyon',
        title_en: 'Informatics & Telecommunications',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Türkiye\'yi modern bilişim ağlarıyla donatma vizyonumuzla; fiber optik altyapı kurulumlarından devasa network sistemlerine kadar teknolojinin her alanında faaliyet gösteriyoruz. Akıllı şehirler ve güvenli dijital altyapılar için en yeni teknolojileri projelerimize entegre ediyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
    }
};

export default async function SectorDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const sanitySector = await client.fetch(SECTOR_DETAIL_QUERY, { slug });

    const fallbackData = SECTOR_FALLBACK_CONTENT[slug];

    if (!sanitySector && !fallbackData) {
        return <div className="pt-40 text-center font-light tracking-widest opacity-30">SEKTÖR BULUNAMADI</div>;
    }

    const sector = sanitySector || fallbackData;
    const title = lang === 'tr' ? sector.title_tr : (sector.title_en || sector.title_tr);
    const content = lang === 'tr' ? sector.content_tr : (sector.content_en || sector.content_tr);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[450px] w-full bg-[#0a0a0b] overflow-hidden">
                {sector.imageUrl && (
                    <Image
                        src={sector.imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-50 grayscale"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {lang === 'tr' ? 'SEKTÖR ODAĞIMIZ' : 'SECTOR FOCUS'}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none italic uppercase">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Sector Content */}
                        <div className="lg:w-2/3">
                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
                                {content && <RichTextRenderer content={content} />}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-40 border-l border-slate-100 pl-12">
                                <h4 className="text-[10px] font-black tracking-[0.3em] text-gold uppercase mb-6">
                                    {lang === 'tr' ? 'DİĞER SEKTÖRLER' : 'OTHER SECTORS'}
                                </h4>
                                <nav className="flex flex-col gap-6">
                                    {Object.keys(SECTOR_FALLBACK_CONTENT).map((sKey) => {
                                        if (sKey === slug) return null;
                                        const sData = SECTOR_FALLBACK_CONTENT[sKey];
                                        return (
                                            <Link
                                                key={sKey}
                                                href={`/${lang}/sektorler/${sKey}`}
                                                className="group flex flex-col"
                                            >
                                                <span className="text-sm text-dark font-light group-hover:text-gold transition-colors italic">
                                                    {lang === 'tr' ? sData.title_tr : sData.title_en}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {sector.relatedProjects && sector.relatedProjects.length > 0 && (
                        <section className="pt-24 mt-24 border-t border-slate-100">
                            <h2 className="text-2xl font-light text-[#1a1c1e] mb-12 uppercase tracking-widest italic">
                                {lang === 'tr' ? 'BU SEKTÖRDEKİ PROJELER' : 'PROJECTS IN THIS SECTOR'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
                                {sector.relatedProjects.map((project: any) => (
                                    <ProjectCard key={project._id} project={project} lang={lang} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
