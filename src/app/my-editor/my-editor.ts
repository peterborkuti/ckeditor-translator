import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Editor, ClassicEditor, Bold, Essentials, Italic, Paragraph, View } from 'ckeditor5';
import { Translator } from '../translator';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


@Component( {
  selector: 'app-my-editor',
  templateUrl: './my-editor.html',
  styleUrl: './my-editor.css',
  encapsulation: ViewEncapsulation.None,
	imports: [ CKEditorModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatCardModule],
	standalone: true
} )
export class MyEditor {
	public Editor = ClassicEditor;
	public config = {
		licenseKey: 'GPL', // Or 'GPL'.
		plugins: [ Essentials, Paragraph, Bold, Italic, Translator],
		toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'translator' ],
    translator: {language: 'en', translatedText: '' }
	}

  public language = 'en';
  public editorIsAlive = true;
  public textToTranslate = '';

  onEditorReady( editor: Editor ) {
    console.log( 'Editor is ready to use!', editor );
    editor.on( 'translator:selected', ( evt, data ) => {
      console.log( 'Translator event received with data:', data.text );
      this.textToTranslate = data.text;
    });
  }

  public onLanguageChange( language: string ) {
    console.log( `Language changed to: ${ language }` );
    let translatedText = ''
    const englishText = this.textToTranslate;
    console.log( `Current English text: ${ englishText }` );

    if (language !== 'en' && englishText) {
      translatedText = this.getTranslation( englishText, language );
    }

    this.editorIsAlive = false;
    this.config = {
      ...this.config,
      'translator': { language: language, translatedText: translatedText }
    };
    setTimeout( () => {
      this.editorIsAlive = true;
    }, 1000 );
  }

  private getTranslation( text: string, language: string ): string {
    // Dummy translation function for demonstration purposes.
    // In a real application, this would call a translation API.
    const translations: { [key: string]: string } = {'fr': 'Bonjour', 'es': 'Hola', 'de': 'Hallo'};
    return translations[language] || text;
  }
}
