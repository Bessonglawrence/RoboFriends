import React, { Component} from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users=> this.setState({robots: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value }) 
  }

  render(){
    const { robots, searchfield }= this.state;
    const filterRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    if ( this.state.robots.length === 0){
      return (
        <div class='loader'>
              
        </div>
      )
    } else {
        return (
          <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
              <CardList robots={filterRobots}/>
            </Scroll>
          </div>
        );
    }

  }
  
}

export default App;
