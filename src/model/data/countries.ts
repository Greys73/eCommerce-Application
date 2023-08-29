const countries = {
  Austria: 'AT',
  Belgium: 'BE',
  Bulgaria: 'BG',
  Croatia: 'HR',
  'Republic of Cyprus': 'GR',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Estonia: 'ET',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  Hungary: 'HU',
  Ireland: 'IE',
  Italy: 'IT',
  Latvia: 'LV',
  Lithuania: 'LT',
  Luxembourg: 'LB',
  Malta: 'MT',
  Netherlands: 'NL',
  Poland: 'PL',
  Portugal: 'PT',
  Romania: 'RO',
  Slovakia: 'SK',
  Slovenia: 'SL',
  Spain: 'ES',
  Sweden: 'SE',
};

export function getCountryName(code: string): string {
  const country = Object.entries(countries).find((item) => item[1] === code);
  const result = country ? country[0] : '';
  return result;
}

export default countries;
