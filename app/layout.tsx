import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NexusVocal | Engineering Mastery',
  description: 'AI-Powered Professional English for Software Engineers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
