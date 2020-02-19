import React from 'react';
import './App.css';


const LinkButton = (props) => {
  return (
      <a 
        className="link-button" 
        href={props.link}
        id={props.name + '-quote'}
      >
        <img className="link-img" src={props.icon} alt={props.name}/>
      </a>
  );
};

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [{
        "quote": "",
        "author" : ""
      }],
      currQuote: 0
    };

    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    fetch(url)
    .then(resp => resp.json())
    .then(result => 
      this.setState({
        quotes: result.quotes,
        currQuote: (Math.floor(Math.random()*result.quotes.length))
      }),
      () => {
        this.setState({
          quotes: [{
            "quote": "Quotes cannot be downloaded",
            "author" : "John Doe"
          }],
          
      })
    }
    )
  }

  getRandomQuote() {  
    this.setState({
      currQuote: (Math.floor(Math.random()*this.state.quotes.length))
    });
  }

  render() {
    let quoteData = this.state.quotes[this.state.currQuote];
    return (
      <div className="quote-box"> 
        <button id="new-quote" onClick={this.getRandomQuote}>
          <p id="text" style={{animation: 'fadein 2s'}}>{quoteData.quote}</p>
          <p id="author">{quoteData.author}</p>
        </button>
        <br/>
        <LinkButton 
          id="twitter-button" 
          link={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' 
                + encodeURIComponent('""' + quoteData.quote + '"" ' + quoteData.author)} 
          name="twitter"
          icon="https://unpkg.com/ionicons@5.0.0/dist/svg/logo-twitter.svg" 
        />
        <LinkButton 
          id="tumblr-button" 
          link={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' 
                + encodeURIComponent(quoteData.author)+'&content=' 
                + encodeURIComponent(quoteData.quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}
          name="tumblr"
          icon="https://unpkg.com/ionicons@5.0.0/dist/svg/logo-tumblr.svg"
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <QuoteMachine />
      <p className="copyright">&copy;2020 Sovanarung Seng</p>
    </div>
  );
}

export default App;
