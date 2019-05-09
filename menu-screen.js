 // TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,flashcard,results) {
  	this.flashcard=flashcard;
    this.containerElement = containerElement;
    this.results=results;
    this.show=this.show.bind(this);
    this.callback=this.callback.bind(this);//
    results.showmenu(this.callback);
    //var flashcard= new  FlashcardScreen(containerElement);
    //flashcard.show();
    var show=this.show.bind(this);
    var hide=this.hide.bind(this);
    for(var deck of FLASHCARD_DECKS){
    	const Menutitle = document.createElement('div');
		//console.log(deck.title);
    	Menutitle.textContent=deck.title;
    	document.querySelector('#choices').appendChild(Menutitle);
    	Menutitle.addEventListener('click',function(){
    		hide();
    		flashcard.show(Menutitle.textContent);
    	});
	}
		
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  callback(){
    //console.log('callbackmenu');
    const menu=document.querySelector("#menu");
    this.flashcard.deleteallchild();
    menu.classList.remove('inactive');
    //location.reload();
  }
  
}
