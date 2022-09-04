import { IParentItem } from '../list/types';

export interface IParentAdd {
  firstName: string;
  lastName: string;
  phone: string;
  imageBase64: string;
  adress: string;
}
//Події, які відбуваються
export enum CreateParentActionTypes {
  CREATE_PARENT = "CREATE_PARENT",
  CREATE_PARENT_SUCCESS = "CREATE_PARENT_SUCCESS",
}

export interface CreateParentAction {
  type: CreateParentActionTypes.CREATE_PARENT;
}

export interface CreateSuccessParentAction {
  type: CreateParentActionTypes.CREATE_PARENT_SUCCESS;
  payload: IParentItem;
}

export type CreateParentActions = CreateSuccessParentAction | CreateParentAction;
