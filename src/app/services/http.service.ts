import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { APIResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRandomWord(wordLength: number, weird_mode: boolean): Observable<APIResponse> {
    let params = new HttpParams();
    params = params.set('random', true);
    params = params.set('letters', wordLength.toString());
    params = params.set('hasDetails', 'definitions');
    if (weird_mode) {
      params = params.set('frequencyMin', '3.40');
      params = params.set('frequencyMax', '3.60');
    }
    else {
      params = params.set('frequencyMin', '3.80');
    }
    console.log(params);
    //If you want to hard-code the word:
    //const word = new Observable((observer) => {
      //observer.next('jenna');
    //});
    // return word;
    // Old api call: https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=abbreviation%2C%20affix%2C%20article%2C%20auxiliary-verb%2C%20conjunction%2C%20definite-article%2C%20family-name%2C%20given-name%2C%20idiom%2C%20imperative%2C%20proper-noun%2C%20proper-noun-plural%2C%20proper-noun-possessive&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=7&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=vk9jr0k1j0e60b6n0mlpdzd1dhp2mqdvbunsis8qqsnvhq8je
    return this.http.get<APIResponse>('https://wordsapiv1.p.rapidapi.com/words/', {
      params: params,
      headers: {
        'x-rapidapi-key':'272a57618amshbed99340ecd1d77p199d2fjsnd2962497de06',
        'x-rapidpai-host':'wordsapiv1.p.rapidapi.com'
      }
    })
  }
}
