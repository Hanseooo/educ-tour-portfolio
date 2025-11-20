"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  useMotionValueEvent,
  type AnimationPlaybackControls,
} from "framer-motion";
import { Card } from "@/components/ui/card";
import { useScrollStore } from "@/store/scrollStore";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"; // shadcn drawer components

const row1 = [
  { name: "HTML", img: "/logo/HTML5.svg" },
  { name: "CSS", img: "/logo/CSS3.svg" },
  { name: "JavaScript", img: "/logo/JavaScript.svg" },
  { name: "React", img: "/logo/React.svg" },
  { name: "TypeScript", img: "/logo/TypeScript.svg" },
  { name: "TailwindCSS", img: "/logo/Tailwind-CSS.svg" },
];

const row2 = [
  { name: "Python", img: "/logo/Python.svg" },
  { name: "Django", img: "/logo/Django.svg" },
  { name: "Postgres", img: "/logo/PostgresSQL.svg" },
  { name: "MySQL", img: "/logo/MySQL.svg" },
  { name: "PHP", img: "/logo/PHP.svg" },
  { name: "Firebase", img: "/logo/Firebase.svg" },
];

const row3 = [
  { name: "Bootstrap", img: "/logo/Bootstrap.svg" },
  { name: "Zustand", img: "/logo/zustand-original.svg" },
  { name: "shadcn", img: "/logo/shadcn-ui-seeklogo.svg" },
  { name: "Supabase", img: "/logo/supabase-icon.svg" },
  { name: "Scikit-learn", img: "/logo/scikit-learn.svg" },
];

// combine all tech stacks for drawer list
const allTech = [...row1, ...row2, ...row3];

export default function TechStackMarquee() {
  const scrollY = useScrollStore((s) => s.scrollY);
  const velocity = useScrollStore((s) => s.velocity);
  const velocityMV = useMotionValue(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const containerY = useMotionValue(0);

  const stop1 = useRef<AnimationPlaybackControls | null>(null);
  const stop2 = useRef<AnimationPlaybackControls | null>(null);
  const stop3 = useRef<AnimationPlaybackControls | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    velocityMV.set(velocity);
  }, [velocity, velocityMV]);

  const speed = useTransform(velocityMV, [-5, 5], [-15, 15]);
  const smoothSpeed = useSpring(speed, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(smoothSpeed, "change", (v) => {
    stop1.current?.stop();
    stop2.current?.stop();
    stop3.current?.stop();

    x1.set(x1.get() + v * 1.2);
    x2.set(x2.get() - v * 1.2);
    x3.set(x3.get() + v * 1.2);
  });



  useMotionValueEvent(velocityMV, "change", (v) => {
    if (Math.abs(v) < 0.01) {
      stop1.current = animate(x1, x1.get() + 200, { type: "inertia", velocity: 800, power: 0.4, timeConstant: 4000 });
      stop2.current = animate(x2, x2.get() - 200, { type: "inertia", velocity: 800, power: 0.4, timeConstant: 4000 });
      stop3.current = animate(x3, x3.get() + 200, { type: "inertia", velocity: 800, power: 0.4, timeConstant: 4000 });
    }
  });

  useEffect(() => {
    const containerYTarget = scrollY * 0.05;
    const containerAnim = animate(containerY, containerYTarget, { type: "spring", stiffness: 50, damping: 20 });
    return () => containerAnim.stop();
  }, [scrollY, containerY]);

  const cardSize = 280;
  const gap = 48;
  const row1Width = row1.length * (cardSize + gap);
  const row2Width = row2.length * (cardSize + gap);
  const row3Width = row3.length * (cardSize + gap);

      useEffect(() => {
    const updateOffset = () => {
        const w = window.innerWidth;
        x1.set(-(row1Width / 2) + w / 2);
        x2.set(-(row2Width / 2) + w / 2);
        x3.set(-(row3Width / 2) + w / 2);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
    }, [row1Width, row2Width, row3Width, x1, x2, x3]);


  const wrappedX1 = useTransform(x1, (v) => ((v % row1Width) + row1Width) % row1Width - row1Width);
  const wrappedX2 = useTransform(x2, (v) => ((v % row2Width) + row2Width) % row2Width - row2Width);
  const wrappedX3 = useTransform(x3, (v) => ((v % row3Width) + row3Width) % row3Width - row3Width);

  return (
    <>
      {/* Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Tech Stack</DrawerTitle>
            </DrawerHeader>

            {/* Scrollable drawer body */}
            <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto hide-scrollbar bg-foreground/5 rounded-lg p-4">
            {allTech.map((tech) => (
                <div
                key={tech.name}
                className="flex items-center gap-4 p-2 rounded hover:bg-muted cursor-pointer border-b last:border-b-0"
                >
                <img src={tech.img} alt={tech.name} className="w-8 h-8 object-contain" />
                <span className="font-medium">{tech.name}</span>
                </div>
            ))}
            </div>
            
        </DrawerContent>
        </Drawer>



      <motion.div className="w-full flex flex-col gap-8 items-center" style={{ y: containerY }}>
        <div className="relative w-full max-w-[95%] flex flex-col gap-8">
          {/* Row 1 */}
          <div className="overflow-hidden">
            <motion.div className="flex gap-12 will-change-transform" style={{ x: wrappedX1 }}>
              {[...row1, ...row1, ...row1, ...row1].map((tech, i) => (
                <Card
                  key={`r1-${i}`}
                  className="s flex items-center justify-center w-80 h-80 aspect-square bg-card/90 shadow-xl rounded-2xl p-6"
                  onClick={() => setIsDrawerOpen(true)} // open drawer on click
                >
                  <img src={tech.img} alt={tech.name} className="w-48 lg:w-56 h-auto object-contain opacity-95" />
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden">
            <motion.div className="flex gap-12 will-change-transform" style={{ x: wrappedX2 }}>
              {[...row2, ...row2, ...row2, ...row2].map((tech, i) => (
                <Card
                  key={`r2-${i}`}
                  className="s flex items-center justify-center w-80 h-80 aspect-square bg-card/90 shadow-xl rounded-2xl p-6"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <img src={tech.img} alt={tech.name} className="w-48 lg:w-56 h-auto object-contain opacity-95" />
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="overflow-hidden">
            <motion.div className="flex gap-12 will-change-transform" style={{ x: wrappedX3 }}>
              {[...row3, ...row3, ...row3, ...row3].map((tech, i) => (
                <Card
                  key={`r3-${i}`}
                  className="s flex items-center justify-center w-80 h-80 aspect-square bg-card/90 shadow-xl rounded-2xl p-6"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <img src={tech.img} alt={tech.name} className="w-48 lg:w-56 h-auto object-contain opacity-95" />
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
