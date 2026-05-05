// useDragScroll.ts
import { useRef, useEffect } from "react";

export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Velocidade do scroll (ajuste o multiplicador)
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return ref;
};
