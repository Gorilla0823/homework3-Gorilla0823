// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');

    const mainElement = document.querySelector('#main');

    const resultElement = document.querySelector('#results');

    this.results = new ResultsScreen(resultElement);

    this.flashcards = new FlashcardScreen(mainElement,this.results);
    
    this.menu = new MenuScreen(menuElement,this.flashcards,this.results);

    
    
    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
    //var flashcard=this.flashcards.show.bind(this);

  }
}
