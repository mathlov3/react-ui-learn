import React, { Component } from 'react';
import '../css/App.css';

import { without } from 'lodash'

import AddAppointments from './AddAppointmetns';
import ListAppointments from './ListAppointments';
import SearchAppointsment from './SearchAppointments';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myName: 'Yevhen',
      myAppointments: [],
      lastIndex: 0
    }

    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  deleteAppointment(item) {
    var tempApts = this.state.myAppointments;
    tempApts = without(tempApts, item);

    this.setState({ myAppointments: tempApts });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        })
        this.setState({
          myAppointments: apts
        })
      });
  }

  render() {

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                {this.state.myName}
                <AddAppointments />
                <SearchAppointsment />
                <ListAppointments
                  appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
