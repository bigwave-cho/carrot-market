import Link from 'next/link';
import React from 'react';

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}
export default function FloatingButton({ children, href }: FloatingButton) {
  //props의 children <>children<>
  return (
    <Link href={href}>
      <span className="fixed bottom-24 right-5 cursor-pointer rounded-full bg-orange-400 p-4 text-white transition-colors hover:bg-orange-500">
        {children}
      </span>
    </Link>
  );
}
