/*
 * @Author: shitao
 * @Date: 2021-12-29 13:59:54
 * @LastEditTime: 2022-01-04 15:22:54
 * @LastEditors: shitao
 * @Description: 
 * @FilePath: \redash_cn\viz-lib\src\visualizations\map\getOptions.ts
 * 无锡四维时空信息科技有限公司
 */
import { merge } from "lodash";

export type LeafletBaseIconType = "marker" | "rectangle" | "circle" | "rectangle-dot" | "circle-dot" | "doughnut";
export interface MapOptionsType {
  latColName: string;
  lonColName: string;
  classify: any;
  groups: Record<string, any>;
  mapTileUrl: string;
  clusterMarkers: boolean;
  customizeMarkers: boolean;
  iconShape: LeafletBaseIconType;
  iconFont: LeafletBaseIconType;
  foregroundColor: string;
  backgroundColor: string;
  borderColor: string;
  bounds: any;
  tooltip: {
    enabled: boolean;
    template: string;
  };
  popup: {
    enabled: boolean;
    template: string;
  };
}

const DEFAULT_OPTIONS: MapOptionsType = {
  latColName: "lat",
  lonColName: "lon",
  classify: null,
  groups: {},
  mapTileUrl: "//t0.tianditu.gov.cn/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrix={z}&tilerow={y}&tilecol={x}&tk=77cbcdbfc12c0466d3205a94bf7a6c3e",
  clusterMarkers: true,
  customizeMarkers: false,
  iconShape: "marker",
  iconFont: "circle",
  foregroundColor: "#ffffff",
  backgroundColor: "#356AFF",
  borderColor: "#356AFF",
  bounds: null,
  tooltip: {
    enabled: false,
    template: "",
  },
  popup: {
    enabled: true,
    template: "",
  },
};

export default function getOptions(options: MapOptionsType) {
  options = merge({}, DEFAULT_OPTIONS, options);
  options.mapTileUrl = options.mapTileUrl || DEFAULT_OPTIONS.mapTileUrl;

  // Backward compatibility
  if (options.classify === "none") {
    options.classify = null;
  }

  return options;
}
