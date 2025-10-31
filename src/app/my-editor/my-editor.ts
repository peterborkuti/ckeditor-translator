import { Component, ViewEncapsulation } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Paragraph } from 'ckeditor5';

@Component( {
  selector: 'app-my-editor',
  templateUrl: './my-editor.html',
  styleUrl: './my-editor.css',
  encapsulation: ViewEncapsulation.None,
	imports: [ CKEditorModule ],
	standalone: true
} )
export class MyEditor {
	public Editor = ClassicEditor;
	public config = {
		licenseKey: 'GPL', // Or 'GPL'.
		plugins: [ Essentials, Paragraph, Bold, Italic ],
		toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|']
	}
}
