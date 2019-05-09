// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.goback=this.goback.bind(this);
    this.continue=this.continue.bind(this);
    this.nowrong=true;
  }

  show(numberCorrect, numberWrong,hidden,total,redo,redo_mistake) {
  	 document.body.style.backgroundColor='#d0e6df';
  	//this.back=back;
  	this.hidden=hidden;
  	this.total=total;
  	this.redo=redo;
  	this.redo_mistake=redo_mistake;
    this.containerElement.classList.remove('inactive');
    //console.log(numberCorrect);
    //console.log(numberWrong);
    const answer=(numberCorrect)/(numberCorrect+numberWrong);
    const percentage=document.querySelector('.percent');
    percentage.innerText=Math.floor(answer*100);
    const correct=document.querySelectorAll('.correct');
    correct[1].innerText=numberCorrect;
    const incorrect=document.querySelectorAll('.incorrect');
    incorrect[1].innerText=numberWrong;
    const button=document.querySelector('.continue');
    if(!numberWrong){
    	button.innerText='Start over?';
    	this.nowrong=true;
    	
    }
    else{
    	button.innerText='Continue';
    	this.nowrong=false;
    }
 	document.querySelector('.continue').addEventListener('click',this.continue);
    document.querySelector('.to-menu').addEventListener('click',this.goback);
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  goback(){
  	this.hide();
  	this.numberCorrect=0;
  	this.numberWrong=0;
  	this.backtomenu();
  	//console.log(this.back);
  	//console.log('backtomenu');
  }
  continue(){
  	//console.log('fuck continue');
  	if(this.nowrong===true){
  		//console.log('Start over');
  		this.hide();
  		this.hidden();
  		this.redo();
  	}
  	else{
  		//console.log('continue');
  		this.hide();
  		this.hidden();
  		this.redo_mistake();

  	}
  }
  showmenu(backtomenu){
  	this.backtomenu=backtomenu;
  }
}
