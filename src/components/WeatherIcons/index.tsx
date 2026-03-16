import {
    Sun,
    Moon,
    CloudSun,
    CloudMoon,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudSnow,
    CloudLightning
} from "lucide-react";

export default function getWeatherIcon(
    code: number,
    isDay: boolean,
    size: number
) {
    // céu limpo
    if (code === 0) {
        return isDay ? <Sun size={size} /> : <Moon size={size} />
    }

    // parcialmente nublado
    if (code === 1 || code === 2) {
        return isDay ? <CloudSun size={size} /> : <CloudMoon size={size} />
    }

    // nublado
    if (code === 3) {
        return <Cloud size={size} />
    }

    // nevoeiro
    if (code === 45 || code === 48) {
        return <CloudFog size={size} />
    }

    // garoa
    if (code >= 51 && code <= 57) {
        return <CloudDrizzle size={size} />
    }

    // chuva
    if (code >= 61 && code <= 67) {
        return <CloudRain size={size} />
    }

    // neve
    if (code >= 71 && code <= 77) {
        return <CloudSnow size={size} />
    }

    // pancadas
    if (code >= 80 && code <= 82) {
        return <CloudRain size={size} />
    }

    // tempestade
    if (code >= 95) {
        return <CloudLightning size={size} />
    }

    return <Cloud size={size} />
}