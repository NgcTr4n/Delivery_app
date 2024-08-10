import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes,  fetchPromos, addToCart } from '../redux/ActionCreators';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddToCart from './AddToCartComponent';
import CheckoutComponent from './CheckoutComponent';

const Tab = createBottomTabNavigator();

const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  addToCart: (dishId, quantity) => dispatch(addToCart(dishId, quantity))
});



function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#cd5c5c' },
        headerTintColor: '#fff',
headerTitleStyle: { color: '#fff' }
        
      }}>
     <MenuNavigator.Screen name='Menu' component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
        //  headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{
          headerTitle: 'Dish Detail'
        }} />
    </MenuNavigator.Navigator>
  );
}



function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#cd5c5c' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
    <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          //headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

function MainNavigatorScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          if (route.name === 'HomeScreen') {
            iconComponent = <Icon name='home' type='font-awesome' size={size} color={color} />;
          } else if (route.name === 'MenuScreen') {
            iconComponent = <Icon name='menu'  size={size} color={color} />;
          } else if (route.name === 'ReservationScreen') {
            iconComponent = <Icon name='book-online'  size={size} color={color} />;
          } else if (route.name === 'ContactScreen') {
            iconComponent = <Icon name='address-book' type='font-awesome' size={size} color={color} />;
  
          } else if (route.name === 'AddToCartScreen') {
            iconComponent = <Icon name='shopping-cart' type='font-awesome' size={size} color={color} />;
          }else if (route.name === 'CheckOutScreen') {
            iconComponent = <Icon name='shopping-cart' type='font-awesome' size={size} color={color} />;
          }

          return iconComponent;
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#cd5c5c',
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeNavigatorScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="MenuScreen" component={MenuNavigatorScreen} options={{ title: 'Menu' }} />
      <Tab.Screen name="AddToCartScreen" component={CartNavigatorScreen} options={{ title: 'Cart' }} />
    </Tab.Navigator>
  );
}


function CartNavigatorScreen() {
  const CartNavigator = createStackNavigator();
  return (
    <CartNavigator.Navigator
      initialRouteName='Cart'
      screenOptions={{
        headerStyle: { backgroundColor: '#cd5c5c' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <CartNavigator.Screen name='Cart' component={AddToCart} options={{ title: 'Cart' }} />
      <CartNavigator.Screen name='Checkout' component={CheckoutComponent} options={{ title: 'Checkout' }} />
    </CartNavigator.Navigator>
  );
}

class Main extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchPromos();
  }
}
export default connect(null, mapDispatchToProps)(Main);
