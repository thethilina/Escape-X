"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";







function game() {

  const mapwidth = 640;
  const mapheight = 640;
  const tileSize = mapwidth / 16;



 

  








  return (
    <div>
    <div   style={{
          width: mapwidth,
          height: mapheight,
        }} className={`bg-[#131313]`}></div>
    </div>
  )
}

export default game