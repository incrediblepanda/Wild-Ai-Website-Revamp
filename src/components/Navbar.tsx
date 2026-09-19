import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import ChapterSwitcher from '@/components/ChapterSwitcher';

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

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/4b758e76-3d87-4964-9506-d66b3fa83e25.png"
              alt="Wild AI Logo"
              className="h-7 md:h-8 w-auto"
            />
          </Link>
          <span className="hidden md:block h-5 w-px bg-border" />
          {!isMobile && <ChapterSwitcher />}
        </div>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-signal text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {isMobile && (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover border-border font-mono text-xs uppercase tracking-[0.16em]"
            >
              {navLinks.map((l) => (
                <DropdownMenuItem key={l.to} asChild>
                  <Link to={l.to} className="cursor-pointer focus:text-accent">
                    {l.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <Link to="/start-a-chapter" className="cursor-pointer focus:text-accent">
                  Start a chapter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Link to="/join" className="flex-shrink-0">
          <Button size={isMobile ? 'sm' : 'default'}>Join</Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
