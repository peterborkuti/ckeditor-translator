Proof of concept for Translation a selected text in ckeditor


We have a base document in English and the same document in different languages. The user wants to add a new paragraph into the English version and insert the translated version of the new text into the other documents.

![ckeditor-translator-plugin-poc](https://github.com/user-attachments/assets/c2e4631c-f274-406e-9347-0d2abbcbb04c)



The translation is fake, of course, but the process mostly OK. It is only a POC. The "Translate" button has two different tasks:


When the document language is EN and the user select a text, the Translate button stores the text (outside of the editor, in our UI code).
When the document language is NOT EN and there is a stored text the Translate button pastes the stored text into the position of the cursor.


The whole process:


* The user selects a text in the EN version and clicks on the Translate button
* In this moment, our UI code receives the selected text, which is in English
* The user selects another language, lets say, "FR"
* In this moment, the UI sends the English text and the selected language code ("FR") to the backend. We are displaying a spinner
* When the UI receives the translated text, it gives to the CKEditor with the opened FR document
* When user clicks on Translate, CKEditor pastes the FR text


Why not translate at the first click of the button?
We do not know yet, which languages are needed + maybe it was a mistake by the user or he wants to correct the text, or...
 
Why not translate for all the languages at once?
The translation API is only for 1 language
We do not know in advance which languages is needed
 
Why not translate from the CKEditor plugin?
It is better to not create a complex plugin and do most of the work in our code to be dependent on CKEditor the least.
 
The two different task for the same button can confuse the user
Yes, it can. Or maybe not. For me it is ok, lets see the opinions.
