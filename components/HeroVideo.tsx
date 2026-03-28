"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Magnetic from './Magnetic';

export default function HeroVideo({ lang = 'tr' }: { lang?: string }) {
  const content = {
    tr: {
      title: "GELECEĞİ",
      title2: "GÜVENLE İNŞA EDİYORUZ",
      subtitle: "Çeyrek asırlık tecrübemizle sürdürülebilir bir gelecek için premium değer yaratıyoruz.",
      button: "PROJELERİMİZİ KEŞFEDİN"
    },
    en: {
      title: "BUILDING",
      title2: "THE FUTURE WITH CONFIDENCE",
      subtitle: "Creating premium value for a sustainable future with a quarter-century of experience.",
      button: "EXPLORE OUR PROJECTS"
    }
  }[lang] || { title: "GELECEĞİ", title2: "GÜVENLE İNŞA EDİYORUZ", subtitle: "", button: "KEŞFEDİN" };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Background Video / Image (Ken Burns Effect) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-white">
         {/* Lüks Mimari / İnşaat Görseli ile Sinematik Kayma */}
         <div 
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1541888081109-1736b461fdb9?q=80&w=3000&auto=format&fit=crop")',
              animation: 'kenBurns 25s infinite alternate ease-in-out'
            }}
         />
         
         <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-50">
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
         </video>
         
         <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/20 to-white/90"></div>
         <div className="absolute inset-0 bg-white/40"></div>
         
         <style dangerouslySetInnerHTML={{ __html: `
           @keyframes kenBurns {
             0% { transform: scale(1.0); }
             100% { transform: scale(1.15); }
           }
         `}} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-20">
         <div className="overflow-hidden mb-2 md:mb-4">
           <motion.h1 
             className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight uppercase"
             initial={{ y: "100%", opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
           >
             {content.title}
           </motion.h1>
        </div>
         <div className="overflow-hidden mb-12">
           <motion.h1 
             className="text-4xl md:text-6xl font-semibold text-black leading-tight tracking-tight uppercase"
             initial={{ y: "100%", opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
           >
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfc18c] to-[#a6813d]">
               {content.title2}
             </span>
           </motion.h1>
        </div>
        
        <motion.p 
          className="text-lg md:text-2xl text-black/60 max-w-2xl font-medium mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Magnetic>
            <Link href={`/${lang}/projeler/devam-eden-projeler`}>
              <button className="relative group overflow-hidden rounded-full bg-[#dfc18c]/20 border border-[#dfc18c]/50 px-8 py-4 backdrop-blur-md transition-all hover:bg-[#dfc18c] hover:text-[#0a0a0b] hover:scale-105">
                 <span className="relative z-10 text-xs text-[#dfc18c] group-hover:text-[#0a0a0b] font-bold tracking-[0.3em] uppercase">{content.button}</span>
              </button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="text-[10px] text-black/50 tracking-[0.3em] font-bold uppercase rotate-90 mb-6">Scroll</div>
        <motion.div 
           className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#dfc18c] to-transparent"
           animate={{ y: [0, 20, 0], opacity: [0.2, 1, 0.2] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
