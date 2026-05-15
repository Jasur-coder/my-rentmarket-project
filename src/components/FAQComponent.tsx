import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from "@/data/faq"

const FAQComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Аренда");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Вопросы и ответы</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-8">
        {/* Табы */}
        <div className="flex flex-wrap gap-6 border-b border-gray-100 mb-6 overflow-x-auto pb-1 no-scrollbar">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(null); // Закрываем аккордеон при смене таба
              }}
              className={`pb-4 text-lg font-medium transition-all relative ${
                activeTab === tab ? "text-green-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Список вопросов */}
        <div className="divide-y divide-gray-100">
          {faqData[activeTab].map((item, index) => (
            <div key={index} className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${activeTab}-${index}`}
                id={`faq-question-${activeTab}-${index}`}
              >
                <span className="text-gray-800 font-medium pr-4 leading-snug">
                  {item.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-gray-100 ${openIndex === index ? 'bg-gray-100' : ''}`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-600" aria-hidden />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" aria-hidden />
                  )}
                </div>
              </button>
              
              {/* Контент (Ответ) */}
              <div
                id={`faq-answer-${activeTab}-${index}`}
                role="region"
                aria-labelledby={`faq-question-${activeTab}-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;