import useDecorateStore from "@/libs/stores/decorateStore";

const TestRayPoint = () => {
  const rayHitPos = useDecorateStore((state) => state.rayHitPos);
  return (
    <>
      <mesh position={rayHitPos}>
        <sphereGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  );
};

export default TestRayPoint;
