interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-16 border-b border-border pb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
            activeFilter === filter
              ? "bg-foreground text-background border-foreground shadow-lg"
              : "bg-background text-foreground border-border hover:border-primary"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
