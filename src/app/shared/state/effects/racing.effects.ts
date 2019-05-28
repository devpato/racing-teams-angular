import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ActionTypes } from '../actions/racing.actions';
import * as RacingActions from '../actions/racing.actions';
import { AppService } from 'src/app/app.service';

@Injectable()
export class RacingEffects {
  @Effect()
  members$ = this.actions$.pipe(
    ofType(ActionTypes.GET_MEMBERS),
    switchMap(() =>
      this.appService.getMembers().pipe(
        map(res => new RacingActions.SetMembersSuccess(res)),
        catchError(() => of({ type: '[Members API] Members Loaded Error' }))
      )
    )
  );

  @Effect()
  teams$ = this.actions$.pipe(
    ofType(ActionTypes.GET_TEAMS),
    switchMap(() =>
      this.appService.getTeams().pipe(
        map(res => new RacingActions.SetTeamsSuccess(res)),
        catchError(() => of({ type: '[Teams API] Teams Loaded Error' }))
      )
    )
  );

  constructor(private actions$: Actions, private appService: AppService) {}
}
