import { ParentActions, ParentActionTypes, ParentState } from "../list/types";

const initialState: ParentState = {
    list: [],
  };

  export const parentReducer = (state = initialState, action: ParentActions) 
        : ParentState => {
    switch (action.type) {
      case ParentActionTypes.FETCH_PARENT_SUCCESS:
        return { ...state, list: action.payload };
    }
    return state;
  };