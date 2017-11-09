import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import './Application.css';
// import map from 'lodash/map';
import pick from 'lodash/pick';



class Application extends Component {
  constructor(props) {
    super(props);
    this.usersRef = null;
    this.userRef = null;
    this.state = {
      currentuser: null,
      restaurants: null,
      users: null,
    };
    this.restaurantsRef = database.ref('/restaurants');
  }

  componentDidMount(){
    auth.onAuthStateChanged((currentuser) => {
      console.log('AUTH_CHANGE',CurrentUser);
      this.setState({ currentuser });
      this.usersRef = database.ref('/likeusers');
      this.userRef = this.usersRef.child(currentuser.uid);
      this.userRef.once('value').then((snapshot) => {
        if (snapshot.val()) return;
        const userData = pick(currentuser, ['displayName', 'photoURL', 'email']);
        this.userRef.set(userData);
      });

      this.usersRef.on('value', (snapshot) => {
        this.setState({ users: snapshot.val() });
      });
      this.restaurantsRef.on('value', (snapshot) => {
        this.setState({ restaurants: snapshot.val() });
        console.log(snapshot.val());
      });
    });
  }

  render() {

    const { currentuser, restaurants } = this.state;

    console.log(restaurants);

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
              <Restaurants restaurants={restaurants} user={currentuser} />
              <CurrentUser user={currentuser} />
            </div>
          }
          { currentuser &&
            <div>
              <section className="ProfileCards">
                {
                  map(users, (user, uid) => {
                    return <ProfileCard key={uid} user={user} uid={uid} />
                  })
                }
              </section>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Application;
