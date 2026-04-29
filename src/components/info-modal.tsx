import { X } from "lucide-react";
import { Button } from "./ui/button";
import type { InfoModalProps } from "./type";



const InfoModal = ({ open, handleOpen }: InfoModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Muvaffaqiyatli!</h3>
          <button onClick={handleOpen} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-gray-600 mb-6">
          <p>Sizning so'rovingiz muvaffaqiyatli yuborildi. Biz tez orada siz bilan bog'lanamiz.</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleOpen} className="w-full sm:w-auto bg-[#206BC4]">Tushunarli</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
