import { Skeleton } from "./ui/skeleton";

const Loading = () => {
    return (
        <div className="mt-14 mb-14">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="w-lg h-96" />
                    <div className="flex justify-start gap-13 items-center mt-6">
                        <Skeleton className="w-16 h-16" />
                        <Skeleton className="w-16 h-16" />
                        <Skeleton className="w-16 h-16" />
                    </div>
                </div>
                <div>
                    <Skeleton className="w-105 h-125" />
                </div>
            </div>
            <Skeleton className="w-full h-36 mt-16" />
        </div>
    )
}

export default Loading;