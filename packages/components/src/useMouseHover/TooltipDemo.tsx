import React, { useRef, useState } from "react";
import { useFela } from "react-fela";
import type { DemoProps } from "./Demo.js";
import { useMouseHover } from "./useMouseHover.js";

export function TooltipDemo({
  timeout,
  onMouseEnter,
  onMouseLeave,
}: DemoProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { css } = useFela();
  const isTriggerHovering = useMouseHover({
    ref: triggerRef,
    onMouseEnter: () => {
      setIsTooltipOpen(true);
      onMouseEnter?.();
    },
    onMouseLeave: () => {
      if (!isTooltipHovering) {
        setIsTooltipOpen(false);
      }
      onMouseLeave?.();
    },
    timeout,
  });
  const isTooltipHovering = useMouseHover({
    ref: tooltipRef,
    onMouseEnter,
    onMouseLeave: () => {
      console.log("tooltip: mouseleave", { isTriggerHovering });
      if (!isTriggerHovering) {
        setIsTooltipOpen(false);
      }
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
          width: "25%",
          backgroundColor: "orange",
          padding: "50px",
        })}
        ref={triggerRef}
      >
        Trigger:
        {isTriggerHovering ? " hovering" : " not hovering"}
      </div>
      {isTooltipOpen && (
        <div
          className={css({
            display: "block",
            width: "50%",
            backgroundColor: "teal",
            color: "white",
            padding: "50px",
          })}
          ref={tooltipRef}
        >
          Tooltip:
          {isTooltipHovering ? " hovering" : " not hovering"}
        </div>
      )}
    </div>
  );
}
