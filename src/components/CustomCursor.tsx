import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "drag" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile or has touch capabilities
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest interactive ancestor
      const clickable = target.closest("a, button, input, textarea, select, [role='button']");
      const dragArea = target.closest("[data-cursor='drag']");
      const textArea = target.closest("[data-cursor='view']");

      if (dragArea) {
        setCursorType("drag");
        setCursorText("DRAG");
      } else if (textArea) {
        setCursorType("text");
        setCursorText(textArea.getAttribute("data-cursor-text") || "SCROLL");
      } else if (clickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const size = cursorType === "hover" ? 64 : cursorType === "drag" ? 80 : cursorType === "text" ? 84 : 20;

  return (
    <>
      {/* Outer follow circle */}
      <motion.div
        id="custom-cursor-outer"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          border: cursorType === "default" ? "1px solid rgba(255, 0, 128, 0.45)" : "none",
          backgroundColor:
            cursorType === "hover"
              ? "rgba(255, 0, 128, 0.15)"
              : cursorType === "drag"
              ? "rgba(0, 210, 255, 0.9)"
              : cursorType === "text"
              ? "rgba(255, 0, 128, 0.95)"
              : "rgba(8, 8, 8, 0.05)",
          backdropFilter: cursorType === "hover" ? "blur(3px)" : "none",
          boxShadow:
            cursorType === "drag" || cursorType === "text"
              ? "0 10px 25px -5px rgba(0, 210, 255, 0.5), 0 0 15px rgba(255, 0, 128, 0.3)"
              : "none",
        }}
        animate={{
          scale: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {(cursorType === "drag" || cursorType === "text") && (
          <span className="text-[10px] font-mono tracking-widest font-bold text-white select-none animate-pulse">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        id="custom-cursor-inner"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#FF0080] rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType === "default" ? 1 : 0,
        }}
      />
    </>
  );
}
