import { CloudRain, CloudRainWind, CloudSunRain, CloudSun } from "lucide-react"
import ForecastItem from "./ForecastItem"

export default function Forecast() {
    const weatherArray = [
        {
            time: '11:59',
            icon: CloudRain,
            temperature: '29°C'
        }, {
            time: '12:59',
            icon: CloudRainWind,
            temperature: '28°C'
        }, {
            time: '13:59',
            icon: CloudSunRain,
            temperature: '28°C'
        }, {
            time: '14:59',
            icon: CloudSun,
            temperature: '26°C'
        },
    ]

    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-xl px-2 mb-4">Previsão horária</h2>
            <div
                data-testid="forecast-grid"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {weatherArray.map((item) => (
                    <ForecastItem
                        time={item.time}
                        icon={item.icon}
                        temperature={item.temperature}
                    />
                ))}
            </div>
        </div>
    )
} 