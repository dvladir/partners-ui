import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) {
    const g = this.formBuilder.group({});
  }

  ngOnInit(): void {
  }

}
