import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatInputModule,
  MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule, MatExpansionModule
 } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule,MatDatepickerModule, MatNativeDateModule
  ,MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule,
MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule,MatExpansionModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule
    ,MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule,
    MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule, MatExpansionModule]
})
export class MaterialModule {

}
