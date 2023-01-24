import { getWeather } from "../services/weather.service.js";

export const getResult = async (req, res, next) => {
  // GETで送られてきたデータ(緯度経度)を確認する
  console.log(req.query);
  // 緯度経度を取り出す(送られてこなければデフォルトで東京の緯度経度を設定)
  const latitude = Number(req.query.latitude ?? 35.6785);
  const longitude = Number(req.query.longitude ?? 139.6823);
  try {
    const result = await getWeather({latitude, longitude});
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully get Weather!",
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};