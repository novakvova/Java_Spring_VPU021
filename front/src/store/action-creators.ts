import * as ParentActions from "../components/kids/parent/store/actions";
import * as RegActionCreators from "../components/auth/register/actions";
import * as AuthActionCreators from "../components/auth/login/actions";

const actions = {
  ...ParentActions,
  ...RegActionCreators,
  ...AuthActionCreators
};

export default actions;