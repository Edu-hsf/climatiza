const weatherCodes: Record<number, string> = {
    0: 'Ensolarado',
    1: 'Quase sem nuvens',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina congelanta',
    51: 'Chuvisco fraco',
    53: 'Chuvisco',
    55: 'Chuvisco forte',
    61: 'Chuva fraca',
    63: 'Chuva',
    65: 'Chuva intensa',
    71: 'Nevasca fraca',
    73: 'Nevesca',
    75: 'Nevesca intensa',
    95: 'Tempestade',
};

export function getWeatherDescription(code: number): string {
    return weatherCodes[code] || 'desconhecido';
}