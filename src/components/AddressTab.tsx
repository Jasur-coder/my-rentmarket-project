import type { AddressTabProps } from './type'

const AddressRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-4">
    <span className="min-w-40 text-[#777]">{label}</span>
    <span className="text-[#222]">{value}</span>
  </div>
)

const AddressTab = ({ address  }: AddressTabProps) => {
    return (
        <div className="mt-6">
                <div className="rounded-xl bg-[#efefef] p-5">
                    <h2 className="text-[34px] font-semibold text-[#3a3a3a]">Платёжный адрес</h2>
                    <div className="mt-4 flex items-start justify-between">
                      <div className="space-y-4 text-[24px]">
                        <AddressRow label="Адрес:" value={address.street || "—"} />
                        <AddressRow label="Населённый пункт:" value={address.city || "—"} />
                        <AddressRow label="Область:" value={address.region || "—"} />
                      </div>
                    </div>
                  </div>
              </div>
    )
};

export default AddressTab;