import * as ParentActions from "../components/kids/parent/store/actions";
import * as AuthActionCreators from "../components/auth/login/actions";
const actions = {
  ...ParentActions,
  ...AuthActionCreators
};

export default actions;