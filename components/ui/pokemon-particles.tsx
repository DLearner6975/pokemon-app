'use client';

import { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type ISourceOptions } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

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
      zIndex: 1,
    },
    background: {
      opacity: 0,
    },
    particles: {
      color: {
        value: '#FFFFFF',
      },
      move: {
        direction: 'bottom',
        enable: true,
        speed: 2,
        outModes: 'out',
      },
      number: {
        value: 20,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          startValue: 'min',
        },
      },
      shape: {
        type: ['image'],
        options: {
          image: [
            {
              src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
              width: 32,
              height: 32,
            },
            {
              src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
              width: 32,
              height: 32,
            },
            {
              src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
              width: 32,
              height: 32,
            },
            {
              src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
              width: 32,
              height: 32,
            },
            {
              src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
              width: 32,
              height: 32,
            },
          ],
        },
      },
      size: {
        value: { min: 20, max: 30 },
      },
      zIndex: {
        value: 1,
      },
    },
    retina_detect: true,
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
      },
    },
  };

  if (!init) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="w-full h-full"
      />
    </div>
  );
}
