export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="text-xl font-bold text-white mb-4">CEY YATIRIM</div>
          <p className="text-sm leading-relaxed text-slate-500">
            Güçlü sermaye yapısı ve vizyoner projelerle Türkiye'nin geleceğine değer katıyoruz.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Hızlı Erişim</h4>
          <ul className="text-sm space-y-2">
            <li>Gayrimenkul Yatırımları</li>
            <li>Tarım ve Hayvancılık</li>
            <li>Yenilenebilir Enerji</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">İletişim</h4>
          <p className="text-sm">Merkez Ofis: İstanbul, Türkiye</p>
          <p className="text-sm mt-2">E-posta: info@ceyyatirim.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-900 text-xs text-center">
        © 2024 Cey Yatırım Holding. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}