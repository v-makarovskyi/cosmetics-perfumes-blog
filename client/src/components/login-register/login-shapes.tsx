import React, { FC } from "react";
import shape_1 from "/public/images/login-shapes/but-1.png";
import shape_2 from "/public/images/login-shapes/but-2.png";
import shape_3 from "/public/images/login-shapes/but-3.png";

export const LoginShapes: FC = (): JSX.Element => {
  return (
    <div className="login__shapes">
      <img className="login__shapes-1" src={shape_1} alt="" loading="lazy" />
      <img className="login__shapes-2" src={shape_2} alt="" loading="lazy" />
      <img className="login__shapes-3" src={shape_3} alt="" loading="lazy" />
    </div>
  );
};
