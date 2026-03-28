import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface TechnologySceneProps {
  videoSrc: string;
  posterSrc?: string;
}

function TechnologyScene({ videoSrc, posterSrc }: TechnologySceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const video = useMemo(() => {
    const el = document.createElement("video");
    el.src = videoSrc;
    el.crossOrigin = "anonymous";
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.autoplay = true;
    el.preload = "auto";
    return el;
  }, [videoSrc]);

  useEffect(() => {
    const el = video;
    const handleCanPlay = async () => {
      try {
        await el.play();
        setIsVideoReady(true);
      } catch {}
    };
    el.addEventListener("canplay", handleCanPlay);
    return () => {
      el.removeEventListener("canplay", handleCanPlay);
      el.pause();
      el.currentTime = 0;
    };
  }, [video]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.background = "transparent";
    mount.appendChild(renderer.domElement);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.center.set(0.5, 0.5);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: videoTexture,
      transparent: true,
      depthWrite: false,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    function updatePlaneSize() {
      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      plane.scale.set(visibleWidth, visibleHeight, 1);
    }

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
    video.addEventListener("loadedmetadata", updateVideoCover);

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      //só atualiza a textura quando o vídeo tem dados reais
      if (video.readyState >= 2) {
        videoTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updatePlaneSize();
      updateVideoCover();
    });
    ro.observe(mount);

    return () => {
      ro.disconnect();
      video.removeEventListener("loadedmetadata", updateVideoCover);
      cancelAnimationFrame(animationId);
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
    <div className="relative h-full w-full">
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-opacity duration-700
            ${isVideoReady ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        />
      )}
      <div
        ref={mountRef}
        className={`
          absolute inset-0 h-full w-full
          transition-opacity duration-700
          ${isVideoReady ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
      />
    </div>
  );
}

export default TechnologyScene;