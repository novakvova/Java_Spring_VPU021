export interface IParentItem {
    id: number,
    firstName: string,
    lastName: string,
    phone: string
    image: string;
    adress: string
}

export interface ParentState{
    loading: boolean;
    list: Array<IParentItem>,  //Список батьків, який зберігаєтсья в редаксі
    //searchResult: Array<IParentItem>;
}

//Операції, які ми виконуємо
export enum ParentActionTypes {
    FETCH_PARENT = "FETCH_PARENT", //Загрузка даних почалася
    FETCH_PARENT_SUCCESS = "FETCH_PARENT_SUCCESS" //Отримання списку записів успішний
}
//Тип для початку загрузки даних із сервера
export interface FetchParentAction {
  type: ParentActionTypes.FETCH_PARENT;
}  

export interface FetchSuccessParentAction {
    type: ParentActionTypes.FETCH_PARENT_SUCCESS;
    payload: Array<IParentItem>;
}

export type ParentActions = FetchSuccessParentAction | FetchParentAction;