import { z } from "zod";

const WoundSiteSchema = z.enum([
  "foot",
  "leg",
  "arm",
  "hand",
  "trunk",
  "head",
  "other",
]);
const WoundSideSchema = z.enum(["left", "right", "center"]);
const WoundRiskLevelSchema = z.enum(["low", "moderate", "high", "severe"]);
const WoundAssessmentSchema = z.object({
  // Basic Measurements
  measurements: z.object({
    length: z.number(),
    width: z.number(),
    depth: z.number(),
    area: z.number(),
  }),

  // Tissue Health
  tissue: z.object({
    healthy: z.number().min(0).max(100),
    damaged: z.number().min(0).max(100),
    necrotic: z.number().min(0).max(100),
  }),

  // Wound Status
  status: z.object({
    exudate: z.enum(["none", "low", "moderate", "high"]),
    infection: z.boolean(),
    pain: z.number().min(0).max(10),
    healing: z.enum(["deteriorating", "stalled", "improving", "healing_well"]),
  }),

  // Location
  location: z.object({
    site: WoundSiteSchema,
    side: WoundSideSchema,
  }),

  // Assessment
  assessment: z.object({
    risk_level: WoundRiskLevelSchema,
    estimated_healing_weeks: z.number(),
    requires_debridement: z.boolean(),
  }),
});

type WoundAssessment = z.infer<typeof WoundAssessmentSchema>;

// Predefined scenarios
const WOUND_SCENARIOS = {
  healing_well: {
    measurements: {
      length: 2.5,
      width: 1.8,
      depth: 0.3,
      area: 4.5,
    },
    tissue: {
      healthy: 80,
      damaged: 15,
      necrotic: 5,
    },
    status: {
      exudate: "low" as const,
      infection: false,
      pain: 2,
      healing: "healing_well" as const,
    },
    assessment: {
      risk_level: "low" as const,
      estimated_healing_weeks: 2,
      requires_debridement: false,
    },
  },

  infected: {
    measurements: {
      length: 4.5,
      width: 3.2,
      depth: 1.2,
      area: 14.4,
    },
    tissue: {
      healthy: 30,
      damaged: 50,
      necrotic: 20,
    },
    status: {
      exudate: "high" as const,
      infection: true,
      pain: 8,
      healing: "deteriorating" as const,
    },
    assessment: {
      risk_level: "severe" as const,
      estimated_healing_weeks: 8,
      requires_debridement: true,
    },
  },

  stalled: {
    measurements: {
      length: 3.5,
      width: 2.8,
      depth: 0.8,
      area: 9.8,
    },
    tissue: {
      healthy: 45,
      damaged: 40,
      necrotic: 15,
    },
    status: {
      exudate: "moderate" as const,
      infection: false,
      pain: 4,
      healing: "stalled" as const,
    },
    assessment: {
      risk_level: "moderate" as const,
      estimated_healing_weeks: 6,
      requires_debridement: true,
    },
  },

  early_stage: {
    measurements: {
      length: 1.5,
      width: 1.2,
      depth: 0.2,
      area: 1.8,
    },
    tissue: {
      healthy: 90,
      damaged: 10,
      necrotic: 0,
    },
    status: {
      exudate: "low" as const,
      infection: false,
      pain: 3,
      healing: "improving" as const,
    },
    assessment: {
      risk_level: "low" as const,
      estimated_healing_weeks: 1,
      requires_debridement: false,
    },
  },
} as const;

function generateRandomWound(
  scenario?: keyof typeof WOUND_SCENARIOS,
): WoundAssessment {
  const randomNumber = (min: number, max: number) =>
    Number((Math.random() * (max - min) + min).toFixed(2));

  const sides = ["left", "right", "center"] as const;
  const sites = [
    "foot",
    "leg",
    "arm",
    "hand",
    "trunk",
    "head",
    "other",
  ] as const;

  const site: (typeof sites)[number] =
    sites[Math.floor(Math.random() * sites.length)] ?? "leg";

  const side: (typeof sides)[number] =
    sides[Math.floor(Math.random() * sides.length)] ?? "center";

  if (scenario) {
    const baseScenario = WOUND_SCENARIOS[scenario];
    const location = {
      site,
      side,
    };

    // Return scenario with small random variations
    return {
      ...baseScenario,
      measurements: {
        length:
          baseScenario.measurements.length * (1 + randomNumber(-0.1, 0.1)),
        width: baseScenario.measurements.width * (1 + randomNumber(-0.1, 0.1)),
        depth: baseScenario.measurements.depth * (1 + randomNumber(-0.1, 0.1)),
        area: baseScenario.measurements.area * (1 + randomNumber(-0.1, 0.1)),
      },
      location,
    };
  }

  const riskLevels = ["low", "moderate", "high", "severe"] as const;
  const exudateLevels = ["low", "moderate", "high", "none"] as const;
  const healingStatus = [
    "deteriorating",
    "stalled",
    "improving",
    "healing_well",
  ] as const;

  const exudate: (typeof exudateLevels)[number] =
    exudateLevels[Math.floor(Math.random() * exudateLevels.length)] ??
    "moderate";

  const healing: (typeof healingStatus)[number] =
    healingStatus[Math.floor(Math.random() * healingStatus.length)] ??
    "healing_well";

  const risk_level: (typeof riskLevels)[number] =
    riskLevels[Math.floor(Math.random() * riskLevels.length)] ?? "low";

  return {
    measurements: {
      length: randomNumber(1, 5),
      width: randomNumber(1, 4),
      depth: randomNumber(0.1, 2),
      area: randomNumber(1, 20),
    },
    tissue: {
      healthy: randomNumber(0, 100),
      damaged: randomNumber(0, 100),
      necrotic: randomNumber(0, 100),
    },
    status: {
      exudate,
      infection: Math.random() > 0.7,
      pain: Math.floor(randomNumber(0, 10)),
      healing,
    },
    location: {
      site,
      side,
    },
    assessment: {
      risk_level,
      estimated_healing_weeks: Math.floor(randomNumber(1, 12)),
      requires_debridement: Math.random() > 0.5,
    },
  };
}

export {
  WoundAssessmentSchema as SimpleWoundSchema,
  WOUND_SCENARIOS,
  generateRandomWound,
  type WoundAssessment,
  WoundAssessmentSchema,
};
