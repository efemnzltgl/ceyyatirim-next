import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import Image from 'next/image';

const COMPANY_DETAIL_QUERY = `*[_type == "company" && slug.current == $slug][0] {
  _id,
  name_tr, name_en,
  description_tr, description_en,
  content_tr, content_en,
  website,
  "logoUrl": logo.asset->url,
  "imageUrl": featuredImage.asset->url
}`;

const COMPANY_FALLBACK_CONTENT: Record<string, any> = {
    'ceyen': {
        name_tr: 'Ceyen',
        name_en: 'Ceyen',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Cey Yatırım A.Ş. grubuna bağlı olan Ceyen, enerji, inşaat ve turizm alanlarında stratejik yatırımlar yapmaktadır. Hammaddemiz insan ve yaşam ilkesiyle, sürdürülebilir bir gelecek için dünya standartlarında projeler üretmek ana hedefimizdir.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/ceyen'
    },
    'ceyyapi': {
        name_tr: 'Ceyyapı',
        name_en: 'Ceyyapi',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Cey Yatırım A.Ş. grubuna bağlı olan Ceyyapı İnşaat ve Ticaret A.Ş. yaşam koşullarının her gün yenilendiği dünyamızda bu hıza ayak uydurarak insanlara yaşam ortamları inşa etmektedir. Uzmanlık alanları arasında yurt, alışveriş merkezi, otel inşaatı gibi üst yapı projelerinin yanı sıra telekomünikasyon alt yapı şebeke kurulumlarını da sayabiliriz. Ceyyapı genç ve güçlü kadrosu ile inşaat sektöründe sağlam adımlarla ilerlemektedir.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/ceyyapi'
    },
    'ceycar': {
        name_tr: 'Ceycar',
        name_en: 'Ceycar',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: '2007 yılından beri ticari araç kiralama sektöründe hizmet veren Ceycar, ticari araçların alımı ve kiralanması alanlarında faaliyet göstermektedir. Sektörel gelişmeleri yakından takip ederek kaliteli hizmet ilkesiyle çalışmaktadır. Yollara izimizi bırakıyoruz sloganıyla, filo yönetiminde güvenilir bir çözüm ortağı olmayı sürdürüyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/ceycar'
    },
    'ceytech': {
        name_tr: 'Ceytech',
        name_en: 'Ceytech',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: '2009 yılında kurulan CEYTECH, bilişim sektöründe Türkiye\'nin öncü firmaları arasında yer almaktadır. Uzman kadrosuyla network yapısal kablolama, aktif cihaz kurulumarı, hastane otomasyonu ve kamu yazılımları geliştirmektedir. Türkiye\'de ilk kez kazı ve kapatma işlemlerini Mini-Tranşe iş makineleri ile yaparak bilişim altyapısını hızla yaygınlaştırmaktadır.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/ceytech'
    },
    'kc-elektrik': {
        name_tr: 'KC Elektrik',
        name_en: 'KC Electricity',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: 'Türkiye’de hidroelektrik enerji santralleri konusunda uzmanlaşmış olan KC Elektrik, ucuz, temiz ve güvenilir enerji üretimine odaklanmıştır. Doğanın gücünü hizmetinize sunuyoruz ilkesiyle, yerli ve yenilenebilir kaynakları destekleyen stratejik yatırımlarımıza devam ediyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/kc-elektrik'
    },
    'stone-market': {
        name_tr: 'Stone Market',
        name_en: 'Stone Market',
        content_tr: [
            {
                _key: 'c1',
                _type: 'block',
                children: [{ _key: 'c1-1', _type: 'span', text: '1998 yılında Miami - Florida USA’da kurulan Stone Market LLC, Türkiye’deki mermer fabrikalarından temin edilen doğal taşların global pazarda sunumu konusunda uzmanlaşmıştır. Zamanın ötesinde güzelliği miras bırakıyoruz ilkesiyle, Amerika taş pazarının en güvenilir şirketlerinden biri konumundadır.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop',
        website: 'http://www.ceyyatirim.com/tr/grup-sirketleri/stone-market'
    }
};

export default async function CompanyDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const sanityCompany = await client.fetch(COMPANY_DETAIL_QUERY, { slug });

    const fallbackData = COMPANY_FALLBACK_CONTENT[slug];

    if (!sanityCompany && !fallbackData) {
        return <div className="pt-40 text-center font-light uppercase tracking-widest opacity-30">
            {lang === 'tr' ? 'Şirket Bulunamadı' : 'Company Not Found'}
        </div>;
    }

    const company = sanityCompany || fallbackData;
    const name = lang === 'tr' ? company.name_tr : (company.name_en || company.name_tr);
    const content = lang === 'tr' ? company.content_tr : (company.content_en || company.content_tr);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Header Area */}
            <div className="relative h-[60vh] min-h-[450px] w-full bg-[#0a0a0b] overflow-hidden">
                {company.imageUrl && (
                    <Image
                        src={company.imageUrl}
                        alt={name}
                        fill
                        className="object-cover opacity-50 grayscale"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {lang === 'tr' ? 'GRUP ŞİRKETİ' : 'GROUP COMPANY'}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none italic">
                            {name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Company Content */}
                        <div className="lg:w-2/3">
                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
                                {content && <RichTextRenderer content={content} />}
                            </div>
                        </div>

                        {/* Sidebar / Sidebar Info */}
                        <div className="lg:w-1/3 border-l border-slate-100 pl-12">
                            <div className="sticky top-40">
                                <div className="h-16 w-32 relative mb-12 grayscale opacity-40">
                                    {company.logoUrl && <Image src={company.logoUrl} alt={name} fill className="object-contain object-left" />}
                                </div>

                                <h4 className="text-[10px] font-black tracking-[0.3em] text-gold uppercase mb-6">
                                    {lang === 'tr' ? 'HIZLI ERİŞİM' : 'QUICK ACCESS'}
                                </h4>

                                {company.website && (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-4 text-sm font-light text-dark hover:text-gold transition-all"
                                    >
                                        <span className="h-[1px] w-8 bg-slate-200 group-hover:bg-gold transition-all"></span>
                                        {lang === 'tr' ? 'Web Sitesini Ziyaret Et' : 'Visit Website'}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
