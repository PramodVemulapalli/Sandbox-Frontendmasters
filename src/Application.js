import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import './Application.css';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentuser: null
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged((currentuser) => {
      console.log('AUTH_CHANGE',CurrentUser);
      this.setState({ currentuser });
    });
  }

  render() {

    const { currentuser } = this.state;

    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Lunch Rush</h1>
        </header>
        <div>
          { !currentuser && <SignIn /> }
          { currentuser &&
            <div>
              <NewRestaurant />
              <CurrentUser user={currentuser} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Application;
