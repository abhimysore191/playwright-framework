/**
 * Test data for practicesoftwaretesting.com.
 */

export const SEARCH_PRODUCT = {
    query: 'Pliers',
    name: 'Pliers'
} as const;

export const CUSTOMER = {
    email: 'customer2@practicesoftwaretesting.com',
    password: 'welcome01',
    firstName: 'Jane',
    lastName: 'Doe',
    addressFragment: 'Test'
} as const;

/** Currency regex: matches "$12.99", "$9.99", "$123.45", etc. */
export const CURRENCY_REGEX = /^\d+(\.\d{1,2})?$/;

export const MIN_DESCRIPTION_LENGTH = 10;

export const BILLING_ADDRESS = {
    firstName: 'Jane',
    lastName: 'Doe',
    houseNumber: '123',
    street: 'Caradon Way',
    city: 'Rugby',
    state: 'British Forces',
    postcode: 'CV23 1BH',
    country: 'GB'
} as const;

export const PAYMENT_METHOD = 'Cash on Delivery' as const;

export const PROFILE = {
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '123-456-7890'
} as const;

export const INVALID_PROFILE = {
    firstName: '',
    lastName: '',
    phone: 'aahh'
} as const;

export const INVALID_INPUTS = {
    malformedEmail: 'not-an-email',
    emptyString: '',
    shortPassword: 'abc',
    mismatchedPassword: 'DifferentPass999!',
    invalidPhone: '123abc',
    xssPayload: '<script>alert("xss")</script>',
    longString: 'A'.repeat(300)
} as const;

export const NEW_PASSWORD = 'NewPass@190!' as const;

export const INVALID_PASSWORD = '1A' as const;
