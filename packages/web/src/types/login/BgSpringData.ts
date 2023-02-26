type Position2D = { x: number; y: number };

export type PlaceData = {
  pos: Position2D;
  rot: number;
  scale: number;
};

export type BgSpringData = {
  top: PlaceData;
  signIn: PlaceData;
  signUp: PlaceData;
};
