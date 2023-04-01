import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

// Home
const Home = () => {
  // current snapshot state
  const snap = useSnapshot(state);

  return (
    <HelmetProvider>
      <AnimatePresence>
        {/* show only if on home page */}
        {snap.intro && (
          <motion.section className="home" {...slideAnimation("left")}>
            {/* change headers */}
            <Helmet>
              <title>Home</title>
              <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content={snap.color}
              />
            </Helmet>

            {/* Logo */}
            <motion.header {...slideAnimation("down")}>
              <img
                src="/threejs.png"
                alt="Three.js"
                title="Three.js"
                className="w-8 h-8 object-contain"
              />
            </motion.header>

            {/* Content */}
            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                {/* Heading Text */}
                <h1 className="head-text">
                  LET'S <br className="xl:block hidden" /> DO IT.
                </h1>
              </motion.div>

              <motion.div
                className="flex flex-col gap-5"
                {...headContentAnimation}
              >
                {/* Body Text */}
                <p className="max-w-md font-normaltext-gray-600 text-base">
                  Create your unique and exclusive shirt with our brand-new 3D
                  customization tool. <strong>Unleash your imagination</strong>{" "}
                  and define your own style
                </p>

                {/* Buttons */}
                <div>
                  {/* Customize It */}
                  <CustomButton
                    type="filled"
                    title="Customize It"
                    handleClick={() => (state.intro = false)}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                  />

                  {/* Source Code */}
                  <CustomButton
                    type="filled"
                    title="Source Code"
                    handleClick={() =>
                      window.open(
                        "https://github.com/Technical-Shubham-tech/3d-website",
                        "_blank"
                      )
                    }
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm ml-4"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default Home;
