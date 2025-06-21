import React, { useRef } from "react";
import { useFela } from "react-fela";
import { useMouseHover, type UseMouseHoverProps } from "./useMouseHover.js";

export type DemoProps = Omit<UseMouseHoverProps, "ref">;

export function Demo({ timeout, onMouseEnter, onMouseLeave }: DemoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { css } = useFela();
  const isHovering = useMouseHover({
    ref,
    onMouseEnter,
    onMouseLeave: () => {
      console.log("mouseleave", { isHovering });
      onMouseLeave?.();
    },
    timeout,
  });

  return (
    <div
      className={css({
        padding: "50px",
      })}
    >
      <div
        className={css({
          display: "block",
          width: "50%",
          backgroundColor: "orange",
          padding: "50px",
        })}
        ref={ref}
      >
        {isHovering ? "Hovering" : "Not hovering"}
      </div>
    </div>
  );
}
