// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement,result) {
    this.containerElement = containerElement;
    this.results=result;
    this.rightscore=0;
    this.leftscore=0;

    this.left=this.left.bind(this);
    this.right=this.right.bind(this);
    this.redo_mistake=this.redo_mistake.bind(this);

    this.menuback=null;
    this.length=0;
    this.total=0;
    this.remain=0;
    this.redoindex=false;
    document.querySelector('.incorrect').innerText=this.leftscore;
    document.querySelector('.correct').innerText=this.rightscore;
  }

  show(title) { 
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    let count=0;
    for(var deck of FLASHCARD_DECKS){
      if(title==deck.title){
        for( var word of Object.keys(deck.words)){ 
          const card = new Flashcard(flashcardContainer, word,deck.words[word],count,this.left,this.right);
          count++;
        }
        this.total=count;
        break;
      }        
    } 
  }
  
  left(flashcard){
   // document.removeEventListener('left',this.left);
   // document.removeEventListener('right',this.right);
    const score=document.querySelector('.incorrect');
    this.leftscore++;
    score.innerText=this.leftscore;
    this.nextone();
    return this.leftscore;
  }
  right(flashcard){
   // document.removeEventListener('left',this.left);
   // document.removeEventListener('right',this.right);
    const score=document.querySelector('.correct');
    this.rightscore++;
    score.innerText=this.rightscore;
    this.nextone();
    return this.rightscore;
  }
  nextone(){
    const card=document.querySelectorAll('.flashcard-box');

    if(this.redoindex===true){
        //console.log('remain '+this.remain);
        //console.log('length '+this.length);
        if(this.length!=this.total-1&&this.remain>1){
          card[this.length].classList.add('hidden');
          this.length++;
          for(;this.length<this.total;this.length++){
              //console.log('if' +this.length);
            if(card[this.length].classList.contains('left')){
              this.remain--;
              card[this.length].classList.remove('hidden');
                break;
            } 
          } 
        }
        else{
          //console.log('else show '+this.remain);
          if(this.remain==1)
          card[this.length].classList.add('hidden');
          this.results.show(this.rightscore,this.leftscore,this.hiddenallchild,this.total,this.redo,this.redo_mistake);
          this.rightscore=0;
          this.leftscore=0;
          this.length=0;
          this.remain=0;
          this.redoindex=false;
          document.querySelector('.incorrect').innerText=this.leftscore;
          document.querySelector('.correct').innerText=this.rightscore;
          this.hide();
        }
    }

    else{
      card[this.length].classList.add('hidden');
      if(this.length!=this.total-1){
        this.length++;
        if(card[this.length].classList.contains('hidden'))
            card[this.length].classList.remove('hidden');
      }
      else{
      this.results.show(this.rightscore,this.leftscore,this.hiddenallchild,this.total,this.redo,this.redo_mistake);
      this.rightscore=0;
      this.leftscore=0;
      this.length=0;
      document.querySelector('.incorrect').innerText=this.leftscore;
      document.querySelector('.correct').innerText=this.rightscore;
      this.hide();
      }
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  deleteallchild(){
    for(var i=0;i<this.total;i++){
      let card=document.querySelector('.flashcard-box');
      card.parentNode.removeChild(card);
    }
  }
  hiddenallchild(){
     for(var i=0;i<this.total;i++){
      let card=document.querySelectorAll('.flashcard-box');
      if(!card[i].classList.contains('hidden'))
        card[i].classList.add('hidden');
      card[i].style.cssText=' ';
      
    }
  }
  redo(){
    const cards=document.querySelectorAll('.flashcard-box');
    for(let card of cards){
      if(!card.classList.contains('show-word'))
        card.classList.add('show-word');
    }
    const redo=document.querySelector("#main");
    redo.classList.remove('inactive');
    for(var i=0 ; i<this.total ;i++){
      let card=document.querySelectorAll('.flashcard-box');
      if(card[0].classList.contains('hidden'))
        card[0].classList.remove('hidden');
    }
  }
  redo_mistake(){
    this.redoindex=true;
    this.remain=0;
    this.length=0;
    const cards=document.querySelectorAll('.flashcard-box');
    for(let card of cards){
      if(!card.classList.contains('show-word'))
        card.classList.add('show-word');
    }
    const redo_mistake=document.querySelector("#main");
    redo_mistake.classList.remove('inactive');
    const card=document.querySelectorAll('.flashcard-box');
    for(let cards of card){
      cards.style.cssText=' ';
      if(cards.classList.contains('left'))
        this.remain++;
    }
    for(var i=0;i<this.total;i++){
      if(card[i].classList.contains('left')){
        card[i].classList.remove('hidden');
        this.length=i;
        break;
      }
    }
  }
}
