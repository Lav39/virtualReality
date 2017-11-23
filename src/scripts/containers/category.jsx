import React from 'react'

import ImageContainer from '../containers/imageContainer.jsx'

class Category extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {           
            inputSliderValue: 0
        }
        this.slideImage = this.slideImage.bind(this);
        this.lowerLimit = 0, this.upperLimit = 2, this.currentValue = 0;
    }    
    slideImage(event){    
        let temp = parseInt(event.target.value/10);        
        let totalItem = this.props.models.length;
        if(this.currentValue !== temp){
            this.currentValue = temp;
            this.lowerLimit = temp >= totalItem-1?temp == totalItem-1? temp-2 : temp-3: temp == 0 ? 0 : temp-1;
            this.upperLimit = temp >= totalItem-1?temp == totalItem-1?temp : temp-1: temp == 0 ? temp+2: temp+1;
        }            
       this.setState({inputSliderValue:event.target.value});              
    }      
  
    render() {       
        let lowerLimit = this.lowerLimit;
        let upperLimit = this.upperLimit;
        let imageContainer = this.props.models
                                 .filter((model,key)=>{
                                    return key>=lowerLimit && key <= upperLimit;
                                 })
                                 .map((model,key)=>{
                                     return <ImageContainer key={key} model={model}/>
                                 });
        return (
           <div className="col-lg-12 categoryContainerWrapper">
                <h2 className="col-lg-10"> {this.props.name}</h2>
                <div className="categoryContainer col-lg-10">               
                    {imageContainer}                                     
                </div> 
                <div className="col-lg-5">
                    <input type="range" min="0" max={(this.props.models.length-2)*10} step="10"
                        value={this.state.inputSliderValue} 
                        className="slider-color" id="id3" 
                        onChange={(event)=>{this.slideImage(event)}}/>
                </div>               
           </div>
        )
    }
}

export default Category;
