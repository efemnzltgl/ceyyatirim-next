import { client } from '@/sanity/lib/client';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';
import StatsSection from '@/components/StatsSection';
import SectorFocus from '@/components/SectorFocus';
import BrandWall from '@/components/BrandWall';
import ProjectShowcase from '@/components/ProjectShowcase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HERO_QUERY = `*[_type == "hero"] | order(order asc) {
  _id, 
  title_tr, title_en, 
  subtitle_tr, subtitle_en, 
  buttonText_tr, buttonText_en,
  link,
  "imageUrl": image.asset->url
}`;

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) [0...3] {
  _id, 
  title_tr, title_en,
  description_tr, description_en,
  slug,
  "imageUrl": mainImage.asset->url
}`;

const SETTINGS_QUERY = `*[_type == "settings"][0] {
  title,
  phone,
  email,
  address,
  socials,
  footerText
}`;

const COMPANIES_QUERY = `*[_type == "company"] | order(order asc) {
  _id,
  name_tr, name_en,
  "logoUrl": logo.asset->url
}`;

const SECTORS_QUERY = `*[_type == "sector"] | order(order asc) {
  title_tr, title_en,
  description_tr, description_en,
  "slug": slug.current,
  "iconUrl": icon.asset->url,
  "imageUrl": featuredImage.asset->url,
  "iconName": "Globe" // Fallback icon name
}`;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const [slides, projects, settings, companies, sectors] = await Promise.all([
    client.fetch(HERO_QUERY),
    client.fetch(PROJECTS_QUERY),
    client.fetch(SETTINGS_QUERY),
    client.fetch(COMPANIES_QUERY),
    client.fetch(SECTORS_QUERY, {}, { cache: 'no-store' })
  ]);

  const t = {
    tr: {
      aboutHeader: 'CEY YATIRIM HOLDİNG',
      aboutTitle: 'Geleceği Teknoloji ile İnşa Ediyoruz',
      aboutDesc: 'Çeyrek asırlık tecrübemizle inşaat, enerji, tarım ve finans sektörlerinde sürdürülebilir bir gelecek için değer yaratıyoruz. Yenilikçi vizyonumuz ve güçlü sermaye yapımızla Türkiye\'den dünyaya uzanan bir başarı hikayesi yazıyoruz.',
      aboutButton: 'KURUMSAL PROFİL',
      expertiseHeader: 'SEKTÖREL ODAK',
      expertiseTitle: 'Uzmanlık Alanlarımız',
      portfolioHeader: 'VİZYONER PROJELER',
      portfolioTitle: 'Öne Çıkan Çalışmalar',
      viewAll: 'TÜM PROJELERİ GÖR',
      explore: 'DETAYI İNCELE',
      factsTitle: 'Sayılarla Cey Yatirim',
      facts: [
        { label: 'Yıllık Deneyim', value: '25+' },
        { label: 'Tamamlanan Proje', value: '150+' },
        { label: 'Grup Şirketi', value: '6' },
        { label: 'Çalışan Sayısı', value: '500+' }
      ]
    },
    en: {
      aboutHeader: 'CEY INVESTMENT HOLDING',
      aboutTitle: 'Building the Future with Confidence',
      aboutDesc: 'With a quarter-century of experience, we create value for a sustainable future in construction, energy, agriculture, and finance sectors. With our innovative vision and strong capital structure, we write a success story extending from Turkey to the world.',
      aboutButton: 'CORPORATE PROFILE',
      expertiseHeader: 'SECTORAL FOCUS',
      expertiseTitle: 'Our Areas of Expertise',
      portfolioHeader: 'VISIONARY PROJECTS',
      portfolioTitle: 'Featured Works',
      viewAll: 'VIEW ALL PROJECTS',
      explore: 'VIEW DETAILS',
      factsTitle: 'Cey Investment in Numbers',
      facts: [
        { label: 'Years of Experience', value: '25+' },
        { label: 'Completed Projects', value: '150+' },
        { label: 'Group Companies', value: '6' },
        { label: 'Employees', value: '500+' }
      ]
    }
  }[lang as 'tr' | 'en'] || {
    aboutHeader: 'CEY YATIRIM HOLDİNG',
    aboutTitle: 'Geleceği Güvenle İncele',
    viewAll: 'TÜM PROJELERİ GÖR',
    explore: 'DETAYI İNCELE',
  };

  const hardcodedSectors = [
    {
      iconName: 'Building2',
      title: lang === 'tr' ? "İnşaat ve Gayrimenkul" : "Construction & Real Estate",
      desc: lang === 'tr' ? "Üniversite kampüslerinden lüks konutlara, altyapı projelerinden ticari alanlara kadar geleceği inşa ediyoruz." : "From university campuses to luxury residences, we build the future.",
      href: '/sektorler/insaat-ve-gayrimenkul',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    },
    {
      iconName: 'Zap',
      title: lang === 'tr' ? "Enerji" : "Energy",
      desc: lang === 'tr' ? "Yenilenebilir kaynaklar ve hidroelektrik santralleri ile sürdürülebilir enerji çözümleri sunuyoruz." : "We provide sustainable energy solutions with renewable sources.",
      href: '/sektorler/enerji',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e'
    },
    {
      iconName: 'Flame',
      title: lang === 'tr' ? "Petrol & Doğal Gaz" : "Oil & Natural Gas",
      desc: lang === 'tr' ? "Global enerji pazarında stratejik projelerle sektörün güvenilir çözüm ortağıyız." : "A reliable partner in the global energy market with strategic projects.",
      href: '/sektorler/petrol-dogal-gaz',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
    },
    {
      iconName: 'Network',
      title: lang === 'tr' ? "Bilişim & Telekomünikasyon" : "Informatics & Telecom",
      desc: lang === 'tr' ? "Fiber optik altyapı ve teknolojik donanımlarla Türkiye'yi geleceğin ağlarıyla donatıyoruz." : "Equipping Turkey with networks of the future through high-tech infrastructure.",
      href: '/sektorler/bilisim-telekomunikasyon',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    }
  ];

  // Map Sanity sectors to the format expected by SectorFocus
  // If no sectors found in Sanity, fall back to hardcoded data

  // Original images map by slug (or partial slug match) to preserve the design if images are missing in Sanity
  // Turkish slugs are likely: 'insaat-ve-gayrimenkul', 'enerji', 'petrol-dogal-gaz', 'bilisim-telekomunikasyon'
  const fallbackImages: Record<string, string> = {
    'insaat': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'construction': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'enerji': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    'energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    'petrol': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
    'oil': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
    'bilisim': 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'telecom': 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'informatics': 'https://images.unsplash.com/photo-1518770660439-4636190af475'
  };

  const getFallbackImage = (slug: string) => {
    if (!slug) return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab';
    const key = Object.keys(fallbackImages).find(k => slug.includes(k));
    return key ? fallbackImages[key] : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab';
  };

  const sectorListData = sectors && sectors.length > 0
    ? sectors.map((s: any) => ({
      iconName: 'Globe', // Default fallback for mapped items if needed, though we'll use iconUrl
      iconUrl: s.iconUrl,
      title: lang === 'tr' ? s.title_tr : (s.title_en || s.title_tr),
      desc: lang === 'tr' ? s.description_tr : (s.description_en || s.description_tr),
      href: `/sektorler/${s.slug}`,
      image: s.imageUrl || getFallbackImage(s.slug)
    }))
    : hardcodedSectors;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. SECTION: Hero Slider */}
      <HeroSlider slides={slides} lang={lang} />

      {/* 2. SECTION: Corporate Intro */}
      <section className="py-24 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-2/3">
            <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-8 block reveal-text">
              {t.aboutHeader}
            </span>
            <h2 className="text-5xl md:text-8xl font-light text-dark tracking-tighter leading-[1.1] mb-12 italic">
              {t.aboutTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                {t.aboutDesc}
              </p>
              <div className="flex flex-col gap-8">
                <Link href={`/${lang}/kurumsal/hakkimizda`} className="inline-flex items-center gap-6 text-dark font-black tracking-[0.3em] text-[10px] group uppercase">
                  <span className="relative">
                    {t.aboutButton}
                    <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  </span>
                  <ChevronRight size={14} className="text-gold group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: Stats Section (Interactive) */}
      <StatsSection lang={lang} facts={JSON.parse(JSON.stringify(t.facts!))} />

      {/* 4. SECTION: Sektörel Yatırımlar (Vitrine) - Forced serialization */}
      <SectorFocus
        lang={lang}
        sectorList={JSON.parse(JSON.stringify(sectorListData))}
        header={t.expertiseHeader}
        title={t.expertiseTitle}
      />

      {/* 5. SECTION: Grup Şirketleri (Marquee) */}
      <BrandWall
        companies={companies.map((c: any) => ({
          _id: c._id,
          name: lang === 'tr' ? c.name_tr : (c.name_en || c.name_tr),
          logoUrl: c.logoUrl
        }))}
        title={lang === 'tr' ? 'STRATEJİK İŞTİRAKLERİMİZ' : 'OUR STRATEGIC PARTNERS'}
      />

      {/* 6. SECTION: Global Vision Banner */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Global Networking"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark px-6"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <span className="text-gold font-bold tracking-[0.5em] text-[12px] uppercase mb-12 block">
            {lang === 'tr' ? 'KÜRESEL ETKİ' : 'GLOBAL IMPACT'}
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight italic mb-12">
            {lang === 'tr'
              ? "“Kıtalar arası kurduğumuz güçlü köprülerle, Türk sermayesini dünya pazarlarında gururla temsil ediyoruz.”"
              : "“We proudly represent Turkish capital in world markets through the strong bridges we build across continents.”"}
          </h2>
          <div className="flex items-center justify-center gap-12 text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gold"></div> MIAMI</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gold"></div> ANKARA</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gold"></div> ISTANBUL</div>
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-gold"></div> ANTALYA</div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: Öne Çıkan Projeler (Premium Showcase) */}
      <ProjectShowcase
        projects={projects.map((p: any) => ({
          _id: p._id,
          title: lang === 'tr' ? p.title_tr : (p.title_en || p.title_tr),
          desc: lang === 'tr' ? p.description_tr : (p.description_en || p.description_tr),
          slug: p.slug?.current || '#',
          imageUrl: p.imageUrl
        }))}
        lang={lang}
        header={t.portfolioHeader}
        title={t.portfolioTitle}
        viewAllText={t.viewAll}
      />

      {/* 8. SECTION: Final CTA */}
      <section className="py-40 px-6 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none grayscale select-none overflow-hidden">
          <div className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap -rotate-6 translate-y-1/2">CEY YATIRIM</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-2xl md:text-4xl font-light leading-relaxed tracking-tight italic mb-16 opacity-90">
            {lang === 'tr'
              ? "“Sürdürülebilirlik ve inovasyon temelinde, küresel ölçekte değer yaratan stratejik yatırım ortağınız.”"
              : "“Your global strategic investment partner creating value based on sustainability and innovation.”"}
          </p>
          <Link href={`/${lang}/iletisim`} className="inline-block px-16 py-6 border border-gold text-gold text-[11px] font-bold tracking-[0.4em] hover:bg-gold hover:text-dark transition-all duration-700 uppercase">
            {lang === 'tr' ? 'BİZE ULAŞIN' : 'CONTACT US'}
          </Link>
        </div>
      </section>
    </div>
  );
}