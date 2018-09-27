import React, { Component } from 'react';
import 'whatwg-fetch';
import BiomarkerName from './components/BiomarkerName';
import SearchBar from './components/SearchBar';
import ProcessTable from './components/ProcessTable';
import './App.css';

//semantic ui imports
import {
  Container,
  Dimmer,
  Divider,
  Icon,
  Loader,
  Menu
} from 'semantic-ui-react';

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
        <div>
        <Container fluid>
          <Divider clearing />
              <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
              </Dimmer>
          </Container>
        </div>
      );
    } else {
        return (
          <div className="App">
            <Menu fixed='top' inverted>
              <Container>
                <Menu.Item as='a' header>
                  <Icon circular name='dna'/>
                  Biomarkers
                </Menu.Item>
                <Menu.Item>
                  <SearchBar
                    filterText={this.state.filterText}
                    filterBiomarker={this.filterBiomarker.bind(this)}
                  />
                </Menu.Item>
              </Container>
            </Menu>
            <Container text style={{ marginTop: '6em' }}>
              <ProcessTable
                data={this.state.processes}
              />

              <BiomarkerName
               data={this.state.biomarkers}
               filterText={this.state.filterText}
               addBiomarker={this.addBiomarker.bind(this)}
              />

            </Container>
          </div>
        );
      }
    }
}

export default App;
