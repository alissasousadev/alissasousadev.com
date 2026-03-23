import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* Props do background visual da Hero */
interface HeroSceneProps {
  posterSrc: string;
  videoSrc: string;
}

/* Cena em Three.js usada como background da Hero */
function HeroScene({ posterSrc, videoSrc }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  /* Elemento de vídeo usado pela textura */
  const video = useMemo(() => {
    const element = document.createElement("video");

    element.src = videoSrc;
    element.crossOrigin = "anonymous";
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.autoplay = true;
    element.preload = "auto";

    return element;
  }, [videoSrc]);

  useEffect(() => {
    const handleCanPlay = async () => {
      try {
        await video.play();
        setIsVideoReady(true);
      } catch {
        /* Mantém a imagem visível se o autoplay demorar */
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
      video.currentTime = 0;
    };
  }, [video]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* Cena */
    const scene = new THREE.Scene();

    /* Câmera */
    const camera = new THREE.PerspectiveCamera(
      35,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    /* Renderizador */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(renderer.domElement);

    /* Textura do vídeo */
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.center.set(0.5, 0.5);

    /* Plano base */
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: videoTexture,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    /* Faz o plano cobrir toda a área visível */
    function updatePlaneSize() {
      const distance = camera.position.z;
      const fovInRadians = (camera.fov * Math.PI) / 180;

      const visibleHeight = 2 * Math.tan(fovInRadians / 2) * distance;
      const visibleWidth = visibleHeight * camera.aspect;

      plane.scale.set(visibleWidth, visibleHeight, 1);
    }

    /* Faz a textura se comportar como object-cover */
    function updateVideoCover() {
      if (!video.videoWidth || !video.videoHeight) return;

      const containerRatio = camera.aspect;
      const videoRatio = video.videoWidth / video.videoHeight;

      if (containerRatio > videoRatio) {
        videoTexture.repeat.x = 1;
        videoTexture.repeat.y = videoRatio / containerRatio;
      } else {
        videoTexture.repeat.x = containerRatio / videoRatio;
        videoTexture.repeat.y = 1;
      }

      videoTexture.offset.x = (1 - videoTexture.repeat.x) / 2;
      videoTexture.offset.y = (1 - videoTexture.repeat.y) / 2;
    }

    updatePlaneSize();
    updateVideoCover();

    /* Atualiza quando o vídeo tiver metadados */
    const handleLoadedMetadata = () => {
      updateVideoCover();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    /* Animação sutil do background */
    const timer = new THREE.Timer();
    let animationId = 0;

    const animate = () => {
      timer.update();
      const elapsedTime = timer.getElapsed();

      plane.rotation.y = Math.sin(elapsedTime * 0.2) * 0.025;
      plane.rotation.x = Math.sin(elapsedTime * 0.16) * 0.015;
      plane.position.y = Math.sin(elapsedTime * 0.3) * 0.03;

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    /* Responsividade */
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      updatePlaneSize();
      updateVideoCover();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();
      videoTexture.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [video]);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {/* Imagem inicial exibida antes do vídeo ficar pronto */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Canvas do Three.js por cima da imagem */}
      <div
        ref={mountRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}

export default HeroScene;