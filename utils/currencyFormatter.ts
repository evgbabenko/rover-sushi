const currencyFormat = (num: number) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const Currency = (
  quantity: number,
  currency: 'usd' | 'uah' | 'eur' | 'USD' | 'UAH' | 'EUR'
) => {
  
  switch (currency!.toUpperCase()) {
    case 'USD':
      return '$ ' + currencyFormat(quantity);
    case 'EUR':
      return '€ ' + currencyFormat(quantity);
    case 'UAH':
    default:
      return currencyFormat(quantity) + ' ₴';
  }
};
