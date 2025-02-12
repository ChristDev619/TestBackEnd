// SERVICES
// WRCES Final
import {
  readWRCESFinal,
  importWRCESFinal,
  updateWRCESFinal,
  deleteWRCESFinal,
} from "../services/wrcesFinal.services";

// WRCES Sport
import {
  readWRCESSport,
  importWRCESSport,
  updateWRCESSport,
  deleteWRCESSport,
} from "../services/wrcesSport.services";

// WRCES Merit
import {
  readWRCESMerit,
  importWRCESMerit,
  updateWRCESMerit,
  deleteWRCESMerit,
} from "../services/wrcesMerit.services";

// WFCR
import {
  readWFCR,
  importWFCR,
  updateWFCR,
  deleteWFCR,
} from "../services/wfcr.services";

// WSPI
import {
  readWSPI,
  importWSPI,
  updateWSPI,
  deleteWSPI,
} from "../services/wspi.services";

// TYPES
import {
  ReadRankingFunction,
  ReadRankingFunctionSport,
  ImportRankingFunction,
  UpdateRankingFunction,
  DeleteRankingFunction,
  DeleteRankingFunctionSport,
  UpdateRankingFunctionSport,
  ReadCountryStatsFunction,
} from "../utils/types/rankings/ranking-operations.types";
import {
  readCountryStatsWFCR,
  readCountryStatsWRCESFinal,
  readCountryStatsWRCESMerit,
  readCountryStatsWSPI,
} from "../services/country.services";

// READ Function Map
const readRankingFunctionMap: {
  [key: string]: ReadRankingFunction | ReadRankingFunctionSport;
} = {
  "wrces_final": readWRCESFinal,
  "wrces_sport": readWRCESSport,
  "wrces_merit": readWRCESMerit,
  "wspi": readWSPI,
  "wfcr": readWFCR,
};

// IMPORT Function Map
const importRankingFunctionMap: {
  [key: string]: ImportRankingFunction;
} = {
  "wrces_final": importWRCESFinal,
  "wrces_sport": importWRCESSport,
  "wrces_merit": importWRCESMerit,
  "wspi": importWSPI,
  "wfcr": importWFCR,
};

// UPDATE Function Map
const updateRankingFunctionMap: {
  [key: string]: UpdateRankingFunction | UpdateRankingFunctionSport;
} = {
  "wrces_final": updateWRCESFinal,
  "wrces_sport": updateWRCESSport,
  "wrces_merit": updateWRCESMerit,
  "wspi": updateWSPI,
  "wfcr": updateWFCR,
};

// DELETE Function Map
const deleteRankingFunctionMap: {
  [key: string]: DeleteRankingFunction | DeleteRankingFunctionSport;
} = {
  "wrces_final": deleteWRCESFinal,
  "wrces_sport": deleteWRCESSport,
  "wrces_merit": deleteWRCESMerit,
  "wspi": deleteWSPI,
  "wfcr": deleteWFCR,
};

// Select READ Funcion
export const selectReadRankingFunction = async (
  rankingName: string
): Promise<ReadRankingFunction | ReadRankingFunctionSport> => {
  try {
    if (readRankingFunctionMap.hasOwnProperty(rankingName)) {
      return readRankingFunctionMap[rankingName];
    } else {
      throw "Could not find the requested table.";
    }
  } catch (error) {
    throw error;
  }
};

// Select IMPORT Function
export const selectImportRankingFunction = async (
  rankingName: string
): Promise<ImportRankingFunction> => {
  try {
    if (importRankingFunctionMap.hasOwnProperty(rankingName)) {
      return importRankingFunctionMap[rankingName];
    } else {
      throw "Could not find the requested table.";
    }
  } catch (error) {
    throw error;
  }
};

// Select UPDATE Function
export const selectUpdateRankingFunction = async (
  rankingName: string
): Promise<UpdateRankingFunction | UpdateRankingFunctionSport> => {
  try {
    if (updateRankingFunctionMap.hasOwnProperty(rankingName)) {
      return updateRankingFunctionMap[rankingName];
    } else {
      throw "Could not find the requested table.";
    }
  } catch (error) {
    throw error;
  }
};

// Select DELETE Function
export const selectDeleteRankingFunction = async (
  rankingName: string
): Promise<DeleteRankingFunction | DeleteRankingFunctionSport> => {
  try {
    if (deleteRankingFunctionMap.hasOwnProperty(rankingName)) {
      return deleteRankingFunctionMap[rankingName];
    } else {
      throw "Could not find the requested table.";
    }
  } catch (error) {
    throw error;
  }
};

// READ Country Stats Function Map
const readCountryStatsFunctionMap: {
  [key: string]: ReadCountryStatsFunction;
} = {
  "wrces_final": readCountryStatsWRCESFinal,
  "wrces_merit": readCountryStatsWRCESMerit,
  "wspi": readCountryStatsWSPI,
  "wfcr": readCountryStatsWFCR,
};

// Select READ Country Stats Function
export const selectReadCountryStatsFunction = async (rankingName: string) => {
  try {
    if (readCountryStatsFunctionMap.hasOwnProperty(rankingName)) {
      return readCountryStatsFunctionMap[rankingName];
    } else {
      throw "Could not find the requested table.";
    }
  } catch (error) {
    throw error;
  }
};
