import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  age: number;
  bmi: number;
  glucose: number;
  bloodPressure: number;
  insulin: number;
  pregnancies: number;
  prediction?: "Diabetic" | "Not Diabetic";
  probability?: number;
  timestamp?: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
    bmi: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    glucose: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    bloodPressure: {
      type: Number,
      required: true,
      min: 0,
      max: 250,
    },
    insulin: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    pregnancies: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    prediction: {
      type: String,
      enum: ["Diabetic", "Not Diabetic"],
    },
    probability: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  {
    timestamps: true,
  }
);

let patientModel: mongoose.Model<IPatient> | null = null;

export function getPatientModel(): mongoose.Model<IPatient> {
  if (!patientModel) {
    try {
      // Try to create the model
      patientModel = mongoose.model<IPatient>("Patient", PatientSchema);
    } catch (error: any) {
      // If model already exists, get it
      if (error.name === "OverwriteModelError") {
        patientModel = mongoose.models.Patient as mongoose.Model<IPatient>;
      } else {
        throw error;
      }
    }
  }
  return patientModel;
}

// Lazy export
export const Patient = new Proxy(new Object(), {
  get(target: any, prop: PropertyKey) {
    return (getPatientModel() as any)[prop];
  },
  set(target: any, prop: PropertyKey, value: any) {
    (getPatientModel() as any)[prop] = value;
    return true;
  },
}) as any as mongoose.Model<IPatient>;
