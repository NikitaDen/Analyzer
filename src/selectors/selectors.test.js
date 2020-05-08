import {infoSelector, isAuthSelector, isLoadingSelector, isLoginLoadingSelector} from "./account-selectors";

describe('Account selector', () => {
    let store;

    beforeEach(() => {
        store = {
            account: {
                isAuth: true,
                isLoading: true,
                isLoginLoading: true,
                info: 'test message'
            }
        }
    });

    test('isAuth selector should be true', () => {
        expect(isAuthSelector(store)).toBe(true);
    });

    test('isLoading selector should be true', () => {
        expect(isLoadingSelector(store)).toBe(true);
    });

    test('isLogin selector should be true', () => {
        expect(isLoginLoadingSelector(store)).toBe(true);
    });

    test('info selector should be true', () => {
        expect(infoSelector(store)).toBe('test message');
    });
});
