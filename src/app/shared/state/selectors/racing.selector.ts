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

export const selectMembersState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('racingStore');

export const selectTeamsState: MemoizedSelector<
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
