import React from 'react'
import Modal from 'react-modal';

const customStyles = {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        top             : '50%',
        left            : '50%',
        right           : 'auto',
        bottom          : 'auto',
        marginRight     : '-50%',
        transform       : 'translate(-50%, -50%)',
        height          : '80%',
        width           : '70%'
    }
  }
class ImageContainer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            modalIsOpen: false,
            pointer:0
          };
       
          this.openModal = this.openModal.bind(this);         
          this.closeModal = this.closeModal.bind(this);
          this.changeCameraPosition = this.changeCameraPosition.bind(this);
          this.scrollHeight = 0;
          this.changeCameraPosition();
        }    
    openModal() {          
        this.setState({modalIsOpen: true});      
      }     
          
      closeModal() {        
        this.setState({modalIsOpen: false});  
      }
      changeCameraPosition(){
          setTimeout(()=>{
             if(this.state.modalIsOpen){
                let temp = this.state.pointer;               
                temp = temp == 3 ? 0 : temp+1;
                this.setState({pointer:temp});                
             }
             this.changeCameraPosition();
          },5000);
      }
    render() {        
        let name = this.props.model.name || "";
        let imageUrl = this.props.model.thumb || "";
        let objUrl =  this.props.model.obj || "";
        let mtlUrl = this.props.model.mtl || "";
        let objLoc =  this.props.model.objloc || "";
        let mtlLoc = this.props.model.mtlloc || "";
        let scale = !! this.props.model.scale && this.props.model.scale=="normal" ?"1 1 1"
                    : !! this.props.model.scale && this.props.model.scale=="zoom in" ? "5 5 5"
                    : !! this.props.model.scale && this.props.model.scale=="zoom out" ? "0.1 0.1 0.1"
                    :!! this.props.model.scale && this.props.model.scale=="ultra zoom out" ? "0.01 0.01 0.01"
                    :!! this.props.model.scale && this.props.model.scale=="ultra zoom in" ? "10 10 10" :"";
        let userHeight = !! this.props.model.userHeight && this.props.model.userHeight=="low" ?"0"
                    : !! this.props.model.userHeight && this.props.model.userHeight=="mid" ? "0.6"
                    : !! this.props.model.userHeight && this.props.model.userHeight=="up" ? "6":"";

        let rotationType = !! this.props.model.rotationType && this.props.model.rotationType=="horizontal" ?"0 360 0":"360 0 0";
        let posArray = [
            {
                position:"15 0 15",
                rotation:"0 45 0",
            },
            {
                position:"15 0 -15",
                rotation:"0 135 0",
            },
            {
                position:"-15 0 -15",
                rotation:"0 -135 0",
            },
            {
                position:"-15 0 15",
                rotation:"0 -45 0",
            }
        ];
           
        let modalBox = this.state.modalIsOpen ? 
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            imageUrl={imageUrl}
                            contentLabel="Example Modal"
                        >                                                      
                            
                              <div className="vrWrapper">        
                                     <a-scene>
                                            <a-assets>
                                                <a-asset-item id="objItem" src={objLoc}></a-asset-item>
                                                <a-asset-item id="mtlItem" src={mtlLoc}></a-asset-item>
                                                <img id="texture" src={imageUrl} crossOrigin="anonymous"/>                                                
                                            </a-assets>                               
                                            <a-sky color="#75FF33" />
                                            <a-obj-model src="#objItem" mtl="#mtlItem" position="0 0 0" scale={scale}>
                                                <a-animation attribute="rotation"
                                                        dur="5000"
                                                        fill="forwards"
                                                        to={rotationType}
                                                        repeat="indefinite">
                                                </a-animation>
                                            </a-obj-model>             
                                  
                                            <a-entity position={posArray[this.state.pointer].position} rotation={posArray[this.state.pointer].rotation}>
                                                <a-camera user-height={userHeight}></a-camera>                                                
                                            </a-entity>
                                    </a-scene>                              
                            </div>
                        </Modal>:"";
        return (
            <div className="col-lg-3 imageTile">                             
                <img src={imageUrl} 
                     className="img-rounded" 
                     alt={name} 
                     onClick={()=>this.openModal()}
                     />
                {modalBox}
                 
            </div>
        )
    }
}

export default ImageContainer;
