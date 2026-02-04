'use client';

import { useState } from 'react';
import { ChevronRight, Building2, Landmark, Leaf, Zap, Globe, Flame, Network } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
    Building2,
    Landmark,
    Leaf,
    Zap,
    Globe,
    Flame,
    Network
};

interface Sector {
    title: string;
    desc: string;
    href: string;
    image: string;
    iconName: keyof typeof iconMap;
    iconUrl?: string; // New field for dynamic icon
}

export default function SectorFocus({ lang, sectorList, header, title }: { lang: string, sectorList: Sector[], header: string, title: string }) {
    const [activeSector, setActiveSector] = useState<number | null>(null);

    return (
        <section className="py-40 px-6 bg-white relative overflow-hidden">
            {/* Dynamic Background Image Reveal */}
            <div className="absolute inset-0 z-0 transition-all duration-1000 overflow-hidden">
                {sectorList.map((sector, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${activeSector === i ? 'opacity-20 scale-105 grayscale-0' : 'opacity-0 scale-100 grayscale'
                            }`}
                    >
                        <img src={sector.image} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-32">
                    <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
                        {header}
                    </span>
                    <h2 className="text-5xl md:text-8xl font-light text-dark tracking-tighter italic">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sectorList.map((sector: Sector, i: number) => {
                        const IconComponent = iconMap[sector.iconName] || Globe;

                        return (
                            <Link
                                key={i}
                                href={`/${lang}${sector.href}`}
                                onMouseEnter={() => setActiveSector(i)}
                                onMouseLeave={() => setActiveSector(null)}
                                className={`relative h-[600px] flex flex-col justify-end transition-all duration-700 bg-dark overflow-hidden group border border-white/10 ${activeSector === i ? 'shadow-2xl -translate-y-4 border-gold' : ''
                                    }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-700"></div>
                                    <img
                                        src={sector.image}
                                        alt={sector.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>

                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-gold/40 transition-colors z-10 blur-xl"></div>

                                <div className="relative z-20 p-12">
                                    <h3 className="text-2xl font-light mb-6 text-white uppercase tracking-tight group-hover:text-gold transition-colors italic">
                                        {sector.title}
                                    </h3>

                                    <div className={`overflow-hidden transition-all duration-700 max-h-0 ${activeSector === i ? 'max-h-40 mb-8' : ''}`}>
                                        <p className="text-slate-300 font-light text-sm leading-relaxed">
                                            {sector.desc}
                                        </p>
                                    </div>

                                    <div className="text-[10px] font-bold tracking-[0.3em] text-gold flex items-center gap-3">
                                        {lang === 'tr' ? 'KEŞFET' : 'EXPLORE'}
                                        <div className="w-8 h-[1px] bg-gold group-hover:w-16 transition-all duration-700"></div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
