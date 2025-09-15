import { useEffect } from "react";

export default function useClickOutside(refs, onOutside, options = {}) {
  const {
    ignoreRefs = [],
    ignoreSelectors = [],
    disabled = false,
    detectEscape = true,
    events = ["pointerdown"],
  } = options;

  useEffect(() => {
    if (disabled) return;

    const arr = Array.isArray(refs) ? refs : [refs];
    const ignoreArr = Array.isArray(ignoreRefs) ? ignoreRefs : [ignoreRefs];

    const isInRefs = (target) =>
      arr.some((r) => r?.current && (r.current === target || r.current.contains(target)));

    const isInIgnoreRefs = (target) =>
      ignoreArr.some((r) => r?.current && (r.current === target || r.current.contains(target)));

    const isInIgnoreSelectors = (target) =>
      ignoreSelectors.some((sel) => target.closest?.(sel));

    const handler = (e) => {
      // Sağ tık vb. istersen atla
      if ("button" in e && e.button === 2) return;

      const target = e.target;
      if (!target) return;

      // Yol (Shadow DOM/portal güvenliği için)
      const path = typeof e.composedPath === "function" ? e.composedPath() : null;

      // İçeride mi?
      const inside =
        (path && arr.some((r) => r?.current && path.includes(r.current))) ||
        isInRefs(target);

      if (inside) return;

      // Yoksayılacak alanlar?
      if (isInIgnoreRefs(target) || isInIgnoreSelectors(target)) return;

      onOutside?.(e);
    };

    // ESC ile kapat
    const onKey = (e) => {
      if (!detectEscape) return;
      if (e.key === "Escape") onOutside?.(e);
    };

    // Capture aşamasında dinle (erken yakala)
    events.forEach((evt) => document.addEventListener(evt, handler, true));
    document.addEventListener("keydown", onKey, true);

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, handler, true));
      document.removeEventListener("keydown", onKey, true);
    };
  }, [refs, onOutside, ignoreRefs, ignoreSelectors, disabled, detectEscape, events]);
}
