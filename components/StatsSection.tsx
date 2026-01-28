'use client';

import Counter from './Counter';

interface StatsSectionProps {
    lang: string;
    facts: Array<{ label: string; value: string }>;
}

export default function StatsSection({ lang, facts }: StatsSectionProps) {
    const t = {
        tr: 'SAYILARLA CEY YATIRIM',
        en: 'CEY INVESTMENT IN NUMBERS'
    }[lang as 'tr' | 'en'] || 'SAYILARLA CEY YATIRIM';

    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white whitespace-nowrap">
                    25 YEARS
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {facts.map((fact, i) => {
                        // Parse numerical value and suffix (e.g., "150+" -> 150, "+")
                        const numPart = parseInt(fact.value) || 0;
                        const suffixPart = fact.value.replace(/[0-9]/g, '');

                        return (
                            <div key={i} className="flex flex-col items-center lg:items-start group">
                                <div className="text-5xl md:text-7xl font-light text-white tracking-tighter mb-4 group-hover:text-gold transition-colors duration-500">
                                    <Counter end={numPart} suffix={suffixPart} />
                                </div>
                                <div className="h-[1px] w-12 bg-gold/50 mb-6 group-hover:w-24 transition-all duration-700"></div>
                                <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase group-hover:text-white transition-colors duration-500">
                                    {fact.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
