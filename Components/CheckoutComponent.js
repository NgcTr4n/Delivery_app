import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearCart, postOrder } from '../redux/ActionCreators';
import { useNavigation } from '@react-navigation/native';

const mapStateToProps = (state) => ({
  cart: state.cart || [],
  dishes: state.dishes,
  orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
  postOrder: (name, address, items) => dispatch(postOrder(name, address, items)),
});

const CheckOut = (props) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const { cart, dishes, orders } = props;

  const renderCartItem = (item) => {
    const dish = dishes.dishes.find(d => d.id === item.dishId);
    if (!dish) return null;
    return (
      <View key={item.dishId} style={styles.cartItem}>
        <Text>{dish.name}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
    );
  };

  const handleCheckout = async () => {
    if (name.trim() === '' || address.trim() === '') {
      Alert.alert('Error', 'Please enter your name and address');
      return;
    }

    const items = cart.map(item => {
      const dish = dishes.dishes.find(d => d.id === item.dishId);
      return {
        name: dish.name,
        quantity: item.quantity
      };
    });

    try {
      await props.postOrder(name, address, items);
      setIsOrderPlaced(true);
    } catch (error) {
      console.error('Error in handleCheckout:', error);
      Alert.alert('Error', `There was an error placing your order: ${error.message}`);
    }
  };

  useEffect(() => {
    if (isOrderPlaced && !orders.isLoading && orders.orders.length > 0) {
      Alert.alert(
        'Success',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setAddress('');
              props.clearCart();
              navigation.navigate('Home');
              setIsOrderPlaced(false);
            }
          }
        ]
      );
    }
  }, [isOrderPlaced, orders.isLoading, orders.orders]);

  useEffect(() => {
    if (orders.errMess) {
      Alert.alert('Error', `There was an error placing your order: ${orders.errMess}`);
      setIsOrderPlaced(false);
    }
  }, [orders.errMess]);

  if (orders.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cd5c5c" />
        <Text>Placing your order...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cartItems}>
        <Text style={styles.sectionTitle}>Your Order:</Text>
        {cart.map(renderCartItem)}
      </View>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Delivery Information:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Delivery Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>
      <Button
        title="Place Order"
        onPress={handleCheckout}
        buttonStyle={styles.checkoutButton}
        disabled={orders.isLoading || cart.length === 0}
      />
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItems: {
    marginBottom: 20,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  form: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkoutButton: {
    backgroundColor: '#cd5c5c',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);