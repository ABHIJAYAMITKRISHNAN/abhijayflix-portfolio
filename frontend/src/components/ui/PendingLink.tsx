import type { ReactNode } from "react";

interface PendingLinkProps {
  href: string | null | undefined;
  children: ReactNode;
  className?: string;
  pendingLabel?: string;
  icon?: ReactNode;
  download?: boolean;
}

/**
 * Renders a real link when a URL has been configured in the backend, otherwise a
 * clearly disabled "coming soon" pill. Nothing is ever invented.
 */
export function PendingLink({ href, children, className = "", pendingLabel = "Coming soon", icon, download }: PendingLinkProps) {
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {icon}
        {children}
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      title={`${pendingLabel}: not added yet`}
      className={`${className} cursor-not-allowed opacity-45`}
    >
      {icon}
      {children}
      <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">
        {pendingLabel}
      </span>
    </span>
  );
}
