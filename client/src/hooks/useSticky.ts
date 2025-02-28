import { useSyncExternalStore } from "react";

function subscribe(callback: { (this: Window, ev: Event): any }) {
  window.addEventListener("scroll", callback);
  return () => window.removeEventListener("scroll", callback);
}

export const useSticky = (): { sticky: boolean } => {
  const sticky: boolean = useSyncExternalStore(
    subscribe,
    (): boolean => window.scrollY > 80
  );

  return {
    sticky,
  };
};
