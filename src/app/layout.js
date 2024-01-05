import { Montserrat as FontSans, Roboto } from "next/font/google";
import { Provider } from "@/components/provider";

import "@/styles/globals.css";

const fontSans = FontSans({ subsets: ["latin"] });

const roboto = Roboto({
   weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata = {
  title: "berlaku.id - BYTEHUB",
  description: "Devscale Indonesia | Batch 3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
