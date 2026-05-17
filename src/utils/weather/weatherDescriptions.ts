const weatherCodes: Record<number, string> = {
    0: 'céu limpo',
    1: 'principalmente limpo',
    2: 'parcialmente nublado',
    3: 'nublado',
    45: 'neblina',
    48: 'neblina com geada',
    51: 'garoa leve',
    53: 'garoa moderada',
    55: 'garoa intensa',
    61: 'chuva leve',
    63: 'chuva moderada',
    65: 'chuva intensa',
    71: 'neve leve',
    73: 'neve moderada',
    75: 'neve intensa',
    95: 'tempestade',
}

export function getWeatherDescription(code: number): string {
    return weatherCodes[code] || 'desconhecido'
}