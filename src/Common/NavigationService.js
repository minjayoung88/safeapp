import { StackActions, NavigationActions, NavigationState } from 'react-navigation';
let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function Resetnavigate() {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
    });
    _navigator.dispatch(
       resetAction
    )
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    )
    
}

function back() { 
    _navigator.dispatch(
        NavigationActions.back()
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    back,
    Resetnavigate,
};