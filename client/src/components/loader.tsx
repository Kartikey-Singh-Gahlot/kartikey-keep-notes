import React from 'react';
import { LoaderProps } from '../interfaces/LoaderIterfaces';


export function FullScreenLoader({ theme }: LoaderProps) {
  return (
    <section className={`h-screen flex justify-center items-center gap-4`}>
      <div className={`animate-spin h-10 w-10 rounded-full border-[6px] border-dotted ${theme ? "border-green-800 border-b-transparent border-r-transparent" : "border-amber-50 border-b-transparent border-r-transparent"}`} />
      <h1 className="text-2xl">Loading</h1>
    </section>
  );
}

export function SectionalLoader({ theme }: LoaderProps) {
  return (
    <section className={`h-full flex justify-center items-center gap-4`}>
      <div className={`animate-spin h-10 w-10 rounded-full border-[6px] border-dotted ${theme ? "border-green-800 border-b-transparent border-r-transparent" : "border-amber-50 border-b-transparent border-r-transparent"}`} />
      <h1 className="text-2xl">Loading</h1>
    </section>
  );
}
