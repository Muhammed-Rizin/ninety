import React from "react";
import type { LucideIcon } from "lucide-react";
import "../../styles/widget.css";

interface IconButtonProps {
  icon: LucideIcon;
  onClick: (e: React.MouseEvent) => void;
  label?: string;
  title?: string;
  className?: string;
}

export function IconButton({
  icon: Icon,
  onClick,
  label,
  title,
  className = "",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`icon-btn app-region-no-drag ${label ? "icon-btn-label" : ""} ${className}`}
      title={title}
    >
      <Icon size={label ? 12 : 14} />
      {label && <span>{label}</span>}
    </button>
  );
}
