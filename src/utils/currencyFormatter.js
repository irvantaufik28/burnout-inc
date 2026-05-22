/**
 * Centralized Currency Formatter
 * 
 * Rules:
 * 1. USD is the internal base currency.
 * 2. IDR is calculated using a static exchange rate (1 USD = 16,000 IDR).
 * 3. Formatting follows local standards (commas/dots).
 */

const EXCHANGE_RATE = 16000;

export const formatCurrency = (amount, language = 'en') => {
  if (language === 'id') {
    const idrAmount = amount * EXCHANGE_RATE;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(idrAmount).replace(/\s/g, '');
  }

  // Default to USD
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
