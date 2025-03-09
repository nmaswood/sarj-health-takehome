import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WoundAssessment } from "@/types/WoundAssessment";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../ui/progress";
export interface IAssessmentResult {
  woundAssessment: WoundAssessment;
  submitWoundData: (woundData: WoundAssessment) => Promise<void>;
}

export default function AssessmentResult({
  woundAssessment,
}: IAssessmentResult) {
  const {
    location,
    assessment: { estimated_healing_weeks, risk_level, requires_debridement },
    status,
    tissue,
    measurements,
  } = woundAssessment;

  const riskColors = {
    low: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-orange-500",
    severe: "bg-red-500",
  };

  return (
    <Card className="w-full min-w-[400px] max-w-lg p-4 shadow-lg transition">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Wound Assessment{" "}
          <Badge className={`${riskColors[risk_level]}`}>
            {risk_level} risk
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-500">
          {location.side.toUpperCase()} {location.site.toUpperCase()}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Wound Measurements */}
        <div>
          <p className="text-sm font-medium">Wound Size</p>
          <p className="text-xs text-gray-500">
            {measurements.length} cm (L) × {measurements.width} cm (W) ×{" "}
            {measurements.depth} cm (D)
          </p>
          <p className="text-xs text-gray-500">
            Total Area: {measurements.area} cm²
          </p>
        </div>

        {/* Tissue Composition */}
        <div>
          <p className="text-sm font-medium">Tissue Composition</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <span className="text-green-600">Healthy: {tissue.healthy}%</span>
            <span className="text-yellow-600">Damaged: {tissue.damaged}%</span>
            <span className="text-red-600">Necrotic: {tissue.necrotic}%</span>
          </div>
          <Progress value={(tissue.healthy / 100) * 100} className="mt-1 h-2" />
        </div>

        {/* Healing Progress */}
        <div>
          <p className="text-sm font-medium">Healing Progress</p>
          <p className="text-xs text-gray-500">
            {status.healing.replace("_", " ")}
          </p>
        </div>

        {/* Estimated Healing Time */}
        <div className="flex justify-between text-sm">
          <span>Estimated Healing Time:</span>
          <span className="font-medium">{estimated_healing_weeks} weeks</span>
        </div>

        {/* Pain & Infection */}
        <div className="flex justify-between text-sm">
          <span>Pain Level:</span>
          <span className="font-medium">{status.pain} / 10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Infection:</span>
          <span
            className={`font-medium ${status.infection ? "text-red-500" : "text-green-500"}`}
          >
            {status.infection ? "Yes" : "No"}
          </span>
        </div>

        {/* Exudate Level */}
        <div className="flex justify-between text-sm">
          <span>Exudate Level:</span>
          <span className="font-medium capitalize">{status.exudate}</span>
        </div>

        {/* Debridement Need */}
        <div className="flex justify-between text-sm">
          <span>Requires Debridement:</span>
          <span
            className={`font-medium ${requires_debridement ? "text-red-500" : "text-green-500"}`}
          >
            {requires_debridement ? "Yes" : "No"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
