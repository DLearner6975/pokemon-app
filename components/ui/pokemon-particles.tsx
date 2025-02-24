"use client";

import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export function PokemonParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    particles: {
      color: {
        value: [
          "#FFFFFF",
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
        ],
      },
      move: {
        direction: "bottom",
        enable: true,
        speed: 2,
        outModes: "out",
      },
      number: {
        value: 30,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      opacity: {
        value: 0.7,
        animation: {
          enable: true,
          minimumValue: 0.3,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "square"],
      },
      size: {
        value: { min: 3, max: 7 },
      },
    },
    retina_detect: true,
    fpsLimit: 60,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      className="fixed inset-0 w-full h-full"
    />
  );
}
