import React from 'react';
import '../../../src/App.css'

function ModalResponse({jsonFile, process, ...rest}) {


    const json = jsonFile;
     if (process === true) {
        return (
            <div>
                <div className="modal-response">
                 <div className="modal-padding">
                  <div className="modal-container">
                    <div className="container-modal">
                    <span className="close">&times;</span>
                      <h1>DIAGNOSIS</h1>
                      <h6>Click on a disease to see how you might have it and find cheap treatments for you.</h6>
                      {
                         json.diagnosis.map(item => 
                            <div key ={item.Disease.DiseaseKey}>
                            <div className="diseasecard">
                            {item.Disease.DiseaseName}
                            <div className="float-right">
                            {"Chance: " + item.Disease.Probability}
                            </div>
                            </div>
                            <div id="contents" className="diseasecontents none">
                             <div className="container-modal">
                              <div className="row">
                              <div className="col-md-6">
                               <h5 className="text-center">SHARE SYMPTOMS</h5>
                               {item.Disease.DiseaseSymptoms.map(index => 
                                 <div key={item.Disease.DiseaseSymptoms.indexOf(index)}>{index}</div>
                                )
                                }
                              </div>
                              <div className="col-md-6">
                                <h5>FIND THE TREATMENT</h5>
                              </div>
                              </div>
                             </div>
                            </div>
                            </div>    
                        )
                      }
                    </div>
                  </div>
                 </div>
                </div>
            </div>
        )
     } else {
         return null;
     }
}

export default ModalResponse