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
                    <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-none italic uppercase">
                        {t.title}
                    </h1>
                </div>
            </div>

            <div className="py-24 px-6 bg-[#fcfcfc]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-20 max-w-3xl border-l-[3px] border-gold pl-8 italic">
                        {t.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {activities.map((activity: any) => {
                            const title = lang === 'tr' ? activity.title_tr : (activity.title_en || activity.title_tr);
                            const desc = lang === 'tr' ? activity.description_tr : (activity.description_en || activity.description_tr);

                            return (
                                <Link
                                    key={activity._id}
                                    href={`/${lang}/sosyal-faaliyetler/${activity.slug?.current || '#'}`}
                                    className="group block relative overflow-hidden bg-white border border-slate-100 p-4"
                                >
                                    <div className="relative h-[450px] w-full overflow-hidden mb-8">
                                        <Image
                                            src={activity.imageUrl}
                                            alt={title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-500"></div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-dark/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                            <h3 className="text-2xl font-light text-white mb-4 italic uppercase tracking-wider">{title}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className="h-[1px] w-8 bg-gold/50 group-hover:w-16 transition-all duration-500"></span>
                                                <span className="text-gold text-[10px] font-black tracking-[0.3em] uppercase">
                                                    {lang === 'tr' ? 'DETAYLI İNCELE' : 'VIEW DETAILS'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 pb-6 pt-2">
                                        <p className="text-slate-500 font-light leading-relaxed line-clamp-2">
                                            {desc}
                                        </p>
                                    </div>
                                    {/* Corner Decor */}
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
