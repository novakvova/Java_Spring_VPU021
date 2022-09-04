import { IParentItem, ParentActions, ParentActionTypes } from "../list/types";
import {
  CreateParentActions,
  CreateParentActionTypes,
  IParentAdd,
} from "../add/types";
import { Dispatch } from "react";
import http from "../../../../http_common";

export const getParents = () => async (dispatch: Dispatch<ParentActions>) => {
  try {
    dispatch({
      type: ParentActionTypes.FETCH_PARENT,
    });
    const response = await http.get<Array<IParentItem>>("/");
    dispatch({
      type: ParentActionTypes.FETCH_PARENT_SUCCESS,
      payload: response.data,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const createParent =
  (model: IParentAdd) => async (dispatch: Dispatch<CreateParentActions>) => {
    try {
      dispatch({
        type: CreateParentActionTypes.CREATE_PARENT,
      });
      const response = await http.post<IParentItem>("/create", model);
      dispatch({
        type: CreateParentActionTypes.CREATE_PARENT_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
