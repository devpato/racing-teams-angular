import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

export interface State {
  members: Member[];
  teams: Team[];
}

export const initialState = {
  members: null,
  teams: null
};
