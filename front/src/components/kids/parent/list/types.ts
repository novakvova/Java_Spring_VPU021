export interface IParentItem {
    id: number,
    firstName: string,
    lastName: string,
    phone: string
    image: string;
    adress: string
}

export interface ParentState{
    list: Array<IParentItem>,  //Список батьків, який зберігаєтсья в редаксі
    //searchResult: Array<IParentItem>;
}

//Операції, які ми виконуємо
export enum ParentActionTypes {
    FETCH_PARENT_SUCCESS = "FETCH_PARENT_SUCCESS" //Отримання списку записів
}

export interface FetchSuccessParentAction {
    type: ParentActionTypes.FETCH_PARENT_SUCCESS;
    payload: Array<IParentItem>;
}

export type ParentActions = FetchSuccessParentAction;