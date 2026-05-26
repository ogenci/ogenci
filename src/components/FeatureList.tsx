interface FeatureListProps {
  features: string[];
  className?: string;
}

export default function FeatureList({ features, className = "" }: FeatureListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {features.map((f) => (
        <div key={f} className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-widest text-muted-foreground border-t border-border pt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {f}
        </div>
      ))}
    </div>
  );
}
