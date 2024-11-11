import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent implements OnInit {
  error: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}
  ngOnInit(): void {
    this.error = this.data;
  }
}
