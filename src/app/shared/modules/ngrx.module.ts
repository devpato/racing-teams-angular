import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from '../state/index';
import { environment } from 'src/environments/environment.prod';
import { RacingStoreModule } from '../state/stores/racing-store.module';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    RacingStoreModule
  ],
  exports: [
    StoreModule,
    EffectsModule,
    StoreRouterConnectingModule,
    StoreModule,
    StoreDevtoolsModule,
    RacingStoreModule
  ]
})
export class NgrxModule {}
