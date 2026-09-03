import { Package, Clock, Truck, MapPin, CheckCircle2 } from "lucide-react";
import { Order, OrderStatus } from "@/types";

const STATUS_ICONS: Record<OrderStatus, typeof Package> = {
  pending: Package,
  processing: Clock,
  ready_for_sacco: Package,
  "picked-up": Truck,
  "in-transit": Truck,
  "at-stage": MapPin,
  delivered: CheckCircle2,
  cancelled: Package,
};

interface OrderTimelineProps {
  order: Order;
}

/**
 * Renders an order's delivery timeline from its live `timeline` field.
 * Shared by the customer Track Order page and the Seller Portal's order
 * detail view so both always show the exact same status/history — there is
 * no separate, seller-only or customer-only copy of this data.
 */
export function OrderTimeline({ order }: OrderTimelineProps) {
  const currentStep = order.timeline.filter((step) => step.completed).slice(-1)[0];

  return (
    <div>
      {currentStep && (
        <div className="mb-6 flex items-center gap-4 bg-brand-light-green rounded-xl p-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center animate-pulse shrink-0">
            {(() => {
              const Icon = STATUS_ICONS[currentStep.status];
              return <Icon className="h-6 w-6 text-primary-foreground" />;
            })()}
          </div>
          <div>
            <p className="font-semibold text-foreground">{currentStep.label}</p>
            <p className="text-sm text-muted-foreground">{currentStep.description}</p>
          </div>
        </div>
      )}

      <div className="space-y-0">
        {order.timeline.map((step, index) => {
          const Icon = STATUS_ICONS[step.status];
          const isActive = step.status === currentStep?.status;
          return (
            <div key={step.status} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    step.completed && !isActive
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {index < order.timeline.length - 1 && (
                  <div className={`w-0.5 h-16 ${step.completed ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-8">
                <h4 className={`font-medium ${!step.completed ? "text-muted-foreground" : "text-foreground"}`}>
                  {step.label}
                </h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {step.timestamp && <p className="text-xs text-muted-foreground mt-1">{step.timestamp}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
