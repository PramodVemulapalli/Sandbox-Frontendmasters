import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import ProfileCard from './ProfileCard';
import './Application.css';
import map from 'lodash/map';
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
    this.usersRef = database.ref('/newlikeusers');
    this.restaurantsRef = database.ref('/restaurants');
  }

  componentDidMount(){

    console.log('--------------------> Component Did Mount Called');

    auth.onAuthStateChanged((currentuser) => {

      console.log('AUTH_CHANGE has triggered and current user set');
      this.setState({ currentuser });
      if (currentuser === null) {
        console.log('--------------------> Component Did Mount Return');
        return;
      }

      this.userRef = database.ref('/newlikeusers').child(currentuser.uid);

      this.userRef.on('value', (snapshot) => {
        const userData = pick(currentuser, ['displayName', 'photoURL', 'email']);
        console.log('userref is set' + userData);
        this.userRef.update(userData);
      });


    });

    console.log(' executing CDM: this.usersRef', this.usersRef);
    this.usersRef.on('value', (snapshot) => {
      console.log('likeusers called ', snapshot.val());
      this.setState({ users: snapshot.val() });
    });

    console.log(' executing CDM: this.restaurantsRef', this.restaurantsRef);
    this.restaurantsRef.on('value', (snapshot) => {
      console.log('restaurants called ',snapshot.val());
      this.setState({ restaurants: snapshot.val() });
    });

  }

  render() {

    console.log('--------------------> Application Render Called');
    const { currentuser, restaurants, users } = this.state;

    console.log('Application Render: restaurants = ' + restaurants);
    console.log('Application Render: users = ' + users);
    console.log('Application Render: curretnuser = ' + currentuser);

    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Lunch Rush</h1>
        </header>
        <div>
          { !currentuser && <SignIn /> }
          { users &&
            <div>
              <section className="ProfileCards">
                {
                  map(users, (user, uid) => {
                    return <ProfileCard key={uid} usersRef={this.usersRef} uid={uid} user={user}/>
                  })
                }
              </section>
            </div>
          }
          { currentuser &&
            <div>
              <NewRestaurant />
              <Restaurants restaurants={restaurants} user={currentuser} />
              <CurrentUser user={currentuser} />
            </div>
          }
        </div>
      </div>
    );
  }
}

//<ProfileCard key={uid} user={user} uid={uid} />
export default Application;
