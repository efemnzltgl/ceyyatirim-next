import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

const COMPANIES_QUERY = `*[_type == "company"] | order(order asc) {
  _id,
  name_tr, name_en,
  description_tr, description_en,
  slug,
  "logoUrl": logo.asset->url,
  "imageUrl": featuredImage.asset->url
}`;

const FALLBACK_COMPANIES = [
    {
        _id: 'c1',
        name_tr: 'Ceyen',
        name_en: 'Ceyen',
        description_tr: 'Enerji, inşaat ve turizm sektörlerinde vizyoner projelerle geleceğe değer katan Ceyen, grubun amiral gemilerindendir.',
        description_en: 'One of the flagship companies of the group, Ceyen adds value to the future with visionary projects in energy, construction, and tourism sectors.',
        slug: { current: 'ceyen' },
        logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop' // Placeholder logo placeholder
    },
    {
        _id: 'c2',
        name_tr: 'Ceyyapı',
        name_en: 'Ceyyapi',
        description_tr: 'Üst yapı ve alt yapı projelerinde uzmanlaşmış, yurt ve yaşam merkezi inşaatlarında öncü kuruluş.',
        description_en: 'Specialized in superstructure and infrastructure projects, a leading company in the construction of dormitories and living centers.',
        slug: { current: 'ceyyapi' },
        logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 'c3',
        name_tr: 'Ceycar',
        name_en: 'Ceycar',
        description_tr: 'Ticari araç kiralama ve filo yönetimi alanında güvenilir ve kaliteli hizmet anlayışı.',
        description_en: 'Reliable and high-quality service approach in the field of commercial vehicle rental and fleet management.',
        slug: { current: 'ceycar' },
        logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 'c4',
        name_tr: 'Ceytech',
        name_en: 'Ceytech',
        description_tr: 'Bilişim, telekomünikasyon ve teknoloji altyapı çözümleriyle Türkiye\'yi dijital ağlarla donatıyoruz.',
        description_en: 'Equipping Turkey with digital networks through informatics, telecommunications, and technology infrastructure solutions.',
        slug: { current: 'ceytech' },
        logoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 'c5',
        name_tr: 'KC Elektrik',
        name_en: 'KC Electricity',
        description_tr: 'Yenilenebilir enerji ve hidroelektrik santralleri ile doğanın gücünü hizmetinize sunuyoruz.',
        description_en: 'Putting the power of nature at your service with renewable energy and hydroelectric power plants.',
        slug: { current: 'kc-elektrik' },
        logoUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: 'c6',
        name_tr: 'Stone Market',
        name_en: 'Stone Market',
        description_tr: 'Miami merkezli global operasyonlarla doğal taş ve mermer sektöründe zamanın ötesinde estetik.',
        description_en: 'Timeless aesthetics in the natural stone and marble sector with Miami-based global operations.',
        slug: { current: 'stone-market' },
        logoUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop'
    }
];

export default async function CompaniesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sanityCompanies = await client.fetch(COMPANIES_QUERY);

    // Merge sanity and fallbacks if some are missing, but prioritized sanity
    const companies = sanityCompanies.length > 0 ? sanityCompanies : FALLBACK_COMPANIES;

    const t = {
        tr: {
            title: 'Grup Şirketleri',
            subtitle: 'GÜÇLÜ VE ÇEŞİTLİ YATIRIM AĞI',
            description: 'Cey Yatırım çatısı altında faaliyet gösteren şirketlerimizle; inşaattan enerjiye, teknolojiden bilişime kadar geniş bir yelpazede geleceği inşa ediyoruz.'
        },
        en: {
            title: 'Group Companies',
            subtitle: 'STRONG AND DIVERSE INVESTMENT NETWORK',
            description: 'With our companies operating under the umbrella of Cey Investment, we are building the future in a wide range of sectors from construction to energy, from technology to informatics.'
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-100/10">
                        {companies.map((company: any) => {
                            const name = lang === 'tr' ? company.name_tr : (company.name_en || company.name_tr);
                            const desc = lang === 'tr' ? company.description_tr : (company.description_en || company.description_tr);

                            return (
                                <Link
                                    key={company._id}
                                    href={`/${lang}/grup-sirketleri/${company.slug?.current || '#'}`}
                                    className="p-16 border border-slate-100 bg-white hover:bg-[#0a0a0b] group transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    {/* Subtle index number or decor */}
                                    <div className="absolute top-8 right-8 text-gold/10 font-bold text-4xl group-hover:text-gold/20 transition-all italic">/0{companies.indexOf(company) + 1}</div>

                                    <div className="h-28 w-full relative mb-12 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000">
                                        {company.logoUrl && (
                                            <Image
                                                src={company.logoUrl}
                                                alt={name}
                                                fill
                                                className="object-contain"
                                            />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-light mb-6 text-[#1a1c1e] group-hover:text-white uppercase tracking-wider transition-colors italic">
                                        {name}
                                    </h3>

                                    <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed text-sm font-light transition-colors line-clamp-3">
                                        {desc}
                                    </p>

                                    <div className="mt-12 flex items-center gap-3 overflow-hidden">
                                        <span className="h-[1px] w-0 group-hover:w-10 bg-gold transition-all duration-500"></span>
                                        <span className="text-gold text-[10px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            {lang === 'tr' ? 'DETAYLI BİLGİ' : 'DETAILED INFO'}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
