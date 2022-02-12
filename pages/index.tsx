import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { DimensionsInput } from "../components/Editor/PanelControl/DimensionsInput";
import { Editor } from "../components/Editor";
import { PanelUpperButtons } from "../components/Editor/PanelControl/PanelUpperButtons";
import {
  colorGroup,
  dataArrayElement,
  PanelKeys,
  rowColumnColor,
} from "../const/CommonDTO";
import { downloadImageRef } from "../const/CommonFunctions";
import { ColorContext } from "../context/ColorContext";
import { DataContext } from "../context/DataContext";
import { MouseDragContext } from "../context/MouseDragContext";
import styles from "../styles/Home.module.css";
import { PanelBelowButtons } from "../components/Editor/PanelControl/PanelBelowButtons";
import { Panel } from "../components/Editor/Panel";

const Home: NextPage = () => {
  const defaultHeight: number = 5;
  const defaultWidth: number = 5;
  const [hideOptions, setHideOptions] = useState<boolean>(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState<boolean>(true);
  const [additionalPanel, setAdditionalPanel] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState<colorGroup>();
  const [buttonText, setButonText] = useState<"start drawing" | "reset">(
    "start drawing"
  );
  const [openChangePanel, setOpenChangePanel] = useState<boolean>(false);
  const [openChangePanelKey, setOpenChangePanelKey] = useState<string>("");
  const groupsRef = useRef<any>(null);
  const panelRef = useRef<any>(null);
  const colorRef = useRef<any>(null);

  const { enableMouseDragDraw, disableMouseDragDraw } =
    useContext(MouseDragContext);
  const { color, changeColor } = useContext(ColorContext);

  const { dataArray, setDataArray, setHistory, setHistoryIndex } =
    useContext(DataContext);

  const [keyData, setKeyData] = useState<PanelKeys>({
    L_key: 0,
    R_key: defaultWidth - 1,
    T_key: 0,
    B_key: defaultWidth - 1,
  });

  const [resetKeys, setResetKeys] = useState<PanelKeys>({
    L_key: 0,
    R_key: defaultWidth - 1,
    T_key: 0,
    B_key: defaultWidth - 1,
  });

  const [currentKeys, setCurrentKeys] = useState<PanelKeys>({
    L_key: 0,
    R_key: defaultWidth - 1,
    T_key: 0,
    B_key: defaultWidth - 1,
  });

  const [colorArray, setColorArray] = useState<dataArrayElement[]>([]);

  const [colorData, setColorData] = useState<rowColumnColor[]>([]);

  const initializeDrawingPanel = () => {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "start drawing"
      ? setButonText("reset")
      : setButonText("start drawing");
  };

  const resetOrStartPanel = () => {
    initializeDrawingPanel();
    setDataArray([]);
    setHistory([]);
    setHistoryIndex(0);
  };

  const downloadImage = () => {
    const pixelRef = document.getElementById("pixels");
    downloadImageRef(pixelRef);
  };

  const saveProject = () => {
    setKeyData(JSON.parse(JSON.stringify(currentKeys)));
    setColorData(JSON.parse(JSON.stringify(dataArray)));
  };

  const resetDataKeyState = (
    colorDataArray: rowColumnColor[],
    keyDataArray: PanelKeys
  ) => {
    setColorArray(JSON.parse(JSON.stringify(colorDataArray)));
    setResetKeys(JSON.parse(JSON.stringify(keyDataArray)));
  };

  const bringSavedProject = () => {
    resetDataKeyState(colorData, keyData);
  };
  return (
    <Editor
      onMouseDown={enableMouseDragDraw}
      onMouseUp={disableMouseDragDraw}
      onMouseLeave={disableMouseDragDraw}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pixel Create Character</h1>
      {hideDrawingPanel && (
        <DimensionsInput
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
          resetKeys={resetKeys}
          setResetKeys={setResetKeys}
        />
      )}
      <PanelUpperButtons
        buttonText={buttonText}
        clickFunctions={[resetOrStartPanel]}
      />
      {hideOptions && (
        <Panel
          panelRef={panelRef}
          resetKeys={resetKeys}
          currentKeys={currentKeys}
          setCurrentKeys={setCurrentKeys}
          colorArray={colorArray}
          setResetKeys={setResetKeys}
          setColorArray={setColorArray}
        />
      )}
      <PanelBelowButtons
        clickFunctions={[downloadImage, saveProject, bringSavedProject]}
        hideDrawingPanel={hideDrawingPanel}
      />
    </Editor>
  );
};

export default Home;
