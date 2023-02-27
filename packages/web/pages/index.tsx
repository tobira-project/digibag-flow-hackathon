import BottomNavigation from "@/components/arrangement/bagSelect/bottomNavigation/BottomNavigation";
import CarouselBagDisplay from "@/components/arrangement/bagSelect/carousel/CarouselBagDisplay";
import GridBagDisplay from "@/components/arrangement/bagSelect/grid/GridBagDisplay";

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
      <div className="page-top-container">
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
