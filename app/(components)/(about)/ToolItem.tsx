export default function ToolItem({
  name,
  icon,
  className,
  size = 40
}: {
  name: string;
  icon: string;
  className?: string;
  size?: number;
}) {
  return (
    <li className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <img
        src={`/img/about/${icon}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        draggable={false}
        alt={name}
      />
      <p>{name}</p>
    </li>
  );
}
