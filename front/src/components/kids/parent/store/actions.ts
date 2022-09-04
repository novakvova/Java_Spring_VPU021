import { IParentItem, ParentActions, ParentActionTypes } from "../list/types";
import { Dispatch } from "react";
import http from "../../../../http_common";

export const getParents = () => async (dispatch: Dispatch<ParentActions>) => {
    try {
      const response = await http.get<Array<IParentItem>>("/");
      console.log("Response server ", response.data);
      dispatch({
        type: ParentActionTypes.FETCH_PARENT_SUCCESS,
        payload: response.data,
      });
      console.log("FETCH_PARENT_SUCCESS", response.data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };