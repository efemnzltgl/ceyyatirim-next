"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSlider({ slides, lang = 'tr' }: { slides: any[], lang?: string }) {
  return (
    <section className="h-screen w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-[#b39359] !w-8 !h-[2px] !rounded-none !opacity-30 hover:!opacity-100 transition-all"></span>`;
          }
        }}
        navigation={false}
        className="h-full w-full hero-swiper"
      >
        {slides?.length === 0 && (
          <SwiperSlide>
            <div className="h-full w-full bg-[#1a1c1e] flex items-center justify-center text-white/20 italic font-light tracking-widest text-sm uppercase">
              {lang === 'tr' ? 'Henüz Slayt Eklenmemiş' : 'No Slides Added Yet'}
            </div>
          </SwiperSlide>
        )}
        {slides?.map((slide) => {
          const title = lang === 'tr' ? slide.title_tr : (slide.title_en || slide.title_tr);
          const subtitle = lang === 'tr' ? slide.subtitle_tr : (slide.subtitle_en || slide.subtitle_tr);
          const buttonText = lang === 'tr' ? slide.buttonText_tr : (slide.buttonText_en || slide.buttonText_tr);
          const link = slide.link || '#';

          return (
            <SwiperSlide key={slide._id}>
              <div className="relative w-full h-full overflow-hidden">
                {/* Arka Plan Görseli */}
                <div className="absolute inset-0">
                  <img
                    src={slide.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-[10s] scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1a1c1e]/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1e]/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
                  <div className="max-w-3xl">
                    {/* Üst Küçük Başlık */}
                    <span className="text-[#b39359] font-black tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-2 border-[#b39359] pl-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                      {lang === 'tr' ? 'HOŞ GELDİNİZ' : 'WELCOME'}
                    </span>

                    {/* Ana Başlık */}
                    <h1 className="text-4xl md:text-8xl font-light text-white leading-[1.1] tracking-tight italic mb-8 animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
                      {title}
                    </h1>

                    {/* Alt Başlık */}
                    <p className="text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed mb-12 animate-in fade-in slide-in-from-left-16 duration-1000 delay-400">
                      {subtitle}
                    </p>

                    {/* Buton */}
                    {buttonText && (
                      <div className="animate-in fade-in slide-in-from-left-20 duration-1000 delay-500">
                        <Link href={`/${lang}${link.startsWith('/') ? link : `/${link}`}`}>
                          <button className="group relative px-12 py-5 bg-[#b39359] text-white text-[11px] font-black tracking-[0.4em] transition-all hover:bg-[#1a1c1e] overflow-hidden">
                            <span className="relative z-10">{buttonText}</span>
                            <div className="absolute inset-0 bg-[#1a1c1e] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce opacity-40">
        <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50"></div>
      </div>
    </section>
  );
}
