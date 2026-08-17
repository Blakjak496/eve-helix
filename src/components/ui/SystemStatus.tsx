"use client";

import { useEffect, useState } from "react";

import { fetchSystemStatus, type SystemStatusValue } from "@/lib/helixApi";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

const STATUS_TEXT: Record<SystemStatusValue, string> = {
  1: "All systems operational",
  2: "Systems under maintenance",
  3: "All systems down",
  unreachable: "All systems down",
  unknown: "System status unknown",
};

const STATUS_VARIANT: Record<SystemStatusValue, "online" | "warning" | "danger" | "offline"> = {
  1: "online",
  2: "warning",
  3: "danger",
  unreachable: "danger",
  unknown: "offline",
};

export function SystemStatus() {
  const [status, setStatus] = useState<SystemStatusValue | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchSystemStatus().then((value) => {
      if (!ignore) setStatus(value);
    });

    return () => {
      ignore = true;
    };
  }, []);

  if (status === null) return null;

  return <StatusIndicator variant={STATUS_VARIANT[status]}>{STATUS_TEXT[status]}</StatusIndicator>;
}
