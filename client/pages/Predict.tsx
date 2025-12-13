import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  age: string;
  bmi: string;
  glucose: string;
  bloodPressure: string;
  insulin: string;
  pregnancies: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Predict() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    age: "",
    bmi: "",
    glucose: "",
    bloodPressure: "",
    insulin: "",
    pregnancies: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const age = parseFloat(formData.age);
    if (!formData.age || age < 0 || age > 150)
      newErrors.age = "Age must be between 0 and 150";

    const bmi = parseFloat(formData.bmi);
    if (!formData.bmi || bmi < 0 || bmi > 100)
      newErrors.bmi = "BMI must be between 0 and 100";

    const glucose = parseFloat(formData.glucose);
    if (!formData.glucose || glucose < 0 || glucose > 500)
      newErrors.glucose = "Glucose must be between 0 and 500 mg/dL";

    const bp = parseFloat(formData.bloodPressure);
    if (!formData.bloodPressure || bp < 0 || bp > 250)
      newErrors.bloodPressure = "Blood Pressure must be between 0 and 250";

    const insulin = parseFloat(formData.insulin);
    if (!formData.insulin || insulin < 0 || insulin > 1000)
      newErrors.insulin = "Insulin must be between 0 and 1000 mIU/L";

    const pregnancies = parseFloat(formData.pregnancies);
    if (!formData.pregnancies || pregnancies < 0 || pregnancies > 20)
      newErrors.pregnancies = "Pregnancies must be between 0 and 20";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          bmi: parseFloat(formData.bmi),
          glucose: parseFloat(formData.glucose),
          bloodPressure: parseFloat(formData.bloodPressure),
          insulin: parseFloat(formData.insulin),
          pregnancies: parseFloat(formData.pregnancies),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      navigate("/results", { state: { result, formData } });
    } catch (error) {
      console.error("Prediction error:", error);
      setSubmitError(
        "Failed to process prediction. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                DiabeteDetect
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Patient Risk Assessment
          </h1>
          <p className="text-gray-600">
            Enter patient information to predict diabetes risk using AI analysis
          </p>
        </div>

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <Card className="border-0 shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Demographics Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                  1
                </div>
                Demographics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age" className="text-gray-700 font-medium">
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.age ? "border-red-500" : "border-blue-200"
                    }`}
                    step="0.1"
                    min="0"
                    max="150"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pregnancies"
                    className="text-gray-700 font-medium"
                  >
                    Pregnancies (count)
                  </Label>
                  <Input
                    id="pregnancies"
                    name="pregnancies"
                    type="number"
                    placeholder="Enter number of pregnancies"
                    value={formData.pregnancies}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.pregnancies ? "border-red-500" : "border-blue-200"
                    }`}
                    step="1"
                    min="0"
                    max="20"
                  />
                  {errors.pregnancies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pregnancies}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Physical Measurements Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-bold">
                  2
                </div>
                Physical Measurements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bmi" className="text-gray-700 font-medium">
                    BMI (Body Mass Index)
                  </Label>
                  <Input
                    id="bmi"
                    name="bmi"
                    type="number"
                    placeholder="Enter BMI (kg/m²)"
                    value={formData.bmi}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.bmi ? "border-red-500" : "border-blue-200"
                    }`}
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  {errors.bmi && (
                    <p className="text-red-500 text-sm mt-1">{errors.bmi}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="bloodPressure"
                    className="text-gray-700 font-medium"
                  >
                    Blood Pressure Systolic (mmHg)
                  </Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    type="number"
                    placeholder="Enter systolic pressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.bloodPressure
                        ? "border-red-500"
                        : "border-blue-200"
                    }`}
                    step="0.1"
                    min="0"
                    max="250"
                  />
                  {errors.bloodPressure && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bloodPressure}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Clinical Measurements Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">
                  3
                </div>
                Clinical Measurements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="glucose" className="text-gray-700 font-medium">
                    Glucose Level (mg/dL)
                  </Label>
                  <Input
                    id="glucose"
                    name="glucose"
                    type="number"
                    placeholder="Enter glucose level"
                    value={formData.glucose}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.glucose ? "border-red-500" : "border-blue-200"
                    }`}
                    step="0.1"
                    min="0"
                    max="500"
                  />
                  {errors.glucose && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.glucose}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="insulin" className="text-gray-700 font-medium">
                    Insulin Level (mIU/L)
                  </Label>
                  <Input
                    id="insulin"
                    name="insulin"
                    type="number"
                    placeholder="Enter insulin level"
                    value={formData.insulin}
                    onChange={handleInputChange}
                    className={`mt-2 ${
                      errors.insulin ? "border-red-500" : "border-blue-200"
                    }`}
                    step="0.1"
                    min="0"
                    max="1000"
                  />
                  {errors.insulin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.insulin}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Assessment...
                  </>
                ) : (
                  <>
                    Get Prediction <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center text-gray-600 text-sm">
          <p>
            This assessment is for research and clinical decision support only.
            Always consult with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
