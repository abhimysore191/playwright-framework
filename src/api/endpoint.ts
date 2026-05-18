export class PracticeAppEndpoints {
    static readonly BASE_URL = process.env.API_BASE_URL;
    static Auth = class {
        public static get Base() {
            return `${PracticeAppEndpoints.BASE_URL}/auth`;
        }

        static Login = class {
            public static get Base() {
                return `${PracticeAppEndpoints.Auth.Base}/login`;
            }
        };
    };

    static Product = class {
        public static get Base() {
            return `${PracticeAppEndpoints.BASE_URL}/products`;
        }
    };

    static Account = class {
        public static get Base() {
            return `${PracticeAppEndpoints.BASE_URL}/account`;
        }
        static Invoices = class {
            public static get Base() {
                return `${PracticeAppEndpoints.Account.Base}/invoices`;
            }
        };

        public static InvoiceDetail(invoiceId: string | number) {
            return `${PracticeAppEndpoints.Account.Invoices.Base}/${invoiceId}`;
        }
    };

    static Users = class {
        public static get Base() {
            return `${PracticeAppEndpoints.BASE_URL}/users`;
        }
        static Register = class {
            public static get Base() {
                return `${PracticeAppEndpoints.Users.Base}/register`;
            }
        };
        static Login = class {
            public static get Base() {
                return `${PracticeAppEndpoints.Users.Base}/login`;
            }
        };
    };
}
