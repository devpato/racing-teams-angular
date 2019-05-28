import { Member } from '../models/member.model';

export interface State {
  members: Member[];
}

export const initialState = {
  members: null
};
