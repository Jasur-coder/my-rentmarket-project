import { useEffect, useMemo, useState } from "react"
import { CircleUserRound, CircleArrowOutUpRight, PackageX, Pencil } from "lucide-react"
import { InputMask } from "@react-input/mask";

type Tab = "profile" | "orders" | "uploads" | "address"

const tabs: { key: Tab; label: string }[] = [
  { key: "profile", label: "Профиль" },
  { key: "orders", label: "Заказы" },
  { key: "uploads", label: "Загрузки" },
  { key: "address", label: "Адреса" },
]

interface ProfileAccount {
  firstName: string
  lastName: string
  displayName: string
  phone: string
}

interface ProfileAddress {
  firstName: string
  lastName: string
  company: string
  country: string
  street: string
  unit: string
  city: string
  region: string
  postalCode: string
  phone: string
}

interface StoredOrderItem {
  id: number
  title: string
  quantity: number
  img?: string
  price?: string
  deposit?: string
  period?: string
}

interface StoredOrder {
  id: string
  status: "Новый" | "Отменён" | "Завершён"
  date: string
  total: number
  items: StoredOrderItem[]
}

const ACCOUNT_KEY = "profileAccount"
const ORDERS_KEY = "profileOrdersByAccount"
const LEGACY_ORDERS_KEY = "profileOrders"
const ADDRESS_KEY = "profileAddress"
type OrdersByAccount = Record<string, StoredOrder[]>

const normalizeAccountKey = (phone: string) =>
  phone.trim().length > 0 ? phone.trim().toLowerCase() : "guest"
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

const defaultAccount: ProfileAccount = {
  firstName: "",
  lastName: "",
  displayName: "",
  phone: "",
}

