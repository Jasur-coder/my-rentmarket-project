import { InputMask } from "@react-input/mask"
import { EditableField } from "./MyProfile"

type SetupForm = {
  firstName: string
  lastName: string
  phone: string
}

type LogInProps = {
  setupForm: SetupForm
  updateSetupField: <K extends keyof SetupForm>(key: K, value: string) => void
  handleCreateProfile: () => void
  setupValid: boolean
}

const LogIn = ({
  setupForm,
  updateSetupField,
  handleCreateProfile,
  setupValid,
}: LogInProps) => {

    
    return (
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
                <div className="flex items-center gap-2">
                  <span className="border border-[#d9d9d9] bg-white px-3 pt-2 text-[22px] rounded-xl text-[#333] h-14 text-center">
                    +998
                  </span>
                  <InputMask
                    mask=" __ ___ __ __"
                    replacement={{ _: /\d/ }}
                    value={setupForm.phone}
                    onChange={(e) => updateSetupField("phone", e.target.value)}
                    className="h-14 w-full rounded-xl border border-[#d9d9d9] bg-white px-3 text-[22px] text-[#333] outline-none"
                  />
                </div>
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
    )
}

export default LogIn