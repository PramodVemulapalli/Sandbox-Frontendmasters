import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import './Application.css';
import map from 'lodash/map';


class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentuser: null,
      restaurants: null
    };

    this.restaurantsRef = database.ref('/restaurants');
  }

  componentDidMount(){
    auth.onAuthStateChanged((currentuser) => {
      console.log('AUTH_CHANGE',CurrentUser);
      this.setState({ currentuser });

      this.restaurantsRef.on('value', (snapshot) => {
        this.setState({ restaurants: snapshot.val() });
        console.log(snapshot.val());
      });
    });
  }

  render() {

    const { currentuser, restaurants } = this.state;

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
              { map(restaurants, (value, key) => {<p key={key}> {value} </p>}) }
              <CurrentUser user={currentuser} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Application;
