const appReducer = (state = {                      
                        categories:[],
                        upperLimit:3,
                    }, action) => {

    switch(action.type) {   
        case 'LOAD_CATEGORIES': {
            let upperLimit = action.payload.upperLimit;
            state = {
                ...state,
                categories: action.payload.categories.filter((category,key)=>{return key<upperLimit}),
                upperLimit: upperLimit
            }
            return state;
        }
        default:
            return state;
    }
}

export default appReducer;