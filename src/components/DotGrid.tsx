interface DotGridProps {
  size?: number;
  opacity?: number;
  className?: string;
}

export default function DotGrid({ size = 8, opacity = 0.03, className = "" }: DotGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: "radial-gradient(#0a0a0a 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}
