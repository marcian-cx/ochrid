import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-burgundy/20 bg-parchment mt-16">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col items-center gap-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider">
            <Link href="/about" className="text-burgundy hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/donate" className="text-burgundy hover:text-gold transition-colors">
              Support
            </Link>
            <a 
              href="mailto:rdr.marcian@proton.me" 
              className="text-burgundy hover:text-gold transition-colors"
            >
              Contact
            </a>
          </nav>
          
          <div className="text-center text-xs text-ink/50">
            <p className="text-center">A Daily Orthodox Companion</p>
            <p className="mt-2">
              Prologue translation available under{" "}
              <a 
                href="https://creativecommons.org/licenses/by-sa/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                CC BY-SA 4.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
