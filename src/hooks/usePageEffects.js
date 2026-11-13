import { useEffect } from "react";

export function usePageEffects() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll(".reveal");
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -35px 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));

    const hero = document.querySelector(".hero");
    const about = document.querySelector(".about-art");
    let frame = 0;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    function update() {
      frame = 0;
      if (motion.matches) return;
      const heroBounds = hero.getBoundingClientRect();
      if (heroBounds.bottom > 0)
        hero.style.setProperty(
          "--hero-scroll",
          clamp(-heroBounds.top / heroBounds.height),
        );
      const aboutBounds = about.getBoundingClientRect();
      if (aboutBounds.top < window.innerHeight && aboutBounds.bottom > 0) {
        about.style.setProperty(
          "--about-progress",
          clamp(
            (window.innerHeight - aboutBounds.top) /
              (window.innerHeight + aboutBounds.height),
          ),
        );
      }
    }
    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();
    // React mounts after initial document parsing; honor direct section links.
    let hashFrame = 0;
    if (window.location.hash) {
      hashFrame = requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        target?.scrollIntoView({ behavior: "instant" });
      });
    }
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(hashFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.documentElement.classList.remove("js-motion");
    };
  }, []);
}
