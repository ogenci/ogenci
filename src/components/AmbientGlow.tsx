interface AmbientGlowProps {
  size?: number;
  opacity?: number;
  blur?: number;
  className?: string;
}

export default function AmbientGlow({ size = 800, opacity = 0.05, blur = 120, className = "" }: AmbientGlowProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 ${className}`}>
      <div
        className="bg-primary rounded-full"
        style={{
          width: size,
          height: size,
          opacity,
          filter: `blur(${blur}px)`,
        }}
      />
    </div>
  );
}
