import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyEditor } from "./my-editor/my-editor";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyEditor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ckeditor-translator');
}
