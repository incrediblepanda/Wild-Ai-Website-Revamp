import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import ChapterSwitcher from '@/components/ChapterSwitcher';
import Logo from '@/components/Logo';
import CommandPalette, { useCommandPalette } from '@/components/CommandPalette';

const navLinks = [
  { to: '/chapters', label: 'Chapters' },
  { to: '/events', label: 'Events' },
  { to: '/speak', label: 'Speak' },
  { to: '/sponsor', label: 'Sponsor' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const palette = useCommandPalette();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-border bg-background/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/" className="flex items-center">
<Logo className="h-7 md:h-8" />
            </Link>
            <span className="hidden md:block h-5 w-px bg-border" />
            {!isMobile && <ChapterSwitcher />}
          </div>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-active={pathname.startsWith(l.to)}
                className="nav-signal text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => palette.setOpen(true)}
              aria-label="Search the site"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 py-1.5 pl-3 pr-2 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="rounded border border-border bg-background/70 px-1.5 py-0.5 font-mono text-[0.625rem]">
                ⌘K
              </kbd>
            </button>

            {isMobile && (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open navigation">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navLinks.map((l) => (
                    <DropdownMenuItem key={l.to} asChild>
                      <Link to={l.to} className="cursor-pointer">
                        {l.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/start-a-chapter" className="cursor-pointer">
                      Start a chapter
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link to="/join">
              <Button size={isMobile ? 'sm' : 'default'}>Join</Button>
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-[2px] bg-accent/70 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      <CommandPalette open={palette.open} onOpenChange={palette.setOpen} />
    </>
  );
};

export default Navbar;
