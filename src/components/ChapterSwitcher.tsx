import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChapters } from '@/hooks/useChapters';

const STORAGE_KEY = 'wildai-chapter';

/**
 * "Your city" chapter switcher. Remembers the last selected chapter
 * in localStorage so returning visitors land on their chapter.
 */
const ChapterSwitcher = () => {
  const navigate = useNavigate();
  const { data: chapters } = useChapters();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(saved);
  }, []);

  const pick = (slug: string, city: string) => {
    localStorage.setItem(STORAGE_KEY, slug);
    setSelected(city);
    navigate(`/${slug}`);
  };

  const current = chapters?.find((c) => c.city === selected) ?? chapters?.find((c) => c.slug === selected);
  const label = current ? current.city : 'Your city';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors font-mono">
          <MapPin className="w-4 h-4 text-wildai-mint" />
          <span className="max-w-[110px] truncate">{label}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 bg-wildai-teal border-secondary">
        <DropdownMenuLabel className="text-muted-foreground text-xs font-mono">FIND YOUR CHAPTER</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-secondary" />
        {(chapters ?? []).map((c) => (
          <DropdownMenuItem key={c.slug} onClick={() => pick(c.slug, c.city)} className="text-foreground hover:text-foreground/80 cursor-pointer gap-2">
            <span>{c.city}</span>
            {c.status === 'launching' && (
              <span className="ml-auto text-[10px] font-mono text-wildai-mint border border-wildai-mint/40 rounded px-1.5 py-0.5">
                LAUNCHING
              </span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-secondary" />
        <DropdownMenuItem onClick={() => navigate('/chapters')} className="text-muted-foreground cursor-pointer text-xs">
          All chapters →
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChapterSwitcher;
