import { useEffect, useState, type RefObject } from "react";

type RefType = HTMLElement | { getElement: () => HTMLElement } | null;

export interface UseMouseHoverProps {
  ref: RefObject<RefType>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  timeout?: number;
}

function getElement(ref: RefType) {
  return ref && "getElement" in ref ? ref.getElement() : ref;
}

/**
 * MapState component for managing map state
 */
export function useMouseHover({
  ref,
  onMouseEnter,
  onMouseLeave,
  timeout = 100,
}: UseMouseHoverProps) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = getElement(ref.current);

    if (!element) {
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      onMouseEnter?.();
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        onMouseLeave?.();
        setIsHovering(false);
      }, timeout);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave, ref, timeout]);

  return isHovering;
}
