import { client } from '@/sanity/lib/client';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Printer } from 'lucide-react';
import Image from 'next/image';

const OFFICES_QUERY = `*[_type == "office"] | order(order asc) {
  _id,
  city_tr, city_en,
  address_tr, address_en,
  phone,
  fax,
  email,
  location
}`;

const FALLBACK_OFFICES = [
    {
        _id: 'o1',
        city_tr: 'Ankara (Merkez)',
        city_en: 'Ankara (Headquarters)',
        address_tr: 'Cinnah Cad. Kuloğlu Sk. No: 19/5 06439 Çankaya – Ankara / TÜRKİYE',
        address_en: 'Cinnah Cad. Kuloğlu Sk. No: 19/5 06439 Çankaya – Ankara / TURKEY',
        phone: '+90 312 443 33 33',
        fax: '+90 312 443 00 22',
        email: 'info@ceyyatirim.com'
    },
    {
        _id: 'o2',
        city_tr: 'İstanbul',
        city_en: 'Istanbul',
        address_tr: 'Ambarlıdere Yolu No:10, Ulus Palmiye Sitesi, Ortaköy Beşiktaş - İstanbul / TÜRKİYE',
        address_en: 'Ambarlıdere Yolu No:10, Ulus Palmiye Sitesi, Ortaköy Beşiktaş - Istanbul / TURKEY',
        phone: '+90 212 216 21 47',
        fax: '+90 212 216 20 50',
        email: 'info@ceyyatirim.com'
    },
    {
        _id: 'o3',
        city_tr: 'Diyarbakır',
        city_en: 'Diyarbakir',
        address_tr: 'Elazığ Karayolu 7. Km Diyarbakır / TÜRKİYE',
        address_en: 'Elazig Karayolu 7. Km Diyarbakir / TURKEY',
        phone: '+90 412 339 02 02',
        fax: '+90 412 339 01 36',
        email: 'info@ceyyatirim.com'
    },
    {
        _id: 'o4',
        city_tr: 'Antalya',
        city_en: 'Antalya',
        address_tr: 'Pınarbaşı Mah. Dumlupınar Bul. Akdeniz Ünviversitesi Kampüsü CEYPARK AVM Yönetim Binası Konyaaltı - Antalya / TÜRKİYE',
        address_en: 'Pinarbasi Mah. Dumlupinar Bul. Akdeniz University Campus CEYPARK AVM Management Building Konyaalti - Antalya / TURKEY',
        phone: '+90 533 208 96 96',
        email: 'info@ceyyatirim.com'
    },
    {
        _id: 'o5',
        city_tr: 'Miami (ABD)',
        city_en: 'Miami (USA)',
        address_tr: '6965 NW 43 St. Bay 3 Miami, FL 33178 / ABD',
        address_en: '6965 NW 43 St. Bay 3 Miami, FL 33178 / USA',
        phone: '+90 212 216 21 47',
        fax: '+90 212 216 20 50',
        email: 'info@ceyyatirim.com'
    }
];

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sanityOffices = await client.fetch(OFFICES_QUERY);

    const offices = sanityOffices.length > 0 ? sanityOffices : FALLBACK_OFFICES;

    const t = {
        tr: {
            title: 'İletişim',
            subtitle: 'DÜNYA GENELİNDEKİ OPERASYON MERKEZLERİMİZ',
            formTitle: 'BİZE ULAŞIN',
            formSubtitle: 'Projelerimiz veya faaliyetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.',
        },
        en: {
            title: 'Contact',
            subtitle: 'OUR OPERATIONAL CENTERS WORLDWIDE',
            formTitle: 'GET IN TOUCH',
            formSubtitle: 'You can contact us to get more information about our projects or activities.',
        }
    }[lang as 'tr' | 'en'];

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[350px] w-full bg-[#0a0a0b] overflow-hidden flex items-center pt-20">
                <Image
                    src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                    alt={t.title}
                    fill
                    className="object-cover opacity-50 grayscale"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10">
                    <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
                        {t.subtitle}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-none italic uppercase">
                        {t.title}
                    </h1>
                </div>
            </div>

            <div className="py-32 px-6 bg-[#f8f9fa] relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1a1c1e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {offices.map((office: any) => {
                            const city = lang === 'tr' ? office.city_tr : (office.city_en || office.city_tr);
                            const address = lang === 'tr' ? office.address_tr : (office.address_en || office.address_tr);

                            return (
                                <div key={office._id} className="p-12 bg-white hover:bg-[#0a0a0b] group transition-all duration-700 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-slate-200/50">
                                    <h3 className="text-xl font-light text-[#1a1c1e] group-hover:text-white mb-8 tracking-tight uppercase italic border-b border-slate-100 group-hover:border-gold/30 pb-4 transition-all">
                                        {city}
                                    </h3>
                                    <div className="space-y-6 flex-grow">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                                            <p className="text-slate-500 group-hover:text-slate-400 font-light text-sm leading-relaxed transition-colors">
                                                {address}
                                            </p>
                                        </div>
                                        {office.phone && (
                                            <div className="flex items-center gap-4">
                                                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                                                <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-slate-500 group-hover:text-white font-light text-sm hover:text-gold transition-colors">
                                                    {office.phone}
                                                </a>
                                            </div>
                                        )}
                                        {office.fax && (
                                            <div className="flex items-center gap-4">
                                                <Printer className="w-4 h-4 text-gold flex-shrink-0" />
                                                <p className="text-slate-500 group-hover:text-slate-400 font-light text-sm italic transition-colors">
                                                    {office.fax}
                                                </p>
                                            </div>
                                        )}
                                        {office.email && (
                                            <div className="flex items-center gap-4">
                                                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                                                <a href={`mailto:${office.email}`} className="text-slate-500 group-hover:text-white font-light text-sm hover:text-gold transition-colors">
                                                    {office.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-12 h-[1px] w-12 bg-gold group-hover:w-24 transition-all duration-700"></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start bg-[#0a0a0b] p-12 md:p-24 border border-white/5 relative overflow-hidden group/form shadow-2xl">
                        {/* Decor - Premium Glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 translate-y-1/2 -translate-x-1/2 rounded-full blur-[80px]"></div>

                        <div className="relative z-10">
                            <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-8 block reveal-text">
                                {t.formTitle}
                            </span>
                            <h2 className="text-4xl md:text-7xl font-light text-white mb-10 tracking-tighter italic uppercase leading-tight">
                                {t.formTitle}
                            </h2>
                            <p className="text-white/50 font-light leading-relaxed mb-16 max-w-md italic border-l border-gold/40 pl-8">
                                {t.formSubtitle}
                            </p>

                            <div className="mt-24 space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase mb-2">Resmi Bilgi Hattı</p>
                                    <p className="text-3xl font-light text-white tracking-tighter italic">+90 312 443 33 33</p>
                                </div>
                                <div className="w-12 h-[1px] bg-gold group-hover/form:w-24 transition-all duration-700"></div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <ContactForm lang={lang} isDark={true} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
