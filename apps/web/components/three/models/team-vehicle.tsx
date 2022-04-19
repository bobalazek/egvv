import { useGLTF } from '@react-three/drei';

export interface TeamVehicleProps {
  url: string;
  name: string;
}

export function TeamVehicle(props: TeamVehicleProps) {
  const { url, name, ...primitiveProps } = props;

  const gltf = useGLTF(url);

  return <primitive object={gltf.scene} {...primitiveProps} />;
}
