export const expensesSelector = (store) => {
    return store.history.expenses;
};

export const pagesSelector = (store) => {
    return store.history.pages;
};