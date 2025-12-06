import { ENVIRONMENT_COLORS } from '../../constants/colors';

export function Road() {
  return (
    <group>
      {/* North-South road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[12, 100]} />
        <meshStandardMaterial color={ENVIRONMENT_COLORS.road} />
      </mesh>

      {/* East-West road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 12]} />
        <meshStandardMaterial color={ENVIRONMENT_COLORS.road} />
      </mesh>

      {/* Lane markings - North-South */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.2, 80]} />
        <meshStandardMaterial color={ENVIRONMENT_COLORS.lines} />
      </mesh>

      {/* Lane markings - East-West */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[80, 0.2]} />
        <meshStandardMaterial color={ENVIRONMENT_COLORS.lines} />
      </mesh>
    </group>
  );
}
