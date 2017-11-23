const appActions = (() =>{
    return {
        loadCategories: (categories) => ({
            type: 'LOAD_CATEGORIES',
            payload: categories
        })
    }
})();

export default appActions;