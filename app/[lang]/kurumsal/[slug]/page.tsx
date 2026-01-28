import { client } from '@/sanity/lib/client';
import RichTextRenderer from '@/components/RichTextRenderer';
import Image from 'next/image';

const FALLBACK_CONTENT: Record<string, any> = {
  'hakkimizda': {
    title_tr: 'Hakkımızda',
    title_en: 'About Us',
    content_tr: [
      {
        _key: 'c1',
        _type: 'block',
        children: [{ _key: 'c1-1', _type: 'span', text: '1965 yılından beri inşaat, turizm, enerji sektörlerinde faaliyet gösteren CEYLAN Group çatısı altında oluşan; inşaat, enerji, bilişim, teknoloji gibi birbirini tamamlayan kilit sektörlerde 2003 yılından itibaren faaliyet gösteren Cey Yatırım A.Ş., mühendislik ve yönetim alanında deneyimli kadrosu, modern makine parkı ve inovatif bir iş anlayışıyla, dünya kalitesinde, başarılı anahtar teslim çözümler üretmenin gururunu yaşamaktadır.' }],
        style: 'normal'
      }
    ],
    content_en: [
      {
        _key: 'e1',
        _type: 'block',
        children: [{ _key: 'e1-1', _type: 'span', text: 'Established in 2003 under the umbrella of CEYLAN Group, which has been active in construction, tourism, and energy sectors since 1965, Cey Investment Inc. operates in key complementary sectors such as construction, energy, informatics, and technology. With its experienced engineering and management staff, modern machinery park, and innovative business approach, it takes pride in producing world-class, successful turnkey solutions.' }],
        style: 'normal'
      }
    ],
    imageUrl: 'http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/hakkimizda-banner-0106.jpg'
  },
  'baskanin-mesaji': {
    title_tr: 'Başkanın Mesajı',
    title_en: 'Message From President',
    content_tr: [
      {
        _key: 'c1',
        _type: 'block',
        children: [{ _key: 'c1-1', _type: 'span', text: 'Türkiye’de inşaat, bilişim, iletişim ve enerji sektörlerine yönelen grup şirketlerimiz sayesinde ülkemize olan sorumluluğumuzu yerine getirmek için yıllardır ben ve ekibim var gücümüzle çalıştık. Ülke ekonomisine katkıda bulunmak, istihdam yaratmak ve projelerimizi dünya standartlarının üzerinde hayata geçirmek en büyük gururumuz oldu.\n\nEkibim ve kendi adıma şunu net bir şekilde belirtmek isterim ki bilişimden inşaata, enerjiden savunma sanayiine, öğrenci yurtlarından yaşam alanlarına kadar insanların hayatlarına dokunduğumuz her noktayı daha da geliştirmeye devam edeceğiz; daha işimiz bitmedi. Önümüzdeki yıllarda aynı şevk ve azimle çalışarak ülkemize ve grup şirketlerimize yakışan, örnek gösterilecek projelerle çok daha iyi yarınlar için üretmeye devam edeceğiz.\n\nVizyonumuz, günümüz koşullarına en uygun projeleri üretmenin yanı sıra yarınları da kurgulayarak hep bir adım önde olmak olmuştur. Tüm gücümüz ve tecrübemizle bugünden yarınları hazırlamaya devam!\n\nMesut CEYLAN\nYönetim Kurulu Başkanı / CEO' }],
        style: 'normal'
      }
    ],
    content_en: [
      {
        _key: 'e1',
        _type: 'block',
        children: [{ _key: 'e1-1', _type: 'span', text: 'For years, my team and I have worked with all our might to fulfill our responsibility to our country through our group companies focused on the construction, informatics, communication, and energy sectors in Turkey. Contributing to the national economy, creating employment, and realizing our projects above world standards has been our greatest pride.\n\nOn behalf of my team and myself, I would like to state clearly that we will continue to further develop every point where we touch people\'s lives, from informatics to construction, from energy to the defense industry, and from student dormitories to living spaces; our work is not done yet. In the coming years, we will continue to produce for much better tomorrows with exemplary projects that befit our country and our group companies, working with the same enthusiasm and determination.\n\nOur vision has been to stay one step ahead by organizing the future as well as producing the most suitable projects for today\'s conditions. We continue to prepare the future from today with all our strength and experience!\n\nMesut CEYLAN\nChairman / CEO' }],
        style: 'normal'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop'
  }
};

export default async function CorporatePage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;

  const query = `*[_type == "page" && slug.current == $slug][0] {
    title_tr, title_en,
    content_tr, content_en,
    "imageUrl": featuredImage.asset->url
  }`;

  const sanityPage = await client.fetch(query, { slug });

  // Use sanity data if exists, otherwise use fallback
  const fallbackData = FALLBACK_CONTENT[slug];

  if (!sanityPage && !fallbackData) {
    return (
      <main className="pt-40 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-light text-dark opacity-50 uppercase tracking-widest">
            {lang === 'tr' ? 'Sayfa Hazırlanıyor' : 'Page Under Construction'}
          </h1>
        </div>
      </main>
    );
  }

  const page = sanityPage || fallbackData;
  const title = lang === 'tr' ? page.title_tr : (page.title_en || page.title_tr);
  const content = lang === 'tr' ? page.content_tr : (page.content_en || page.content_tr);
  const displayImage = page.imageUrl;

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header Area */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-dark overflow-hidden">
        {displayImage && (
          <Image
            src={displayImage}
            alt={title}
            fill
            className="object-cover opacity-60 grayscale"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
          <div className="max-w-7xl mx-auto">
            <span className="text-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block reveal-text">
              {lang === 'tr' ? 'KURUMSAL' : 'CORPORATE'}
            </span>
            <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none reveal-text italic">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="prose prose-lg prose-slate max-w-none">
              {content && <RichTextRenderer content={content} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
