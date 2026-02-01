export default function LetterField({ seed = 1 }: { seed?: number }) {
  const chars = "C&G*IL{NOPR[T0]12%34}+=56789/-;:$#@!)|<>(";

  function seededRandom(n: number) {
    return Math.abs(Math.sin(n * 9999)) % 1;
  }

  const letters = Array.from({ length: 300 }, (_, i) => {
    const rand = seededRandom(seed + i);
    return chars[Math.floor(rand * chars.length)];
  });

  return (
    <div className="absolute inset-0 overflow-hidden z-10 px-3">
      <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[13px] font-mono leading-none">
        {letters.map((char, i) => (
          <span
            key={i}
            className="
                text-secondary-foreground/10
                hover:text-selection
              "
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
