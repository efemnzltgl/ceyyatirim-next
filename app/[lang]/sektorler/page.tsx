import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

const SECTORS_QUERY = `*[_type == "sector"] | order(order asc) {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  slug,
  "iconUrl": icon.asset->url
}`;

const FALLBACK_SECTORS = [
    {
        _id: 's1',
        title_tr: 'İnşaat ve Gayrimenkul',
        title_en: 'Construction and Real Estate',
        description_tr: 'Üniversite kampüslerinden lüks konutlara, altyapı projelerinden ticari alanlara kadar mühendislik ve mimariyi değerle buluşturuyoruz.',
        description_en: 'We bring engineering and architecture together with value, from university campuses to luxury residences, infrastructure projects to commercial areas.',
        slug: { current: 'insaat-ve-gayrimenkul' },
        iconUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 's2',
        title_tr: 'Enerji',
        title_en: 'Energy',
        description_tr: 'Yenilenebilir enerji kaynakları ve hidroelektrik santralleri ile doğanın gücünü sürdürülebilir bir gelecek için hizmete sunuyoruz.',
        description_en: 'We put the power of nature at your service for a sustainable future with renewable energy sources and hydroelectric power plants.',
        slug: { current: 'enerji' },
        iconUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 's3',
        title_tr: 'Petrol & Doğal Gaz',
        title_en: 'Oil & Natural Gas',
        description_tr: 'Global enerji pazarında stratejik projeler ve referans çalışmalarımızla sektörün güvenilir çözüm ortağıyız.',
        description_en: 'We are a reliable solution partner in the sector with strategic projects and reference works in the global energy market.',
        slug: { current: 'petrol-dogal-gaz' },
        iconUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 's4',
        title_tr: 'Bilişim & Telekomünikasyon',
        title_en: 'Informatics & Telecommunications',
        description_tr: 'Fiber optik altyapı, network sistemleri ve teknolojik donanımlarla Türkiye\'yi geleceğin ağlarıyla donatıyoruz.',
        description_en: 'Equipping Turkey with the networks of the future through fiber optic infrastructure, network systems, and technological equipment.',
        slug: { current: 'bilisim-telekomunikasyon' },
        iconUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
    }
];

export default async function SectorsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sanitySectors = await client.fetch(SECTORS_QUERY);

    const sectors = sanitySectors.length > 0 ? sanitySectors : FALLBACK_SECTORS;

    const t = {
        tr: {
            title: 'Sektörlerimiz',
            subtitle: 'GELECEĞİ ŞEKİLLENDİREN ÇALIŞMA ALANLARIMIZ',
            description: 'Cey Yatırım olarak, uzmanlaştığımız kilit sektörlerde yüksek mühendislik gücü ve inovatif yaklaşımla yarının dünyasını inşa ediyoruz.'
        },
        en: {
            title: 'Our Sectors',
            subtitle: 'WORKING AREAS SHAPING THE FUTURE',
            description: 'As Cey Investment, we build the world of tomorrow with high engineering power and innovative approach in the key sectors we specialize in.'
        }
    }[lang as 'tr' | 'en'];

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[350px] w-full bg-[#0a0a0b] overflow-hidden flex items-center pt-20">
                <Image
                    src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                    alt={t.title}
                    fill
                    className="object-cover opacity-50 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10">
                    <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
                        {t.subtitle}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-none italic">
                        {t.title}
                    </h1>
                </div>
            </div>

            <div className="py-24 px-6 bg-[#fcfcfc]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-20 max-w-3xl border-l-[3px] border-gold pl-8 italic">
                        {t.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sectors.map((sector: any) => {
                            const title = lang === 'tr' ? sector.title_tr : (sector.title_en || sector.title_tr);
                            const desc = lang === 'tr' ? sector.description_tr : (sector.description_en || sector.description_tr);

                            return (
                                <Link
                                    key={sector._id}
                                    href={`/${lang}/sektorler/${sector.slug?.current || '#'}`}
                                    className="group relative h-[450px] overflow-hidden bg-dark border border-white/5"
                                >
                                    <Image
                                        src={sector.iconUrl}
                                        alt={title}
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-dark to-transparent">
                                        <h3 className="text-3xl font-light text-white mb-4 italic uppercase tracking-wider">{title}</h3>
                                        <p className="text-white/60 text-sm font-light mb-8 max-w-sm tracking-wide leading-relaxed line-clamp-2">
                                            {desc}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="h-[1px] w-8 bg-gold/50 group-hover:w-16 transition-all duration-500"></span>
                                            <span className="text-gold text-[10px] font-black tracking-[0.3em] uppercase">
                                                {lang === 'tr' ? 'KEŞFET' : 'EXPLORE'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Accent Decor */}
                                    <div className="absolute top-10 right-10 w-20 h-[1px] bg-gold/20 -rotate-45 group-hover:rotate-0 transition-transform duration-700"></div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
