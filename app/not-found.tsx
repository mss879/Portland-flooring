import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#fbf5f0] px-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/light-wood-texture.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15] mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo */}
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg mb-8">
          <Image
            src="/portland-logo.webp"
            alt="Portland Flooring"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        {/* 404 */}
        <h1
          className="text-8xl md:text-9xl font-bold text-[#8c5430]/20 mb-4 tracking-wider"
          style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}
        >
          404
        </h1>

        <h2
          className="text-3xl md:text-4xl font-bold text-[#251208] mb-4 tracking-wide"
          style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}
        >
          Page Not Found
        </h2>

        <p className="text-[#6b3e21] text-lg font-medium mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on solid ground.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-[#8c5430] hover:bg-[#6b3e21] text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Back Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-white border-2 border-[#8c5430]/20 hover:border-[#8c5430] text-[#251208] font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
