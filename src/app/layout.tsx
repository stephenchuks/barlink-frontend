import './global.css';
import ClientRoot from '@/components/ClientRoot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}
