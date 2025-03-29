export default function ToolItem({ name, icon, className }: { name: string; icon: string; className?: string }) {
  return (
    <li className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <img src={`/img/about/${icon}`} className="h-[40px] w-[40px]" draggable={false} alt={name} />
      <p>{name}</p>
    </li>
  );
}
