import { CloudDrizzle } from "lucide-react"

export default function CurrentWeather () {
    return (
        <div className="flex flex-col items-center">
            <div className="
                glass 
                w-fit
                h-fit
                p-6
                rounded-full
                mb-6
            ">
                <CloudDrizzle size={80}/>
            </div>

            <h1 className="text-8xl mb-4">
                28°C
            </h1>

            <p className="text-2xl">
                Chuva fraca
            </p>
        </div>
    )
}