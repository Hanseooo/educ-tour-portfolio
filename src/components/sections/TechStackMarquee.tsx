// TechStackMarquee.tsx - FIXED VERSION
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  wrap,
  useMotionValueEvent,
  type AnimationPlaybackControls,
} from "framer-motion";
import { Card } from "@/components/ui/card";
import { useScrollStore } from "@/store/scrollStore";

const row1 = [
  { name: "HTML", img: "/logo/HTML5.svg" },
  { name: "CSS", img: "/logo/CSS3.svg" },
  { name: "JavaScript", img: "/logo/JavaScript.svg" },
  { name: "React", img: "/logo/React.svg" },
  { name: "TypeScript", img: "/logo/TypeScript.svg" },
  { name: "TailwindCSS", img: "/logo/Tailwind-CSS.svg" },
  { name: "Bootstrap", img: "/logo/Bootstrap.svg" },
  { name: "Zustand", img: "/logo/zustand-original.svg" },
  { name: "shadcn", img: "/logo/shadcn-ui-seeklogo.svg" },
];

const row2 = [
  { name: "Python", img: "/logo/Python.svg" },
  { name: "Django", img: "/logo/Django.svg" },
  { name: "Postgres", img: "/logo/PostgresSQL.svg" },
  { name: "MySQL", img: "/logo/MySQL.svg" },
  { name: "PHP", img: "/logo/PHP.svg" },
  { name: "Firebase", img: "/logo/Firebase.svg" },
  { name: "Supabase", img: "/logo/supabase-icon.svg" },
  { name: "Scikit-learn", img: "/logo/scikit-learn.svg" },
];

export default function TechStackMarquee() {
  const velocity = useScrollStore((s) => s.velocity);
  const velocityMV = useMotionValue(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  const stop1 = useRef<AnimationPlaybackControls | null>(null);
  const stop2 = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    velocityMV.set(velocity);
  }, [velocity, velocityMV]);

  const speed = useTransform(velocityMV, [-2, 2], [-8, 8]);
  const smoothSpeed = useSpring(speed, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(smoothSpeed, "change", (v) => {
    stop1.current?.stop();
    stop2.current?.stop();

    x1.set(x1.get() + v);
    x2.set(x2.get() - v * 0.7);
  });

  useMotionValueEvent(velocityMV, "change", (v) => {
    if (Math.abs(v) < 0.01) {
      stop1.current = animate(x1, x1.get() + 120, { type: "inertia", velocity: 180, power: 0.2, timeConstant: 250 });
      stop2.current = animate(x2, x2.get() - 100, { type: "inertia", velocity: 160, power: 0.2, timeConstant: 250 });
    }
  });

  const cardSize = 280;
  const gap = 48;
  const row1Width = row1.length * (cardSize + gap);
  const row2Width = row2.length * (cardSize + gap);

  const wrappedX1 = useTransform(x1, (v) => `${wrap(-row1Width, 0, v)}px`);
  const wrappedX2 = useTransform(x2, (v) => `${wrap(-row2Width, 0, v)}px`);

  return (
    <div className="w-full overflow-hidden flex flex-col gap-8 items-center">
      <div className="relative w-full max-w-[95%] flex flex-col gap-8">
        {/* Row 1 */}
        <motion.div className="flex gap-12 will-change-transform" style={{ x: wrappedX1 }}>
          {[...row1, ...row1].map((tech, i) => (
            <Card
              key={`r1-${i}`}
              className="flex items-center justify-center w-80 h-80 aspect-square bg-card/90 shadow-xl rounded-2xl p-6"
            >
              <img
                src={tech.img}
                alt={tech.name}
                className="w-48 lg:w-56 h-auto object-contain opacity-95"
              />
            </Card>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex gap-12 will-change-transform" style={{ x: wrappedX2 }}>
          {[...row2, ...row2].map((tech, i) => (
            <Card
              key={`r2-${i}`}
              className="flex items-center justify-center w-80 h-80 aspect-square bg-card/90 shadow-xl rounded-2xl p-6"
            >
              <img
                src={tech.img}
                alt={tech.name}
                className="w-48 lg:w-56 h-auto object-contain opacity-95"
              />
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}