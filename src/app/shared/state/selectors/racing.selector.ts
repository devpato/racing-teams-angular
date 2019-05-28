import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { State } from '../state';
import { Member } from '../../models/member.model';
import { Team } from '../../models/team.model';

const getMembers = (state: State): Member[] => state.members;
const geTeams = (state: State): Team[] => state.teams;
const getSelectedMember = (state: State): Member => state.selectedMember;

export const selectMembersState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('racingStore');

export const selectTeamsState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('racingStore');

export const selectMemberState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('racingStore');

export const selectMembers: MemoizedSelector<object, Member[]> = createSelector(
  selectMembersState,
  getMembers
);

export const selectTeams: MemoizedSelector<object, Team[]> = createSelector(
  selectTeamsState,
  geTeams
);

export const selectMember: MemoizedSelector<object, Member> = createSelector(
  selectMemberState,
  getSelectedMember
);
