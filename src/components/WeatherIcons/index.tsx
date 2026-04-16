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
) {
    // céu limpo
    if (code === 0) {
        return isDay ? Sun : Moon
    }

    // parcialmente nublado
    if (code === 1 || code === 2) {
        return isDay ? CloudSun : CloudMoon
    }

    // nublado
    if (code === 3) {
        return Cloud
    }

    // nevoeiro
    if (code === 45 || code === 48) {
        return CloudFog
    }

    // garoa
    if (code >= 51 && code <= 57) {
        return CloudDrizzle
    }

    // chuva
    if (code >= 61 && code <= 67) {
        return CloudRain
    }

    // neve
    if (code >= 71 && code <= 77) {
        return CloudSnow
    }

    // pancadas
    if (code >= 80 && code <= 82) {
        return CloudRain
    }

    // tempestade
    if (code >= 95) {
        return CloudLightning
    }

    return Cloud 
}