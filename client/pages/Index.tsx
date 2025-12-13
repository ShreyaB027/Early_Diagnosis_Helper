import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Activity,
  Zap,
  TrendingDown,
  Shield,
  Clock,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                DiabeteDetect
              </span>
            </div>
            <Link to="/predict">
              <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Detect Diabetes
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Early, Save Lives
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Advanced machine learning identifies high-risk patients early. Many
            individuals remain undiagnosed until complications occur. Our
            cutting-edge system helps doctors detect diabetes risk before it's
            too late.
          </p>
          <Link to="/predict">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-lg px-8 py-6"
            >
              Start Risk Assessment
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-8 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Accuracy Rate</p>
                <p className="text-2xl font-bold text-gray-900">85%+</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Early Detection</p>
                <p className="text-2xl font-bold text-gray-900">Proven</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Secure & Private</p>
                <p className="text-2xl font-bold text-gray-900">HIPAA Ready</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border border-blue-100 hover:border-blue-300 transition-colors">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Assessment
              </h3>
              <p className="text-gray-600">
                Input basic patient information and get instant risk assessment
                results.
              </p>
            </Card>

            <Card className="p-8 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <Activity className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Key Factors
              </h3>
              <p className="text-gray-600">
                Understand which medical factors contribute most to the
                prediction.
              </p>
            </Card>

            <Card className="p-8 border border-purple-100 hover:border-purple-300 transition-colors">
              <Clock className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Clinical Grade
              </h3>
              <p className="text-gray-600">
                Built with medical expertise to support early intervention
                strategies.
              </p>
            </Card>

            <Card className="p-8 border border-cyan-100 hover:border-cyan-300 transition-colors">
              <Heart className="w-8 h-8 text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Risk Scoring
              </h3>
              <p className="text-gray-600">
                Detailed probability scores help prioritize high-risk patients
                for intervention.
              </p>
            </Card>

            <Card className="p-8 border border-orange-100 hover:border-orange-300 transition-colors">
              <TrendingDown className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ROC Analysis
              </h3>
              <p className="text-gray-600">
                Visual ROC curve analysis for model performance evaluation and
                validation.
              </p>
            </Card>

            <Card className="p-8 border border-pink-100 hover:border-pink-300 transition-colors">
              <Shield className="w-8 h-8 text-pink-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Data Protection
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security ensures patient data privacy and
                confidentiality.
              </p>
            </Card>
          </div>
        </div>

        {/* Input Parameters Section */}
        <div className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-2xl p-12 mb-20 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Assessment Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Age", unit: "years", desc: "Patient age" },
              { name: "BMI", unit: "kg/m²", desc: "Body Mass Index" },
              { name: "Glucose", unit: "mg/dL", desc: "Blood glucose level" },
              {
                name: "Blood Pressure",
                unit: "mmHg",
                desc: "Systolic pressure",
              },
              { name: "Insulin", unit: "mIU/L", desc: "Serum insulin level" },
              {
                name: "Pregnancies",
                unit: "count",
                desc: "Number of pregnancies",
              },
            ].map((param) => (
              <div key={param.name} className="text-center">
                <h3 className="font-semibold text-gray-900">{param.name}</h3>
                <p className="text-sm text-gray-600">{param.unit}</p>
                <p className="text-xs text-gray-500">{param.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-12 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-emerald-600">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Detect Risk Early?
            </h2>
            <p className="text-blue-50 mb-8 text-lg">
              Take the first step in early diabetes detection. Complete your
              assessment in minutes.
            </p>
            <Link to="/predict">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-8 py-6"
              >
                Start Assessment Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">DiabeteDetect</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 DiabeteDetect. For research and clinical decision support
              only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
