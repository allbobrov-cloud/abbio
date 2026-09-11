import styles from "./HeroDashboard.module.css";

type AnimatedChartProps = {
  variant: "large" | "sparkline";
  tone?: "blue" | "green";
};

export function AnimatedChart({ variant, tone = "blue" }: AnimatedChartProps) {
  if (variant === "sparkline") {
    const stroke = tone === "green" ? "#B8EF42" : "#6C7CFF";
    const path =
      tone === "green"
        ? "M4 9 C17 10 18 19 31 17 C44 15 45 30 59 29 C73 28 75 39 89 35 C104 31 111 43 124 38 C139 33 143 43 152 48"
        : "M4 44 C18 43 18 29 31 35 C43 41 45 18 58 23 C72 28 75 34 88 24 C103 12 111 31 124 22 C139 12 143 8 152 4";

    return (
      <svg
        className={styles.sparkline}
        viewBox="0 0 156 54"
        fill="none"
        aria-hidden="true"
      >
        <path
          className={styles.sparkGlow}
          d={path}
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          className={styles.sparkLine}
          d={path}
          stroke={stroke}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={styles.chart}
      viewBox="0 0 430 214"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chartFill" x1="224" y1="37" x2="224" y2="206">
          <stop stopColor="#5B55FF" stopOpacity="0.34" />
          <stop offset="1" stopColor="#5B55FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chartStroke" x1="40" y1="151" x2="397" y2="53">
          <stop stopColor="#507CFF" />
          <stop offset="0.52" stopColor="#7C5CFF" />
          <stop offset="1" stopColor="#465BFF" />
        </linearGradient>
      </defs>

      <g className={styles.grid}>
        <path d="M32 46H400" />
        <path d="M32 90H400" />
        <path d="M32 134H400" />
        <path d="M32 178H400" />
        <path d="M72 24V192" />
        <path d="M152 24V192" />
        <path d="M232 24V192" />
        <path d="M312 24V192" />
        <path d="M392 24V192" />
      </g>

      <path
        className={styles.chartArea}
        d="M38 164 C56 141 68 156 88 143 C104 133 112 137 126 125 C143 108 153 121 170 101 C188 78 203 103 214 118 C232 143 244 104 263 97 C281 89 288 101 303 76 C322 45 336 79 350 73 C366 66 368 49 386 42 L386 190 L38 190 Z"
        fill="url(#chartFill)"
      />
      <path
        className={styles.chartLineGlow}
        d="M38 164 C56 141 68 156 88 143 C104 133 112 137 126 125 C143 108 153 121 170 101 C188 78 203 103 214 118 C232 143 244 104 263 97 C281 89 288 101 303 76 C322 45 336 79 350 73 C366 66 368 49 386 42"
        stroke="url(#chartStroke)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        className={styles.chartLine}
        d="M38 164 C56 141 68 156 88 143 C104 133 112 137 126 125 C143 108 153 121 170 101 C188 78 203 103 214 118 C232 143 244 104 263 97 C281 89 288 101 303 76 C322 45 336 79 350 73 C366 66 368 49 386 42"
        stroke="url(#chartStroke)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle className={styles.chartPoint} cx="386" cy="42" r="6.5" />
    </svg>
  );
}
