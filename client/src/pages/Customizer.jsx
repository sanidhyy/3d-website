import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

// backend url
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Customizer
const Customizer = () => {
  // current snapshot state
  const snap = useSnapshot(state);

  // file state
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");

  // img loading state
  const [generatingImg, setGeneratingImg] = useState(false);

  // active tab state
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // handle active filter tab
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      // logo texture tab
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      // full texture tab
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // handle decals
  const handleDecals = (type, result) => {
    // current decal type
    const decalType = DecalTypes[type];

    // set current decal property to result
    state[decalType.stateProperty] = result;

    // if filter tab is not active
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // read file from input
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setFile("");
      setActiveEditorTab("");
    });
  };

  // handle input submit
  const handleSubmit = async (type) => {
    if (!prompt.trim()) return alert("Please enter a prompt");

    try {
      // set loading to true
      setGeneratingImg(true);

      // fetch dalle api response
      const response = await fetch(`${backendURL}/api/v1/dalle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      // response data
      const data = await response.json();

      // handle decals
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      // handle error
      console.log("Error in AIPICKER: ", error);
    } finally {
      // set loading to false
      setGeneratingImg(false);
      setActiveEditorTab("");
      setPrompt("");
    }
  };

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      // color picker
      case "colorpicker":
        return <ColorPicker />;

      // file picker
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

      // ai picker
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <HelmetProvider>
      <AnimatePresence>
        {/* show only if not on home page */}
        {!snap.intro && (
          <>
            {/* change headers */}
            <Helmet>
              <title>3D T-Shirt Customizer</title>
              <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content={snap.color}
              />
            </Helmet>

            {/* editor tabs */}
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10"
              {...slideAnimation("left")}
            >
              <div className="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}

                  {/* tab contents and toggle */}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>

            {/* Go Back Button */}
            <motion.div
              className="absolute z-10 top-5 right-5"
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => (state.intro = true)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>

            {/* filter tabs */}
            <motion.div
              className="filtertabs-container"
              {...slideAnimation("up")}
            >
              {FilterTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}

              {/* Download button */}
              <button className="download-btn" onClick={downloadCanvasToImage}>
                <img
                  src={download}
                  alt="download_image"
                  className="w-3/5 h-3/5 object-contain"
                />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default Customizer;
