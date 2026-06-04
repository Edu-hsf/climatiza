export function toTimeFormat(
  value: Date | string,
) {
  const date = new Date(value);

  return date.toLocaleTimeString(
    'pt-BR',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

export function toSimplifiedDateFormat(
  value: Date | string,
) {
  const date = new Date(value);

  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');

  const month = date.toLocaleDateString(
    'pt-BR',
    {
      month: 'short',
    },
  );

  const formattedMonth =
    month.replace('.', '');

  return `${day} ${formattedMonth}`;
}

export function toFullDateFormat(
  value: Date | string,
) {
  const date = new Date(value);

  const formatted =
    date.toLocaleDateString(
      'pt-BR',
      {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    );

  return (
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1)
  );
}

export function toDayName(date: Date): string {
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const today = new Date();
  
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) return 'Hoje';

  return days[date.getDay()];
}