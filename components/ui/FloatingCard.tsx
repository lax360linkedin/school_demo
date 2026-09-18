"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees, default: 5
  perspective?: number; // Perspective distance in px, default: 1000
  scaleOnHover?: number; // Scale factor on hover, default: 1.02
  elevatedDepth?: number; // translateZ elevation in px, default: 10
  disabled?: boolean;
}

/**
 * FloatingCard - High-performance 3D interactive floating card component.
 * Features:
 * - requestAnimationFrame with spring-like LERP interpolation (zero React re-renders on mousemove).
 * - Subtle ±5deg 3D tilt responding to cursor movement.
 * - Gentle scale and translateZ elevation.
 * - Smooth shadow elevation.
 * - Automatically pauses RAF loop when resting (0 CPU overhead).
 * - Responsive: Reduced tilt on tablet, disabled on touch devices (mobile).
 * - Accessibility: Disabled automatically if prefers-reduced-motion is active.
 */
export default function FloatingCard({
  children,
  className = "",
  maxTilt = 5,
  perspective = 1000,
  scaleOnHover = 1.02,
  elevatedDepth = 10,
  disabled = false,
  style,
  ...rest
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Target physics values (driven by mouse events)
  const targetXRef = useRef<number>(0);
  const targetYRef = useRef<number>(0);
  const targetScaleRef = useRef<number>(1);
  const targetZRef = useRef<number>(0);

  // Current animated values (interpolated via LERP)
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const currentScaleRef = useRef<number>(1);
  const currentZRef = useRef<number>(0);

  const isHoveredRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);

  // Silky-smooth spring LERP factor
  const LERP_FACTOR = 0.09;

  const updateTransform = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    // Interpolate towards target values
    currentXRef.current += (targetXRef.current - currentXRef.current) * LERP_FACTOR;
    currentYRef.current += (targetYRef.current - currentYRef.current) * LERP_FACTOR;
    currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * LERP_FACTOR;
    currentZRef.current += (targetZRef.current - currentZRef.current) * LERP_FACTOR;

    const rx = currentXRef.current.toFixed(2);
    const ry = currentYRef.current.toFixed(2);
    const s = currentScaleRef.current.toFixed(3);
    const z = currentZRef.current.toFixed(1);

    card.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${z}px) scale3d(${s}, ${s}, ${s})`;

    // Check if card has returned to rest when unhovered
    const dx = Math.abs(targetXRef.current - currentXRef.current);
    const dy = Math.abs(targetYRef.current - currentYRef.current);
    const ds = Math.abs(targetScaleRef.current - currentScaleRef.current);
    const dz = Math.abs(targetZRef.current - currentZRef.current);

    if (!isHoveredRef.current && dx < 0.01 && dy < 0.01 && ds < 0.001 && dz < 0.05) {
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
      isRunningRef.current = false;
      rafIdRef.current = null;
      return;
    }

    rafIdRef.current = requestAnimationFrame(updateTransform);
  }, [perspective]);

  const startLoop = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafIdRef.current = requestAnimationFrame(updateTransform);
    }
  }, [updateTransform]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disabled) return;

    // Accessibility check: prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Touch device check (mobile)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handlePointerEnter = () => {
      isHoveredRef.current = true;
      targetScaleRef.current = scaleOnHover;
      targetZRef.current = elevatedDepth;
      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isHoveredRef.current) {
        isHoveredRef.current = true;
      }

      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Tablet check for reduced rotation intensity
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const effectiveMaxTilt = isTablet ? maxTilt * 0.5 : maxTilt;

      // Coordinates normalized from card center: [-0.5, +0.5]
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      // Tilt toward mouse
      targetXRef.current = -ny * (effectiveMaxTilt * 2);
      targetYRef.current = nx * (effectiveMaxTilt * 2);

      startLoop();
    };

    const handlePointerLeave = () => {
      isHoveredRef.current = false;
      targetXRef.current = 0;
      targetYRef.current = 0;
      targetScaleRef.current = 1;
      targetZRef.current = 0;
      startLoop();
    };

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [disabled, elevatedDepth, maxTilt, scaleOnHover, startLoop]);

  return (
    <div
      ref={cardRef}
      className={`transition-shadow duration-500 ease-out will-change-transform ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
