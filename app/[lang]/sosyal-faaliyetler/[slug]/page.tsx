import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import Image from 'next/image';
import Link from 'next/link';

const SOCIAL_DETAIL_QUERY = `*[_type == "socialActivity" && slug.current == $slug][0] {
  _id,
  title_tr, title_en,
  content_tr, content_en,
  "imageUrl": featuredImage.asset->url,
  gallery[] {
    "url": asset->url,
    caption
  },
  externalLinks
}`;

const SOCIAL_FALLBACK_CONTENT: Record<string, any> = {
    'mikrokredi': {
        title_tr: 'Mikrokredi',
        title_en: 'Microcredit',
        content_tr: [
            {
                _key: 'b1',
                _type: 'block',
                children: [{ _key: 'b1-1', _type: 'span', text: 'Sosyal sorumluluk projesi kapsamında sponsorluğunu yürüttüğü Türkiye Grameen Mikrokredi Programı(TGMP) için CEY YATIRIM A.Ş., Donanım (Server, Network) ve DAMLABANK Yazılım’ın geliştirilmesi konularında Mikrokredi Vakfı’na karşılıksız hizmet vererek sosyal sorumluluğunu da yerine getirmektedir.' }],
                style: 'normal'
            },
            {
                _key: 'b2',
                _type: 'block',
                children: [{ _key: 'b2-1', _type: 'span', text: 'Türkiye Grameen Mikrokredi Programı (TGMP) Türkiye’deki fakir insanların gelir elde etmeleri için küçük ölçekli krediler vererek proje yapmaları için destek sağlayan yardımcı bir programdır. Herkesin kabiliyetinin işe dönüştürülmesi, gelişmenin yanında, hiçbir şekilde sermayeye ulaşma potansiyeli olmayan dar gelirlilerin üretim hayatına katılmalarını amaç edinen mikrokredi uygulaması, bu açından çok büyük önem taşımaktadır. Bu destekle birçok ilimizde yaşayan dar gelirli vatandaşlarımız kendi iş imkanlarını yaratmaktadırlar.' }],
                style: 'normal'
            },
            {
                _key: 'b3',
                _type: 'block',
                children: [{ _key: 'b3-1', _type: 'span', text: 'Bu duyarlı amaca ortak olan Cey Yatırım A.Ş., Türkiye Grameen Mikrokredi Programı (TGMP) Mikrokredi Avrupa Konseyi tarafından Yerel Yönetimler en iyi proje ödülüne layık görülerek ülkesine ve vatandaşlarımıza karşı olan sosyal bilincini de kanıtlamış oldu.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
        externalLinks: [{ title: 'TGMP Web Sitesi', url: 'http://www.tgmp.net' }]
    },
    'antalya-07-kadin-basketbol-takimi': {
        title_tr: 'Antalya 07 Kadın Basketbol Takımı',
        title_en: 'Antalya 07 Women\'s Basketball Team',
        content_tr: [
            {
                _key: 'b1',
                _type: 'block',
                children: [{ _key: 'b1-1', _type: 'span', text: 'Cey Yatırım A.Ş., sporun birleştirici gücüne ve kadınların toplumsal hayattaki etkin rolüne olan inancıyla, Antalya 07 Kadın Basketbol Takımı\'na ana sponsorluk desteği sağlamaktadır. Genç sporcuların yetişmesi ve Türk sporunun uluslararası alanda temsil edilmesi hedeflerimiz arasında en üst sırada yer almaktadır.' }],
                style: 'normal'
            },
            {
                _key: 'b2',
                _type: 'block',
                children: [{ _key: 'b2-1', _type: 'span', text: 'Sadece bir sponsorluk değil, aynı zamanda toplumsal bir gelişim projesi olarak gördüğümüz bu iş birliği ile Antalya\'nın spor kültürüne ve kadın basketbolunun yaygınlaşmasına önemli katkılar sunuyoruz.' }],
                style: 'normal'
            }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop'
    }
};

export default async function SocialDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const sanityActivity = await client.fetch(SOCIAL_DETAIL_QUERY, { slug });

    const fallbackData = SOCIAL_FALLBACK_CONTENT[slug];

    if (!sanityActivity && !fallbackData) {
        return <div className="pt-40 text-center font-light tracking-widest opacity-30 uppercase">FAALİYET BULUNAMADI</div>;
    }

    const activity = sanityActivity || fallbackData;
    const title = lang === 'tr' ? activity.title_tr : (activity.title_en || activity.title_tr);
    const content = lang === 'tr' ? activity.content_tr : (activity.content_en || activity.content_tr);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[55vh] min-h-[450px] w-full bg-[#0a0a0b] overflow-hidden">
                {activity.imageUrl && (
                    <Image
                        src={activity.imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-50 grayscale"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
                    <div className="max-w-7xl mx-auto">
                        <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                            {lang === 'tr' ? 'SOSYAL SORUMLULUK' : 'SOCIAL RESPONSIBILITY'}
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
                        {/* Content Area */}
                        <div className="lg:w-2/3">
                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 font-light leading-relaxed">
                                {content && <RichTextRenderer content={content} />}
                            </div>

                            {activity.externalLinks && activity.externalLinks.length > 0 && (
                                <div className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap gap-12">
                                    {activity.externalLinks.map((link: any, i: number) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-dark hover:text-gold transition-all uppercase"
                                        >
                                            <span className="h-[1px] w-8 bg-slate-200 group-hover:bg-gold group-hover:w-12 transition-all"></span>
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar / More Info */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-40 border-l border-slate-100 pl-12">
                                <h4 className="text-[10px] font-black tracking-[0.3em] text-gold uppercase mb-10">
                                    {lang === 'tr' ? 'DİĞER FAALİYETLER' : 'OTHER ACTIVITIES'}
                                </h4>
                                <nav className="flex flex-col gap-10">
                                    {Object.keys(SOCIAL_FALLBACK_CONTENT).map((sKey) => {
                                        if (sKey === slug) return null;
                                        const sData = SOCIAL_FALLBACK_CONTENT[sKey];
                                        return (
                                            <Link
                                                key={sKey}
                                                href={`/${lang}/sosyal-faaliyetler/${sKey}`}
                                                className="group"
                                            >
                                                <div className="relative h-40 w-full overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-700">
                                                    <Image src={sData.imageUrl} alt={sData.title_tr} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                                <span className="text-sm text-dark font-light group-hover:text-gold transition-colors italic block">
                                                    {lang === 'tr' ? sData.title_tr : sData.title_en}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                <div className="mt-24 p-8 bg-slate-50 border border-slate-100">
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-light italic">
                                        {lang === 'tr'
                                            ? 'Cey Yatırım olarak toplumsal fayda sağlamayı amaçlayan her projenin yanında yer alıyoruz.'
                                            : 'As Cey Investment, we stand by every project aimed at providing social benefit.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
