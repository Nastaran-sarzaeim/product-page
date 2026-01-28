import Header from "@/layout/header/Header";
import "./globals.css";
import Footer from "@/layout/footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
