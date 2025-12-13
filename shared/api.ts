/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Request type for diabetes prediction endpoint
 */
export interface PredictionRequest {
  age: number;
  bmi: number;
  glucose: number;
  bloodPressure: number;
  insulin: number;
  pregnancies: number;
}

/**
 * Risk factor information in prediction response
 */
export interface RiskFactor {
  name: string;
  value: number;
  impact: "high" | "medium" | "low";
}

/**
 * Response type for /api/predict endpoint
 */
export interface PredictionResponse {
  success: boolean;
  prediction: "Diabetic" | "Not Diabetic";
  probability: number;
  accuracy: number;
  factors: RiskFactor[];
  patientId?: string;
  error?: string;
}

/**
 * Patient history response type
 */
export interface HistoryResponse {
  success: boolean;
  data: any[];
  total: number;
  error?: string;
}
