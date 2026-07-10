import { useState } from "react";

function MainList({ data }: { data: string[] }) {
  const [scrollTop, setScrollTop] = useState(0);
  const OVERSCAN = 5; // extra items rendered below viewport to prevent flash on fast scroll
  const ITEM_HEIGHT = 40;
  const CONTAINER_HEIGHT = 600;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // first index to render, based on how far user has scrolled
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);

  // last index to render (+ overscan buffer), capped at data length
  const endIndex = Math.min(
    data.length,
    Math.floor(startIndex + CONTAINER_HEIGHT / ITEM_HEIGHT + OVERSCAN),
  );

  const visibleItems = data.slice(startIndex, endIndex);

  // fake full height so scrollbar reflects entire dataset, not just visible slice
  const totalHeight = data.length * ITEM_HEIGHT;

  // pixel shift to position visible batch at the correct scroll offset (it jumps per item not mid of item like 60% visible)
  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div
      onScroll={handleScroll}
      style={{
        width: "200px",
        backgroundColor: "#86efac",
        height: `${CONTAINER_HEIGHT}px`,
        overflowY: "scroll",
        border: "1px solid black",
      }}
    >
      {/* spacer - drives scrollbar length, acts as positioning reference for child below */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* shifted via transform (GPU-accelerated, no layout reflow) instead of top/padding */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            width: "100%",
          }}
        >
          {visibleItems.map((item) => (
            <div style={{ backgroundColor: "#86efac", height: 40 }} key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainList;