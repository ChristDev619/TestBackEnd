import { Request, Response } from "express";

// SERVICES
import { readDiscoverySources } from "../services/discoverySource.services";

// TYPES
import { DiscoverySource } from "../utils/types/discoverySource.types";

export const getDiscoverySources = async (req: Request, res: Response) => {
  try {
    const discoverySources: DiscoverySource[] = await readDiscoverySources();

    return res.status(200).json(discoverySources);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);

      return res.status(500).json(error);
    }
  }
};
