const initState = { game: {platform: []}, screen: {results: []}, isLoading: true };

const detailReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_DETAIL': 
        return{
        ...state,
        game: action.payload.game,
        screen : action.payload.screen,
        isLoading: false,
        };
        case "LOADING_DETAIL":
            return {
                ...state,
                isLoading:true,
            };
        default:
            return{ ...state };
    }
};

export default detailReducer;