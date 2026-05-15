import "./globals.css";
import Providers from "./providers";
import GlobalToast from "../components/ui/GlobalToast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <Providers>
          <GlobalToast />
          {children}
        </Providers>
      </body>
    </html>
  );
}