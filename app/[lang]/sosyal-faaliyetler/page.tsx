import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

const SOCIAL_QUERY = `*[_type == "socialActivity"] | order(order asc) {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  slug,
  "imageUrl": featuredImage.asset->url
}`;

const FALLBACK_ACTIVITIES = [
    {
        _id: 's1',
        title_tr: 'Mikrokredi',
        title_en: 'Microcredit',
        description_tr: 'Türkiye Grameen Mikrokredi Programı (TGMP) ile dar gelirli kadınlarımızın ekonomik özgürlüklerine kavuşmalarına destek oluyoruz.',
        description_en: 'Supporting low-income women to achieve economic freedom through the Turkey Grameen Microcredit Program (TGMP).',
        slug: { current: 'mikrokredi' },
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
    },
    {
        _id: 's2',
        title_tr: 'Antalya 07 Kadın Basketbol Takımı',
        title_en: 'Antalya 07 Women\'s Basketball Team',
        description_tr: 'Sporun ve kadının toplumdaki gücünü desteklemek amacıyla Antalya 07 Kadın Basketbol Takımı\'nın ana sponsoru olmaktan gurur duyuyoruz.',
        description_en: 'We are proud to be the main sponsor of Antalya 07 Women\'s Basketball Team to support the power of sports and women in society.',
        slug: { current: 'antalya-07-kadin-basketbol-takimi' },
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop'
    }
];

export default async function SocialActivitiesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sanityActivities = await client.fetch(SOCIAL_QUERY);

    const activities = sanityActivities.length > 0 ? sanityActivities : FALLBACK_ACTIVITIES;

    const t = {
        tr: {
            title: 'Sosyal Faaliyetler',
            subtitle: 'TOPLUMA DEĞER KATAN YARINLAR',
            description: 'Cey Yatırım olarak, sadece bugünü değil geleceği de inşa ediyoruz. Sosyal sorumluluk bilincimizle toplumsal kalkınmaya destek veriyoruz.'
        },
        en: {
            title: 'Social Activities',
            subtitle: 'TOMORROW ADDING VALUE TO SOCIETY',
            description: 'As Cey Investment, we build not only today but also the future. We support social development with our sense of social responsibility.'
        }
    }[lang as 'tr' | 'en'];

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="pt-40 pb-16 w-full bg-[#f8f9fa] text-center border-b border-black/[0.03]">
                <div className="max-w-3xl mx-auto px-6">
                    <span className="text-black/40 font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">
                        {t.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight mb-6">
                        {t.title}
                    </h1>
                    <p className="text-black/50 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        {t.description}
                    </p>
                </div>
            </div>

            <div className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {activities.map((activity: any) => {
                            const title = lang === 'tr' ? activity.title_tr : (activity.title_en || activity.title_tr);
                            const desc = lang === 'tr' ? activity.description_tr : (activity.description_en || activity.description_tr);

                            return (
                                <Link
                                    key={activity._id}
                                    href={`/${lang}/sosyal-faaliyetler/${activity.slug?.current || '#'}`}
                                    className="group relative h-[500px] overflow-hidden bg-white border border-black/5 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700 block"
                                >
                                    <Image
                                        src={activity.imageUrl}
                                        alt={title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white via-white/90 to-transparent">
                                        <h3 className="text-2xl font-bold text-[#1a1c1e] mb-2 uppercase tracking-tight">{title}</h3>
                                        <p className="text-black/60 text-sm font-medium mb-8 max-w-sm leading-relaxed line-clamp-2">
                                            {desc}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="h-[1px] w-8 bg-[#1a1c1e]/20 group-hover:w-16 transition-all duration-500"></span>
                                            <span className="text-gold text-[10px] font-black tracking-[0.3em] uppercase">
                                                {lang === 'tr' ? 'DETAYLI İNCELE' : 'VIEW DETAILS'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Accent Decor */}
                                    <div className="absolute top-10 right-10 w-20 h-[1px] bg-white/50 -rotate-45 group-hover:rotate-0 transition-transform duration-700"></div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
