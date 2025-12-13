import { RequestHandler } from "express";
import { getPatientModel } from "../models/Patient";

export const handleGetHistory: RequestHandler = async (req, res) => {
  try {
    const Patient = getPatientModel();
    const patients = await Patient.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      data: patients,
      total: patients.length,
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({
      success: false,
      error: "Database not available",
      data: [],
      total: 0,
    });
  }
};
