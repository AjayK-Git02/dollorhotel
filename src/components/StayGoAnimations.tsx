"use client";

import { useEffect } from "react";

export function StayGoAnimations() {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const heroWatermark = document.getElementById("hero-watermark");
    const heroBottom = document.getElementById("hero-bottom");
    const readingText = document.getElementById("reading-text");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 1. Sticky Navbar styling
      if (navbar) {
        if (scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
      }

      // 2. Hero Parallax (Moves elements while they are visible)
      if (scrollY <= windowHeight) {
        if (heroWatermark) {
          heroWatermark.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.4}px))`;
        }
        if (heroBottom) {
          heroBottom.style.transform = `translateY(-${scrollY * 0.2}px)`;
          heroBottom.style.opacity = String(1 - scrollY / (windowHeight * 0.8));
        }
      }

      // 3. Text Reading Fill Animation
      if (readingText) {
        const rect = readingText.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          let progress = (windowHeight - rect.top) / (windowHeight / 1.5);
          progress = Math.max(0, Math.min(1, progress));
          readingText.style.setProperty("--fill", `${progress * 100}%`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init

    // 4. Fade-up Elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    // Trigger initial fade-ups instantly
    setTimeout(() => {
      document.querySelectorAll(".hero-container .fade-up").forEach((el) => el.classList.add("active"));
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
