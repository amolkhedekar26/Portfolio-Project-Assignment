import { GET_PROFILE,CREATE_PROFILE } from "../actions/types";

const initialState = {}

function profileReducer(profile=initialState,action){
    const { type, payload } = action;
    switch(type){
        case GET_PROFILE:
            return payload;
        case CREATE_PROFILE:
            return payload;
        default:
            return profile;
    }
}

export default profileReducer;
