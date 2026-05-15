import { Battery, Gauge, Sofa, Bike } from "lucide-react"
import type { FeatureItem } from "@/components/type"

export const features: FeatureItem[] = [
  {
    icon: Battery,
    text: "Заряда батареи хватает на 75км",
  },
  {
    icon: Gauge,
    text: "Высокая скорость до 50 км/час",
  },
  {
    icon: Sofa,
    text: "Удобное эргономичное сиденье",
  },
  {
    icon: Bike,
    text: "Усиленная рама для любых дорог",
  },
]
