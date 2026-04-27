"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#fdfaf6] pt-24 pb-8 overflow-hidden border-t border-[#8c5430]/10">
      
      {/* Background Texture & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/wood-texture.png" alt="Wood Texture" fill className="object-cover opacity-[0.03] mix-blend-overlay" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#8c5430]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col gap-16">
        
        {/* Statement Header */}
        <div className="flex flex-col items-center text-center border-b border-[#8c5430]/20 pb-16">
          <span className="text-[#8c5430] text-sm font-bold tracking-[0.4em] uppercase mb-6">Portland Flooring</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#251208] uppercase tracking-wider drop-shadow-sm" style={{ fontFamily: "'Tomorrow', sans-serif", fontWeight: 700 }}>
            Precision in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c5430] to-[#b56b3a]">Every Step.</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-[#8c5430] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Image src="/logo.png" alt="Portland Flooring Logo" width={32} height={32} className="brightness-0 invert" />
              </div>
              <span className="text-[#251208] font-bold tracking-widest uppercase text-base group-hover:text-[#8c5430] transition-colors">Portland</span>
            </Link>
            <p className="text-[#6b3e21] text-base leading-relaxed font-medium">
              Elevating spaces through masterful craftsmanship and uncompromising quality. From bespoke hardwood to ultra-durable hybrid solutions, we bring architectural visions to life.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6 lg:ml-8">
            <h4 className="text-[#251208] font-bold tracking-widest uppercase text-base border-l-2 border-[#8c5430] pl-3">Explore</h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Fusion Hybrid', href: '/fusion-hybrid' },
                { name: 'Get a Quote', href: '/quote' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#6b3e21] hover:text-[#8c5430] text-base font-bold uppercase tracking-widest transition-colors flex items-center gap-3 group">
                    <span className="w-0 h-[2px] bg-[#8c5430] group-hover:w-6 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#251208] font-bold tracking-widest uppercase text-base border-l-2 border-[#8c5430] pl-3">Contact</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col gap-2">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Showroom</span>
                <span className="text-[#6b3e21] text-base font-bold leading-relaxed">
                  2B Venture Way, Pakenham<br />
                  VIC, Australia, Victoria
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Direct Line</span>
                <a href="tel:+61420608608" className="text-[#6b3e21] hover:text-[#8c5430] text-base font-bold transition-colors">
                  +61 420 608 608
                </a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Email</span>
                <a href="mailto:sales@portlands.com.au" className="text-[#6b3e21] hover:text-[#8c5430] text-base font-bold transition-colors">
                  sales@portlands.com.au
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#251208] font-bold tracking-widest uppercase text-base border-l-2 border-[#8c5430] pl-3">Connect</h4>
            <p className="text-[#6b3e21] text-base font-medium">Subscribe for exclusive architectural insights and material updates.</p>
            
            <form className="relative group mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-5 py-4 bg-white border border-[#8c5430]/20 rounded-xl outline-none focus:border-[#8c5430] focus:shadow-md transition-all font-bold text-[#251208] placeholder-[#6b3e21]/40 text-base shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#8c5430] flex items-center justify-center text-white hover:bg-[#251208] transition-colors shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </button>
            </form>

            <div className="flex items-center gap-6 mt-6">
              {/* Instagram */}
              <a href="#" className="text-[#8c5430] hover:text-[#251208] transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-[#8c5430] hover:text-[#251208] transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="text-[#8c5430] hover:text-[#251208] transition-colors" aria-label="Pinterest">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.195 0 7.456 2.991 7.456 6.98 0 4.173-2.63 7.535-6.284 7.535-1.226 0-2.38-.638-2.775-1.39l-.756 2.876c-.274 1.045-1.016 2.351-1.514 3.149 1.18.36 2.438.555 3.738.555 6.621 0 11.988-5.367 11.988-11.987C24 5.367 18.638 0 12.017 0z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Google Profile */}
              <a href="#" className="text-[#8c5430] hover:text-[#251208] transition-colors" aria-label="Google Profile">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#8c5430]/20 gap-4">
           <p className="text-[#251208] text-sm font-bold uppercase tracking-widest">
             &copy; {new Date().getFullYear()} Portland Flooring. All rights reserved.
           </p>
           <div className="flex gap-6">
             <a href="#" className="text-[#251208] hover:text-[#8c5430] text-sm font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
             <a href="#" className="text-[#251208] hover:text-[#8c5430] text-sm font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
           </div>
        </div>

      </div>
    </footer>
  );
}
