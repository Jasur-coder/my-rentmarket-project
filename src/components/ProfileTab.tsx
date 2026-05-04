import { EditableField } from './MyProfile'
import type { ProfileTabProps } from './type'

const ProfileTab = ({ hasAccount, account, updateAccountField, saveAccount }: ProfileTabProps) => {
    return (
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
                    value={account.phone || ""}
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
    )
}

export default ProfileTab