import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavbarLayout from "@/components/Navbar/NavbarLayout";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </SessionProvider>
  );
}
