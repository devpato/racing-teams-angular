import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

export interface State {
  members: Member[];
  teams: Team[];
  selectedMember: Member;
}

export const initialState = {
  members: null,
  teams: null,
  selectedMember: null
};
