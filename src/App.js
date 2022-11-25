import logo from './smart-house.png';
import React from 'react';
import Home from './homeModule'
import './App.css';


class App extends React.Component {
  state = {
    homeOBJ: new Home({
      fanSpeed: 1,
      light1: 1,
      light2: 1,
      security: 1
    }),
    isLoading: true,
    firstVisit: true,
  }
  componentDidMount() {
    this.getData();
    setInterval(async () => {
      this.getData();
    }, 10000);
  }

  render() {
    return (
      <div className="App container my-5 p-5" >
        {(this.state.isLoading &&
          <div className="align-middle" style={{ marginTop: 220 }}>
            <div className="spinner-grow text-primary mx-1" style={{ width: "2rem", height: "2rem", }} role="status">

            </div>
            <div className="spinner-grow text-primary mx-1" style={{ width: "2rem", height: "2rem", }} role="status">

            </div>
            <div className="spinner-grow text-primary mx-1" style={{ width: "2rem", height: "2rem", }} role="status">

            </div>
            <div className="spinner-grow text-primary mx-1" style={{ width: "2rem", height: "2rem", }} role="status">

            </div>

          </div>)
          ||
          <div>
            <img src={logo} width="250" height={250} />
            <div className='row my-5'>
              <div className="form-check form-switch my-4 col-4">
                <input style={{ width: 70, height: 30 }} id="1" checked={this.state.homeOBJ.light1 === 1} onChange={event => this.toggleButtonChange(event.target)} className="form-check-input" type="checkbox" />
                <h5 className="form-check-label pt-1">Light 1</h5>
              </div>
              <div className="form-check form-switch my-4 col-4">
                <input style={{ width: 70, height: 30 }} id="2" checked={this.state.homeOBJ.light2 === 1} onChange={event => this.toggleButtonChange(event.target)} className="form-check-input" type="checkbox" />
                <h5 className="form-check-label pt-1">Light 2</h5>
              </div>
              <div className="form-check form-switch my-4 col-4">
                <input style={{ width: 70, height: 30 }} id="3" checked={this.state.homeOBJ.security === 1} onChange={event => this.toggleButtonChange(event.target)} className="form-check-input" type="checkbox" />
                <h5 className="form-check-label pt-1">Security</h5>
              </div>
            </div>

            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: this.state.homeOBJ.fanSpeed * 25 + "%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button onClick={() => this.decreaseFanSpeed()} className='btn btn-primary mx-3 my-4 px-3'>-</button>
            <button onClick={() => this.increaseFanSpeed()} className='btn btn-primary mx-3 my-4 px-3'>+</button>
          </div>}

      </div>
    );
  }
  toggleButtonChange(target) {
    //console.log(target.id);
    //console.log(target.checked);
    let onOFF = target.checked ? 1 : 0;
    let button = target.id;
    let data = {};
    let newHomeObj = {};
    switch (button) {
      case "1":
        data = { "light_1": onOFF }
        newHomeObj = new Home(this.state.homeOBJ.fanSpeed, onOFF, this.state.homeOBJ.light2, this.state.homeOBJ.security,);
        break;
      case "2":
        data = { "light_2": onOFF }
        newHomeObj = new Home(this.state.homeOBJ.fanSpeed, this.state.homeOBJ.light1, onOFF, this.state.homeOBJ.security,);
        break;
      case "3":
        data = { "Security": onOFF }
        newHomeObj = new Home(this.state.homeOBJ.fanSpeed, this.state.homeOBJ.light1, this.state.homeOBJ.light2, onOFF,);
        break;

      default:
        break;
    }
    //console.log("data", data);
    fetch("https://industrial.api.ubidots.com/api/v1.6/devices/demo/", {
      headers: {
        "X-Auth-Token": "BBFF-SwfNf4IHd2AxK1ZAC16kZb2r4ha02D",
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then(function (response) {
      //console.log(response);
      return response.json();
    }).then((data) => {
      this.setState({
        homeOBJ: newHomeObj,
      })
    });
  }
  increaseFanSpeed() {
    if (this.state.homeOBJ.fanSpeed < 4) {
      fetch("https://industrial.api.ubidots.com/api/v1.6/devices/demo/", {
        headers: {
          "X-Auth-Token": "BBFF-SwfNf4IHd2AxK1ZAC16kZb2r4ha02D",
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "fan": { "value": this.state.homeOBJ.fanSpeed + 1, }, }),
      }).then(function (response) {
        //console.log(response);
        return response.json();
      }).then((data) => {
        this.setState((prevState) => ({
          homeOBJ: new Home(prevState.homeOBJ.fanSpeed + 1, prevState.homeOBJ.light1, prevState.homeOBJ.light2, prevState.homeOBJ.security,),
        }))
      });
    }
  }
  decreaseFanSpeed() {
    if (this.state.homeOBJ.fanSpeed > 0) {

      fetch("https://industrial.api.ubidots.com/api/v1.6/devices/demo/", {
        headers: {
          "X-Auth-Token": "BBFF-SwfNf4IHd2AxK1ZAC16kZb2r4ha02D",
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "fan": { "value": this.state.homeOBJ.fanSpeed - 1, }, }),
      }).then(function (response) {
        //console.log(response);
        return response.json();
      }).then((data) => {
        this.setState((prevState) => ({
          homeOBJ: new Home(prevState.homeOBJ.fanSpeed - 1, prevState.homeOBJ.light1, prevState.homeOBJ.light2, prevState.homeOBJ.security,),
        }))
      });

    }
  }
  getData() {
    this.setState({
      isLoading: true,
    });
    fetch("https://industrial.api.ubidots.com/api/v1.6/datasources/622219829f6e780520ec6fa7/variables", {
      headers: {
        "X-Auth-Token": "BBFF-SwfNf4IHd2AxK1ZAC16kZb2r4ha02D"
      },
    }).then(function (response) {
      return response.json();
    }).then((data) => {
      let newhomeOBJ = Home.fromJson(data.results);
      //console.log(data.results);
      //console.log(newhomeOBJ);
      this.setState({
        homeOBJ: newhomeOBJ,
        isLoading: false,
      });
    });
  }

}


export default App;
