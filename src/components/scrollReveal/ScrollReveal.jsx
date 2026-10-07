import { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import "./ScrollReveal.css";

const LAYER_1 = [
  "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60",
];

const LAYER_2 = [
  "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60",
];

const LAYER_3 = [
  "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
];

const SCALER_SRC =
  "https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100";

const ease1 = cubicBezier(0.42, 0, 0.58, 1);
const ease3 = cubicBezier(0.76, 0, 0.24, 1);
const ease4 = cubicBezier(0.87, 0, 0.13, 1);
const easeSine = cubicBezier(0.61, 1, 0.88, 1);
const easeImg = cubicBezier(0.65, 0, 0.35, 1);

function AnimatedLayer({
  scrollProgress,
  endProgress,
  easing,
  children,
  className,
}) {
  const opacity = useTransform(
    scrollProgress,
    [0, endProgress * 0.55, endProgress],
    [0, 0, 1],
    { ease: easeSine },
  );

  const scale = useTransform(
    scrollProgress,
    [0, endProgress * 0.3, endProgress],
    [0, 0, 1],
    { ease: easing },
  );

  return (
    <motion.div className={`layer ${className}`} style={{ opacity, scale }}>
      {children}
    </motion.div>
  );
}

function ScalerImage({ scrollProgress }) {
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setNaturalSize({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;

  const width = useTransform(
    scrollProgress,
    [0, 0.8],
    [vw, naturalSize.w || vw],
    { ease: easeImg },
  );
  const height = useTransform(
    scrollProgress,
    [0, 0.8],
    [vh, naturalSize.h || vh],
    { ease: ease1 },
  );

  return (
    <div className="scaler" ref={containerRef}>
      <motion.img
        src={SCALER_SRC}
        alt="Center model"
        style={{ width, height }}
      />
    </div>
  );
}

export default function ScrollReveal() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const layerEndOffsets = [1, 0.95, 0.9];
  const layerEasings = [ease1, ease3, ease4];

  return (
    <div className="scroll-reveal-wrap">
      <main>
        <section ref={sectionRef} className="scroll-section">
          <div className="content">
            <div className="grid">
              {!prefersReducedMotion ? (
                <AnimatedLayer
                  scrollProgress={scrollYProgress}
                  endProgress={layerEndOffsets[0]}
                  easing={layerEasings[0]}
                  className="layer-1"
                >
                  {LAYER_1.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </AnimatedLayer>
              ) : (
                <div className="layer layer-1">
                  {LAYER_1.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              )}

              {!prefersReducedMotion ? (
                <AnimatedLayer
                  scrollProgress={scrollYProgress}
                  endProgress={layerEndOffsets[1]}
                  easing={layerEasings[1]}
                  className="layer-2"
                >
                  {LAYER_2.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </AnimatedLayer>
              ) : (
                <div className="layer layer-2">
                  {LAYER_2.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              )}

              {!prefersReducedMotion ? (
                <AnimatedLayer
                  scrollProgress={scrollYProgress}
                  endProgress={layerEndOffsets[2]}
                  easing={layerEasings[2]}
                  className="layer-3"
                >
                  {LAYER_3.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </AnimatedLayer>
              ) : (
                <div className="layer layer-3">
                  {LAYER_3.map((src, i) => (
                    <div key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              )}

              {!prefersReducedMotion ? (
                <ScalerImage scrollProgress={scrollYProgress} />
              ) : (
                <div className="scaler">
                  <img src={SCALER_SRC} alt="" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
