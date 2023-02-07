import { getWeather } from "./weather.service.js";
import { getCredo } from "./scraping.service.js";

export const getFantasticJsonData = async ({ latitude, longitude }) => {
  try {
    const weatherData = (await getWeather({ latitude, longitude }))[0];

    // クレド決定方法
    // 最高気温と最低気温の和の四捨五入
    const sumTemperature =
      Math.round(weatherData.temperature_2m_max + weatherData.temperature_2m_min);
    const credoNumber = (sumTemperature) => {
      if (sumTemperature % 7 === 0) {
        return 6; // 7 で割り切れる場合
      } else if (sumTemperature % 6 === 0) {
        return 5; // 6 で割り切れる場合
      } else if (sumTemperature % 5 === 0) {
        return 4; // 5 で割り切れる場合
      } else if (sumTemperature % 4 === 0) {
        return 3; // 4 で割り切れる場合
      } else if (sumTemperature % 3 === 0) {
        return 2; // 6 で割り切れず、3 で割り切れる場合
      } else if (sumTemperature % 2 === 0) {
        return 1 // 4, 6 で割り切れなず、2 で割り切れる場合
      } else {
        return 0; // 1, 3, 5, 7 意外の素数の場合 & 0 の場合
      }
    }

    const credoAllData = await getCredo();
    const credoNum = credoNumber(sumTemperature);
    const credoData = credoAllData[credoNum];
    return { weatherData, credoData };
  } catch (e) {
    throw Error("Error while getting JSON.");
  }
};
