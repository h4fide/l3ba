"use client";
import { useEffect } from "react";

export default function RegisterSWClient() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        // Optionally listen for updates
        reg.addEventListener('updatefound', () => {
          // no-op for now
        });
      } catch (err) {
        // swallow registration errors
        // console.warn('SW registration failed', err);
      }
    };

    register();
  }, []);

  return null;
}
