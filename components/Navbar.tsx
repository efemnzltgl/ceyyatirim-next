import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-slate-900 tracking-tighter">
          CEY <span className="text-blue-600">YATIRIM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
          <Link href="/kurumsal" className="hover:text-blue-600 transition-colors">Kurumsal</Link>
          <Link href="/projeler" className="hover:text-blue-600 transition-colors">Projelerimiz</Link>
          <Link href="/iletisim" className="hover:text-blue-600 transition-colors">İletişim</Link>
          <Link href="/studio" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-all">
            Yönetim
          </Link>
        </div>
        
        <button className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
      </div>
    </nav>
  );
}