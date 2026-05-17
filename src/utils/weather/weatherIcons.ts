import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Moon,
} from 'lucide-react'

export function getWeatherIcon(code: number, isDay: boolean) {
  switch (code) {
    case 0:
      return isDay ? Sun : Moon

    case 1:
    case 2:
    case 3:
      return Cloud

    case 45:
    case 48:
      return CloudFog

    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return CloudRain

    case 71:
    case 73:
    case 75:
      return CloudSnow

    case 95:
      return CloudLightning

    default:
      return Cloud
  }
}