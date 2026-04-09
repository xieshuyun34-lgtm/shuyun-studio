import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import HomeHero from "../components/hero3d/HomeHero";
import heroSceneConfig from "../config/heroScene";
import { defaultPublishedSlug } from "../data/defaultResumeTemplate";

const GIRL_HERO_MODEL_PATH = "/hero/homepage-8246.glb?v=20260408a";

export default function Home() {
  const homeSceneConfig = useMemo(
    () => ({
      ...heroSceneConfig,
      canvas: {
        ...heroSceneConfig.canvas,
        camera: {
          ...heroSceneConfig.canvas.camera,
          position: [0, 0.2, 10.5],
          fov: 32,
        },
      },
      lights: {
        ...heroSceneConfig.lights,
        ambientIntensity: 0.62,
        key: {
          ...heroSceneConfig.lights.key,
          intensity: 1.44,
          position: [3.1, 4.1, 4.8],
        },
        fill: {
          ...heroSceneConfig.lights.fill,
          intensity: 0.66,
          position: [-3.8, 2.3, 2.1],
        },
        contactShadow: {
          ...heroSceneConfig.lights.contactShadow,
          position: [0, -1.6, 0],
          scale: 6.2,
          opacity: 0.18,
        },
      },
      model: {
        ...heroSceneConfig.model,
        assetPath: GIRL_HERO_MODEL_PATH,
        fallbackAssetPaths: [],
        transform: {
          ...heroSceneConfig.model.transform,
          position: [0, -0.08, 0],
          rotation: [-1.57, 0, 0],
          targetSize: 2.2,
          targetBy: "max",
        },
        motion: {
          ...heroSceneConfig.model.motion,
          autoRotateSpeed: 0.1,
          breathingAmplitude: 0.08,
          idleTiltAmplitude: 0.03,
          idleRollAmplitude: 0.016,
          interactionMultiplier: 0.9,
        },
      },
    }),
    []
  );

  return (
    <>
      <Head>
        <title>MotionCV</title>
        <meta name="description" content="Build a resume site with a cinematic 3D hero and bilingual share pages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="landing-page">
        <HomeHero sceneConfig={homeSceneConfig} />
        <section className="landing-shell">
          <div className="landing-copy soft-panel">
            <p className="landing-kicker">MOTIONCV</p>
            <h1 className="landing-title">首页先出场一个 3D 小女孩，不再是那台电脑。</h1>
            <p className="landing-body">
              现在首页已经改成独立 3D Hero 入口，并且优先加载 <code>/hero/homepage-8246.glb</code>。
              首页会继续保留现有的旋转、呼吸和点击交互动效。
            </p>
            <div className="landing-actions">
              <Link href="/editor" className="landing-primary">
                打开编辑器
              </Link>
              <Link href={`/resume/${defaultPublishedSlug}?lang=en`} className="landing-secondary">
                查看示例简历
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
