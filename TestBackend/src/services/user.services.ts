// DB Instance
import { prisma } from "../config/db.server";

// TYPES
import type { User } from "../utils/types/user.types";

// READ User
export const readUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// CREATE User
export const createUser = async (newUser: User) => {
  return await prisma.user.create({
    data: {
      email: newUser.email,
      isEmployee: false,
      name: newUser.name ? newUser.name : null,
      phone: newUser.phone ? newUser.phone : null,
      discoverySource: newUser.discoverySource ? newUser.discoverySource : null,
      emailOptIn: newUser.emailOptIn ? newUser.emailOptIn : false,
    },
  });
};

// UPDATE User
export const updateUser = async (newUser: User) => {
  const existingEntry = await prisma.user.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (existingEntry) {
    return await prisma.user.update({
      where: {
        email: existingEntry.email,
      },
      data: {
        name: newUser.name ? newUser.name : existingEntry.name,
        phone: newUser.phone ? newUser.phone : existingEntry.phone,
        discoverySource: newUser.discoverySource
          ? newUser.discoverySource
          : existingEntry.discoverySource,
      },
    });
  } else {
    return await createUser(newUser);
  }
};

// DELETE User
export const deleteUser = async (email: string) => {
  return await prisma.user.delete({
    where: {
      email,
    },
  });
};
