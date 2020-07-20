export namespace Constants {
    export class CacheKey {
        public static UserInfo = 'UserInfo';
        public static AuthToken = 'AuthToken';
        public static CartInfo = 'CartInfo';
        // public static homeCountryCode = 'HomeCountryCode';

    }

    export class CookieKey {
        public static CartSessionId = 'CartSessionId';
    }

    export class Events {
        public static CartCount = 'cartCount';
        public static Logout = 'logout';
        public static reloadCart = 'reloadCart';
    }
}