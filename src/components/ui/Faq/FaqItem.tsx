import { ReactNode, useState } from "react";
import { IconXMark } from "@tabler/icons-react";

interface FaqItemProps {
  children: ReactNode;
}

export default function FaqItem({ children }: FaqItemProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`${"faq-item"} ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <IconXMark className={`x-icon ${open ? "open" : ""}`} />
      {children}
    </div>
  );
}
