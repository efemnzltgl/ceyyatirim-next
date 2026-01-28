import { createClient } from '@sanity/client';
import axios from 'axios';

/**
 * SANITY SYNC SCRIPT
 * ------------------
 * Bu script, web sitesindeki "fallback" (yedek) verileri Sanity veritabanınıza yükler.
 */

const client = createClient({
    projectId: '0xcolbrf',
    dataset: 'production',
    apiVersion: '2024-01-27',
    token: 'skyI5nDeKNoWQNXGu2MSUUpqDhwfx05MmvfK1E3P7EPzAASgDvcy0Q8jjD4eZvDHxS03KMb8zPUjepbT6M4NEmWYbOTardoynsBQm2nk0gBgd6cMEHESRJkrBZyLzgHrR0Wdb07DVdB76hX4ANTThXkY8Lw7l2GtumkV4wRHhQa65BFIAuzG',
    useCdn: false,
});

async function uploadImage(url: string) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const asset = await client.assets.upload('image', buffer, {
            filename: url.split('/').pop(),
        });
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id,
            },
        };
    } catch (error) {
        console.error(`Görsel yüklenemedi: ${url}`);
        return null;
    }
}

const FALLBACK_SECTORS = [
    { title_tr: 'İnşaat ve Gayrimenkul', title_en: 'Construction and Real Estate', slug: 'insaat-ve-gayrimenkul', iconUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', description_tr: 'Üniversite kampüslerinden lüks konutlara, altyapı projelerinden ticari alanlara kadar mühendislik ve mimariyi değerle buluşturuyoruz.' },
    { title_tr: 'Enerji', title_en: 'Energy', slug: 'enerji', iconUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e', description_tr: 'Yenilenebilir enerji kaynakları ve hidroelektrik santralleri ile doğanın gücünü sürdürülebilir bir gelecek için hizmete sunuyoruz.' },
    { title_tr: 'Petrol & Doğal Gaz', title_en: 'Oil & Natural Gas', slug: 'petrol-dogal-gaz', iconUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2', description_tr: 'Global enerji pazarında stratejik projeler ve referans çalışmalarımızla sektörün güvenilir çözüm ortağıyız.' },
    { title_tr: 'Bilişim & Telekomünikasyon', title_en: 'Informatics & Telecommunications', slug: 'bilisim-telekomunikasyon', iconUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475', description_tr: 'Fiber optik altyapı, network sistemleri ve teknolojik donanımlarla Türkiye\'yi geleceğin ağlarıyla donatıyoruz.' }
];

const FALLBACK_COMPANIES = [
    { name_tr: 'Ceyen', name_en: 'Ceyen', slug: 'ceyen', logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', description_tr: 'Enerji, inşaat ve turizm sektörlerinde vizyoner projelerle geleceğe değer katan Ceyen, grubun amiral gemilerindendir.' },
    { name_tr: 'Ceyyapı', name_en: 'Ceyyapi', slug: 'ceyyapi', logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', description_tr: 'Üst yapı ve alt yapı projelerinde uzmanlaşmış, yurt ve yaşam merkezi inşaatlarında öncü kuruluş.' },
    { name_tr: 'Ceycar', name_en: 'Ceycar', slug: 'ceycar', logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2', description_tr: 'Ticari araç kiralama ve filo yönetimi alanında güvenilir ve kaliteli hizmet anlayışı.' },
    { name_tr: 'Ceytech', name_en: 'Ceytech', slug: 'ceytech', logoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475', description_tr: 'Bilişim, telekomünikasyon ve teknoloji altyapı çözümleriyle Türkiye\'yi dijital ağlarla donatıyoruz.' },
    { name_tr: 'KC Elektrik', name_en: 'KC Electricity', slug: 'kc-elektrik', logoUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e', description_tr: 'Yenilenebilir enerji ve hidroelektrik santralleri ile doğanın gücünü hizmetinize sunuyoruz.' },
    { name_tr: 'Stone Market', name_en: 'Stone Market', slug: 'stone-market', logoUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163', description_tr: 'Miami merkezli global operasyonlarla doğal taş ve mermer sektöründe zamanın ötesinde estetik.' }
];

const FALLBACK_PROJECTS = [
    // Devam Eden Projeler
    { title_tr: 'Otoreyon - ŞANLIURFA', slug: 'otoreyon-sanliurfa', category: 'ongoing', imageUrl: 'https://images.unsplash.com/photo-1542362567-b05503f3f7f4' },
    { title_tr: 'Başköy Regülatörü ve HES', slug: 'baskoy-hes', category: 'ongoing', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e' },
    { title_tr: 'Şırnak AG/OG Elektrik Tesis Yapımı', slug: 'sirnak-elektrik-altyapi', category: 'ongoing', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e' },
    // Tamamlanan Projeler
    { title_tr: 'Akdeniz Üniversitesi Ceypark', slug: 'akdeniz-universitesi-ceypark', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585' },
    { title_tr: 'Mustafa Kemal Üniversitesi Ceypark', slug: 'mku-ceypark', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' },
    { title_tr: 'İzmir Katip Çelebi Ünv. Yurdu', slug: 'katip-celebi-yurdu', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
    { title_tr: 'Celal Bayar Üniversitesi Ceypark', slug: 'cbu-ceypark', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1577412647305-991150c7d163' },
    { title_tr: 'TBMM Hizmet Binası', slug: 'tbmm-hizmet-binasi', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1577086664693-894d8405334a' },
    { title_tr: 'Kayseri Fiber Optik Altyapı', slug: 'kayseri-fiber-optik', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8' },
    { title_tr: 'Bursa Kent Güvenlik Sistemi', slug: 'bursa-kent-guvenlik', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94' },
    { title_tr: '17 Adet Bölge Md. Network', slug: 'regional-network-infrastructure', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51' },
    { title_tr: 'İçişleri Bakanlığı NVİGM', slug: 'nufus-isleri-projesi', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216' },
    { title_tr: '750 km Fiber Optik Kurulumu', slug: '750-km-fiber-line', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26' },
    { title_tr: 'Mavi Masa Çağrı Merkezi', slug: 'mavi-masa-call-center', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea' },
    { title_tr: '955 Kişilik Personel Alımı', slug: 'personnel-service-recruitment', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902' },
    { title_tr: 'Gebze Kampüsü IP Kamera', slug: 'gebze-campus-security', category: 'completed', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94' }
];

const FALLBACK_SOCIAL = [
    { title_tr: 'Mikrokredi', slug: 'mikrokredi', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09' },
    { title_tr: 'Antalya 07 Kadın Basketbol Takımı', slug: 'antalya-07-kadin-basketbol-takimi', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc' }
];

const FALLBACK_PAGES = [
    {
        title_tr: 'Hakkımızda',
        title_en: 'About Us',
        slug: 'hakkimizda',
        pageType: 'about',
        imageUrl: 'http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/hakkimizda-banner-0106.jpg',
        content_tr: [{ _key: 'c1', _type: 'block', children: [{ _key: 'c1-1', _type: 'span', text: '1965 yılından beri inşaat, turizm, enerji sektörlerinde faaliyet gösteren CEYLAN Group çatısı altında oluşan...' }], style: 'normal' }]
    },
    {
        title_tr: 'Başkanın Mesajı',
        title_en: 'Chairman\'s Message',
        slug: 'baskanin-mesaji',
        pageType: 'chairman-message',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
        content_tr: [{ _key: 'c1', _type: 'block', children: [{ _key: 'c1-1', _type: 'span', text: 'Türkiye’de inşaat, bilişim, iletişim ve enerji sektörlerine yönelen grup şirketlerimiz sayesinde...' }], style: 'normal' }]
    }
];

const FALLBACK_OFFICES = [
    { city_tr: 'Ankara (Merkez)', city_en: 'Ankara (Headquarters)', address_tr: 'Cinnah Cad. Kuloğlu Sk. No: 19/5 06439 Çankaya – Ankara / TÜRKİYE', phone: '+90 312 443 33 33', email: 'info@ceyyatirim.com', slug: 'ankara-merkez' },
    { city_tr: 'İstanbul', city_en: 'Istanbul', address_tr: 'Ambarlıdere Yolu No:10, Ulus Palmiye Sitesi, Ortaköy Beşiktaş - İstanbul / TÜRKİYE', phone: '+90 212 216 21 47', email: 'info@ceyyatirim.com', slug: 'istanbul' },
    { city_tr: 'Diyarbakır', city_en: 'Diyarbakir', address_tr: 'Elazığ Karayolu 7. Km Diyarbakır / TÜRKİYE', phone: '+90 412 339 02 02', email: 'info@ceyyatirim.com', slug: 'diyarbakir' },
    { city_tr: 'Antalya', city_en: 'Antalya', address_tr: 'Pınarbaşı Mah. Dumlupınar Bul. Akdeniz Ünviversitesi Kampüsü CEYPARK AVM Yönetim Binası Konyaaltı - Antalya / TÜRKİYE', phone: '+90 533 208 96 96', email: 'info@ceyyatirim.com', slug: 'antalya' },
    { city_tr: 'Miami (ABD)', city_en: 'Miami (USA)', address_tr: '6965 NW 43 St. Bay 3 Miami, FL 33178 / ABD', phone: '+90 212 216 21 47', email: 'info@ceyyatirim.com', slug: 'miami' }
];

async function sync() {
    console.log('--- Senkronizasyon Başladı ---');

    // Sektörleri Yükle
    for (const s of FALLBACK_SECTORS) {
        console.log(`Sektör yükleniyor: ${s.title_tr}`);
        const imageAsset = await uploadImage(s.iconUrl);
        await client.createOrReplace({
            _type: 'sector',
            _id: `sector-${s.slug}`,
            title_tr: s.title_tr,
            title_en: s.title_en,
            description_tr: s.description_tr,
            slug: { _type: 'slug', current: s.slug },
            icon: imageAsset,
            order: FALLBACK_SECTORS.indexOf(s),
        });
    }

    // Şirketleri Yükle
    for (const c of FALLBACK_COMPANIES) {
        console.log(`Şirket yükleniyor: ${c.name_tr}`);
        const logoAsset = await uploadImage(c.logoUrl);
        await client.createOrReplace({
            _type: 'company',
            _id: `company-${c.slug}`,
            name_tr: c.name_tr,
            name_en: c.name_en,
            description_tr: c.description_tr,
            slug: { _type: 'slug', current: c.slug },
            logo: logoAsset,
            order: FALLBACK_COMPANIES.indexOf(c),
        });
    }

    // Projeleri Yükle
    for (const p of FALLBACK_PROJECTS) {
        console.log(`Proje yükleniyor: ${p.title_tr}`);
        const imageAsset = await uploadImage(p.imageUrl);
        if (!imageAsset) {
            console.error(`Görsel yüklenemediği için proje atlanıyor (Validasyon hatasını önlemek için): ${p.title_tr}`);
            continue;
        }
        await client.createOrReplace({
            _type: 'project',
            _id: `project-${p.slug}`,
            title_tr: p.title_tr,
            category: p.category,
            slug: { _type: 'slug', current: p.slug },
            mainImage: imageAsset,
            order: FALLBACK_PROJECTS.indexOf(p),
        });
    }

    // Sosyal Faaliyetleri Yükle
    for (const s of FALLBACK_SOCIAL) {
        console.log(`Sosyal Faaliyet yükleniyor: ${s.title_tr}`);
        const imageAsset = await uploadImage(s.imageUrl);
        await client.createOrReplace({
            _type: 'socialActivity',
            _id: `social-${s.slug}`,
            title_tr: s.title_tr,
            slug: { _type: 'slug', current: s.slug },
            featuredImage: imageAsset,
        });
    }

    // Kurumsal Sayfaları Yükle
    for (const p of FALLBACK_PAGES) {
        console.log(`Sayfa yükleniyor: ${p.title_tr}`);
        const imageAsset = await uploadImage(p.imageUrl);
        await client.createOrReplace({
            _type: 'page',
            _id: `page-${p.slug}`,
            title_tr: p.title_tr,
            title_en: p.title_en,
            slug: { _type: 'slug', current: p.slug },
            pageType: p.pageType,
            featuredImage: imageAsset,
            content_tr: p.content_tr,
        });
    }

    // Ofisleri Yükle
    for (const o of FALLBACK_OFFICES) {
        console.log(`Ofis yükleniyor: ${o.city_tr}`);
        await client.createOrReplace({
            _type: 'office',
            _id: `office-${o.slug}`,
            city_tr: o.city_tr,
            city_en: o.city_en,
            address_tr: o.address_tr,
            phone: o.phone,
            email: o.email,
            order: FALLBACK_OFFICES.indexOf(o),
        });
    }

    console.log('--- Senkronizasyon Tamamlandı ---');
}

sync().catch(console.error);
