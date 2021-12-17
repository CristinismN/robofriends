import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import {robots} from './robots';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const state = {
    
}

class App extends Component {
    constructor() {
        super();
        this.state={
            robots: [], //in here we just put whatever we want the state to have - something that can change its value
            searchfield: ''
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> {
            return response.json();
    })
        .then(users => {
            this.setState({robots: users})
        })
    
}

onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
    console.log(event.target.value);

}
    render() {
    const filteredRobots= this.state.robots.filter(robot => { 
        // const {robots, searchfield}  = this.state; bc robots and searchfield are properties of this.state object
        return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()); //after destructuring, we can remove this.state
    }
    )
    if (!this.state.robots.length) {  //after destructuring, we can remove this.state
        return <h1>Loading...</h1>
    }
    else {
    return (
        <div className= 'tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
        </div>
        );
        }
    }   
}

export default App;