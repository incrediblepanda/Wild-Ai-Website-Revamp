
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
  { to: '/chapters', label: 'CHAPTERS' },
  { to: '/events', label: 'EVENTS' },
  { to: '/speak', label: 'SPEAK' },
  { to: '/sponsor', label: 'SPONSOR' },
  { to: '/about', label: 'ABOUT' },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/4b758e76-3d87-4964-9506-d66b3fa83e25.png"
              alt="Wild AI Logo"
            className="h-7 md:h-8 w-auto"
            />
          </Link>
          {!isMobile && <ChapterSwitcher />}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary navigation">
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

        {/* Mobile Navigation */}
        {isMobile && (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground" aria-label="Open navigation">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-wildai-teal border-secondary">
              {navLinks.map((l) => (
                <DropdownMenuItem key={l.to} asChild>
                  <Link to={l.to} className="text-foreground hover:text-foreground/80 cursor-pointer">
                    {l.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-secondary" />
              <DropdownMenuItem asChild>
                <Link to="/start-a-chapter" className="text-foreground hover:text-foreground/80 cursor-pointer">
                  START A CHAPTER
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
