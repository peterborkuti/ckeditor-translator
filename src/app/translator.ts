import { ButtonView, ModelTextProxy, Plugin } from 'ckeditor5';

export class Translator extends Plugin {
	init() {
		this.defineConfig();
		this.addButton();
	}

    private defineConfig() {
        const editor = this.editor;
        editor.config.define( 'translator', { language: 'en', translatedText: '' } );
    }

    private addButton() {
        const editor = this.editor;
		// The button must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'translator', () => {
			// The button will be an instance of ButtonView.
			const button = new ButtonView();

			button.set( {
				label: 'Translate',
				withText: true
			} );

			button.on( 'execute', () => {
				this.insertTranslation();
			} );

			return button;
		} );
    }

    private insertTranslation() {
        const editor = this.editor;
        const language= editor.config.get( 'translator.language' );
        console.log( `Editor language: ${ language }` );
        
        if (language === 'en') {
            const selectedText = this.getSelectedText();
            if (selectedText) {
                editor.fire('translator:selected', { text: selectedText });
            }
            console.log('Event fired with:', selectedText);
            return;
        }

        const translationText = editor.config.get( 'translator.translatedText' );
        console.log( `Inserting translation: ${ translationText }` );

        editor.model.change( writer => {
            // Insert the translation at the current selection position
            editor.model.insertContent( writer.createText( translationText as string ) );
        } );
    }

    private getSelectedText(): string {
        const selection = this.editor.model.document.selection;
        let selectedText = '';

        for (const range of selection.getRanges()) {
            for (const item of range.getItems()) {
                if (item.is('$textProxy')) {
                    selectedText += item.data;
                }
            }
        }

        console.log('Selected text:', selectedText);
        return selectedText;
    }
}
