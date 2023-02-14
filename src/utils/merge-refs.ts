import type { MutableRefObject, Ref, RefCallback } from "react";

export function mergeRefs<T = any>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
