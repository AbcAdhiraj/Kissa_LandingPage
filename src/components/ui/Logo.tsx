import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/hdlogo.png"
        alt="Kissa"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </div>
  );
}
