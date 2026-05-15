import React from 'react'
import type { OrdersTabProps } from './type'

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

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  const resolveImagePath = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `/${path}`
  }

  return (
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
                            src={resolveImagePath(item.img)}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            width={80}
                            height={80}
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
    )
}

export default OrdersTab