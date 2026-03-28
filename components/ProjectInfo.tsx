import { MapPin, Calendar, Building2, Wallet, Layers, Zap, Users } from 'lucide-react';
import React from 'react';

interface ProjectInfoProps {
    project: any;
    lang: string;
}

export default function ProjectInfo({ project, lang }: ProjectInfoProps) {
    const isTr = lang === 'tr';

    const infoItems = [
        {
            icon: Users,
            label: isTr ? 'YATIRIMCI' : 'INVESTOR',
            value: project.investor
        },
        {
            icon: Building2,
            label: isTr ? 'MÜŞTERİ' : 'CLIENT',
            value: project.client || (isTr ? 'Cey Yatırım A.Ş.' : 'Cey Investment Inc.')
        },
        {
            icon: MapPin,
            label: isTr ? 'KONUM' : 'LOCATION',
            value: project.location
        },
        {
            icon: Calendar,
            label: isTr ? 'YIL' : 'YEAR',
            value: project.year
        },
        {
            icon: Zap,
            label: isTr ? 'KURULU GÜÇ' : 'INSTALLED POWER',
            value: project.installedPower
        },
        {
            icon: Layers,
            label: isTr ? 'İNŞAAT ALANI' : 'CONSTRUCTION AREA',
            value: project.constructionArea
        },
        {
            icon: Wallet,
            label: isTr ? 'PROJE DEĞERİ' : 'PROJECT VALUE',
            value: project.projectValue
        },
        {
            icon: Layers,
            label: isTr ? 'KATEGORİ' : 'CATEGORY',
            value: project.category === 'completed'
                ? (isTr ? 'Tamamlanan Projeler' : 'Completed Projects')
                : (isTr ? 'Devam Eden Projeler' : 'Ongoing Projects')
        }
    ].filter(item => item.value); // Filter out items with no value

    return (
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] h-full relative overflow-hidden group">
            {/* Glass highlight effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
                <h1 className="text-3xl lg:text-4xl font-light text-black mb-2 leading-tight uppercase tracking-tight italic">
                    {isTr ? project.title_tr : (project.title_en || project.title_tr)}
                </h1>
                <div className="h-[1px] w-20 bg-gold my-8 opacity-50"></div>

                <div className="flex flex-col gap-8 mb-12">
                    {infoItems.map((item, idx) => (
                        <div key={idx} className="flex gap-5 items-center group/item">
                            <div className="bg-black/5 p-4 rounded-full border border-black/10 group-hover/item:border-gold/50 text-black/50 group-hover/item:text-gold transition-colors duration-500">
                                <item.icon className="w-5 h-5 text-current" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-1">
                                    {item.label}
                                </span>
                                <span className="block text-black/90 font-light text-sm tracking-wide">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-black/10">
                    <h3 className="text-[10px] tracking-[0.3em] font-bold text-gold mb-6 uppercase">
                        {isTr ? 'Proje Hakkında' : 'About Project'}
                    </h3>
                    <p className="text-black/60 font-light leading-loose text-sm italic">
                        {isTr ? project.description_tr : (project.description_en || project.description_tr)}
                    </p>
                </div>
            </div>
        </div>
    );
}
