import { Gift } from "lucide-react"
import type { DetailsTab, RentPeriod } from "@/components/type"
import express24 from "../assets/partners/express24.webp"
import utezkor from "../assets/partners/Utezkor.webp"
import yandex from "../assets/partners/yandex.webp"
import ona from "../assets/partners/ona.webp"
import payme from "../assets/partners/Payme.webp"
import uzumNasiya from "../assets/partners/UzumNasiya.webp"
import solfy from "../assets/partners/Solfy.webp"
import zoodpay from "../assets/partners/ZoodPay.webp"
import bicycle from "@/assets/bicycle.webp"
import bikepath from "@/assets/bikepath.webp"
import ps from "@/assets/PS.webp"
import BG from "@/assets/BG.webp"
import Express from "@/assets/Express.webp"
import bicyclegift from "@/assets/bicyclegift.webp"

export const imageMap = {
  "bicycle.png": bicycle,
  "PS.png": ps,
  "bikepath.png": bikepath,
  "BG.png": BG,
  "Express.png": Express,
  "bicyclegift.png": bicyclegift,
  "express24.png": express24,
  "Utezkor.png": utezkor,
  "yandex.png": yandex,
  "ona.png": ona,
  "Payme.png": payme,
  "UzumNasiya.png": uzumNasiya,
  "Solfy.png": solfy,
  "ZoodPay.png": zoodpay,
}

export const periods = [
  { key: "week" as RentPeriod, label: "Неделя" },
  { key: "month" as RentPeriod, label: "Месяц", icon: Gift },
]

export const productTabs = [
  { key: "desc" as DetailsTab, label: "Описание товара" },
  { key: "reviews" as DetailsTab, label: "Отзывы" },
]
