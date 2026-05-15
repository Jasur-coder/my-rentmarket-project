import type { ProfileAccount, ProfileAddress } from "@/components/type"

export const defaultAccount: ProfileAccount = {
  firstName: "",
  lastName: "",
  displayName: "",
  phone: "",
}

export const defaultAddress: ProfileAddress = {
  firstName: "",
  lastName: "",
  company: "",
  country: "Узбекистан",
  street: "",
  unit: "",
  city: "",
  region: "",
  postalCode: "",
  phone: "",
}

export type Tab = "profile" | "orders" | "uploads" | "address"

export const tabs: { key: Tab; label: string }[] = [
  { key: "profile", label: "Профиль" },
  { key: "orders", label: "Заказы" },
  { key: "uploads", label: "Загрузки" },
  { key: "address", label: "Адреса" },
]