const defaultAddress: ProfileAddress = {
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
  const [addressEdit, setAddressEdit] = useState(false)
  const [account, setAccount] = useState<ProfileAccount>(defaultAccount)
  const [address, setAddress] = useState<ProfileAddress>(defaultAddress)
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [setupForm, setSetupForm] = useState(createEmptySetupForm)

  const updateAccountField = <K extends keyof ProfileAccount>(key: K, value: ProfileAccount[K]) =>
    setAccount((prev) => ({ ...prev, [key]: value }))

  const updateAddressField = <K extends keyof ProfileAddress>(key: K, value: ProfileAddress[K]) =>
    setAddress((prev) => ({ ...prev, [key]: value }))

  const updateSetupField = <K extends keyof typeof setupForm>(key: K, value: string) =>
    setSetupForm((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const parsedAccount = parseStoredJson<Partial<ProfileAccount> | null>(ACCOUNT_KEY, null)
    const parsedAddress = parseStoredJson<Partial<ProfileAddress> | null>(ADDRESS_KEY, null)
    setAccount(parsedAccount ? toProfileAccount(parsedAccount) : defaultAccount)
    setAddress(parsedAddress ? toProfileAddress(parsedAddress) : defaultAddress)
  }, [])

  useEffect(() => {
    const accountKey = normalizeAccountKey(account.phone)
    const scopedOrders = parseStoredJson<OrdersByAccount>(ORDERS_KEY, {})
    if (Object.keys(scopedOrders).length > 0) {
      setOrders(scopedOrders[accountKey] ?? [])
      return
    }
    // Backward compatibility for old single-list key.
    const legacyOrders = parseStoredJson<StoredOrder[]>(LEGACY_ORDERS_KEY, [])
    if (accountKey === "guest") {
      setOrders(legacyOrders)
    } else {
      setOrders([])
    }
  }, [account.phone])

  const hasAccount = useMemo(
    () =>
      account.firstName.trim().length > 0 &&
      account.lastName.trim().length > 0 &&
      account.phone.trim().length > 0,
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
      phone: created.phone,
    }))
  }

  const saveAddress = () => {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(address))
    setAddressEdit(false)
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
          <div className="mt-6 rounded-xl bg-white p-6 md:p-8 border border-[#dfdfdf]">
            <h2 className="text-[28px] font-semibold text-[#2f2f2f]">
              Создайте профиль
            </h2>
            <p className="mt-2 text-[20px] text-[#6a6a6a]">
              Для первого входа заполните: имя, фамилию и телефон.
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <EditableField
                label="Имя*"
                value={setupForm.firstName}
                onChange={(v) => updateSetupField("firstName", v)}
              />
              <EditableField
                label="Фамилия*"
                value={setupForm.lastName}
                onChange={(v) => updateSetupField("lastName", v)}
              />
              <div>
                <label className="mb-2 block text-[24px] font-medium text-[#555]">Телефон*</label>
                <InputMask
                  mask="+998 __ ___ __ __"
                  replacement={{ _: /\d/ }}
                  value={setupForm.phone}
                  onChange={(e) => updateSetupField("phone", e.target.value)}
                  className="h-14 w-full rounded-xl border border-[#d9d9d9] bg-white px-3 text-[22px] text-[#333] outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCreateProfile}
                disabled={!setupValid}
                className="h-12 rounded-xl border border-[#d7d7d7] bg-[#ececec] px-8 text-[28px] font-semibold text-[#6a6a6a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Создать профиль
              </button>
            </div>
          </div>
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
                className={`pb-3 text-[26px] font-medium transition-colors ${
                  activeTab === tab.key
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
          <div className="mt-6 rounded-xl bg-[#f7f7f7]">
            {!hasAccount && (
              <div className="mb-4 rounded-xl border border-[#d9d9d9] bg-white p-4 text-[20px] text-[#4b4b4b]">
                У вас нет аккаунта. Заполните поля ниже и нажмите "Сохранить".
              </div>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              <EditableField
                label="Имя*"
                value={account.firstName}
                onChange={(v) => updateAccountField("firstName", v)}
              />
              <EditableField
                label="Фамиля*"
                value={account.lastName}
                onChange={(v) => updateAccountField("lastName", v)}
              />
              <EditableField
                label="Отображаемое имя*"
                value={account.displayName}
                onChange={(v) => updateAccountField("displayName", v)}
              />
              <EditableField
                label="Телефон*"
                value={account.phone}
                onChange={(v) => updateAccountField("phone", v)}
              />
              <div />
            </div>



            <div className="mt-7 border-t border-[#ddd] pt-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={saveAccount}
                  className="h-12 rounded-xl border border-[#d7d7d7] bg-[#ececec] px-8 text-[32px] font-semibold text-[#9a9a9a]"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="mt-6">
            <h2 className="text-[34px] font-semibold text-[#3a3a3a]">
              Количество заказов ({orders.length})
            </h2>
            {orders.length === 0 ? (
              <div className="mt-4 rounded-xl bg-[#efefef] p-5 text-[22px] text-[#777]">
                Пока нет заказов. Оформите заказ, и он появится здесь.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-xl bg-[#efefef] p-5">
                    <div className="mb-4">
                      <OrderRow label="Заказ:" value={`№${order.id}`} />
                      <OrderRow label="Статус:" value={order.status} badge={order.status === "Отменён"} />
                      <OrderRow label="Дата:" value={order.date} />
                      <OrderRow
                        label="Итого:"
                        value={`${new Intl.NumberFormat("ru-RU").format(order.total)} сум`}
                      />
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t border-[#d7d7d7]">
                      {order.items.map((item) => {
                        const priceNum = item.price ? Number(item.price.replace(/[^\d]/g, "")) : 0
                        const oldPriceNum = item.deposit ? Number(item.deposit.replace(/[^\d]/g, "")) : 0
                        return (
                          <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#F5F5F5] border border-[#d9d9d9] p-3">
                            <div className="flex items-center gap-4">
                              {item.img && (
                                <img
                                  src={item.img}
                                  alt={item.title}
                                  className="h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover bg-white shrink-0"
                                />
                              )}
                              <div>
                                <p className="text-lg md:text-xl font-semibold text-[#2f2f2f]">
                                  {item.title}
                                </p>
                                {item.period && (
                                  <p className="mt-1 text-sm md:text-[16px] text-[#707070]">
                                    {item.period} · {item.quantity} шт.
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                               <div className="text-lg md:text-xl font-semibold text-[#2f2f2f]">
                                 {priceNum > 0 ? `${new Intl.NumberFormat("ru-RU").format(priceNum)} сум` : ""}
                               </div>
                               {oldPriceNum > priceNum && (
                                 <div className="text-sm md:text-[16px] text-[#a0a0a0] line-through">
                                   {`${new Intl.NumberFormat("ru-RU").format(oldPriceNum)} сум`}
                                 </div>
                               )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "uploads" && (
          <div className="mt-6 rounded-xl bg-[#f5f5f5] px-4 py-14">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[#ececec]">
              <PackageX className="h-16 w-16 text-[#444]" />
            </div>
            <h3 className="mt-8 text-center text-[44px] font-semibold text-[#1f1f1f]">Нет загрузок</h3>
            <p className="mx-auto mt-4 max-w-[560px] text-center text-[24px] text-[#777]">
              Пока что здесь пусто. Как только вы начнете загружать файлы, они появятся в этом разделе.
            </p>
          </div>
        )}

        {activeTab === "address" && (
          <div className="mt-6">
            {!addressEdit ? (
              <div className="rounded-xl bg-[#efefef] p-5">
                <h2 className="text-[34px] font-semibold text-[#3a3a3a]">Платёжный адрес</h2>
                <div className="mt-4 flex items-start justify-between">
                  <div className="space-y-4 text-[24px]">
                    <AddressRow label="Адрес:" value={address.street || "—"} />
                    <AddressRow label="Населённый пункт:" value={address.city || "—"} />
                    <AddressRow label="Область:" value={address.region || "—"} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddressEdit(true)}
                    className="rounded-full border border-[#d4d4d4] bg-white p-3"
                  >
                    <Pencil className="h-5 w-5 text-[#4b4b4b]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-[#f7f7f7]">
                <h2 className="text-[34px] font-semibold text-[#3a3a3a]">Платёжный адрес</h2>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  <EditableField
                    label="Имя*"
                    value={address.firstName}
                    onChange={(v) => updateAddressField("firstName", v)}
                  />
                  <EditableField
                    label="Фамиля*"
                    value={address.lastName}
                    onChange={(v) => updateAddressField("lastName", v)}
                  />
                  <EditableField
                    label="Название компании"
                    value={address.company}
                    onChange={(v) => updateAddressField("company", v)}
                  />
                  <EditableField
                    label="Страна / Регион*"
                    value={address.country}
                    onChange={(v) => updateAddressField("country", v)}
                  />
                  <EditableField
                    label="Адрес*"
                    value={address.street}
                    onChange={(v) => updateAddressField("street", v)}
                  />
                  <EditableField
                    label="Крыло, подъезд, этаж и т.д ( необязательно )"
                    value={address.unit}
                    onChange={(v) => updateAddressField("unit", v)}
                  />
                  <EditableField
                    label="Населённый пункт*"
                    value={address.city}
                    onChange={(v) => updateAddressField("city", v)}
                  />
                  <EditableField
                    label="Область / Район ( необязательно )"
                    value={address.region}
                    onChange={(v) => updateAddressField("region", v)}
                  />
                  <EditableField
                    label="Почтовый индекс"
                    value={address.postalCode}
                    onChange={(v) => updateAddressField("postalCode", v)}
                  />
                  <div />
                  <EditableField
                    label="Телефон*"
                    value={address.phone}
                    onChange={(v) => updateAddressField("phone", v)}
                  />
                </div>

                <div className="mt-7 border-t border-[#ddd] pt-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={saveAddress}
                      className="h-12 rounded-xl border border-[#d7d7d7] bg-[#ececec] px-8 text-[32px] font-semibold text-[#9a9a9a]"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}

const Field = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
  <div>
    <label className="mb-2 block text-[24px] font-medium text-[#555]">{label}</label>
    <input
      readOnly
      value={value}
      className={`h-14 w-full rounded-xl border border-[#d9d9d9] bg-[#f2f2f2] px-3 text-[22px] outline-none ${
        muted ? "text-[#b0b0b0]" : "text-[#333]"
      }`}
    />
  </div>
)

const EditableField = ({
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

const OrderRow = ({
  label,
  value,
  link = false,
  badge = false,
}: {
  label: string
  value: string
  link?: boolean
  badge?: boolean
}) => (
  <div className="mb-3 flex items-center gap-4 text-[23px]">
    <span className="min-w-20 text-[#777]">{label}</span>
    {link ? (
      <a href="#" className="text-[#1e40ff] underline">
        {value}
      </a>
    ) : badge ? (
      <span className="rounded-md bg-[#ffd9d9] px-3 py-0.5 text-[#da1b1b]">{value}</span>
    ) : (
      <span className="text-[#333]">{value}</span>
    )}
  </div>
)

const AddressRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-4">
    <span className="min-w-40 text-[#777]">{label}</span>
    <span className="text-[#222]">{value}</span>
  </div>
)

export default MyProfile