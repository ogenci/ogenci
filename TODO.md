# OGENCI Codebase TODO

## Status: Most repetitions eliminated

### ✅ Completed This Session

#### 1. Hardcoded `hsl(77, 100%, 38%)` → CSS variables
- `App.tsx`: `border-[hsl(77,100%,38%)]` → `border-primary`
- `Home.tsx`: ProjectCard `bg="hsl(77, 100%, 38%)"` → `bg="hsl(var(--primary))"`
- `Home.tsx`: Testimonial dot `style={{ backgroundColor: ... }}` → `bg-primary`
- `WorkOverviewPage.tsx`: 3 instances of `bg/hsl references → hsl(var(--primary))`
- **Left as-is:** intentional lightness variants (35%, 50%, 60%, 80%) for charts and accent text

#### 2. BodyText usage in components/
Replaced inline `text-[10px] font-mono uppercase ...` with `<BodyText>` in:
- `ProjectCard.tsx` (3 instances — tag, desc x2)
- `Header.tsx` (3 instances — "Navigation", "Get Started", "Socials")
- `Footer.tsx` (1 instance — description p)
- `SectionHeader.tsx` (1 instance — description p)
- `SectionFooter.tsx` (1 instance — leftText div)
- `ArticleCard.tsx` (1 instance — desc p)
- `PageHero.tsx` (1 instance — description p)
- `DarkCtaSection.tsx` (1 instance — description p)

#### 3. BodyText usage in pages/
Replaced inline instances in:
- `Home.tsx` (10 instances — labels, headlines, captions)
- `WorkPage.tsx` (5 instances — stats, visual labels, section titles)
- `InsightsPage.tsx` (1 instance — featured description)

#### 4. BodyText tracking prop
Added `tracking` prop to BodyText supporting `"widest"` (default), `"0.2em"`, `"0.3em"`, `"0.4em"`.

### ⏭️ Skipped (Conscious Decision)
- **PageHero in Home.tsx**: Home hero is structurally different (framer-motion wrapper, CTA buttons, tag bar after description). Forcing it into PageHero would add unnecessary complexity. The component already serves 3 pages well.

### 📝 Remaining Inline `text-[10px] font-mono` (Not Suitable for BodyText)
These are by design — they use different sizes (`text-[9px]`, `text-xs`), no `uppercase`, no `font-bold`, or are layout containers/buttons:
- Button/link components in Header, Footer, SectionFooter, PrimaryButton
- Layout containers with flex/grid in various files
- Status messages with custom colors (error/success)
- `text-[9px]` elements (read times, tags)
- Elements with custom colors (`text-[#0a0a0a]`, `text-white/70`, `text-primary/60`)

### 🔮 Future Ideas (Low Priority)
- Add `variant` support to ProjectCard to pass `bg-primary` as a class instead of inline HSL
- Consider a `TagText` component for `text-[9px]` mono pattern
