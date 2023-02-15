import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";
import Menu from "../components/menu";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps, session }) {
  return (
    <ThemeProvider attribute="class" value={{ dark: "dark-theme" }}>
      <Toaster
        toastOptions={{
          duration: 1500,
          style: {
            padding: "3px",
            borderRadius: "6px",
            fontSize: "14px",
          },
        }}
      />
      <SessionProvider session = {session}>
        <div className="base"></div>
        <Background />
        <Menu />
          <Component {...pageProps} />
        <Analytics />
      </SessionProvider>
      </ThemeProvider>
    
  );
}
