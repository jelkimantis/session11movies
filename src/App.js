import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }
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

  render() {
    let movies = [];
    for(let i = 0; i < this.state.movies.length; i++)
    {
      let movieUrl = "https://image.tmdb.org/t/p/w220_and_h330_face/"+ this.state.movies[i].poster_path;
      movies.push(<Card style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={movieUrl} />
                    <Card.Body>
                      <Card.Title> {this.state.movies[i].title}</Card.Title>
                      <Card.Text>{this.state.movies[i].overview}</Card.Text>
                      </Card.Body>
                  </Card>)
    }

    return (
      <div className="App Darkmode">
      <h1>It's MOOOOOVIES</h1>
      <div className="Movie-grid">
        {movies}
      </div>
      </div>
    );
  }
}



export default App;
