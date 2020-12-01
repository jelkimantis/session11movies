import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.scss';
import './ToggleSwitch.scss';
import ToggleSwitch from './ToggleSwitch.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      getClassNameApp: "App",
      getClassNameCard: "",
    }

    this.darkmodeSwitch = this.darkmodeSwitch.bind(this);
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    // go grab (aka get) all the data from some url
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=b6fbc7f3f313bd395902af464ef47262&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    axios.get(url)
      .then(response =>
      {
        // then put just the movies (not everything) into the state
        this.setState({movies: response.data.results});
      });

  }

  darkmodeSwitch() {
    // console.log("hi");
    console.log(this.state.getClassNameApp);
    if (this.state.getClassNameApp==="App") {
      this.setState({getClassNameApp: "App Darkmode", getClassNameCard: "cardDarkmode"});
      console.log(this.state.getClassNameApp);
    }
    else {
      this.setState({getClassNameApp: "App", getClassNameCard: ""});
      console.log(this.state.getClassNameApp);
    }
    // this.setState.getClassNameApp==="App Darkmode" ? this.setState.getClassNameApp = "App" : this.setState.getClassNameApp = "App Darkmode";
  }

  render() {
    let movies = [];
    for(let i = 0; i < this.state.movies.length; i++)
    {
      let movieUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/"+ this.state.movies[i].poster_path;
      movies.push(
                    <Card style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={movieUrl} />
                    <Card.Body className={this.state.getClassNameCard}>
                      <Card.Title> {this.state.movies[i].title}</Card.Title>
                      <Card.Text>{this.state.movies[i].overview}</Card.Text>
                      </Card.Body>
                      </Card>
                  )
    }

    return (
      <div className={this.state.getClassNameApp}>
      <h1>It's MOOOOOVIES</h1>
      <ToggleSwitch Name="Darkmode" Checked="false" changeSwitch={this.darkmodeSwitch} />
      <div className="Movie-grid">
        {movies} 
      </div>
      </div>
    );
  }
}



export default App;
