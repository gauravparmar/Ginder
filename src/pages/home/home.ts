import { Component, ViewChild, ViewChildren, ViewEncapsulation,TemplateRef,EventEmitter,NgModule  } from '@angular/core';
import { NavController } from 'ionic-angular';

// For swipe cards
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import { empty } from 'rxjs/observable/empty';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

/// For swipe cards


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {



  cards: any[] = [];
  cardCursor: number = 0;
  orientation: string = "x";
  overlay: any = {
      like: {
          backgroundColor: '#28e93b'
      },
      dislike: {
          backgroundColor: '#e92828'
      }
  };

  constructor(private http: Http) {
    this.addNewCards(10);
      // for (var i = 0; i < 3; i++) {
      //     this.cards.push({
      //         id: i + 1,
      //         likeEvent: new EventEmitter(),
      //         destroyEvent: new EventEmitter(),
      //         url: this.getKittenUrl()
      //     });
      // }
  }

  //Called on pressing like/dislike icons each time
  like(like) {
      var self = this;
      if (this.cards.length > 0) {
          console.log(this.cards);
          console.log('Cursor : '+this.cardCursor);
          var item =self.cards[0];
          if(item){
            console.log('like Item '+this.simpleStringify(item));
            item.likeEvent.emit({ like });
            // DO STUFF WITH YOUR CARD
          //   var item = this.cards[this.cardCursor-1];
          //   console.log('You clicked '+this.simpleStringify(item));
          //   console.log(like);
            if(like){
              console.log('You liked '+this.simpleStringify(item));
            }else{
              console.log('You disliked '+this.simpleStringify(item));
            }
            this.maintainCardBuffer();
          }

      }

  }

  simpleStringify (object){
    var simpleObject = {};

    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
        }

        return JSON.stringify(simpleObject); // returns cleaned up JSON
  };

  //Called on swiping cards each time
  onCardLike(event) {
      var item = this.cards[this.cardCursor++];
      // DO STUFF WITH YOUR CARD
      console.log('You swiped '+this.simpleStringify(item));
      // console.log(event.like);
      if(event.like){
        console.log('You liked '+this.simpleStringify(item));
      }else{
        console.log('You disliked '+this.simpleStringify(item));
      }
      this.maintainCardBuffer();
  }

  getKittenUrl() {
      var w = 500 - Math.floor((Math.random() * 100) + 1);
      var h = 500 - Math.floor((Math.random() * 100) + 1);
      return "http://placekitten.com/" + w + "/" + h;
  }

  onRelease(event) {

  }

  onAbort(event) {

  }

  onSwipe(event) {

  }

  // scrollToBottom(el) {
  //     setTimeout(() => {
  //         el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
  //     }, 100);
  // }

  addNewCards(count: number){
    this.http.get('https://randomuser.me/api/?results='+count)
    .map(data=>data.json().results)
    .subscribe(result=>{
      for(let val of result){
          val.likeEvent = new EventEmitter(),
          val.destroyEvent= new EventEmitter(),
          this.cards.push(val);
      }
    })
  }

  maintainCardBuffer(){
    // Remove 0th element
    this.cards.shift();
    // console.log(this.cards.length);
    // console.log(this.cards);
    // Add 5 more cards to keep the number of cards 10 again
    if(this.cards.length==5){
      this.addNewCards(5);
    }
  }
}
