import { rentData } from "@/data"


const Rent =  () => {
    
    return (
        <div className="mt-8">
            <h2 className="text-4xl font-bold mb-8">Как арендовать ?</h2>
            <div className="flex items-stretch justify-between gap-3">
                {
                    rentData.map((item) => (
                        <div
                            className="bg-white rounded-3xl px-6 pt-6 pb-10 max-w-[19.2rem] h-[19.2rem] flex flex-col justify-between"
                            key={item.id}
                        >
                            <div>
                                <h2 className="text-8xl font-normal">{item.title}</h2>
                                <div className="border border-green-500 rounded-full w-fit mt-6">
                                    <h2 className="px-2.5 py-2.5 text-[0.875rem] font-bold">
                                        {item.text}
                                    </h2>
                                </div>
                            </div>
                            <p className="text-[0.75rem] font-normal text-[#5B5B5B] mt-4">
                                {item.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Rent
