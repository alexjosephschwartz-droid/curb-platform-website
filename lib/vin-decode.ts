// NHTSA VIN Decoder API
// Free, no API key required
// https://vpic.nhtsa.dot.gov/api/

interface NHTSAResult {
  Variable: string;
  Value: string | null;
}

interface VINDecodeResult {
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  bodyStyle: string | null;
  engine: string | null;
  transmission: string | null;
  drivetrain: string | null;
  fuelType: string | null;
  error: string | null;
}

const FIELD_MAP: Record<string, keyof VINDecodeResult> = {
  'Model Year': 'year',
  'Make': 'make',
  'Model': 'model',
  'Trim': 'trim',
  'Body Class': 'bodyStyle',
  'Engine Model': 'engine',
  'Transmission Style': 'transmission',
  'Drive Type': 'drivetrain',
  'Fuel Type - Primary': 'fuelType',
  'Error Text': 'error',
};

export async function decodeVIN(vin: string): Promise<VINDecodeResult> {
  const cleanVIN = vin.trim().toUpperCase();

  if (cleanVIN.length !== 17) {
    return {
      year: null, make: null, model: null, trim: null,
      bodyStyle: null, engine: null, transmission: null,
      drivetrain: null, fuelType: null,
      error: 'VIN must be exactly 17 characters',
    };
  }

  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${cleanVIN}?format=json`
  );

  if (!response.ok) {
    return {
      year: null, make: null, model: null, trim: null,
      bodyStyle: null, engine: null, transmission: null,
      drivetrain: null, fuelType: null,
      error: 'Failed to decode VIN',
    };
  }

  const data = await response.json();
  const results: NHTSAResult[] = data.Results;

  const decoded: VINDecodeResult = {
    year: null, make: null, model: null, trim: null,
    bodyStyle: null, engine: null, transmission: null,
    drivetrain: null, fuelType: null, error: null,
  };

  for (const result of results) {
    const field = FIELD_MAP[result.Variable];
    if (field && result.Value && result.Value.trim() !== '') {
      if (field === 'year') {
        decoded.year = parseInt(result.Value, 10) || null;
      } else if (field === 'error') {
        // NHTSA returns "0" for no error
        if (result.Value !== '0' && !result.Value.startsWith('0 -')) {
          decoded.error = result.Value;
        }
      } else {
        (decoded as unknown as Record<string, unknown>)[field] = result.Value.trim();
      }
    }
  }

  return decoded;
}
