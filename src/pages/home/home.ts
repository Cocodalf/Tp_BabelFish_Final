import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';


import { TranslateService} from '../../services/service.translate';

import languages from '../../data/languages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public matches: string[] ;
  public languages = languages;
  public from;
  public to;
  public sentenceTrad ;



  constructor(
    public navCtrl: NavController,
    private speechRecognition : SpeechRecognition, 
    private textToSpeech : TextToSpeech, 
    private translateService : TranslateService
  ) 
  {
    
    this.from = 'fr';
    
    this.to = 'en';

   
  }
  ngOnInit(){
    this.checkPermission();
    this.updateTrad();
    }

//Fonctions pour speechRecognition 
// *******************************


  startListening(): void{
    let speechOptions = {
      language : "fr-FR",
      showPopup : true,
    }
    this.speechRecognition.startListening(speechOptions)
      .subscribe(
        (matches:string[])=>{
          this.matches = matches;
          console.log("Matches => " , matches);
          this.translateSentence();
        },(err:any)=>{
          console.error(err);
        })
  }

  checkFeatureAvailable():void{
    this.speechRecognition.isRecognitionAvailable()
      .then((available:boolean)=>console.log(available))
  }

  getLanguagesList():void{
    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: Array<string>) => console.log(languages),
        (error) => console.log(error)
      )
  }

  checkPermission():void{
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission){
        this.getPermission();
      }
      else{
        console.log("Permission Granted");
      }


    })
  }

  getPermission():void{
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied'),
    )
  }

// *******************************

//Fonctions pour textToSpeech 
// *******************************

  readTranslation(sentence:string):void {
    this.textToSpeech.speak({
      text: sentence, 
      locale: this.to,

    })
    .then(() => console.log('Success'))
    .catch((reason:any) => console.log(reason));
  }

// Fonctions pour translate la sentence utilisateur
// *******************************
translateSentence():void{
  const post = {
    sentence: this.matches[0],
    from: this.from,
    to: this.to
  };
  this.translateService
    .translate(post)
    .subscribe(res => {
      this.sentenceTrad = res.data;
      console.log(this.sentenceTrad);
    });
}

updateTrad() {
  setInterval(() => {
    this.translateSentence();
  }, 2000);
}


}
