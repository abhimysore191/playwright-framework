export class PayloadGenerator {
    private static randomString(length: number = 5): string {
        return Math.random()
            .toString(36)
            .substring(2, 2 + length);
    }

    static generateRegisterPayload() {
        const random = this.randomString();

        return {
            first_name: `John${random}`,
            last_name: `Doe${random}`,
            dob: '1989-01-01',
            phone: '07440416082',
            email: `john${random}@gmail.com`,
            password: `Test2@${random}`,
            address: {
                street: 'Caradon Way',
                city: 'Rugby',
                state: 'British Forces',
                country: 'GB',
                postal_code: 'CV23 1BH'
            }
        };
    }
}
