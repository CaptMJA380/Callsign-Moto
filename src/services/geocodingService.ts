export interface ReverseGeocodeResult {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  displayName: string;
}

export type GeolocationErrorCode = 'PERMISSION_DENIED' | 'POSITION_UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED' | 'NETWORK_ERROR' | 'UNKNOWN';

export interface GeolocationError {
  code: GeolocationErrorCode;
  message: string;
}

export const geocodingService = {
  /**
   * Explicitly requests device geolocation after user permission action.
   * Never runs silently.
   */
  async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    if (!('geolocation' in navigator)) {
      throw {
        code: 'NOT_SUPPORTED',
        message: 'Device location is not supported by your browser. Please enter your address manually.'
      } as GeolocationError;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          let code: GeolocationErrorCode = 'UNKNOWN';
          let message = 'Unable to determine your current location. Please fill the address manually.';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              code = 'PERMISSION_DENIED';
              message = 'Location access was denied. You can manually enter your shipping address below.';
              break;
            case error.POSITION_UNAVAILABLE:
              code = 'POSITION_UNAVAILABLE';
              message = 'Location information is currently unavailable from your device.';
              break;
            case error.TIMEOUT:
              code = 'TIMEOUT';
              message = 'Location request timed out. Please check your signal or enter manually.';
              break;
          }

          reject({ code, message } as GeolocationError);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  /**
   * Translates coordinates to Indian postal address suggestion via OpenStreetMap Nominatim.
   * Precise coordinates are NEVER saved or transmitted to analytics.
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResult> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en-IN,en;q=0.9',
            // Respectful OSM user-agent
            'User-Agent': 'CallsignMotoEcommerce/1.0 (motorcycle-name-tabs-checkout)'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Reverse geocoding service unavailable');
      }

      const data = await response.json();
      const addr = data.address || {};

      const road = addr.road || addr.suburb || addr.neighbourhood || '';
      const area = addr.suburb || addr.neighbourhood || addr.residential || '';
      const city = addr.city || addr.town || addr.village || addr.county || '';
      const state = addr.state || '';
      const pincode = addr.postcode || '';

      return {
        addressLine1: road ? `${road}` : '',
        addressLine2: area && area !== road ? area : '',
        city,
        state,
        pincode: pincode ? pincode.replace(/\D/g, '').slice(0, 6) : '',
        displayName: data.display_name || ''
      };
    } catch (err) {
      throw {
        code: 'NETWORK_ERROR',
        message: 'Could not resolve postal address from coordinates. Please enter your address details manually.'
      } as GeolocationError;
    }
  }
};
