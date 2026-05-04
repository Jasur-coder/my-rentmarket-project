import { PackageX } from 'lucide-react';

const UploadsTab = () => {
    return (
        <div className="mt-6 rounded-xl bg-[#f5f5f5] px-4 py-14">
                <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[#ececec]">
                  <PackageX className="h-16 w-16 text-[#444]" />
                </div>
                <h3 className="mt-8 text-center text-[44px] font-semibold text-[#1f1f1f]">Нет загрузок</h3>
                <p className="mx-auto mt-4 max-w-140 text-center text-[24px] text-[#777]">
                  Пока что здесь пусто. Как только вы начнете загружать файлы, они появятся в этом разделе.
                </p>
              </div>
    )
}

export default UploadsTab