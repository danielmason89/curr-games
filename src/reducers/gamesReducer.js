const initState = {
    popular : [],
    newGames : [],
    upcoming : [],
    searched: [],
}

const gamesReducer = (state=initState,action) => {
switch(action.type){
    case 'FETCH_GAMES':
        return {...state, 
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames,
    };
    case 'FETCH_SEARCHED':
        return{
            ...state,
            searched: action.payload.searched,
        };
    case 'CLEAR_SEARCHED':
        return {
            ...state,
            searched: [],
        };
    default:
        return {...state}
}
};

export default gamesReducer;



// {reviews.length > 0 &&
//     reviews.map((review) => (
//       <li>{review.name}</li>
//     ))}


// Action
// {type: 'FETCH_GAMES';`
// }
// dispatch({type: 'FETCH_GAMES'});

// Action creator
// const fetchGames = (Can have data) => {
//     return {
//         type: 'FETCH_GAMES',
//         payload: whatever the data is,
//     };
// };
// fetchGames({ user: 'name });