import { useRef, useState } from 'react';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Team } from '@prisma/client';

interface TeamVehiclesViewerProps {
  team: Team;
}

function Box(props: MeshProps) {
  const ref = useRef<MeshProps>();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export function TeamVehiclesViewer(props: TeamVehiclesViewerProps) {
  return (
    <Canvas
      shadows
      gl={{
        toneMappingExposure: 0.7,
      }}
      style={{
        height: 600,
      }}
    >
      <OrbitControls autoRotate makeDefault enableZoom={false} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}
