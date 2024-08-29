import { CURRENCY_FORMATTER, NUMBER_FORMATTER } from '@/shared/lib/constants';

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};

export const formatDateTime = (date: Date | string) => {
  const newDate = new Date(date);
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime: string = new Intl.DateTimeFormat('en-US', dateTimeOptions).format(
    newDate
  );
  const formattedDate: string = new Intl.DateTimeFormat('en-US', dateOptions).format(newDate);
  const formattedTime: string = new Intl.DateTimeFormat('en-US', timeOptions).format(newDate);

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
