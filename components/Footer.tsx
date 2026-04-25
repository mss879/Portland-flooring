import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0502] pt-24 pb-8 overflow-hidden border-t border-[#8c5430]/20">
      
      {/* Background Texture & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/wood-texture.png" alt="Wood Texture" fill className="object-cover opacity-5 mix-blend-overlay grayscale" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#8c5430]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col gap-16">
        
        {/* Statement Header */}
        <div className="flex flex-col items-center text-center border-b border-[#8c5430]/20 pb-16">
          <span className="text-[#8c5430] text-xs font-bold tracking-[0.4em] uppercase mb-6">Portland Flooring</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wider drop-shadow-2xl" style={{ fontFamily: "'Golden Sans', sans-serif", fontWeight: 900 }}>
            Precision in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c5430] to-[#b56b3a]">Every Step.</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#8c5430] flex items-center justify-center shadow-[0_0_15px_rgba(140,84,48,0.5)] group-hover:scale-110 transition-transform">
                <Image src="/logo.png" alt="Portland Flooring Logo" width={28} height={28} className="brightness-0 invert" />
              </div>
              <span className="text-white font-bold tracking-widest uppercase text-sm group-hover:text-[#8c5430] transition-colors">Portland</span>
            </Link>
            <p className="text-[#fce8d5]/50 text-sm leading-loose font-medium">
              Elevating spaces through masterful craftsmanship and uncompromising quality. From bespoke hardwood to ultra-durable hybrid solutions, we bring architectural visions to life.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6 lg:ml-8">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm border-l-2 border-[#8c5430] pl-3">Explore</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Fusion Hybrid', href: '/fusion-hybrid' },
                { name: 'Get a Quote', href: '/quote' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#fce8d5]/50 hover:text-[#8c5430] text-sm font-medium uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-[#8c5430] group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm border-l-2 border-[#8c5430] pl-3">Contact</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col gap-1">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Showroom</span>
                <span className="text-[#fce8d5]/50 text-sm font-medium leading-relaxed">
                  123 Design Avenue<br />
                  Melbourne, VIC 3000
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Direct Line</span>
                <a href="tel:+61400000000" className="text-[#fce8d5]/50 hover:text-white text-sm font-medium transition-colors">
                  +61 400 000 000
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[#8c5430] text-xs font-bold uppercase tracking-widest">Email</span>
                <a href="mailto:hello@portlandflooring.com" className="text-[#fce8d5]/50 hover:text-white text-sm font-medium transition-colors">
                  hello@portlandflooring.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm border-l-2 border-[#8c5430] pl-3">Connect</h4>
            <p className="text-[#fce8d5]/50 text-sm font-medium">Subscribe for exclusive architectural insights and material updates.</p>
            
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-5 py-4 bg-[#110804] border border-[#8c5430]/30 rounded-xl outline-none focus:border-[#8c5430] transition-all font-medium text-white placeholder-white/20 text-sm shadow-inner"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#8c5430] flex items-center justify-center text-white hover:bg-[#b56b3a] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </button>
            </form>

            <div className="flex items-center gap-4 mt-4">
              {['Instagram', 'LinkedIn', 'Pinterest'].map((social) => (
                <a key={social} href="#" className="text-[#fce8d5]/40 hover:text-[#8c5430] text-sm font-bold uppercase tracking-widest transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#8c5430]/20 gap-4">
           <p className="text-[#fce8d5]/30 text-xs font-bold uppercase tracking-widest">
             &copy; {new Date().getFullYear()} Portland Flooring. All rights reserved.
           </p>
           <div className="flex gap-6">
             <a href="#" className="text-[#fce8d5]/30 hover:text-[#fce8d5] text-xs font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
             <a href="#" className="text-[#fce8d5]/30 hover:text-[#fce8d5] text-xs font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
           </div>
        </div>

      </div>
    </footer>
  );
}
