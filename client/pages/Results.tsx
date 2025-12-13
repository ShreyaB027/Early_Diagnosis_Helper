import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useEffect } from "react";

interface PredictionResult {
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
}

interface LocationState {
  result: PredictionResult;
  formData: {
    age: string;
    bmi: string;
    glucose: string;
    bloodPressure: string;
    insulin: string;
    pregnancies: string;
  };
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.result) {
      navigate("/predict");
    }
  }, [state, navigate]);

  if (!state?.result) {
    return null;
  }

  const { result, formData } = state;
  const isHighRisk = result.prediction === "Diabetic";
  const riskPercentage = Math.round(result.probability * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                DiabeteDetect
              </span>
            </Link>
            <Link to="/predict">
              <Button variant="outline">
                <ChevronLeft className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Prediction Card */}
        <div
          className={`rounded-2xl p-8 sm:p-12 mb-8 border-2 ${
            isHighRisk
              ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
              : "bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div>
              {isHighRisk ? (
                <AlertTriangle className="w-16 h-16 text-red-600 mb-4" />
              ) : (
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {result.prediction}
              </h1>
              <p
                className={`text-lg ${
                  isHighRisk ? "text-red-700" : "text-emerald-700"
                }`}
              >
                Risk Score: {riskPercentage}%
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Diabetes Risk Probability
              </span>
              <span className="text-sm font-bold text-gray-900">
                {riskPercentage}%
              </span>
            </div>
            <Progress
              value={riskPercentage}
              className="h-3 bg-gray-200"
              style={{
                backgroundColor: "#e5e7eb",
              }}
            />
          </div>

          <div className={`p-4 rounded-lg ${isHighRisk ? "bg-red-100" : "bg-emerald-100"}`}>
            <p
              className={`text-sm font-medium ${
                isHighRisk ? "text-red-900" : "text-emerald-900"
              }`}
            >
              {isHighRisk
                ? "⚠️ This patient shows signs of elevated diabetes risk. Recommend further clinical evaluation and lifestyle modifications."
                : "✓ This patient shows lower diabetes risk. Continue regular health monitoring."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Model Accuracy */}
          <Card className="border-0 shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
              Model Accuracy
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {Math.round(result.accuracy * 100)}%
            </p>
            <p className="text-sm text-gray-600">
              Overall prediction accuracy based on test data
            </p>
          </Card>

          {/* High Risk Threshold */}
          <Card className="border-0 shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
              Threshold
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">50%</p>
            <p className="text-sm text-gray-600">
              Classification threshold for diabetes risk
            </p>
          </Card>

          {/* Patient ID */}
          <Card className="border-0 shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
              Assessment ID
            </h3>
            <p className="text-sm font-mono text-gray-900 break-all">
              {result.patientId || "Local Assessment"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Reference for patient records
            </p>
          </Card>
        </div>

        {/* Risk Factors Section */}
        

        {/* Patient Data Summary */}
        <Card className="border-0 shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Assessment Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Age", value: formData.age },
              { label: "BMI", value: formData.bmi },
              { label: "Glucose (mg/dL)", value: formData.glucose },
              { label: "Blood Pressure (mmHg)", value: formData.bloodPressure },
              { label: "Insulin (mIU/L)", value: formData.insulin },
              { label: "Pregnancies", value: formData.pregnancies },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-gray-900">
                  {parseFloat(item.value).toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card
          className={`border-0 shadow-lg p-8 mb-8 ${
            isHighRisk
              ? "bg-gradient-to-r from-red-50 to-orange-50"
              : "bg-gradient-to-r from-emerald-50 to-cyan-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Clinical Recommendations
          </h2>
          <div className="space-y-3">
            {isHighRisk ? (
              <>
                <div className="flex gap-3">
                  <span className="text-red-600 font-bold">→</span>
                  <p className="text-gray-700">
                    Schedule comprehensive diabetes screening with HbA1c test
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-600 font-bold">→</span>
                  <p className="text-gray-700">
                    Consult with endocrinologist for personalized intervention
                    plan
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-600 font-bold">→</span>
                  <p className="text-gray-700">
                    Implement dietary modifications and increase physical
                    activity
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-600 font-bold">→</span>
                  <p className="text-gray-700">
                    Monitor blood glucose regularly and maintain health records
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <p className="text-gray-700">
                    Continue regular health check-ups and monitoring
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <p className="text-gray-700">
                    Maintain healthy lifestyle with balanced diet and exercise
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <p className="text-gray-700">
                    Annual diabetes screening as part of preventive care
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/predict" className="flex-1">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
            >
              Run New Assessment
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button size="lg" variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Disclaimer:</strong> This assessment is for research and
            clinical decision support only. It should not be used as a substitute
            for professional medical advice, diagnosis, or treatment. Always
            consult with a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}

function getFactorDescription(name: string, value: number): string {
  switch (name) {
    case "Glucose Level":
      if (value > 200) return "Critical - Likely diabetic range";
      if (value > 126) return "High - Fasting glucose above normal";
      if (value > 100) return "Elevated - Impaired fasting glucose";
      return "Normal - Within healthy range";
    case "BMI":
      if (value > 30) return "Obese - Increased diabetes risk";
      if (value > 25) return "Overweight - Moderate risk";
      return "Normal - Healthy weight range";
    case "Blood Pressure (Systolic)":
      if (value > 140) return "High - Stage 2 hypertension";
      if (value > 130) return "Elevated - Stage 1 hypertension";
      return "Normal - Healthy blood pressure";
    case "Insulin Level":
      if (value > 400) return "Very High - Severe insulin resistance";
      if (value > 200) return "High - Insulin resistance present";
      if (value > 100) return "Elevated - Possible insulin resistance";
      return "Normal - Healthy insulin levels";
    case "Age":
      if (value > 60) return "High - Increased risk with age";
      if (value > 45) return "Moderate - Risk increases above 45";
      return "Lower risk category";
    case "Pregnancies":
      if (value > 5)
        return "High - Increased gestational diabetes history";
      if (value > 0) return "Moderate - Some pregnancy history";
      return "No pregnancy history";
    default:
      return "";
  }
}
