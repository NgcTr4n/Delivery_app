import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeFromCart } from '../redux/ActionCreators';
import { useNavigation } from '@react-navigation/native';


const mapStateToProps = (state) => ({
  cart: state.cart || [],
  dishes: state.dishes,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (dishId) => dispatch(removeFromCart(dishId)),
});

const AddToCart = (props) => {
  const { cart, dishes } = props;
  const navigation = useNavigation();
  const renderCartItem = ({ item }) => {
    const dish = dishes.dishes.find(d => d.id === item.dishId);
    if (!dish) return null;

    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: baseUrl + dish.image }} />
        <ListItem.Content>
          <ListItem.Title>{dish.name}</ListItem.Title>
          <ListItem.Subtitle>Quantity: {item.quantity}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleRemoveFromCart = (dishId) => {
    props.removeFromCart(dishId);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={() =>
          Alert.alert(
            'Remove from Cart',
            'Are you sure you want to remove this item from your cart?',
            [
              { text: 'Cancel', onPress: () => rowMap[data.item.dishId].closeRow() },
              { text: 'Yes', onPress: () => handleRemoveFromCart(data.item.dishId) },
            ],
            { cancelable: true }
          )
        }
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={cart}
        renderItem={renderCartItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe={true}
        keyExtractor={(item) => item.dishId.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total items: {getTotalQuantity()}</Text>
        <Button
          title="Proceed to Checkout"
          onPress={() => {
            navigation.navigate('Checkout');
          }}
          buttonStyle={styles.checkoutButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#cd5c5c',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 75,
    backgroundColor: 'red',
  },
  backRightBtnLeft: {
    backgroundColor: '#d9534f',
    right: 75,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
