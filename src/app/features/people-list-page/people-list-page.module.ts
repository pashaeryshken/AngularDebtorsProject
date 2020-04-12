import {NgModule} from '@angular/core';
import {PeopleListPageComponent} from './people-list-page.component';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PeopleListPageComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{
      path: '', component: PeopleListPageComponent
    }]),
  ]
})
export class PeopleListPageModule {}
