import { ActionTypes, RacingActions } from '../actions/racing.actions';
import { initialState } from '../state';

export function racingReducer(state = initialState, action: RacingActions) {
  switch (action.type) {
    case ActionTypes.GET_MEMBERS:
      return state;

    case ActionTypes.GET_TEAMS:
      return state;

    case ActionTypes.SET_MEMBERS_SUCCESS:
      return { ...state, members: action.payload };

    case ActionTypes.SET_TEAMS_SUCCESS:
      return { ...state, teams: action.payload };

    case ActionTypes.SET_SELECTED_MEMBER:
      return { ...state, selectedMember: action.payload };

    default:
      return state;
  }
}
