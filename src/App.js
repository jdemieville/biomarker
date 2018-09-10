import React, { Component } from 'react';
import 'whatwg-fetch';
import BiomarkerName from './components/BiomarkerName';
import SearchBar from './components/SearchBar';
import ProcessTable from './components/ProcessTable';
import './App.css';

//api url
const BIOURL = 'https://biomarker-server.herokuapp.com/api/biomarkers';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      loading: true
    };
  }
  
  componentDidMount(){
    this.loadBiomarkers();
  }
  
  //retrieve biomarkers from API and add to biomarker array
  loadBiomarkers() {
    window.fetch(BIOURL, {
      method: 'GET'
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        loading: false,
        biomarkers: json,
        processes: ['']
      });
    });
  }
  
  filterBiomarker(value) {
    this.setState({
      filterText: value
    });
  }
  
  addBiomarker(id){
    const processList = this.state.biomarkers.filter(biomarker => biomarker._id === id);
    this.setState({
      processes: processList
    });
  }
  
  render() {
    const { loading } = this.state;
    
    if(loading) {
      return (
        <h1>Loading...</h1>  
      );
    } else {
        return (
          <div className="App">
            <h1>Biomarkers</h1>
            <SearchBar
              filterText={this.state.filterText}
              filterBiomarker={this.filterBiomarker.bind(this)}
            />
            <BiomarkerName
             data={this.state.biomarkers}
             filterText={this.state.filterText}
             addBiomarker={this.addBiomarker.bind(this)}
            />
            <ProcessTable
              data={this.state.processes}
            />
          </div>
        );
      }
    }
}

export default App;
