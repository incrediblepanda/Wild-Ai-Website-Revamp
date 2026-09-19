import React from 'react';
import { Link } from 'react-router-dom';
import { useChapters } from '@/hooks/useChapters';

interface NetworkFieldProps {
  compact?: boolean;
}

const NetworkField = ({ compact = false }: NetworkFieldProps) => {
  const { data: chapters } = useChapters();
  const nodes = chapters ?? [];
  return (
    <div className={`network-field ${compact ? 'network-field--compact' : ''}`} aria-label="Wild AI chapter network">
      <div className="network-field__header">
        <p>Wild AI chapters</p>
        <span>{nodes.length} communities</span>
      </div>
      <div className="network-field__list">
      {nodes.slice(0, 3).map((chapter, index) => (
        <Link
          key={chapter.id}
          to={`/${chapter.slug}`}
          className="network-field__node"
        >
          <span className="network-field__index">0{index + 1}</span>
          <span className="network-field__copy">
            <span className="network-field__city">{chapter.city}</span>
            <span className="network-field__status">
              {chapter.status === 'active' ? 'Active' : 'Launching'} · {chapter.member_count ?? 0}+ members
            </span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default NetworkField;