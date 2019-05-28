import { Action } from '@ngrx/store';
import { Team } from '../../models/team.model';
import { Member } from '../../models/member.model';

export enum ActionTypes {
  GET_MEMBERS = '[Get Members] GetMembers',
  GET_TEAMS = '[Get Teams] SearchUsers',
  SET_MEMBERS_SUCCESS = '[ Success Members] SetMembersSuccess',
  SET_TEAMS_SUCCESS = '[Success Teams] SetTeamsSuccess',
  SET_SELECTED_MEMBER = '[Set Selected Member] Set Selected Member',
  DELETE_SELECTED_MEMBER = '[Delete Selected Member] Delete Selected Member',
  UPDATE_SELECTED_MEMBER = '[Update Selected Member] Update Selected Member'
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

export class DeleteSelectedMember implements Action {
  readonly type = ActionTypes.DELETE_SELECTED_MEMBER;
  constructor(public payload: number) {}
}

export class UpdateSelectedMember implements Action {
  readonly type = ActionTypes.UPDATE_SELECTED_MEMBER;
  constructor(public payload: number) {}
}

export type RacingActions =
  | GetMembers
  | GetTeams
  | SetMembersSuccess
  | SetTeamsSuccess
  | SetSelectedMember
  | DeleteSelectedMember
  | UpdateSelectedMember;
