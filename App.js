import React from 'react';
import {Scene, Stack, Router, Tabs, Drawer} from 'react-native-router-flux';

import Login from './src/pages/login';
import Launch from './src/pages/launch';
import Home from './src/pages/home';
import Register from './src/pages/register';
import DrawerContent from './src/components/DrawerContent';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { GlobalStyle } from './src/components/style';

import ChapterScreen from './src/pages/chapter';




const getFonts = () => Font.loadAsync({
    'PassionOne-Bold': require('./assets/fonts/PassionOne-Bold.ttf'),
    'CabinCondensed-Regular': require('./assets/fonts/CabinCondensed-Regular.ttf')
  });

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false
        }
    }

    render(){

        if (this.state.fontsLoaded) {
            return (
                <Router>
                    <Stack key="root" hideNavBar>
                        <Scene key="launch" component={Launch} title="Start Trial" hideNavBar="true" />
                        <Scene
                            key="home"
                            component={Home}
                            title="Home" 
                            hideNavBar
                        />
                        <Scene key="login" component={Login} title="Login" />
                        <Scene key="register" component={Register} title="Register" />
                        <Stack >
                        <Scene key="chapter" component={ChapterScreen} title="" hideNavBar />
                        </Stack>
                    </Stack>
                </Router>
            );

        } else {
            return (<AppLoading
                startAsync={getFonts}
                onFinish={()=>this.setState({fontsLoaded: true})} 
              />)
        }
    }
}