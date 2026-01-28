'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Company {
    _id: string;
    name: string;
    logoUrl: string;
}

interface BrandWallProps {
    companies: Company[];
    title: string;
}

export default function BrandWall({ companies, title }: BrandWallProps) {
    if (!companies || companies.length === 0) return null;

    return (
        <section className="py-32 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
                    {title}
                </span>
            </div>

            <div className="px-6">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={40}
                    slidesPerView={2}
                    loop={true}
                    speed={3000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    className="brand-swiper !ease-linear"
                >
                    {companies.map((company) => (
                        <SwiperSlide key={company._id} className="flex items-center justify-center p-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            <div className="relative h-16 w-full max-w-[160px] flex items-center justify-center">
                                {company.logoUrl ? (
                                    <img
                                        src={company.logoUrl}
                                        alt={company.name}
                                        className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                                    />
                                ) : (
                                    <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">{company.name}</span>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
        </section>
    );
}
