export default function SectionRule({ num, title, page }: { num: string; title: string; page: string }) {
  return (
    <div className="flex items-center justify-between border-t border-border py-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground w-full">
      <div className="flex gap-4">
        <span>{num}</span>
        <span>{title}</span>
      </div>
      <span>{page}</span>
    </div>
  );
}
