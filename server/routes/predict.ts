import { RequestHandler } from "express";
import { getPatientModel } from "../models/Patient";
import { z } from "zod";
import { randomUUID } from "crypto";

const PredictionSchema = z.object({
  age: z.number().min(0).max(150),
  bmi: z.number().min(0).max(100),
  glucose: z.number().min(0).max(500),
  bloodPressure: z.number().min(0).max(250),
  insulin: z.number().min(0).max(1000),
  pregnancies: z.number().min(0).max(20),
});

export type PredictionRequest = z.infer<typeof PredictionSchema>;

export interface PredictionResponse {
  success: boolean;
  prediction: "Diabetic" | "Not Diabetic";
  probability: number;
  accuracy: number;
  factors: Array<{
    name: string;
    value: number;
    impact: "high" | "medium" | "low";
  }>;
  patientId?: string;
  error?: string;
}


export async function handlePredict(req, res) {
  try {
    const fastApiResponse = await fetch("http://127.0.0.1:8001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Pregnancies: req.body.pregnancies,
        Glucose: req.body.glucose,
        BloodPressure: req.body.bloodPressure,
        Insulin: req.body.insulin,
        BMI: req.body.bmi,
        Age: req.body.age
      })
    });

    const result = await fastApiResponse.json();

    return res.json({
      success: true,
      prediction: result.prediction === 1 ? "Diabetic" : "Not Diabetic",
      probability: result.probability,
      accuracy: 0.75, // static OR compute later
      factors: [
        { name: "Glucose", value: req.body.glucose, impact: "high" },
        { name: "BMI", value: req.body.bmi, impact: "medium" },
        { name: "Blood Pressure", value: req.body.bloodPressure, impact: "medium" },
        { name: "Insulin", value: req.body.insulin, impact: "high" },
        { name: "Age", value: req.body.age, impact: "medium" },
        { name: "Pregnancies", value: req.body.pregnancies, impact: "low" }
      ]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      error: "ML backend error"
    });
  }
}

function calculateRiskScore(data: PredictionRequest, factors: any[]): number {
  let score = 0;

  if (data.glucose > 126) score += 0.25;
  else if (data.glucose > 100) score += 0.15;

  if (data.bmi > 30) score += 0.2;
  else if (data.bmi > 25) score += 0.1;

  if (data.bloodPressure > 130) score += 0.15;
  else if (data.bloodPressure > 120) score += 0.08;

  if (data.insulin > 200) score += 0.15;
  else if (data.insulin > 100) score += 0.08;

  if (data.age > 45) score += 0.1;
  else if (data.age > 35) score += 0.05;

  if (data.pregnancies > 5) score += 0.1;

  return Math.min(score, 1);
}

function calculateRiskFactors(
  data: PredictionRequest
): Array<{
  name: string;
  value: number;
  impact: "high" | "medium" | "low";
}> {
  const factors = [];

  const glucoseImpact = data.glucose > 126 ? "high" : data.glucose > 100 ? "medium" : "low";
  factors.push({
    name: "Glucose Level",
    value: data.glucose,
    impact: glucoseImpact,
  });

  const bmiImpact = data.bmi > 30 ? "high" : data.bmi > 25 ? "medium" : "low";
  factors.push({
    name: "BMI",
    value: parseFloat(data.bmi.toFixed(1)),
    impact: bmiImpact,
  });

  const bpImpact = data.bloodPressure > 130 ? "high" : data.bloodPressure > 120 ? "medium" : "low";
  factors.push({
    name: "Blood Pressure (Systolic)",
    value: data.bloodPressure,
    impact: bpImpact,
  });

  const insulinImpact = data.insulin > 200 ? "high" : data.insulin > 100 ? "medium" : "low";
  factors.push({
    name: "Insulin Level",
    value: data.insulin,
    impact: insulinImpact,
  });

  const ageImpact = data.age > 45 ? "medium" : data.age > 35 ? "low" : "low";
  factors.push({
    name: "Age",
    value: data.age,
    impact: ageImpact,
  });

  if (data.pregnancies > 0) {
    const pregImpact = data.pregnancies > 5 ? "medium" : "low";
    factors.push({
      name: "Pregnancies",
      value: data.pregnancies,
      impact: pregImpact,
    });
  }

  return factors.sort((a, b) => {
    const impactScore = { high: 3, medium: 2, low: 1 };
    return impactScore[b.impact] - impactScore[a.impact];
  });
}
