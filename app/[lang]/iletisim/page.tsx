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
    
    // HQ is the first office
    const hq = offices[0];
    const hqCity = lang === 'tr' ? hq.city_tr : (hq.city_en || hq.city_tr);
    const hqAddress = lang === 'tr' ? hq.address_tr : (hq.address_en || hq.address_tr);

    const t = {
        tr: {
            header: 'İLETİŞİM',
            mainTitle: 'Projeniz için bizimle iletişime geçin',
            mainDesc: 'Enerji ve inşaat projeleriniz için teklif almak veya detaylı bilgi edinmek için formu doldurabilirsiniz.',
            otherCentersTitle: 'DİĞER MERKEZLERİMİZ',
            phoneLabel: 'Telefon',
            emailLabel: 'E-posta',
            addressLabel: 'Adres',
        },
        en: {
            header: 'CONTACT',
            mainTitle: 'Contact us for your project',
            mainDesc: 'You can fill out the form to request a quote or get detailed information for your energy and construction projects.',
            otherCentersTitle: 'OUR OTHER CENTERS',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            addressLabel: 'Address',
        }
    }[lang as 'tr' | 'en'];

    return (
        <main className="bg-[#f8f9fa] min-h-screen pt-32 pb-24">
            
            <div className="max-w-7xl mx-auto px-6">
                
                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-black/40 font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">
                        {t.header}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight mb-6">
                        {t.mainTitle}
                    </h1>
                    <p className="text-black/60 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        {t.mainDesc}
                    </p>
                </div>

                {/* 2. Main Form & Media Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    
                    {/* Left: Contact Form Card */}
                    <div className="w-full">
                        <ContactForm lang={lang} isDark={false} />
                    </div>

                    {/* Right: Media Column */}
                    <div className="flex flex-col gap-8 w-full h-full">
                        {/* Upper Image Layer */}
                        <div className="relative w-full aspect-video md:aspect-[16/10] bg-white rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-black/[0.03]">
                            <Image
                                src="http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"
                                alt="Cey Yatırım Headquarters"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        
                        {/* Lower Map Layer */}
                        <div className="relative w-full aspect-video md:aspect-[16/10] bg-white rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-black/[0.03] grayscale hover:grayscale-0 transition-all duration-700 p-2">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.277885311277!2d32.8530495!3d39.8904664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f9a0c79cd6b%3A0xf63a7585a9dfc29e!2zQ2lubmFoIENkLiBObzoxOSwgMDY2OTAgw4dhbmtheWEvQW5rYXJh!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                                className="w-full h-full rounded-[24px] border-none"
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* 3. Main Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                    {/* Phone */}
                    <div className="flex items-center gap-6 p-6">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 flex-shrink-0">
                            <Phone className="w-5 h-5 text-black/70" />
                        </div>
                        <div>
                            <p className="text-black font-semibold text-sm mb-1">{t.phoneLabel}</p>
                            <a href={`tel:${hq.phone?.replace(/\s+/g, '')}`} className="text-slate-500 hover:text-black transition-colors text-sm">
                                {hq.phone}
                            </a>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-6 p-6">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 flex-shrink-0">
                            <Mail className="w-5 h-5 text-black/70" />
                        </div>
                        <div>
                            <p className="text-black font-semibold text-sm mb-1">{t.emailLabel}</p>
                            <a href={`mailto:${hq.email}`} className="text-slate-500 hover:text-black transition-colors text-sm">
                                {hq.email}
                            </a>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-6 p-6">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 flex-shrink-0">
                            <MapPin className="w-5 h-5 text-black/70" />
                        </div>
                        <div>
                            <p className="text-black font-semibold text-sm mb-1">{t.addressLabel}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {hqAddress}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Other Offices */}
                <div className="border-t border-slate-200/60 pt-20">
                    <div className="text-center mb-16">
                        <span className="text-black/40 font-bold tracking-[0.3em] text-[10px] uppercase block">
                            {t.otherCentersTitle}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Skip index 0 because it's the HQ shown above */}
                        {offices.slice(1).map((office: any) => {
                            const city = lang === 'tr' ? office.city_tr : (office.city_en || office.city_tr);
                            const address = lang === 'tr' ? office.address_tr : (office.address_en || office.address_tr);

                            return (
                                <div key={office._id} className="p-8 bg-white rounded-3xl group transition-all duration-500 flex flex-col shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-black/[0.03]">
                                    <h3 className="text-lg font-bold text-[#1a1c1e] mb-6 tracking-tight uppercase border-b border-slate-100 pb-4">
                                        {city}
                                    </h3>
                                    <div className="space-y-5 flex-grow">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-4 h-4 text-black/40 mt-1 flex-shrink-0" />
                                            <p className="text-slate-500 font-medium text-xs leading-relaxed">
                                                {address}
                                            </p>
                                        </div>
                                        {office.phone && (
                                            <div className="flex items-center gap-4">
                                                <Phone className="w-4 h-4 text-black/40 flex-shrink-0" />
                                                <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-slate-500 font-medium text-xs hover:text-black transition-colors">
                                                    {office.phone}
                                                </a>
                                            </div>
                                        )}
                                        {office.email && (
                                            <div className="flex items-center gap-4">
                                                <Mail className="w-4 h-4 text-black/40 flex-shrink-0" />
                                                <a href={`mailto:${office.email}`} className="text-slate-500 font-medium text-xs hover:text-black transition-colors">
                                                    {office.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}
