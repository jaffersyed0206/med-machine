import React from 'react';
import ModalResponse from '../component/response/ModalResponse';

class FrontHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            process: false,
            currentSymptoms: '',
            userDiagnosis: [],
            userResults: ''
        }

        this.handleInputSubmissions = this.handleInputSubmissions.bind(this);
        this.handleEventSubmitOnEnter = this.handleEventSubmitOnEnter.bind(this);
    }

    handleInputSubmissions = (event) => {
        this.setState({
            currentSymptoms: event.target.value,
        })
    }

    handleEventSubmitOnEnter = (event) => {
        if(event.keyCode || event.which === 13) {
            const finishedValue = this.state.currentSymptoms;
            this.state.userDiagnosis.push(finishedValue);
            document.getElementById('currentInput').value = '';
        }
    }

    submitAndFetchResponse = () => {
        var data = {};
        data['userDiagnosis'] = this.state.userDiagnosis;
        fetch('http://localhost:5000/medicalmachine-c4deb/us-central1/api/servicedata' , {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                "Content-Type" : "application/json"
            }
        }).then(response => {
           return response.json();
        }).then(body => {
            console.log(JSON.stringify(body));
            this.setState({
                process: true,
                userResults: body 
            })
            console.log(this.state);
        }).catch(error => {
            console.log(error)
        })
    }

    render() {

        var {process} = this.state

        return (
            <div>
             <div className="home-diagnosis">
              <div className="container">
                <h1 className="text-center homeTitle">MED MACHINE</h1>
                <div className="input-container">
                <input type= "text" className="inputSymptoms" onChange={this.handleInputSubmissions}  onKeyPress={this.handleEventSubmitOnEnter.bind(this)} placeholder="Tell us some symptoms you think you have" id="currentInput"/>
                </div>
                <div className="submission text-center" onClick={this.submitAndFetchResponse}>SUBMIT</div>
              </div>
             </div>
             <ModalResponse jsonFile={this.state.userResults} process={process}/>
            </div>
        )
    }
}

export default FrontHome;