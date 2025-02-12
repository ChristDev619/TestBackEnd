// DB Instance
import { prisma } from "../config/db.server";

// Query Ranking
export const readYears = async () => {
  return await prisma.wRCESFinal.findMany({
    orderBy: [
      {
        year: "desc",
      },
    ],
    where: {},
    distinct: ["year"],
  });
};
