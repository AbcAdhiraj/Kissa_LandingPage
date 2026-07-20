export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="42" height="42" rx="4" fill="#FCF9F4" />
        <path
          d="M21 8c-3.5 0-6.5 1.5-8.5 4-2 2.5-2.5 5.5-1.5 8.5C12 23.5 16 26 21 28s9-4.5 10-7.5c1-3 .5-6-1.5-8.5C27.5 9.5 24.5 8 21 8z"
          fill="#1F4D3A"
        />
        <path
          d="M18 16c-1 1-1.5 2.5-1 4 1 2.5 4 4.5 4 4.5s3-2 4-4.5c.5-1.5 0-3-1-4-1-1-2.5-1.5-3-1.5s-2 .5-3 1.5z"
          fill="#FAF8F3"
        />
        <path
          d="M14 28c0 1 .5 1.5 1 1.5s1-.5 1-1.5-.5-1.5-1-1.5-1 .5-1 1.5z"
          fill="#F5C542"
        />
        <path
          d="M26 28c0 1-.5 1.5-1 1.5s-1-.5-1-1.5.5-1.5 1-1.5 1 .5 1 1.5z"
          fill="#E87060"
        />
        <circle cx="14" cy="30" r="0.8" fill="#7EC8E3" />
        <circle cx="28" cy="30" r="0.8" fill="#C4B8D8" />
        <circle cx="21" cy="33" r="0.6" fill="#A8C4A0" />
      </svg>
      <span
        className="font-bold text-2xl tracking-tight"
        style={{ color: "#1F4D3A" }}
      >
        KISSA
      </span>
    </div>
  );
}
