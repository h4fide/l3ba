"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * HoldRevealButton
 * A reusable button that triggers an action after being held for a specified duration.
 * Includes a liquid fill animation while holding (mouse or touch) and resets if released early.
 */
export interface HoldRevealButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Total hold duration in ms required to fire onComplete */
  holdDuration?: number;
  /** Fired once when hold completes */
  onComplete: () => void;
  /** Optional label (children still takes precedence) */
  label?: React.ReactNode;
  /** Color gradient for the liquid fill */
  gradient?: string;
  /** Whether to show bubbling effects */
  bubbles?: boolean;
  /** Immediately reset after completion (default true) */
  autoReset?: boolean;
}

export const HoldRevealButton: React.FC<HoldRevealButtonProps> = ({
  holdDuration = 400,
  onComplete,
  label,
  children,
  className = "",
  gradient = "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
  bubbles = true,
  autoReset = false,
  ...rest
}) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = useCallback(() => {
    clear();
    setProgress(0);
    setIsHolding(false);
    completedRef.current = false;
  }, []);

  const finish = useCallback(() => {
    clear();
    setProgress(1);
    setIsHolding(false);
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
      if (autoReset) {
        // slight delay for user to register completion
        setTimeout(() => reset(), 300);
      }
    }
  }, [onComplete, autoReset, reset]);

  const start = () => {
    if (isHolding) return;
    setIsHolding(true);
    setProgress(0);
    const stepMs = holdDuration / 40; // 40 steps
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1 / 40;
        if (next >= 1) {
          finish();
          return 1;
        }
        return next;
      });
    }, stepMs);
  };

  const cancel = () => {
    if (completedRef.current) return; // don't reset if already finished
    reset();
  };

  // Cleanup on unmount
  useEffect(() => clear, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Button
      {...rest}
      className={
        "relative overflow-hidden select-none rounded-full px-10 text-lg shadow-none " +
        className
      }
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      style={{
        minHeight: "60px",
        minWidth: "200px",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
   >
      <span
        className="relative z-20 font-semibold transition-colors duration-200"
        style={{ color: progress > 0.5 ? "white" : undefined }}
      >
        {children ?? label}
      </span>
      {(isHolding || progress > 0) && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 right-0 bottom-0"
            style={{
              height: `${Math.max(0, progress * 100)}%`,
              background: gradient,
              borderRadius: "50px",
            }}
            animate={{ height: `${Math.max(0, progress * 100)}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
              <motion.svg
                viewBox="0 0 400 40"
                className="absolute top-0 left-0 w-full h-full"
                style={{ transform: "translateY(-50%)" }}
                animate={isHolding ? { x: [0, -50, 0] } : {}}
                transition={{ repeat: isHolding ? Infinity : 0, duration: 2, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z"
                  fill="#fca5a5"
                  animate={isHolding ? {
                    d: [
                      "M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z",
                      "M0,20 Q100,30 200,20 T400,20 L400,40 L0,40 Z",
                      "M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z",
                    ]
                  } : {}}
                  transition={{ repeat: isHolding ? Infinity : 0, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
              <motion.svg
                viewBox="0 0 400 40"
                className="absolute top-0 left-0 w-full h-full opacity-60"
                style={{ transform: "translateY(-50%) translateX(25px)" }}
                animate={isHolding ? { x: [25, -25, 25] } : {}}
                transition={{ repeat: isHolding ? Infinity : 0, duration: 2.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z"
                  fill="#ef4444"
                  animate={isHolding ? {
                    d: [
                      "M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                      "M0,25 Q75,35 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                      "M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                    ]
                  } : {}}
                  transition={{ repeat: isHolding ? Infinity : 0, duration: 1.8, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>
            {bubbles && progress > 0.3 && (
              <>
                <motion.div
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                  style={{ left: "20%", bottom: `${20 + Math.random() * 40}%` }}
                  animate={{ y: [-10, -30], opacity: [0.6, 0], scale: [0.8, 1.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                  style={{ left: "70%", bottom: `${10 + Math.random() * 50}%` }}
                  animate={{ y: [-10, -40], opacity: [0.5, 0], scale: [0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute w-1 h-1 bg-white/50 rounded-full"
                  style={{ left: "45%", bottom: `${30 + Math.random() * 30}%` }}
                  animate={{ y: [-5, -25], opacity: [0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 1 }}
                />
              </>
            )}
          </motion.div>
        </div>
      )}
    </Button>
  );
};

export default HoldRevealButton;
