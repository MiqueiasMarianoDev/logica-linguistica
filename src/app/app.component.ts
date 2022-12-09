import { $_ } from '@angular/compiler/src/chars';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const USER_DATA = [
  {
    id: 1,
    premissa: '@noe@',
    efeito: '@emresa@',
    justificativa: '@cgo@',
    conclusao: '@tnologia@',
  },
  {
    id: 2,
    premissa: '@noe@',
    efeito: '@emresa@',
    justificativa: '@cgo@',
    conclusao: '@tnologia@',
  },
];

const COLUMNS_SCHEMA = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'premissa',
    type: 'text',
    label: 'Premissa',
  },
  {
    key: 'efeito',
    type: 'text',
    label: 'Efeito',
  },
  {
    key: 'justificativa',
    type: 'text',
    label: 'Justificativa',
  },
  {
    key: 'conclusao',
    type: 'text',
    label: 'Conclusão',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

const TEXTO_PARAM =
  'Em razão @premissa@. Gerou o contexto @efeito@. Logo, @justificativa@ <br/> <br/>' +
  '@justificativa@, <strong>porque</strong> @efeito@, <strong>porque</strong> <br/>';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  carta: string = TEXTO_PARAM;

  constructor(public dialog: MatDialog) {
    if (localStorage.getItem('lista'))
      this.dataSource = JSON.parse(localStorage.getItem('lista'));
  }

  addRow() {
    const newRow = {
      id: Date.now(),
      premissa: '',
      efeito: '',
      justificativa: '',
      conclusao: '',
      isEdit: true,
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id) {
    this.dataSource = this.dataSource.filter((u) => u.id !== id);
  }

  removeSelectedRows() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.dataSource = this.dataSource.filter((u: any) => !u.isSelected);
        }
      });
  }

  editora(element) {
    this.carta = TEXTO_PARAM;
    this.displayedColumns.map((col) => {
      this.carta = this.carta.replace(
        new RegExp('@' + col + '@', 'g'),
        element[col]
      );
    });

    localStorage.setItem('lista', JSON.stringify(this.dataSource));
  }

  selecionado(element) {
    element.isSelected = !element.isSelected;

    this.dataSource.forEach((u: any) => (u.isSelected = false));
    this.editora(element);
  }
}
