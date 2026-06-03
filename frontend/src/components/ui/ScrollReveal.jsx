import { useEffect, useRef } from "react";

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in-view");
          if (stagger) {
            node.querySelectorAll(".stagger-item").forEach((el, i) => {
              el.style.setProperty("--stagger-i", String(i));
            });
          }
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [stagger]);

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${stagger ? "scroll-reveal--stagger" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
