interface AuthorAvatarProps {
  initial: string;
  name: string;
  role: string;
  className?: string;
}

export default function AuthorAvatar({ initial, name, role, className = "" }: AuthorAvatarProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display text-lg font-bold">
        {initial}
      </div>
      <div>
        <div className="text-sm font-display font-bold">{name}</div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{role}</div>
      </div>
    </div>
  );
}
