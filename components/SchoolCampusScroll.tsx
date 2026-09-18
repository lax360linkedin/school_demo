"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import EducationTextOverlays from "./EducationTextOverlays";

const TOTAL_FRAMES = 120;

export default function SchoolCampusScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [initialFrameReady, setInitialFrameReady] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render a specific frame on canvas with intelligent cover scaling
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find the requested frame or closest loaded frame
    let imgToDraw = imagesRef.current[frameIndex];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      // Look for nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[Math.max(0, frameIndex - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          imgToDraw = prev;
          break;
        }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES - 1, frameIndex + offset)];
        if (next && next.complete && next.naturalWidth > 0) {
          imgToDraw = next;
          break;
        }
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width;
    const height = canvas.height;

    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;

    // Intelligent cover calculation
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const destWidth = imgWidth * scale;
    const destHeight = imgHeight * scale;
    const destX = (width - destWidth) / 2;
    const destY = (height - destHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imgToDraw, destX, destY, destWidth, destHeight);

    lastRenderedFrameRef.current = frameIndex;
  }, []);

  // Canvas resize logic with DPR support
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // Progressive frame preloading
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    let loadedCount = 0;

    const getFrameUrl = (index: number) => {
      return `/images/school/${index + 1}.webp`;
    };

    // Priority 1: Load frame 0 immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setInitialFrameReady(true);
      handleResize();
      renderFrame(0);
    };

    // Priority 2: Preload initial batch (frames 1 to 24)
    const preloadBatch = (start: number, end: number, nextBatchFn?: () => void) => {
      let batchLoaded = 0;
      const totalInBatch = end - start;
      if (totalInBatch <= 0) {
        if (nextBatchFn) nextBatchFn();
        return;
      }

      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          loadedCount++;
          batchLoaded++;
          setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

          if (batchLoaded === totalInBatch && nextBatchFn) {
            nextBatchFn();
          }
        };
        img.onerror = () => {
          if (isCancelled) return;
          loadedCount++;
          batchLoaded++;
          if (batchLoaded === totalInBatch && nextBatchFn) {
            nextBatchFn();
          }
        };
      }
    };

    // Stage 1: Load frames 1 to 25
    preloadBatch(1, 25, () => {
      // Stage 2: Load frames 25 to 70
      preloadBatch(25, 70, () => {
        // Stage 3: Load frames 70 to 120
        preloadBatch(70, TOTAL_FRAMES);
      });
    });

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [handleResize, renderFrame]);

  // Sync scroll progress to canvas frames with requestAnimationFrame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress 0 -> 1 to frame index 0 -> 119
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1))));
    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    }
  });

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[500vh] bg-[#FAF8F5]"
    >
      {/* Sticky Canvas & Story Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Cinematic HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic Text Overlays Tracked to Scroll */}
        <EducationTextOverlays scrollYProgress={scrollYProgress} />

        {/* Preloader Overlay if Initial Frame is loading */}
        {!initialFrameReady && (
          <div className="absolute inset-0 z-30 bg-[#FAF8F5] flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-stone-300 border-t-amber-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center p-3.5">
                <NextImage
                  src="/logo.png"
                  alt="LAX360 Crest"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold tracking-wider text-slate-800">
                INITIATING LAX360 CINEMATIC EXPERIENCE
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {loadingProgress}% assets loaded
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
