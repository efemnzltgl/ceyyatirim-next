import Link from 'next/link';
import Image from 'next/image';

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    const t = {
        tr: {
            title: 'Projelerimiz',
            subtitle: 'GELECEĞE DEĞER KATAN YAPILAR',
            description: 'İnşaat, enerji ve teknoloji alanlarında hayata geçirdiğimiz projelerle yarınları bugünden kurguluyoruz.',
            completed: 'Tamamlanan Projeler',
            completedDesc: 'Başarıyla teslim ettiğimiz, dünya standartlarında referans projelerimiz.',
            ongoing: 'Devam Eden Projeler',
            ongoingDesc: 'Geleceği inşa etmeye devam ettiğimiz vizyoner çalışmalarımız.',
            viewAll: 'TÜMÜNÜ İNCELE'
        },
        en: {
            title: 'Our Projects',
            subtitle: 'STRUCTURES ADDING VALUE TO THE FUTURE',
            description: 'We organize tomorrows from today with projects we realize in construction, energy, and technology sectors.',
            completed: 'Completed Projects',
            completedDesc: 'Our world-class reference projects that we have successfully delivered.',
            ongoing: 'Ongoing Projects',
            ongoingDesc: 'Our visionary works where we continue to build the future.',
            viewAll: 'VIEW ALL'
        }
    }[lang as 'tr' | 'en'] || {
        title: 'Projelerimiz',
        subtitle: 'GELECEĞE DEĞER KATAN YAPILAR',
        completed: 'Tamamlanan Projeler',
        ongoing: 'Devam Eden Projeler',
    };

    return (
        <main className="bg-white min-h-screen">
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

            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Link href={`/${lang}/projeler/tamamlanan-projeler`} className="group relative h-[500px] overflow-hidden bg-white border border-black/5 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700 block">
                            <Image
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                                alt={t.completed}
                                fill
                                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white via-white/80 to-transparent">
                                <h3 className="text-2xl font-bold text-[#1a1c1e] mb-2 tracking-tight">{t.completed}</h3>
                                <p className="text-black/60 text-sm font-medium mb-8 max-w-sm leading-relaxed">
                                    {t.completedDesc}
                                </p>
                                <span className="text-gold text-[10px] font-black tracking-[0.3em] border-b border-gold/30 pb-2 inline-block">
                                    {t.viewAll}
                                </span>
                            </div>
                        </Link>

                        <Link href={`/${lang}/projeler/devam-eden-projeler`} className="group relative h-[500px] overflow-hidden bg-white border border-black/5 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700 block">
                            <Image
                                src="https://images.unsplash.com/photo-1503387762-592fe58ef45b?q=80&w=1932&auto=format&fit=crop"
                                alt={t.ongoing}
                                fill
                                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-white via-white/80 to-transparent">
                                <h3 className="text-2xl font-bold text-[#1a1c1e] mb-2 tracking-tight">{t.ongoing}</h3>
                                <p className="text-black/60 text-sm font-medium mb-8 max-w-sm leading-relaxed">
                                    {t.ongoingDesc}
                                </p>
                                <span className="text-gold text-[10px] font-black tracking-[0.3em] border-b border-gold/30 pb-2 inline-block">
                                    {t.viewAll}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
