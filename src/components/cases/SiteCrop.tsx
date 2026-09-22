import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./SiteCrop.module.css";

/*
 * Точный крупный план реального скриншота сайта.
 * Область задаётся долями исходного кадра: x1/y1 — левый верхний угол,
 * x2/y2 — правый нижний. Пропорции рамки считаются по области, поэтому
 * изображение не искажается и в кадр попадает ровно то, что нужно.
 */
type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  area: { x1: number; y1: number; x2: number; y2: number };
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
};

export function SiteCrop({
  src,
  width,
  height,
  alt,
  area,
  className,
  style,
  sizes = "50vw",
  priority,
}: Props) {
  const w = area.x2 - area.x1;
  const h = area.y2 - area.y1;
  const frame: CSSProperties = {
    aspectRatio: `${w * width} / ${h * height}`,
    ...style,
  };
  const inner: CSSProperties = {
    width: `${100 / w}%`,
    height: `${100 / h}%`,
    left: `${(-area.x1 / w) * 100}%`,
    top: `${(-area.y1 / h) * 100}%`,
  };

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")} style={frame}>
      <div className={styles.inner} style={inner}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
