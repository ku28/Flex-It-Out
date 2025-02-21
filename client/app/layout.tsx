import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                    <Navbar />
                    <main className="px-4 w-full min-h-[90vh] flex flex-col items-center justify-center space-y-8">
                        {children}
                    </main>
                    <Footer />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}