import { CircleArrowOutUpRight, CircleUserRound } from "lucide-react"
import ProfileTab from "./ProfileTab"
import OrdersTab from "./OrdersTab"
import UploadsTab from "./UploadsTab"
import AddressTab from "./AddressTab"
import type { ProfileAccount, ProfileAddress } from "./type"
import { tabs, type Tab } from "@/data"

interface ProfileInfoProps {
  hasAccount: boolean
  fullName: string
  account: ProfileAccount
  handleLogout: () => void
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  setAddressEdit: (value: boolean) => void
  updateAccountField: <K extends keyof ProfileAccount>(key: K, value: ProfileAccount[K]) => void
  saveAccount: () => void
  address: ProfileAddress
  addressEdit: boolean
}

const ProfileInfo = ({
  hasAccount,
  fullName,
  account,
  handleLogout,
  activeTab,
  setActiveTab,
  setAddressEdit,
  updateAccountField,
  saveAccount,
  address,
  addressEdit,
}: ProfileInfoProps) => {
    return (
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
    )
}

export default ProfileInfo;