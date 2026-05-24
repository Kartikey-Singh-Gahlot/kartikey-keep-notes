import "./styles/loader.css";
import { LoaderProps } from '../interfaces/LoaderIterfaces';


export function FullScreenLoader({ theme }: LoaderProps) {
  return (
    <section className={`loader-wrapper`}>
      <div className={`loader-component ${theme ? "border-green-800 border-b-transparent border-r-transparent" : "border-amber-50 border-b-transparent border-r-transparent"}`} />
      <h1 className="text-2xl">Loading</h1>
    </section>
  );
}

export function SectionalLoader({ theme }: LoaderProps) {
  return (
    <section className={`h-full flex justify-center items-center gap-4`}>
      <div className={`loader-component ${theme ? "border-green-800 border-b-transparent border-r-transparent" : "border-amber-50 border-b-transparent border-r-transparent"}`} />
      <h1 className="text-2xl">Loading</h1>
    </section>
  );
}
