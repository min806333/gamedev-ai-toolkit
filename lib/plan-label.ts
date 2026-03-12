import { translations, type Language } from "@/lib/translations";
import type { Plan } from "@/lib/types";

type TranslationSet = (typeof translations)[Language];

export function getPlanLabel(plan: Plan, t: TranslationSet) {
  switch (plan) {
    case "free":
      return t.common.planFree;
    case "pro":
      return t.common.planPro;
    case "studio":
      return t.common.planStudio;
    default:
      return plan;
  }
}
