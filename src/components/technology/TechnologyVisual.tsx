import TechnologyScene from "../three/TechnologyScene";

const BG = "#D9E2FE";

function TechnologyVisual() {
  return (
    <div className="relative w-full h-full min-h-[560px] overflow-visible">
      <div
        className="absolute"
        style={{
          width: "620px",
          height: "560px",
          right: "0",          
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <TechnologyScene
          videoSrc="/media/technologies/tech-video.mp4"
          posterSrc="/media/technologies/tech-video-poster.png"
        />

        {/* Fade esquerda */}
        <div
          className="absolute inset-y-0 left-0 w-[120px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to right, ${BG} 0%, transparent 80%)`,
          }}
        />
        {/* Fade topo */}
        <div
          className="absolute inset-x-0 top-0 h-[100px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, ${BG} 0%, transparent 80%)`,
          }}
        />
        {/* Fade base */}
        <div
          className="absolute inset-x-0 bottom-0 h-[100px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to top, ${BG} 0%, transparent 40%)`,
          }}
        />
        {/* Fade direita */}
        <div
          className="absolute inset-y-0 right-0 w-[120px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(to left, ${BG} 0%, transparent 80%)`,
          }}
        />
      </div>
    </div>
  );
}

export default TechnologyVisual;