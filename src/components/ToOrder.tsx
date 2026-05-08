import { useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useCards } from "@/context/CardsContext"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { CheckCircle2, MapPin, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { InputMask } from "@react-input/mask"
import type { CheckoutLocationState, ProfileOrder, ProfileAccount } from "./type"

const COURIER_FEE = 30_000

type DeliveryMethod = "pickup" | "courier"
type PaymentMethod = "card" | "cash"

type OrdersByAccount = Record<string, ProfileOrder[]>

const PROFILE_ACCOUNT_KEY = "profileAccount"
const ORDERS_BY_ACCOUNT_KEY = "profileOrdersByAccount"
const LEGACY_ORDERS_KEY = "profileOrders"

const normalizeAccountKey = (phone?: string) =>
  phone && phone.trim().length > 0
    ? phone.trim().toLowerCase()
    : "guest"

const parsePrice = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "")
  return numeric ? Number(numeric) : 0
}

const formatSum = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " сум"

const PICKUP_ADDRESS = {
  title: "Пункт выдачи Rentmarket",
  lines: ["ул. Бобура, 6, Ташкент", "10:00 — 20:00, ежедневно"],
}

const ToOrder = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as CheckoutLocationState | null
  const { CardItems } = useCards()

  const [city, setCity] = useState("tashkent")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [newsletter, setNewsletter] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>("")

  const totals = useMemo(() => {
    if (
      state?.totalPrice != null &&
      state?.totalOldPrice != null &&
      CardItems.length > 0
    ) {
      return {
        totalPrice: state.totalPrice,
        totalOldPrice: state.totalOldPrice,
        totalSaving: Math.max(
          0,
          state.totalSaving ?? state.totalOldPrice - state.totalPrice
        ),
        itemCount: state.itemCount ?? CardItems.length,
      }
    }
    let tp = 0
    let to = 0
    CardItems.forEach((item) => {
      const q = state?.quantities?.[item.id] ?? 1
      tp += parsePrice(item.price) * q
      to += parsePrice(item.deposit) * q
    })
    return {
      totalPrice: tp,
      totalOldPrice: to,
      totalSaving: Math.max(0, to - tp),
      itemCount: CardItems.length,
    }
  }, [CardItems, state])

  const deliveryFee = deliveryMethod === "courier" ? COURIER_FEE : 0
  const grandTotal = totals.totalPrice + deliveryFee
  const deliveryLabel =
    deliveryFee === 0 ? "бесплатно" : formatSum(deliveryFee)

  const formValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0

  const handlePlaceOrder = () => {
    if (!formValid) return
    const order: ProfileOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      status: "Новый",
      date: new Date().toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      total: grandTotal,
      items: CardItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: state?.quantities?.[item.id] ?? 1,
        img: item.img,
        price: item.price,
        deposit: item.deposit,
        period: item.period,
      })),
    }
    try {
      const accountRaw = localStorage.getItem(PROFILE_ACCOUNT_KEY)
      const account: ProfileAccount = accountRaw ? JSON.parse(accountRaw) : {}
      const accountKey = normalizeAccountKey(account.phone || phone)

      const existingRaw = localStorage.getItem(ORDERS_BY_ACCOUNT_KEY)
      const existingByAccount: OrdersByAccount = existingRaw ? JSON.parse(existingRaw) : {}

      // One-time migration path if old global orders key exists.
      const legacyRaw = localStorage.getItem(LEGACY_ORDERS_KEY)
      const legacyOrders: ProfileOrder[] = legacyRaw ? JSON.parse(legacyRaw) : []

      // If existingByAccount is completely empty and this is a guest, it's safe to pull in legacy orders.
      // Otherwise, a new logged-in account should start with an empty order history.
      const currentOrders =
        existingByAccount[accountKey] ??
        (Object.keys(existingByAccount).length === 0 && accountKey === "guest" ? legacyOrders : [])

      const nextByAccount: OrdersByAccount = {
        ...existingByAccount,
        [accountKey]: [order, ...currentOrders],
      }

      localStorage.setItem(ORDERS_BY_ACCOUNT_KEY, JSON.stringify(nextByAccount))
      if (legacyRaw) localStorage.removeItem(LEGACY_ORDERS_KEY)
    } catch {
      // ignore storage issues; user still gets order confirmation
    }

    // Mock order number (no backend yet) - just for a nice confirmation window.
    const number = order.id
    setOrderNumber(number)
    setOrderSuccessOpen(true)
  }

  if (CardItems.length === 0) {
    return (
      <div className="min-h-[50vh] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Корзина пуста</h1>
          <p className="mt-2 text-gray-600">
            Добавьте товары в корзину, чтобы оформить заказ.
          </p>
          <Button
            className="mt-6 rounded-xl bg-[#1F1F1F] text-white hover:bg-[#00D414]"
            asChild
          >
            <Link to="/catalog">В каталог</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] pb-16 pt-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left: form */}
          <div className="min-w-0 flex-1 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Оформление заказа
            </h1>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Способ получения и адрес доставки
              </h2>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Город доставки
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none focus:border-[#00D414]"
                >
                  <option value="tashkent">Ташкент</option>
                  <option value="samarkand">Самарканд</option>
                </select>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-colors",
                    deliveryMethod === "pickup"
                      ? "border-[#00D414] bg-[#F8FFF8]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        deliveryMethod === "pickup"
                          ? "border-[#00D414] bg-[#00D414]"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {deliveryMethod === "pickup" && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900">
                        Пункт выдачи Rentmarket
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        10:00 — 20:00 · бесплатно
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("courier")}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-colors",
                    deliveryMethod === "courier"
                      ? "border-[#00D414] bg-[#F8FFF8]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        deliveryMethod === "courier"
                          ? "border-[#00D414] bg-[#00D414]"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {deliveryMethod === "courier" && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900">
                        Курьером до двери
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Дата по согласованию · {formatSum(COURIER_FEE)} · курьер
                        позвонит заранее
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Адрес доставки
              </h2>
              {deliveryMethod === "pickup" ? (
                <div className="mt-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-semibold text-gray-900">
                        {PICKUP_ADDRESS.title}
                      </p>
                      {PICKUP_ADDRESS.lines.map((line) => (
                        <p key={line} className="text-sm text-gray-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 w-full rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={() => navigate("/catalog")}
                  >
                    Изменить
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Адрес
                  </label>
                  <textarea
                    placeholder="Улица, дом, подъезд, этаж"
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-[#00D414]"
                  />
                </div>
              )}
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Получатель заказа
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Имя<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-[#00D414]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Фамилия<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-[#00D414]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Номер телефона<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="border border-[#d9d9d9] bg-white px-3 pt-2 text-[22px] rounded-xl text-[#333] h-12 text-center">
                      +998
                    </span>
                    <InputMask
                      mask="__ ___ __ __"
                      replacement={{ _: /\d/ }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 w-42 rounded-xl border border-[#d9d9d9] bg-white px-3 text-[22px] text-[#333] outline-none"
                    />
                  </div>
                </div>
              </div>
              <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#00D414] focus:ring-[#00D414]"
                />
                Подписаться на новости и акции
              </label>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Способ оплаты
              </h2>
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-colors",
                    paymentMethod === "card"
                      ? "border-[#00D414] bg-[#F8FFF8]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        paymentMethod === "card"
                          ? "border-[#00D414] bg-[#00D414]"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {paymentMethod === "card" && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Картой онлайн
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        UZCARD, HUMO, Visa, MasterCard
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={cn(
                    "w-full rounded-2xl border-2 p-4 text-left transition-colors",
                    paymentMethod === "cash"
                      ? "border-[#00D414] bg-[#F8FFF8]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        paymentMethod === "cash"
                          ? "border-[#00D414] bg-[#00D414]"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {paymentMethod === "cash" && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Оплата при получении
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Payme, Click или наличными курьеру
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Right: summary */}
          <aside className="w-full shrink-0 lg:w-[380px]">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Ваш заказ</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <span>Товары ({totals.itemCount}):</span>
                  <span className="shrink-0 font-medium">
                    {formatSum(totals.totalOldPrice)}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Доставка:</span>
                  <span className="shrink-0 font-medium text-gray-900">
                    {deliveryLabel}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
                  <span>Итого:</span>
                  <span>{formatSum(grandTotal)}</span>
                </div>
                {totals.totalSaving > 0 && (
                  <p className="text-sm font-medium text-[#00D414]">
                    Вы экономите: {formatSum(totals.totalSaving)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setPromoOpen((o) => !o)}
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100"
              >
                Есть промокод?
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    promoOpen && "rotate-180"
                  )}
                />
              </button>
              {promoOpen && (
                <div className="mt-2 flex gap-2">
                  <input
                    placeholder="Промокод"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#00D414]"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 rounded-xl"
                  >
                    Применить
                  </Button>
                </div>
              )}

              <Button
                type="button"
                disabled={!formValid}
                onClick={handlePlaceOrder}
                className={cn(
                  "mt-6 h-12 w-full rounded-xl text-base font-semibold",
                  formValid
                    ? "bg-[#1F1F1F] text-white hover:bg-[#00D414]"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                )}
              >
                Оформить заказ
              </Button>

              <p className="mt-4 text-xs leading-relaxed text-gray-500">
                Нажимая «Оформить заказ», вы соглашаетесь с{" "}
                <a href="#" className="underline hover:text-gray-700">
                  политикой конфиденциальности
                </a>{" "}
                и{" "}
                <a href="#" className="underline hover:text-gray-700">
                  пользовательским соглашением
                </a>
                .
              </p>
            </div>
          </aside>

          <AlertDialog open={orderSuccessOpen} onOpenChange={setOrderSuccessOpen}>
            <AlertDialogContent className="rounded-3xl border-0 bg-white p-8 shadow-xl sm:max-w-lg">
              <AlertDialogHeader>
                <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-[#E8FDEB] text-[#00D414]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <AlertDialogTitle className="text-2xl font-bold text-gray-900 text-center">
                  Спасибо за покупку
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-center text-gray-600">
                  Заказ №{orderNumber || "—"} принят. Мы свяжемся с вами по телефону.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 sm:justify-center">
                <AlertDialogCancel
                  variant="secondary"
                  className="rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  Закрыть
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="default"
                  className="rounded-xl bg-[#1F1F1F] text-white hover:bg-[#00D414]"
                  onClick={() => {
                    setOrderSuccessOpen(false)
                    navigate("/catalog")
                  }}
                >
                  Перейти в каталог
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default ToOrder
