import { useMemo, useState } from "react"
import { CircleUserRound, CircleArrowOutUpRight } from "lucide-react"
import type {  ProfileAccount, ProfileAddress } from "./type";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import UploadsTab from "./UploadsTab";
import AddressTab from "./AddressTab";
import { defaultAccount, defaultAddress, tabs, type Tab } from "@/data";
import LogIn from "./LogIn";

const createEmptySetupForm = () => ({
  firstName: "",
  lastName: "",
  phone: "",
})

const parseStoredJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const toProfileAccount = (parsed: Partial<ProfileAccount>): ProfileAccount => ({
  firstName: parsed.firstName ?? "",
  lastName: parsed.lastName ?? "",
  displayName: parsed.displayName ?? "",
  phone: parsed.phone ?? "",
})

const toProfileAddress = (parsed: Partial<ProfileAddress>): ProfileAddress => ({
  firstName: parsed.firstName ?? "",
  lastName: parsed.lastName ?? "",
  company: parsed.company ?? "",
  country: parsed.country ?? "Узбекистан",
  street: parsed.street ?? "",
  unit: parsed.unit ?? "",
  city: parsed.city ?? "",
  region: parsed.region ?? "",
  postalCode: parsed.postalCode ?? "",
  phone: parsed.phone ?? "",
})

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const ACCOUNT_KEY = import.meta.env.ACCOUNT_KEY
  const ADDRESS_KEY = import.meta.env.ADDRESS_KEY

  const [account, setAccount] = useState<ProfileAccount>(() => {
    const parsedAccount = parseStoredJson<Partial<ProfileAccount> | null>(ACCOUNT_KEY, null)
    return parsedAccount ? toProfileAccount(parsedAccount) : defaultAccount
  })
  const [address, setAddress] = useState<ProfileAddress>(() => {
    const parsedAddress = parseStoredJson<Partial<ProfileAddress> | null>(ADDRESS_KEY, null)
    return parsedAddress ? toProfileAddress(parsedAddress) : defaultAddress
  })

  const [setupForm, setSetupForm] = useState(createEmptySetupForm)
  const [addressEdit, setAddressEdit] = useState(false)

  const updateAccountField = <K extends keyof ProfileAccount>(key: K, value: ProfileAccount[K]) =>
    setAccount((prev) => ({ ...prev, [key]: value }))

  const updateSetupField = <K extends keyof typeof setupForm>(key: K, value: string) =>
    setSetupForm((prev) => ({ ...prev, [key]: value }))

  const hasAccount = useMemo(
    () =>
      account.firstName.trim().length > 0 &&
      account.lastName.trim().length > 0 &&
      (account.phone && account.phone.trim().length > 0),
    [account]
  )
  const fullName = useMemo(
    () => `${account.firstName || ""} ${account.lastName || ""}`.trim(),
    [account.firstName, account.lastName]
  )

  const saveAccount = () => {
    const next = {
      ...account,
      displayName:
        account.displayName.trim().length > 0
          ? account.displayName
          : `${account.firstName} ${account.lastName}`.trim(),
    }
    setAccount(next)
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(next))
  }

  const setupValid =
    setupForm.firstName.trim().length > 0 &&
    setupForm.lastName.trim().length > 0 &&
    setupForm.phone.trim().length > 0

  const handleCreateProfile = () => {
    if (!setupValid) return
    const created: ProfileAccount = {
      firstName: setupForm.firstName.trim(),
      lastName: setupForm.lastName.trim(),
      phone: setupForm.phone.trim(),
      displayName: `${setupForm.firstName.trim()} ${setupForm.lastName.trim()}`.trim(),
    }
    setAccount(created)
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(created))
    setAddress((prev) => ({
      ...prev,
      firstName: created.firstName,
      lastName: created.lastName,
      phone: created.phone || "",
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCOUNT_KEY)
    localStorage.removeItem(ADDRESS_KEY)
    setAccount(defaultAccount)
    setAddress(defaultAddress)
    setSetupForm(createEmptySetupForm())
    setActiveTab("profile")
    setAddressEdit(false)
  }

  return (
    <div className="container ">
      <div className="rounded-[24px] bg-[#f7f7f7] p-4 md:p-6 mt-10  mb-80">
        <h1 className="text-[30px] font-semibold text-[#2f2f2f]">Мой аккаунт</h1>

        {!hasAccount && (
          <LogIn
            setupForm={setupForm}
            updateSetupField={updateSetupField}
            handleCreateProfile={handleCreateProfile}
            setupValid={setupValid}
          />
        )}

        {hasAccount && (
          <>
            <div className="mt-5 rounded-xl bg-[#efefef] p-4 md:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9d9d9]">
                    <CircleUserRound className="h-8 w-8 text-[#444]" />
                  </div>
                  <div>
                    <div className="text-[26px] font-semibold text-[#2f2f2f]">
                      {hasAccount ? fullName : "Нет аккаунта"}
                    </div>
                    <div className="text-[20px] text-[#707070]">
                      {account.displayName || "Добавьте данные профиля"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d4d4d4] bg-white px-5 text-[22px] font-medium text-[#666]"
                >
                  <CircleArrowOutUpRight className="h-5 w-5" />
                  Выйти
                </button>
              </div>

              <div className="mt-5 flex items-center gap-7 border-b border-[#d7d7d7]">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key)
                      if (tab.key !== "address") setAddressEdit(false)
                    }}
                    className={`pb-3 text-[26px] font-medium transition-colors ${activeTab === tab.key
                      ? "border-b-2 border-[#00c950] text-[#00b848]"
                      : "text-[#555] hover:text-[#222]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "profile" && (
              <ProfileTab
                hasAccount={hasAccount}
                account={account}
                updateAccountField={updateAccountField}
                saveAccount={saveAccount}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab orders={[]} />
            )}

            {activeTab === "uploads" && (
              <UploadsTab />
            )}

            {activeTab === "address" && (
              <AddressTab
                address={address}
                addressEdit={addressEdit}
                setAddressEdit={setAddressEdit}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const EditableField = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) => (
  <div>
    <label className="mb-2 block text-[24px] font-medium text-[#555]">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-14 w-full rounded-xl border border-[#d9d9d9] bg-white px-3 text-[22px] text-[#333] outline-none"
    />
  </div>
)

export default MyProfile