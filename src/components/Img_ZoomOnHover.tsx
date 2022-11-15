import React, { useState } from "react";

export const Zoom = ({ src }: any) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState("");
  let style = {
    backgroundImage: `url(${src})`,
    backgroundPosition: backgroundPosition,
  };
  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setX(((e.pageX - left) / width) * 100);
    setY(((e.pageY - top - 165) / height) * 100);
    setBackgroundPosition(() => {
      if (x < 0) {
        return `0% ${y}%`;
      }
      if (y < 0) {
        return `${x}% 0%`;
      }
      return `${x}% ${y}%`;
    });
  };

  return (
    <figure
      className="Zoom_Figure"
      onMouseMove={handleMouseMove}
      style={{ ...style }}
    >
      <img className="Zoom_Img" src={src} />
    </figure>
  );
};
