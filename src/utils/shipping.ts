interface ShippingRate {
  upTo1kg: number;
  upTo3kg: number;
  above3kg: number;
}

const shippingRates: Record<string, ShippingRate> = {
  'Andhra Pradesh': { upTo1kg: 120, upTo3kg: 180, above3kg: 200 },
  'Telangana': { upTo1kg: 130, upTo3kg: 190, above3kg: 210 },
  'Karnataka': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Kerala': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Tamil Nadu': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Punjab': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Haryana': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Himachal Pradesh': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Uttarakhand': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Gujarat': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Rajasthan': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Uttar Pradesh': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Arunachal Pradesh': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Assam': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Manipur': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Meghalaya': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Mizoram': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Nagaland': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Sikkim': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Tripura': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  // Updated states linked to Rajasthan rates
  'Andaman and Nicobar Islands': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Jharkhand': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Delhi': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Jammu and Kashmir': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Ladakh': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Chandigarh': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Dadra and Nagar Haveli and Daman and Diu': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  'Lakshadweep': { upTo1kg: 200, upTo3kg: 300, above3kg: 360 },
  // Other states
  'Bihar': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Chhattisgarh': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Goa': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Madhya Pradesh': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Maharashtra': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'Odisha': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
  'West Bengal': { upTo1kg: 140, upTo3kg: 200, above3kg: 220 },
};

export const calculateShippingCharge = (totalWeight: number, state: string): number => {
  if (!state || state.trim() === '') {
    return 0; // No shipping charge if state is not selected
  }

  const rate = shippingRates[state] || shippingRates['Andhra Pradesh']; // Default to Andhra if state not found

  if (totalWeight <= 1) {
    return Math.round(rate.upTo1kg);
  } else if (totalWeight <= 3) {
    return Math.round(rate.upTo3kg);
  } else {
    return Math.round(rate.above3kg);
  }
};
