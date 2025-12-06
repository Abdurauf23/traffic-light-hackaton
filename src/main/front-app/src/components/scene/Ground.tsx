import { ENVIRONMENT_COLORS } from '../../constants/colors';

export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color={ENVIRONMENT_COLORS.ground} />
    </mesh>
  );
}
