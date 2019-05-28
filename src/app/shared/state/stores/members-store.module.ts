import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacingEffects } from '../effects/racing.effects';
import { racingReducer } from '../reducers/reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('racingStore', racingReducer),
    EffectsModule.forFeature([RacingEffects])
  ],
  providers: [RacingEffects],
  declarations: []
})
export class UserStoreModule {}
