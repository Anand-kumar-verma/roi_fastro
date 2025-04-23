import React, { useEffect, useRef } from "react";
import gif3 from "../images/gif3.gif";
import graph2 from "../images/graph2.webp";
import graph3 from "../images/graph3.webp";
import graph4 from "../images/graph4.jpg";
import graph5 from "../images/graph5.png";
import logo from "../images/logo.png";

export default function Footer() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    const scroll = (ref, speed, direction) => {
      const container = ref.current;
      if (!container) return;

      let scrollAmount = 0;

      const animate = () => {
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0; // Reset for seamless looping
        } else {
          scrollAmount += speed;
        }

        container.style.transform = `translateX(${direction * scrollAmount}px)`;
        requestAnimationFrame(animate);
      };

      animate();
    };

    scroll(scrollRef1, 0.5, -1); // Right to Left
    scroll(scrollRef2, 1, 1); // Left to Right
  }, []);

  const images = [graph2, graph3, graph4, graph5, graph2, graph4];

  return (
    <>
      {/* Auto Scrolling Image Sections */}
      <div className="relative w-full overflow-hidden ">
        {/* First row: Right to Left */}
        <div
          ref={scrollRef1}
          className="flex gap-4 "
          style={{ display: "flex", minWidth: "200%" }}
        >
          {[...images, ...images].map((src, index) => (
            <img
              key={`row1-${index}`}
              src={src}
              alt={`graph-${index}`}
              className="transition-all duration-500 hover:scale-75 rounded-lg hover:shadow-2xl hover:shadow-purple-500 min-w-[250px]"
            />
          ))}
        </div>

        {/* Second row: Left to Right */}
       
      </div>

      {/* Footer Content */}
      <div className="flex lg:flex-row flex-col justify-between gap-10 py-10 lg:px-20 !bg-black">
        <div className="!px-10">
          <img src={"https://static.vecteezy.com/system/resources/previews/009/029/127/non_2x/mlm-logo-mlm-letter-mlm-letter-logo-design-initials-mlm-logo-linked-with-circle-and-uppercase-monogram-logo-mlm-typography-for-technology-business-and-real-estate-brand-vector.jpg"} alt="Meta Prime Logo" className="w-40" />
          <p className="mt-4 text-gray-300 lg:w-[500px]">
            Discover a world of opportunities with our Forex trading platform.
            We provide real-time market data, reliable analysis, and expert
            tools to help you succeed. Join thousands of traders who trust us to
            execute their trades with speed and precision. Start your trading
            journey today!
          </p>
        </div>

        <div className="!px-10">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="list-none">
            <li className="mb-2 text-gray-400 hover:text-blue-500">Home</li>
            <li className="mb-2 text-gray-400 hover:text-blue-500">Markets</li>
            <li className="mb-2 text-gray-400 hover:text-blue-500">About</li>
            <li className="mb-2 text-gray-400 hover:text-blue-500">
              Contact Us
            </li>
            <li className="mb-2 text-gray-400 hover:text-blue-500">Login</li>
            <li className="mb-2 text-gray-400 hover:text-blue-500">Sign Up</li>
          </ul>
        </div>
        {/* <DrawChart /> */}
        <img
          src={gif3}
          alt="GIF Animation"
          className="lg:h-[40vh] lg:w-[30vw] w-full"
        />
      </div>
    </>
  );
}
