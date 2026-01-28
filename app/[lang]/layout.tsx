import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer lang={lang} />
        </>
    );
}
