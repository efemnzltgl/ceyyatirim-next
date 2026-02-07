import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

async function getSettings() {
  const query = `*[_type == "settings"][0] {
    phone,
    email,
    address,
    socials,
    footerText
  }`;
  return await client.fetch(query);
}

export default async function Footer({ lang }: { lang: string }) {
  const settings = await getSettings();
  const currentLang = lang === 'en' ? 'en' : 'tr';

  const menu = {
    kurumsal: [
      { tr: 'Hakkımızda', en: 'About Us', href: '/kurumsal/hakkimizda' },
      { tr: 'Başkanın Mesajı', en: 'Message From President', href: '/kurumsal/baskanin-mesaji' },
      { tr: 'İnsan Kaynakları', en: 'Human Resources', href: '/kurumsal/insan-kaynaklari' },
    ],
    sektorler: [
      { tr: 'İnşaat ve Gayrimenkul', en: 'Construction and Real Estate', href: '/sektorler/insaat-ve-gayrimenkul' },
      { tr: 'Enerji', en: 'Energy', href: '/sektorler/enerji' },
      { tr: 'Petrol & Doğal Gaz', en: 'Oil & Natural Gas', href: '/sektorler/petrol-dogal-gaz' },
      { tr: 'Bilişim & Telekomünikasyon', en: 'Informatics & Telecommunications', href: '/sektorler/bilisim-telekomunikasyon' },
    ],
    projeler: [
      { tr: 'Tamamlanan Projeler', en: 'Completed Projects', href: '/projeler/tamamlanan-projeler' },
      { tr: 'Devam Eden Projeler', en: 'Ongoing Projects', href: '/projeler/devam-eden-projeler' },
    ],
    kesfet: [
      { tr: 'Grup Şirketleri', en: 'Group Companies', href: '/grup-sirketleri' },
      { tr: 'Sosyal Faaliyetler', en: 'Social Activities', href: '/sosyal-faaliyetler' },
      { tr: 'İletişim', en: 'Contact', href: '/iletisim' },
    ]
  };

  return (
    <footer className="bg-[#0a0a0b] text-slate-400 pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-16">

        {/* Column 1: Identity */}
        <div className="space-y-6">
          <div className="flex items-center gap-1">
            <span className="text-white font-light tracking-[0.4em] text-xl">CEY</span>
            <span className="text-gold font-bold text-xl uppercase tracking-tighter">YATIRIM</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500 tracking-[0.1em] font-light uppercase italic max-w-xs">
            {settings?.footerText?.[currentLang] || (currentLang === 'tr'
              ? "Güçlü sermaye yapısı ve vizyoner projelerle geleceğe değer katıyoruz."
              : "We add value to the future with strong capital structure and visionary projects.")}
          </p>
          <div className="flex gap-5 pt-2">
            {settings?.socials?.linkedin && (
              <a href={settings.socials.linkedin} target="_blank" className="text-white/20 hover:text-gold transition-colors">
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
            )}
            {settings?.socials?.instagram && (
              <a href={settings.socials.instagram} target="_blank" className="text-white/20 hover:text-gold transition-colors">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
            )}
            {settings?.socials?.facebook && (
              <a href={settings.socials.facebook} target="_blank" className="text-white/20 hover:text-gold transition-colors">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        {/* Column 2: Quick Links (Grouped) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-white text-[9px] font-black tracking-[0.3em] uppercase opacity-40">
              {currentLang === 'tr' ? 'KURUMSAL' : 'CORPORATE'}
            </h4>
            <ul className="text-[9px] space-y-3 tracking-[0.2em] font-bold uppercase">
              {menu.kurumsal.map((item: any) => (
                <li key={item.href}>
                  <Link href={`/${currentLang}${item.href}`} className="hover:text-gold transition-colors">
                    {currentLang === 'tr' ? item.tr : item.en}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${currentLang}/grup-sirketleri`} className="hover:text-gold transition-colors">
                  {currentLang === 'tr' ? 'GRUP ŞİRKETLERİ' : 'GROUP COMPANIES'}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white text-[9px] font-black tracking-[0.3em] uppercase opacity-40">
              {currentLang === 'tr' ? 'FAALİYETLER' : 'ACTIVITIES'}
            </h4>
            <ul className="text-[9px] space-y-3 tracking-[0.2em] font-bold uppercase">
              {menu.sektorler.slice(0, 2).map((item: any) => (
                <li key={item.href}>
                  <Link href={`/${currentLang}${item.href}`} className="hover:text-gold transition-colors">
                    {currentLang === 'tr' ? item.tr : item.en}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${currentLang}/projeler`} className="hover:text-gold transition-colors">
                  {currentLang === 'tr' ? 'TÜM PROJELER' : 'ALL PROJECTS'}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/sosyal-faaliyetler`} className="hover:text-gold transition-colors">
                  {currentLang === 'tr' ? 'SOSYAL' : 'SOCIAL'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-6">
          <h4 className="text-white text-[9px] font-black tracking-[0.3em] uppercase opacity-40">
            {currentLang === 'tr' ? 'İLETİŞİM' : 'CONTACT'}
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-[9px] tracking-[0.1em] font-light leading-relaxed uppercase text-slate-500">
                {settings?.address?.[currentLang] || "Ankara / TÜRKİYE"}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={14} className="text-gold flex-shrink-0" />
              <a href={`mailto:${settings?.email || 'info@ceyyatirim.com'}`} className="text-[9px] tracking-[0.2em] font-bold hover:text-white transition-colors">
                {settings?.email || 'INFO@CEYYATIRIM.COM'}
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={14} className="text-gold flex-shrink-0" />
              <a href={`tel:${settings?.phone?.replace(/\s+/g, '')}`} className="text-[9px] tracking-[0.2em] font-bold hover:text-white transition-colors">
                {settings?.phone || '+90 312 443 33 33'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[8px] tracking-[0.3em] uppercase font-light text-slate-600">
          © {new Date().getFullYear()} CEY YATIRIM HOLDİNG. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          {/* Yeni Slogan ve Grup Vurgusu */}
          <span className="text-[8px] tracking-[0.4em] uppercase font-black text-gold italic">
            {currentLang === 'tr' ? 'GELECEĞİN YATIRIM VİZYONU' : 'INVESTMENT VISION OF THE FUTURE'}
          </span>

          <div className="h-[1px] w-8 bg-gold/30"></div>

          <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-slate-500">
            {currentLang === 'tr' ? 'BİR CEYLAN GRUP A.Ş. KURULUŞUDUR' : 'A CEYLAN GROUP INC. COMPANY'}
          </span>
        </div>
      </div>
    </footer>
  );
}
