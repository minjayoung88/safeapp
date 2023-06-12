import React, { Component } from 'react';
import Navigation from './navigation';
import { NavigationService } from './Common';
import Loading from './Screens/loading'
class Router extends Component {
    state = {
        isLoading : true
    }

    componentDidMount= async() => {  
        setTimeout(() => {this.setState({isLoading: false})},3000);
    }

    constructor(props) {
        super(props);
    }

    render() {
        if(this.state.isLoading){
            return <Loading/>
        }else{
            return (
                <Navigation
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            )
        }
    }
}

export default Router;