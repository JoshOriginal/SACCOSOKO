import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "New", className: "bg-muted text-muted-foreground border-transparent" },
  processing: { label: "Processing", className: "bg-secondary text-secondary-foreground border-transparent" },
  ready_for_sacco: { label: "Ready for SACCO", className: "bg-brand-orange text-white border-transparent" },
  "picked-up": { label: "Handed to SACCO", className: "bg-secondary text-secondary-foreground border-transparent" },
  "in-transit": { label: "In Transit", className: "bg-secondary text-secondary-foreground border-transparent" },
  "at-stage": { label: "At Stage", className: "bg-secondary text-secondary-foreground border-transparent" },
  delivered: { label: "Delivered", className: "bg-primary text-primary-foreground border-transparent" },
  cancelled: { label: "Cancelled", className: "bg-destructive text-destructive-foreground border-transparent" },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const meta = STATUS_META[status];
  return <Badge className={cn(meta.className, className)}>{meta.label}</Badge>;
}
