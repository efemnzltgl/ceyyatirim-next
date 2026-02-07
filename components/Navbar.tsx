"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Phone, Mail, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] === 'en' ? 'en' : 'tr';
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(null);
    }, 150);
  };

  const getAlternatePath = (newLang: string) => {
    const pathParts = pathname.split('/');
    pathParts[1] = newLang;
    return pathParts.join('/') || `/${newLang}`;
  };

  const menuItems = {
    kurumsal: [
      { tr: 'Hakkımızda', en: 'About Us', href: '/kurumsal/hakkimizda' },
      { tr: 'Başkanın Mesajı', en: 'Message From President', href: '/kurumsal/baskanin-mesaji' },
      { tr: 'İnsan Kaynakları', en: 'Human Resources', href: '/kurumsal/insan-kaynaklari' },
    ],
    projeler: [
      { tr: 'Tamamlanan Projeler', en: 'Completed Projects', href: '/projeler/tamamlanan-projeler' },
      { tr: 'Devam Eden Projeler', en: 'Ongoing Projects', href: '/projeler/devam-eden-projeler' },
    ],
    grupSirketleri: [
      { tr: 'Ceyen', en: 'Ceyen', href: '/grup-sirketleri/ceyen' },
      { tr: 'Ceyyapı', en: 'Ceyyapi', href: '/grup-sirketleri/ceyyapi' },
      { tr: 'Ceycar', en: 'Ceycar', href: '/grup-sirketleri/ceycar' },
      { tr: 'Ceytech', en: 'Ceytech', href: '/grup-sirketleri/ceytech' },
      { tr: 'KC Elektrik', en: 'KC Electricity', href: '/grup-sirketleri/kc-elektrik' },
      { tr: 'Stone Market', en: 'Stone Market', href: '/grup-sirketleri/stone-market' },
    ],
    sektorler: [
      { tr: 'İnşaat ve Gayrimenkul', en: 'Construction and Real Estate', href: '/sektorler/insaat-ve-gayrimenkul' },
      { tr: 'Enerji', en: 'Energy', href: '/sektorler/enerji' },
      { tr: 'Petrol & Doğal Gaz', en: 'Oil & Natural Gas', href: '/sektorler/petrol-dogal-gaz' },
      { tr: 'Bilişim & Telekomünikasyon', en: 'Informatics & Telecommunications', href: '/sektorler/bilisim-telekomunikasyon' },
    ],
    sosyalFaaliyetler: [
      { tr: 'Mikrokredi', en: 'Microcredit', href: '/sosyal-faaliyetler/mikrokredi' },
      { tr: 'Antalya 07 Kadın Basketbol Takımı', en: "Antalya 07 Women's Basketball Team", href: '/sosyal-faaliyetler/antalya-07-kadin-basketbol-takimi' },
    ]
  };

  const navLinks = [
    { tr: 'ANA SAYFA', en: 'HOME', href: '/' },
    { tr: 'KURUMSAL', en: 'CORPORATE', type: 'dropdown', key: 'kurumsal' },
    { tr: 'PROJELER', en: 'PROJECTS', type: 'dropdown', key: 'projeler' },
    { tr: 'GRUP ŞİRKETLERİ', en: 'COMPANIES', type: 'dropdown', key: 'grupSirketleri' },
    { tr: 'SEKTÖRLER', en: 'SECTORS', type: 'dropdown', key: 'sektorler' },
    { tr: 'SOSYAL FAALİYETLER', en: 'SOCIAL', type: 'dropdown', key: 'sosyalFaaliyetler' },
    { tr: 'İLETİŞİM', en: 'CONTACT', href: '/iletisim' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 pointer-events-none ${scrolled ? 'bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
        <div className="pointer-events-auto">
          {/* Top Bar - Sadece scroll edilmediğinde */}
          {!scrolled && (
            <div className="hidden border-b border-white/5 md:block">
              <div className="max-w-7xl mx-auto px-6 h-10 flex justify-between items-center text-[9px] tracking-[0.3em] font-bold text-white/40 uppercase">
                <div className="flex gap-6 italic">
                  {menuItems.grupSirketleri.map((company) => (
                    <Link
                      key={company.href}
                      href={`/${currentLang}${company.href}`}
                      className="hover:text-gold transition-colors duration-300"
                    >
                      {currentLang === 'tr' ? company.tr : company.en}
                    </Link>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a href="tel:+903124433333" className="hover:text-gold transition-colors">+90 312 443 33 33</a>
                  <a href="mailto:info@ceyyatirim.com" className="hover:text-gold transition-colors">info@ceyyatirim.com</a>
                </div>
              </div>
            </div>
          )}

          <nav className="max-w-[1440px] mx-auto px-8 md:px-16 h-20 md:h-24 flex items-center justify-between">
            {/* Logo - Sola Yaslı */}
            <div className="flex-shrink-0">
              <Link href={`/${currentLang}`} className="flex items-center gap-1 group z-[1001]">
                <span className="text-white font-light tracking-[0.5em] text-2xl transition-all group-hover:tracking-[0.6em]">CEY</span>
                <span className="text-gold font-bold text-2xl uppercase tracking-tighter">YATIRIM</span>
              </Link>
            </div>

            {/* Sağ Blok: Menü + Dil + Yönetim */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Linkler */}
              <div className="flex items-center gap-6">
                {navLinks.map((link: any) => (
                  <div
                    key={link.tr}
                    className="relative h-24 flex items-center"
                    onMouseEnter={() => link.type === 'dropdown' && handleMouseEnter(link.key!)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.type === 'dropdown' ? (
                      <div className="inline-block">
                        <button className={`flex items-center gap-1 text-[10px] font-black tracking-[0.2em] uppercase transition-colors outline-none cursor-pointer ${isHovered === link.key ? 'text-gold' : 'text-white/70 hover:text-white'}`}>
                          {currentLang === 'tr' ? link.tr : link.en}
                          <ChevronDown size={10} className={`mt-0.5 transition-transform duration-300 ${isHovered === link.key ? 'rotate-180' : ''}`} />
                        </button>
                        {isHovered === link.key && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-0 z-[1002]">
                            <div className="bg-[#111111] border border-white/10 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] mt-2">
                              {menuItems[link.key as keyof typeof menuItems].map((item) => (
                                <Link
                                  key={item.href}
                                  href={`/${currentLang}${item.href}`}
                                  className="block py-4 px-8 text-[10px] text-white/50 hover:text-gold hover:bg-white/5 transition-all border-b border-white/5 last:border-0 tracking-[0.2em] font-bold uppercase"
                                  onClick={() => setIsHovered(null)}
                                >
                                  {currentLang === 'tr' ? item.tr : item.en}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={`/${currentLang}${link.href || ''}`}
                        className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${pathname === `/${currentLang}${link.href}` ? 'text-gold' : 'text-white/70 hover:text-white'}`}
                      >
                        {currentLang === 'tr' ? link.tr : link.en}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Language Switch */}
              <div className="flex items-center gap-4 text-[10px] font-black border-l border-white/10 pl-8">
                <Link href={getAlternatePath('tr')} className={currentLang === 'tr' ? 'text-gold' : 'text-white/20 hover:text-white transition-colors'}>TR</Link>
                <Link href={getAlternatePath('en')} className={currentLang === 'en' ? 'text-gold' : 'text-white/20 hover:text-white transition-colors'}>EN</Link>
              </div>

              {/* Yönetim Butonu */}
              <Link
                href="/studio"
                target="_blank"
                className="bg-gold text-black text-[10px] font-black tracking-[0.2em] px-6 py-2.5 hover:bg-white hover:text-gold transition-all duration-300 uppercase shadow-lg shadow-gold/10"
              >
                {currentLang === 'tr' ? 'YÖNETİM' : 'ADMIN'}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white/70 z-[10003] relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0a0a0b] z-[10000] lg:hidden flex flex-col pt-32 px-10 overflow-y-auto animate-in fade-in duration-300">
          <div className="flex flex-col gap-8 pb-20">
            {navLinks.map((link: any) => (
              <div key={link.tr} className="border-b border-white/5 pb-6">
                {link.type === 'dropdown' ? (
                  <div className="space-y-6">
                    <button
                      onClick={() => setIsHovered(isHovered === link.key ? null : link.key!)}
                      className="flex items-center justify-between w-full hover:text-gold transition-colors uppercase text-2xl font-light tracking-tight text-white/90"
                    >
                      {currentLang === 'tr' ? link.tr : link.en}
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isHovered === link.key ? 'rotate-180 text-gold' : ''}`} />
                    </button>
                    {isHovered === link.key && (
                      <div className="flex flex-col gap-6 pl-6 animate-in slide-in-from-top-4 duration-300">
                        {menuItems[link.key as keyof typeof menuItems].map((item) => (
                          <Link
                            key={item.href}
                            href={`/${currentLang}${item.href}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg text-white/40 hover:text-gold italic font-light"
                          >
                            {currentLang === 'tr' ? item.tr : item.en}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.isExternal ? (link.href || '#') : `/${currentLang}${link.href || ''}`}
                    {...(link.isExternal ? { target: "_blank" } : {})}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-light tracking-tight text-white/90 hover:text-gold transition-colors uppercase"
                  >
                    {currentLang === 'tr' ? link.tr : link.en}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex gap-8 text-sm font-bold tracking-[0.3em] pt-8 opacity-50 uppercase">
              <Link href={getAlternatePath('tr')} onClick={() => setIsMobileMenuOpen(false)} className={currentLang === 'tr' ? 'text-gold' : 'text-white'}>Türkçe</Link>
              <Link href={getAlternatePath('en')} onClick={() => setIsMobileMenuOpen(false)} className={currentLang === 'en' ? 'text-gold' : 'text-white'}>English</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
