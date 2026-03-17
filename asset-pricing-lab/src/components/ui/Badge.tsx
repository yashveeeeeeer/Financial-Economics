interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
}

export default function Badge({ text, color = '#3B82F6', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {text}
    </span>
  );
}
