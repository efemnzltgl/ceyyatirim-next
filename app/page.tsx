import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { Building2, Landmark, Leaf, Zap, ChevronRight } from 'lucide-react';

export default async function Home() {
  const projects = await client.fetch(PROJECTS_QUERY);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Giriş Alanı */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">CEY YATIRIM</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light">
            Geleceği inşa eden stratejik yatırımlar, sürdürülebilir büyüme.
          </p>
        </div>
      </section>

      {/* Yatırım Alanları - Mevcut Sitedeki İkonlu Bölüm */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Yatırım Alanlarımız</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Building2, title: "Gayrimenkul", desc: "Modern yaşam alanları ve ticari projeler." },
            { icon: Leaf, title: "Tarım", desc: "Teknolojik ve sürdürülebilir tarım yatırımları." },
            { icon: Zap, title: "Enerji", desc: "Yenilenebilir ve temiz enerji çözümleri." },
            { icon: Landmark, title: "Finans", desc: "Stratejik sermaye ve fon yönetimi." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <item.icon className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projeler Bölümü - Sanity'den Gelen Dinamik Veriler */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Öne Çıkan Projeler</h2>
              <p className="text-slate-600">Admin panelinden eklediğiniz son çalışmalarımız.</p>
            </div>
            <button className="hidden md:flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
              Tümünü Gör <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div key={project._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-64 overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center font-bold text-slate-400">Görsel Yok</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-slate-900 uppercase">
                    Yatırım
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-blue-600 font-medium cursor-pointer">
                    Detayları İncele <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}