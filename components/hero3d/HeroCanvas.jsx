import { Component, Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import ComputerModel from "./ComputerModel";

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function HeroCanvas({ config, onModelClick, interactionPreset, interactionToken }) {
  const { canvas, lights, model } = config;
  const assetCandidates = useMemo(
    () => [model.assetPath, ...(model.fallbackAssetPaths || [])].filter(Boolean),
    [model.assetPath, model.fallbackAssetPaths]
  );
  const [assetIndex, setAssetIndex] = useState(0);
  const activeAssetPath = assetCandidates[Math.min(assetIndex, Math.max(assetCandidates.length - 1, 0))] || model.assetPath;
  const activeModelConfig = useMemo(
    () => ({ ...model, assetPath: activeAssetPath }),
    [activeAssetPath, model]
  );

  return (
    <Canvas
      dpr={canvas.dpr}
      shadows
      camera={canvas.camera}
      flat={false}
      linear={false}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        if (canvas?.renderer?.toneMapping === "aces") {
          gl.toneMapping = ACESFilmicToneMapping;
        }
        gl.toneMappingExposure = canvas?.renderer?.exposure ?? 1;
        gl.outputColorSpace = SRGBColorSpace;
        gl.setClearColor(0x000000, 0);
      }}
      className="hero-canvas"
      style={{ background: "transparent" }}
    >
      {canvas.fog?.enabled !== false && <fog attach="fog" args={[canvas.fog.color, canvas.fog.near, canvas.fog.far]} />}
      <ambientLight intensity={lights.ambientIntensity} />
      <hemisphereLight intensity={lights.hemisphere.intensity} color={lights.hemisphere.color} groundColor={lights.hemisphere.groundColor} />
      {lights.key && <directionalLight position={lights.key.position} intensity={lights.key.intensity} color={lights.key.color} />}
      {lights.fill && <directionalLight position={lights.fill.position} intensity={lights.fill.intensity} color={lights.fill.color} />}
      {lights.rim && <directionalLight position={lights.rim.position} intensity={lights.rim.intensity} color={lights.rim.color} />}
      <spotLight
        position={lights.spot.position}
        angle={lights.spot.angle}
        penumbra={lights.spot.penumbra}
        intensity={lights.spot.intensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={lights.point.position} intensity={lights.point.intensity} color={lights.point.color} />
      <Suspense fallback={null}>
        {lights.environment && (
          <Environment
            preset={lights.environment.preset}
            intensity={lights.environment.intensity}
            blur={lights.environment.blur}
            background={false}
          />
        )}
        <ModelErrorBoundary
          resetKey={activeAssetPath}
          onError={() => {
            setAssetIndex((current) => {
              if (current < assetCandidates.length - 1) return current + 1;
              return current;
            });
          }}
        >
          <ComputerModel
            key={activeAssetPath}
            modelConfig={activeModelConfig}
            onModelClick={onModelClick}
            interactionPreset={interactionPreset}
            interactionToken={interactionToken}
          />
        </ModelErrorBoundary>
        <ContactShadows
          position={lights.contactShadow.position}
          blur={lights.contactShadow.blur}
          opacity={lights.contactShadow.opacity}
          resolution={lights.contactShadow.resolution}
          scale={lights.contactShadow.scale}
          far={lights.contactShadow.far}
        />
      </Suspense>
    </Canvas>
  );
}
