import axios from "axios";

export const getCredo = async (query) => {
  try {
    const url = "https://gsacademy.jp/about/";
    const html = (await axios.get(url)).data;
    return html;
  } catch (e) {
    throw Error("Error while getting HTML.");
  }
};
