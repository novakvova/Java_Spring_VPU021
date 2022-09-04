import { ParentActions, ParentActionTypes, ParentState } from "../list/types";
import { CreateParentActions, CreateParentActionTypes } from "../add/types";

const initialState: ParentState = {
  loading: false,
  list: [],
};

export const parentReducer = (
  state = initialState,
  action: ParentActions | CreateParentActions
): ParentState => {
  switch (action.type) {
//Отримати список батьків
    case ParentActionTypes.FETCH_PARENT:
      return { ...state, loading: true };

    case ParentActionTypes.FETCH_PARENT_SUCCESS:
      return { ...state, list: action.payload, loading: false };

//Створити батька
    case CreateParentActionTypes.CREATE_PARENT:
      return { ...state, loading: true };

    case CreateParentActionTypes.CREATE_PARENT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };
  }
  return state;
};
