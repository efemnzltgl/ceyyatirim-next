import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import RichTextRenderer from '@/components/RichTextRenderer';
import JobApplicationForm from './JobApplicationForm';

export const dynamic = 'force-dynamic';

const HR_QUERY = `*[_type == "humanResources"][0]`;

export default async function HumanResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const data = await client.fetch(HR_QUERY);
    const isTr = lang === 'tr';

    const t = {
        title: isTr ? (data?.title_tr || 'İnsan Kaynakları') : (data?.title_en || 'Human Resources'),
        subtitle: isTr ? 'KARİYER FIRSATLARI' : 'CAREER OPPORTUNITIES',
        form: {
            title: isTr ? 'İş Başvuru Formu' : 'Job Application Form',
            name: isTr ? 'Ad Soyad' : 'Full Name',
            email: isTr ? 'E-posta' : 'Email',
            phone: isTr ? 'Telefon' : 'Phone',
            position: isTr ? 'Başvurulan Pozisyon' : 'Position Applied For',
            message: isTr ? 'Mesajınız' : 'Your Message',
            cv: isTr ? 'CV Yükle' : 'Upload CV',
            submit: isTr ? 'GÖNDER' : 'SUBMIT',
            submitting: isTr ? 'GÖNDERİLİYOR...' : 'SUBMITTING...'
        }
    };

    const content = isTr ? data?.content_tr : (data?.content_en || data?.content_tr);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[350px] w-full bg-[#0a0a0b] overflow-hidden flex items-center pt-20">
                <Image
                    src={data?.image ? (data.image.asset?._ref ? data.image.asset._ref : "http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg") : "http://www.ceyyatirim.com/sites/other/ceyyatirim/uploads/slides/projeler-banner.jpg"}
                    alt={t.title}
                    fill
                    className="object-cover opacity-50 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10">
                    <span className="text-[#b39359] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
                        {t.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-none italic">
                        {t.title}
                    </h1>
                </div>
            </div>

            <div className="py-24 px-6">
                <div className="max-w-4xl mx-auto">

                    {/* Content Section */}
                    {content && (
                        <div className="prose prose-slate max-w-none mb-20 prose-headings:font-light prose-p:text-slate-600 prose-a:text-[#b39359] text-center">
                            <RichTextRenderer content={content} />
                        </div>
                    )}

                    {/* Form Section */}
                    <JobApplicationForm t={t.form} />

                </div>
            </div>
        </main>
    );
}
