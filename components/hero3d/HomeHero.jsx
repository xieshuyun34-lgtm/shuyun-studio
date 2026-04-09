import dynamic from "next/dynamic";
import heroSceneConfig from "../../config/heroScene";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HomeHero({ sceneConfig = heroSceneConfig }) {
  return (
    <section className="hero-root">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-canvas-wrap">
        <HeroCanvas config={sceneConfig} />
      </div>
    </section>
  );
}
