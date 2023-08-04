import { MutableRefObject, useCallback, useEffect, useState } from "react";

import useHandlers from "./useHandlers";
import { LayerChangeParams, PixelModifyItem } from "../components/Canvas/types";
import { DottingRef } from "../components/Dotting";
import { DottingDataLayer } from "../helpers/DottingDataLayer";

const useLayers = (ref: MutableRefObject<DottingRef | null>) => {
  const [currentLayer, setCurrentLayer] = useState<DottingDataLayer>();
  const [layers, setLayers] = useState<Array<DottingDataLayer>>([]);

  const { addLayerChangeEventListener, removeLayerChangeEventListener } =
    useHandlers(ref);

  useEffect(() => {
    const listener = ({ currentLayer, layers }: LayerChangeParams) => {
      setCurrentLayer(currentLayer);
      setLayers(layers);
    };
    addLayerChangeEventListener(listener);
    return () => {
      removeLayerChangeEventListener(listener);
    };
  }, [addLayerChangeEventListener, removeLayerChangeEventListener]);

  const addLayer = useCallback(
    (
      layerId: string,
      insertPosition: number,
      data?: Array<Array<PixelModifyItem>>,
    ) => {
      ref.current?.addLayer(layerId, insertPosition, data);
    },
    [ref],
  );

  const removeLayer = useCallback(
    (layerId: string) => {
      ref.current?.removeLayer(layerId);
    },
    [ref],
  );

  const changeLayerPosition = useCallback(
    (layerId: string, toIndex: number) => {
      ref.current?.changeLayerPosition(layerId, toIndex);
    },
    [ref],
  );

  return {
    currentLayer,
    layers,
    addLayer,
    removeLayer,
    changeLayerPosition,
  };
};

export default useLayers;