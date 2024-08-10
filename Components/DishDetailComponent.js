import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../Shared/baseUrl';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { addToCart } from '../redux/ActionCreators';

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  cart: state.cart
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (dishId, quantity) => dispatch(addToCart(dishId, quantity))
});

class RenderDish extends Component {
  render() {
    const { dish } = this.props;

    if (!dish) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <Image source={{ uri: baseUrl + dish.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.description}>{dish.description}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => this.props.onDecreaseQuantity()}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{this.props.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => this.props.onIncreaseQuantity()}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quantityButton, { marginLeft: 10 }]}
            onPress={() => this.props.onAddToCart()}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  handleAddToCart = () => {
    const { addToCart, route } = this.props;
    const dishId = parseInt(route.params.dishId);
    addToCart(dishId, this.state.quantity);
    Alert.alert('Added to Cart', `${this.state.quantity} ${this.state.quantity > 1 ? 'items' : 'item'} added to cart`);
  }

  render() {
    const { dishes, route } = this.props;
    const dishId = parseInt(route.params.dishId);
    const dish = dishes.dishes[dishId];

    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderDish 
            dish={dish} 
            quantity={this.state.quantity}
            onIncreaseQuantity={() => this.setState(prevState => ({ quantity: prevState.quantity + 1 }))}
            onDecreaseQuantity={() => this.setState(prevState => ({ quantity: Math.max(1, prevState.quantity - 1) }))}
            onAddToCart={() => this.handleAddToCart()}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
