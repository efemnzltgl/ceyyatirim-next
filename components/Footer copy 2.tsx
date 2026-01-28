"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] === 'en' ? 'en' : 'tr';

  return (
    <footer className="bg-[#1a1c1e] text-slate-400 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* Logo ve Hakkında */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-1 mb-6">
            <span className="text-white font-light tracking-[0.3em] text-lg">CEY</span>
            <span className="text-[#b39359] font-bold text-lg">YATIRIM</span>
          </div>
          <p className="text-xs leading-[2] text-slate-500 tracking-wider font-light uppercase">
            {currentLang === 'tr' 
              ? "Güçlü sermaye yapısı ve vizyoner projelerle geleceğe değer katıyoruz." 
              : "We add value to the future with strong capital structure and visionary projects."}
          </p>
        </div>

        {/* Yatırım Alanları */}
        <div>
          <h4 className="text-[#b39359] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">
            {currentLang === 'tr' ? 'YATIRIM ALANLARI' : 'INVESTMENTS'}
          </h4>
          <ul className="text-[11px] space-y-4 tracking-widest font-medium uppercase">
            <li className="hover:text-white transition-colors cursor-pointer">
               {currentLang === 'tr' ? 'Gayrimenkul' : 'Real Estate'}
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
               {currentLang === 'tr' ? 'Tarım & Hayvancılık' : 'Agriculture'}
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
               {currentLang === 'tr' ? 'Yenilenebilir Enerji' : 'Energy'}
            </li>
          </ul>
        </div>

        {/* Hızlı Bağlantılar */}
        <div>
          <h4 className="text-[#b39359] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">
            {currentLang === 'tr' ? 'KURUMSAL' : 'CORPORATE'}
          </h4>
          <ul className="text-[11px] space-y-4 tracking-widest font-medium uppercase">
            <li>
              <Link href={`/${currentLang}/kurumsal`} className="hover:text-white transition-colors">
                {currentLang === 'tr' ? 'BİZ KİMİZ' : 'ABOUT US'}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLang}/projeler`} className="hover:text-white transition-colors">
                {currentLang === 'tr' ? 'PROJELER' : 'PROJECTS'}
              </Link>
            </li>
            <li>
              <Link href={`/${currentLang}/iletisim`} className="hover:text-white transition-colors">
                {currentLang === 'tr' ? 'İLETİŞİM' : 'CONTACT'}
              </Link>
            </li>
          </ul>
        </div>

        {/* İletişim Bilgileri */}
        <div>
          <h4 className="text-[#b39359] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">
            {currentLang === 'tr' ? 'İLETİŞİM' : 'CONTACT'}
          </h4>
          <div className="text-[11px] space-y-4 tracking-widest font-light leading-relaxed">
            <p className="text-slate-500">
              <span className="text-white block font-bold mb-1">OFFICE</span>
              İSTANBUL / TÜRKİYE
            </p>
            <p className="text-slate-500">
              <span className="text-white block font-bold mb-1">E-MAIL</span>
              INFO@CEYYATIRIM.COM
            </p>
          </div>
        </div>
      </div>

      {/* Telif Hakkı Paneli */}
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] tracking-[0.2em] uppercase font-light text-slate-600">
          © {new Date().getFullYear()} CEY YATIRIM HOLDİNG.
        </div>
        <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#b39359]">
          EXCELLENCE IN INVESTMENT
        </div>
      </div>
    </footer>
  );
}