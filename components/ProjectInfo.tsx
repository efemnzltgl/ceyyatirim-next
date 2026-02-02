import { MapPin, Calendar, Building2, Wallet, Layers } from 'lucide-react';
import React from 'react';

interface ProjectInfoProps {
    project: any;
    lang: string;
}

export default function ProjectInfo({ project, lang }: ProjectInfoProps) {
    const isTr = lang === 'tr';

    const infoItems = [
        {
            icon: Building2,
            label: isTr ? 'YATIRIMCI' : 'INVESTOR',
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
        <div className="bg-slate-50 p-8 rounded-sm border border-slate-100 h-full">
            <h1 className="text-3xl font-bold text-[#1a1c1e] mb-2 leading-tight">
                {isTr ? project.title_tr : (project.title_en || project.title_tr)}
            </h1>
            <div className="h-1 w-20 bg-[#b39359] mb-8"></div>

            <div className="flex flex-col gap-6 mb-10">
                {infoItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                        <div className="bg-white p-3 rounded-md shadow-sm border border-slate-100 group-hover:border-[#b39359]/30 transition-colors">
                            <item.icon className="w-5 h-5 text-[#b39359]" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-1">
                                {item.label}
                            </span>
                            <span className="block text-slate-800 font-medium text-sm">
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-[#1a1c1e] mb-4">
                    {isTr ? 'Proje Hakkında' : 'About Project'}
                </h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                    {isTr ? project.description_tr : (project.description_en || project.description_tr)}
                </p>
            </div>
        </div>
    );
}
