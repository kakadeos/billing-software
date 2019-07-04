import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatInputModule,
  MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSlideToggleModule, MatStepperModule
 } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule,MatDatepickerModule, MatNativeDateModule
  ,MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule,
MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule,MatExpansionModule, MatTableModule,
MatPaginatorModule, MatSortModule, MatSlideToggleModule, MatStepperModule,
MatDialogModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule
    ,MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule,
    MatListModule, MatSnackBarModule, MatDialogModule, MatCardModule, MatExpansionModule, MatTableModule,
    MatTableModule, MatSortModule, MatPaginatorModule, MatSlideToggleModule, MatStepperModule,
  MatDialogModule]
})
export class MaterialModule {

}
