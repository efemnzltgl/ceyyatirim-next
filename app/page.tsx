import { ArrowUpRight, Building2, Leaf, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-zinc-100 min-h-screen">
      
      {/* SECTION 1: HERO - VİZYON */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Modern Arka Plan: Koyu gradyan ve çok hafif ışık sızıntısı */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-bold tracking-widest uppercase text-amber-500 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Cey Yatırım Holding
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 uppercase italic">
            GELECEK <br /> <span className="text-zinc-600">BURADA</span> <br /> <span className="text-amber-500 underline decoration-1 underline-offset-8">BAŞLAR.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Gayrimenkul, tarım ve enerji sektörlerinde mühendislik temelli, sürdürülebilir ve yüksek katma değerli yatırım stratejileri.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-12 py-5 bg-white text-black rounded-full font-black uppercase text-sm tracking-tighter hover:bg-amber-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Projelerimiz <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-12 py-5 bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-full font-black uppercase text-sm tracking-tighter hover:border-zinc-500 transition-all">
              Kurumsal Profil
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES - YATIRIM ALANLARI */}
      <section className="py-32 px-6 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <InvestmentCard 
              icon={<Building2 className="w-8 h-8" />}
              title="Gayrimenkul"
              desc="Değer yaratan lokasyonlarda, mühendislik hassasiyetiyle inşa edilmiş modern yaşam alanları."
            />
            <InvestmentCard 
              icon={<Leaf className="w-8 h-8" />}
              title="Tarım & Gıda"
              desc="Geleceğin teknolojisiyle harmanlanmış, sürdürülebilir ve verimli tarımsal yatırım modelleri."
            />
            <InvestmentCard 
              icon={<Zap className="w-8 h-8" />}
              title="Enerji"
              desc="Yenilenebilir kaynaklara odaklanan, doğa dostu ve kârlı enerji altyapı projeleri."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function InvestmentCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="group p-10 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50 hover:border-amber-500/30 transition-all duration-700">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-5 tracking-tight">{title}</h3>
      <p className="text-zinc-500 leading-relaxed font-light">{desc}</p>
    </div>
  );
}