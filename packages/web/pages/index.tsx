import BottomNavigation from "@/components/arrangement/bottomNavigation/BottomNavigation";
import CarouselBagDisplay from "@/components/arrangement/carousel/CarouselBagDisplay";
import GridBagDisplay from "@/components/arrangement/grid/GridBagDisplay";
import useArrangementStore from "@/stores/arrangementStore";
import Link from "next/link";
import { useState } from "react";

/**
 * バッグの一覧表示のページコンポーネント
 * @returns
 */
const Home = () => {
  const { isGridBags } = useArrangementStore((state) => ({
    isGridBags: state.isGridBags,
    toggleIsGridBags: state.toggleIsGridBags,
  }));

  return (
    <>
      <div>
        {isGridBags ? (
          <>
            <CarouselBagDisplay />
          </>
        ) : (
          <>
            <GridBagDisplay />
          </>
        )}
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;
