// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText,count,left,right) {
    this.containerElement = containerElement;
    this._flipCard = this._flipCard.bind(this);
    this.start=this.start.bind(this);
    this.move=this.move.bind(this);
    this.end=this.end.bind(this);
    this.reset=this.reset.bind(this);
    this.moveaction=false;
    this.left=left;
    this.right=right;
    this.count=count;

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.dragStarted = false;
    this.default=true;
    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);
    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown',this.start); 
    this.flashcardElement.addEventListener('pointermove',this.move);
    this.flashcardElement.addEventListener('pointerup',this.end);
  }
  start(event){
    this.countr=0;
    this.counrl=0;
    this.countb=0;
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  move(event){
    if (!this.dragStarted) {
    return;
    } 
    event.preventDefault();
    event.currentTarget.style.transition='';
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    this.translateX = this.offsetX + deltaX;
    this.translateY = this.offsetY + deltaY;
    event.currentTarget.style.transform = 'translate(' + 
    this.translateX + 'px, ' + this.translateY + 'px) rotate( ' + this.translateX*0.2 + 'deg )';
    const rights=document.querySelector('.correct');
    const wrongs=document.querySelector('.incorrect');
    if(this.translateX >= 150 || this.translateX<=-150){
    document.body.style.backgroundColor='#97b7b7';
      //move right
      if(this.translateX >= 150){
        this.countr++;
        if(this.countr===1){
            let tempr=parseInt(rights.innerText)+1;
            rights.innerText=tempr;
        }
        this.rightaccess=true;
      }
      //move left
      else{
        this.countl++;
        if(this.countl===1){
          let templ=parseInt(wrongs.innerText)+1;
          wrongs.innerText=templ;
        }
            this.leftaccess=true;
      }
    }
    //move midden
    else{
    this.countl=0;
    this.countr=0;
    this.countb++;
      if(this.countb===1){
        if(this.rightaccess){
          let tempr=parseInt(rights.innerText)-1;
          rights.innerText=tempr;
          this.rightaccess=false;
        }
        else if(this.leftaccess){
          let templ=parseInt(wrongs.innerText)-1;
          wrongs.innerText=templ;
          this.leftaccess=false;
        }
        this.countb=0;
      }
    document.body.style.backgroundColor='#d0e6df';
    this.moveaction=true;
    }
    this.default=false;
  }

  end(event){ 
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    this.rightaccess=false;
    this.leftaccess=false;
    //if move right
    if(this.translateX >=150){
      //this.rightscore++;
      if(this.flashcardElement.classList.contains('left'))
        this.flashcardElement.classList.remove('left');
        this.reset();
        this.rightscore=this.right(this.flashcardElement);
    }

    //if move left
    else if(this.translateX<=-150){
      if(!this.flashcardElement.classList.contains('left'))
      this.flashcardElement.classList.add('left');
      this.reset();
      this.leftscore=this.left(this.flashcardElement);
    }

    //if move < 150px
    else if( this.dragStarted === true&&this.moveaction===true){  
       this.reset();
       this.moveaction=false;
       if(!this.flashcardElement.classList.contains('show-word'))
          this.flashcardElement.classList.add('show-word');
       this.flashcardElement.style.transform='translate(0,0)';
       this.flashcardElement.style.transition='transform 0.6s';
       } 
    this.default=true;
    document.body.style.backgroundColor='#d0e6df';
    this.dragStarted = false;
  }
  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    //console.log(this.count);
    if(this.count!=0)
    cardContainer.classList.add('hidden');

    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);

    return cardContainer;
  }

  _flipCard(event) {
    if(this.default===false) return;
    this.flashcardElement.classList.toggle('show-word');
  }
  reset(){
       this.originX = null;
       this.originY = null;
       this.offsetX = 0;
       this.offsetY = 0;
       this.translateX = 0;
       this.translateY = 0;
       this.dragStarted=false;
  }
}
