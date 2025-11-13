import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-parchment">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <Link href="/" className="block text-center mb-6">
          <h1 className="text-3xl font-bold text-burgundy mb-1">
            OCHRID
          </h1>
          <p className="text-sm text-center text-burgundy/60">
            A Daily Orthodox Companion
          </p>
        </Link>
        
        <nav className="flex justify-center items-center gap-8 text-sm">
          <Link 
            href="/" 
            className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider"
          >
            Daily Reading
          </Link>
          <Link 
            href="/about" 
            className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider"
          >
            About
          </Link>
          <Link 
            href="/donate" 
            className="text-burgundy hover:text-gold transition-colors uppercase tracking-wider"
          >
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}

