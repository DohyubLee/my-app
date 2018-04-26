import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BoardComponent } from './board/board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardInsertComponent } from './board-insert/board-insert.component';
import { BoardEditComponent } from './board-edit/board-edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/board-list', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'board-list', component: BoardListComponent },
  { path: 'board-detail/:id', component: BoardDetailComponent },
  { path: 'board-insert', component: BoardInsertComponent },
  { path: 'board-edit/:id', component: BoardEditComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
