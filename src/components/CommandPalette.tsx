import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useChapters } from '@/hooks/useChapters';
import {
  CalendarDays,
  Handshake,
  Info,
  MapPin,
  Mic2,
  Newspaper,
  Rocket,
  Users,
  Youtube,
} from 'lucide-react';

const pages = [
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/chapters', label: 'Chapters', icon: MapPin },
  { to: '/speak', label: 'Speak at Wild AI', icon: Mic2 },
  { to: '/sponsor', label: 'Sponsor', icon: Handshake },
  { to: '/about', label: 'About', icon: Info },
  { to: '/join', label: 'Join the list', icon: Users },
  { to: '/start-a-chapter', label: 'Start a chapter', icon: Rocket },
  { to: '/press', label: 'Press', icon: Newspaper },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Keyboard-first navigation. Opens with Cmd/Ctrl+K from anywhere. */
const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { data: chapters } = useChapters();

  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, chapters, events…" />
      <CommandList>
        <CommandEmpty>Nothing matched that.</CommandEmpty>
        <CommandGroup heading="Go to">
          {pages.map((page) => (
            <CommandItem key={page.to} value={page.label} onSelect={() => go(page.to)}>
              <page.icon className="mr-2 h-4 w-4 text-accent" />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>
        {(chapters ?? []).length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Chapters">
              {(chapters ?? []).map((chapter) => (
                <CommandItem
                  key={chapter.id}
                  value={`${chapter.city} ${chapter.region ?? ''}`}
                  onSelect={() => go(`/${chapter.slug}`)}
                >
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  {chapter.city}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {chapter.status === 'active' ? 'Active' : 'Launching'}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        <CommandSeparator />
        <CommandGroup heading="Watch">
          <CommandItem
            value="YouTube past events recordings"
            onSelect={() => {
              onOpenChange(false);
              window.open('https://www.youtube.com/@WildAI-US', '_blank', 'noopener');
            }}
          >
            <Youtube className="mr-2 h-4 w-4 text-accent" />
            Past events on YouTube
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

/** Registers the global Cmd/Ctrl+K shortcut. */
export const useCommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return { open, setOpen };
};

export default CommandPalette;
