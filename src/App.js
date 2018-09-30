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
  Grid,
  Header,
  Image,
  List,
  Loader,
  Menu,
  Segment
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
                <Menu.Item as='h4' header>
                  <Image src='dna.png' avatar/>
                  Biomarkers
                </Menu.Item>
                <Menu.Item position='right'>
                  <SearchBar
                    filterText={this.state.filterText}
                    filterBiomarker={this.filterBiomarker.bind(this)}
                  />
                </Menu.Item>
              </Container>
            </Menu>
            <Container text style={{ marginTop: '6em' }}>
              <Divider as='h4' className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}>
                <p>Processes</p>
              </Divider>
              <ProcessTable
                data={this.state.processes}
              />
              <Divider as='h4' className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}>
                <p>Genes</p>
              </Divider>
                <BiomarkerName
                  data={this.state.biomarkers}
                  filterText={this.state.filterText}
                  addBiomarker={this.addBiomarker.bind(this)}
                />
            </Container>
            <Segment inverted vertical style={{ display: 'flex', bottom: '0', marginBottom: '0', flexDirection: 'column', position: 'fixed', width: '100%'}}>
              <Container>
                <Grid divided inverted stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <List inverted verticalAlign='middle'>
                        <List.Item as='h4'>About</List.Item>
                        <List.Item as='a'  href='https://demieville-codes.herokuapp.com/portfolio' target='_blank' style={{ margin: '0px', fontSize: '12px'}} >Website designed and coded by Jennifer Demieville 2018</List.Item>
                        <List.Item as='a' href='https://www.flaticon.com/authors/freepik/' target='_blank' style={{ margin: '0px', fontSize: '12px'}}>DNA icon from flaticon author freepik is licensed by Creative Commons.</List.Item>
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </div>
        );
      }
    }
}

export default App;
