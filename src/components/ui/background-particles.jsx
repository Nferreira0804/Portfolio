"use client";

import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

export const BackgroundParticles = ({
  className = "",
  quantity = 80,
  staticity = 50,
  ease = 50,
  size = 0.8,
  color = "#ffffff",
  connectionDistance = 100,
  refresh,
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 }); // Fuera de pantalla inicialmente
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef(null);

  const rgb = hexToRgb(color);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleMouseMove = (event) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        mouse.current.x = event.clientX - rect.left;
        mouse.current.y = event.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };

    const handleResize = () => initCanvas();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvasContainerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [color]);

  const particleParams = () => {
    return {
      x: Math.random() * canvasSize.current.w,
      y: Math.random() * canvasSize.current.h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + size,
      alpha: 0,
      targetAlpha: Math.random() * 0.5 + 0.2,
    };
  };

  const initCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);

      particles.current = Array.from({ length: quantity }, () => particleParams());
    }
  };

  const drawConnections = (p1, index) => {
    for (let j = index + 1; j < particles.current.length; j++) {
      const p2 = particles.current[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectionDistance) {
        context.current.beginPath();
        context.current.strokeStyle = `rgba(${rgb.join(",")}, ${(1 - dist / connectionDistance) * 0.2
          })`;
        context.current.lineWidth = 0.5;
        context.current.moveTo(p1.x, p1.y);
        context.current.lineTo(p2.x, p2.y);
        context.current.stroke();
      }
    }

    // Conexión opcional al mouse
    const mDx = p1.x - mouse.current.x;
    const mDy = p1.y - mouse.current.y;
    const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
    if (mDist < connectionDistance * 1.5) {
      context.current.beginPath();
      context.current.strokeStyle = `rgba(${rgb.join(",")}, ${(1 - mDist / (connectionDistance * 1.5)) * 0.4
        })`;
      context.current.moveTo(p1.x, p1.y);
      context.current.lineTo(mouse.current.x, mouse.current.y);
      context.current.stroke();
    }
  };

  const animate = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    particles.current.forEach((p, i) => {
      // Movimiento base
      p.x += p.vx;
      p.y += p.vy;

      // Suave aparición inicial
      if (p.alpha < p.targetAlpha) p.alpha += 0.005;

      // Rebote en bordes
      if (p.x < 0 || p.x > canvasSize.current.w) p.vx *= -1;
      if (p.y < 0 || p.y > canvasSize.current.h) p.vy *= -1;

      // Dibujar punto
      context.current.beginPath();
      context.current.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      context.current.fillStyle = `rgba(${rgb.join(",")}, ${p.alpha})`;
      context.current.fill();

      // Dibujar líneas
      drawConnections(p, i);
    });

    rafID.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className={twMerge("pointer-events-none w-full h-full", className)}
      ref={canvasContainerRef}
      {...props}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};