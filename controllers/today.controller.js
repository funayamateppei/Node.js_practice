// controllers/today.controller.js

import { getFantasticJsonData } from "../services/today.service.js";

export const getTodaysData = async (req, res, next) => {
  try {
    const latitude = Number(req.query.latitude ?? 35.6785);
    const longitude = Number(req.query.longitude ?? 139.6823);
    const result = await getFantasticJsonData({ latitude, longitude });
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully get todaysData!",
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};
