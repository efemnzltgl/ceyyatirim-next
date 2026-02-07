import { client } from '@/sanity/lib/client';
import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROJECTS_QUERY = `*[_type == "project" && category == "ongoing"] | order(order asc) {
  _id,
  title_tr, title_en,
  description_tr, description_en,
  category,
  slug,
  "imageUrl": mainImage.asset->url
}`;

const FALLBACK_PROJECTS = [
    {
        _id: 'o1',
        title_tr: 'Otoreyon - ŞANLIURFA',
        title_en: 'Otoreyon - SANLIURFA',
        description_tr: 'Otomotiv ve ticaret merkezi projesi.',
        description_en: 'Automotive and trade center project.',
        imageUrl: 'https://images.unsplash.com/photo-1542362567-b05503f3f7f4?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'otoreyon-sanliurfa' },
        category: 'ongoing'
    },
    {
        _id: 'o2',
        title_tr: 'Başköy Regülatörü ve HES',
        title_en: 'Baskoy Regulator and HEPP',
        description_tr: 'Yenilenebilir enerji ve hidroelektrik santrali projesi.',
        description_en: 'Renewable energy and hydroelectric power plant project.',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'baskoy-hes' },
        category: 'ongoing'
    },
    {
        _id: 'o3',
        title_tr: 'Şırnak AG/OG Elektrik Tesis Yapımı',
        title_en: 'Sirnak LV/MV Electrical Facility Construction',
        description_tr: 'Şırnak 4.Grup 2021 Yılı Elektrik Altyapı İşleri.',
        description_en: 'Sirnak Group 4 2021 Electrical Infrastructure Works.',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
        slug: { current: 'sirnak-elektrik-altyapi' },
        category: 'ongoing'
    }
];

const SETTINGS_QUERY = `*[_type == "settings"][0] {
    ongoingProjectsText
}`;

export default async function OngoingProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const [sanityProjects, settings] = await Promise.all([
        client.fetch(PROJECTS_QUERY),
        client.fetch(SETTINGS_QUERY)
    ]);

    // Use sanity data if exists, otherwise fallback
    const projects = sanityProjects.length > 0 ? sanityProjects : FALLBACK_PROJECTS;

    const t = {
        tr: {
            title: settings?.ongoingProjectsText?.title_tr || 'Devam Eden Projeler',
            subtitle: settings?.ongoingProjectsText?.subtitle_tr || 'GELECEĞİ BUGÜNDEN İNŞA EDİYORUZ',
            description: settings?.ongoingProjectsText?.description_tr || 'Portföyümüzdeki yeni nesil projelerle şehirlerin ve insanların hayatına değer katmaya devam ediyoruz.'
        },
        en: {
            title: settings?.ongoingProjectsText?.title_en || 'Ongoing Projects',
            subtitle: settings?.ongoingProjectsText?.subtitle_en || 'BUILDING THE FUTURE TODAY',
            description: settings?.ongoingProjectsText?.description_en || 'We continue to add value to cities and people\'s lives with next-generation projects in our portfolio.'
        }
    }[lang as 'tr' | 'en'] || {
        title: settings?.ongoingProjectsText?.title_tr || 'Devam Eden Projeler',
        subtitle: settings?.ongoingProjectsText?.subtitle_tr || 'GELECEĞİ BUGÜNDEN İNŞA EDİYORUZ',
        description: settings?.ongoingProjectsText?.description_tr || 'Portföyümüzdeki yeni nesil projelerle şehirlerin ve insanların hayatına değer katmaya devam ediyoruz.'
    };

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-[#0a0a0b] overflow-hidden">
                <Image
                    src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                    alt="Ongoing Projects"
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
