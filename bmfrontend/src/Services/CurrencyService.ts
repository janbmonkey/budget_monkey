export const getCurrencySign = (currencyCode: string): string => {
  switch (currencyCode) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'JPY':
      return '¥';
    case 'GBP':
      return '£';
    default:
      return ':/';
  }
};
