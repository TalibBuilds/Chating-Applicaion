{/* <UniversalLoader />
<UniversalLoader loadingText="PLEASE WAIT" />
<UniversalLoader loadingText="Processing" showDots={false} /> */}

import { useState, useEffect } from "react";
import "./UniversalLoader.css";

const UniversalLoader = ({ loadingText = "LOADING", showDots = true }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!showDots) return;
    
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [showDots]);

  const text = loadingText.split("");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="wrapper-grid">
        {text.map((letter, index) => (
          <div
            key={index}
            className="cube"
            style={{
              animationDelay: `${index * 0.2}s`,
              zIndex:
                index < 4 ? index : text.length - 1 - index,
            }}
          >
            <div className="face face-front">{letter}</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>
        ))}
      </div>
      {showDots && (
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            {loadingText}{dots}
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversalLoader;