import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { AuthContext } from "@/context/AuthContext";
import { Toaster } from "sonner";

const poppins = Poppins({
    weight: ["200", "300", "400", "500", "700"],
    subsets: ["latin-ext"],
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${poppins.style.fontFamily};
                }
            `}</style>
            <AuthContext>
                <Toaster richColors />
                <ThemeProvider attribute="class">
                    <Component {...pageProps} />
                </ThemeProvider>
            </AuthContext>
        </>
    );
}
