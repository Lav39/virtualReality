import React from 'react'
import {connect} from 'react-redux';

import Category from '../containers/category.jsx'
import Header from '../components/header.jsx'
import appActions from '../actions/appActions';

class App extends React.Component {
    constructor(props) {
        super(props);
     this.readJSONData = this.readJSONData.bind(this);
     this.handleOnScroll = this.handleOnScroll.bind(this);
     this.actualCategories = []
     this.readJSONData(function(response) {         
        // Parse JSON string into object
        let actual_JSON = JSON.parse(response);
        this.actualCategories = actual_JSON.categories;        
            this.props.loadCategories({categories:actual_JSON.categories,upperLimit:this.props.upperLimit});
        });
    }    
        
    handleOnScroll(){
        var element = document.getElementsByClassName('imageContainerWrapper')[0];
        var scrollTop = (element && element.scrollTop) || document.body.scrollTop;
        var scrollHeight = (element && element.scrollHeight) || document.body.scrollHeight;
        var clientHeight = element.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    
        if (scrolledToBottom) {
            let actualLength = this.actualCategories.length;
            let obj = {
                categories: this.actualCategories,
                upperLimit: this.props.upperLimit > actualLength ? actualLength : this.props.upperLimit +2
            }
            this.props.loadCategories(obj);
        }
    }
     readJSONData(callback) {  
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '../../../resource.json', true); 
        xobj.onreadystatechange = () => {
            if (xobj.readyState == 4 && xobj.status == "200") {            
                callback.call(this,xobj.responseText);
            }
        };
        xobj.send(null);  
   }
    render() {
        let categories = this.props.categories || [];
        let categoryContainer =  categories.map((category,key)=>{
          return  <Category key={key+category.name} name={category.name} models = {category.models} />
        });
        return (
            <div className ='container-fluid'>
                <Header/>
                <div className="imageContainerWrapper" onScroll={this.handleOnScroll}>
                    {categoryContainer}
                    <div>

                    </div>
                </div>                
            </div>
        )
    }
}

// Map state to props
const mapStateToProps = ({appReducer}) => {
    return {
        categories: appReducer.categories,
        upperLimit: appReducer.upperLimit
    }
}

// Map actions to props
const mapDispatchToProps = (dispatch) => ({
    loadCategories : (response) => {
        dispatch(appActions.loadCategories(response))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
