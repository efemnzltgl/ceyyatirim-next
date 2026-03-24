import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer lang={lang} />
        </SmoothScroll>
    );
}
