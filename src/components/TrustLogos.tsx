import styles from "./TrustLogos.module.css";

const logos = [
  { name: "СБЕР МАРКЕТ", mark: "check" },
  { name: "BIOTIME", mark: "leaf" },
  { name: "LASERPROF", mark: "beam" },
  { name: "PETSHOP.RU", mark: "pet" },
  { name: "LEVEL KITCHEN", mark: "level" },
  { name: "HOOKAH PLACE", mark: "flower" }
];

export function TrustLogos() {
  const logoRow = [...logos, ...logos];

  return (
    <section className={styles.trust} aria-labelledby="trust-title">
      <div className={styles.inner}>
        <h2 id="trust-title">НАМ ДОВЕРЯЮТ</h2>
        <div className={styles.logoMarquee} aria-label="Компании, которые нам доверяют">
          <div className={styles.logos}>
            {logoRow.map((logo, index) => (
              <span
                aria-hidden={index >= logos.length}
                className={styles.logoItem}
                key={`${logo.name}-${index}`}
              >
                <LogoMark type={logo.mark} />
                <span>{logo.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMark({ type }: { type: string }) {
  return (
    <svg
      className={styles.logoMark}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {type === "check" && (
        <>
          <circle cx="16" cy="16" r="13" />
          <path d="M9.5 16.3L14 20.7L23 11.3" />
        </>
      )}
      {type === "leaf" && (
        <>
          <path d="M6 18.4C7.6 8.8 16.2 5.5 25 6.6C25.7 15.8 20.2 24.4 10.7 23.1" />
          <path d="M10 22.5C13.9 17.5 18.2 13.9 24 10.1" />
        </>
      )}
      {type === "beam" && (
        <>
          <path d="M5 22L16 6L27 22H5Z" />
          <path d="M11 19H21" />
        </>
      )}
      {type === "pet" && (
        <>
          <path d="M16 13.8C20.7 13.8 24 17.4 24 22.2C24 24.5 22.3 26 20.2 25.1C18.2 24.3 17.7 23.6 16 23.6C14.3 23.6 13.8 24.3 11.8 25.1C9.7 26 8 24.5 8 22.2C8 17.4 11.3 13.8 16 13.8Z" />
          <circle cx="10.2" cy="10.5" r="2.3" />
          <circle cx="15.1" cy="8.2" r="2.3" />
          <circle cx="20" cy="8.9" r="2.3" />
          <circle cx="24" cy="12.5" r="2.3" />
        </>
      )}
      {type === "level" && (
        <>
          <path d="M7 24V8" />
          <path d="M7 24H25" />
          <path d="M11 20L16 15L20 18L25 11" />
        </>
      )}
      {type === "flower" && (
        <>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 4.8C18.3 8 18.3 10.7 16 13.6C13.7 10.7 13.7 8 16 4.8Z" />
          <path d="M16 27.2C13.7 24 13.7 21.3 16 18.4C18.3 21.3 18.3 24 16 27.2Z" />
          <path d="M4.8 16C8 13.7 10.7 13.7 13.6 16C10.7 18.3 8 18.3 4.8 16Z" />
          <path d="M27.2 16C24 18.3 21.3 18.3 18.4 16C21.3 13.7 24 13.7 27.2 16Z" />
        </>
      )}
    </svg>
  );
}
