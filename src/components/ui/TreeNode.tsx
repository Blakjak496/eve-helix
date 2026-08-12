import type { ReactNode } from "react";
import clsx from "clsx";

type TreeNodeMethod = "build" | "buy" | "mixed" | "invention";

interface TreeNodeProps {
  name: string;
  quantity?: string;
  price?: string;
  imageSrc?: string;
  method?: TreeNodeMethod;
}

export function TreeNode({ name, quantity, price, imageSrc, method }: TreeNodeProps) {
  return (
    <div className={clsx("tree-node", method && `tree-node--${method}`)}>
      {imageSrc ? (
        // EVE item renders come from ESI/image servers, not local assets.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt="" />
      ) : null}
      <div>
        <div className="tree-node__name">{name}</div>
        {quantity ? <div className="tree-node__quantity">{quantity}</div> : null}
      </div>
      {price ? <div className="tree-node__price">{price}</div> : null}
    </div>
  );
}

interface BuildTreeProps {
  children: ReactNode;
}

export function BuildTree({ children }: BuildTreeProps) {
  return <div className="build-tree">{children}</div>;
}
