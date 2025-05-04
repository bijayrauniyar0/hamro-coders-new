import { useEffect, useState } from 'react';
import { Engine } from '@tsparticles/engine';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const BackgroundParticles = () => {
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    import('@tsparticles/react').then(({ initParticlesEngine }) => {
      initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        setIsInit(true);
      });
    });
  }, []);

  return isInit ? (
    <Particles
      id="tsparticles"
      options={{
        fpsLimit: 60,
        background: {
          color: { value: 'rgba(255,255,255,0)' },
        },
        particles: {
          number: {
            value: 5,
            density: {
              enable: true,
              width: 400,
              height: 200,
            },
          },
          color: { value: '#d1d5db' }, // subtle gray
          links: {
            enable: true,
            color: '#65508c',
            distance: 100,
            opacity: 0.3,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 0.5,
            outModes: {
              default: 'bounce',
            },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 2 },
          },
          opacity: {
            value: 0.8,
          },
          interactivity: {
            events: {
              onHover: {
                enable: false, // Disable hover effects to save resources
              },
              onClick: {
                enable: false, // Disable click effects
              },
            },
          },
        },
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', // fill the parent container
        height: '100%', // fill the parent container
        zIndex: -1, // make sure it's below content
      }}
    />
  ) : null;
};

export default BackgroundParticles;
