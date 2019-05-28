import { Action } from '@ngrx/store';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';

export enum ActionTypes {
  GET_MEMBERS = '[Get Members] GetMembers',
  GET_TEAMS = '[Get Teams] SearchUsers',
  SET_MEMBERS_SUCCESS = '[ Success Members] SetMembersSuccess',
  SET_TEAMS_SUCCESS = '[Success Teams] SetTeamsSuccess',
  SET_SELECTED_MEMBER = '[Set Selected Member] Set Selected Member'
}

export class GetMembers implements Action {
  readonly type = ActionTypes.GET_MEMBERS;
}

export class GetTeams implements Action {
  readonly type = ActionTypes.GET_TEAMS;
}

export class SetMembersSuccess implements Action {
  readonly type = ActionTypes.SET_MEMBERS_SUCCESS;
  constructor(public payload: Member[]) {}
}

export class SetTeamsSuccess implements Action {
  readonly type = ActionTypes.SET_TEAMS_SUCCESS;
  constructor(public payload: Team[]) {}
}

export class SetSelectedMember implements Action {
  readonly type = ActionTypes.SET_SELECTED_MEMBER;
  constructor(public payload: Member) {}
}

export type RacingActions =
  | GetMembers
  | GetTeams
  | SetMembersSuccess
  | SetTeamsSuccess
  | SetSelectedMember;
