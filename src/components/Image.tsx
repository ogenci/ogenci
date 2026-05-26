import type { ImgHTMLAttributes } from "react"

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string
  alt: string
  loading?: "lazy" | "eager"
}

export function Image({ src, alt, loading = "lazy", className, width, height, ...props }: ImageProps) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp")
  const hasWebp = webpSrc !== src

  return (
    <picture>
      {hasWebp && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    </picture>
  )
}
