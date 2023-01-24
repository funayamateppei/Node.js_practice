export const getCredo = async (query) => {
  try {
    return { message: "ok" };
  } catch (e) {
    throw Error("Error while getting HTML.");
  }
};
