export const isAuthSelector = (store) => {
    return store.account.isAuth;
};

export const isLoadingSelector = (store) => {
    return store.account.isLoading;
};

export const isLoginLoadingSelector = (store) => {
    return store.account.isLoginLoading;
};

export const infoSelector = (store) => {
    return store.account.info;
};