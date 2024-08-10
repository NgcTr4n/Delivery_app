import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingConponent';
import { baseUrl } from '../Shared/baseUrl';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import RunningPanel from './Runningpanel'; // Đảm bảo đường dẫn đúng

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 15; // Chia làm 2 cột với khoảng cách giữa các cột

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    leaders: state.leaders
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      currentPage: 1,
      itemsPerPage: 4,
    };
  }

  handleSearchChange = (text) => {
    this.setState({ searchKeyword: text, currentPage: 1 });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  renderMenuItem = ({ item, index }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity 
        style={[styles.cardContainer, index % 4 === 0 ? { marginRight: 10 } : {}]} 
        onPress={() => navigate('Dishdetail', { dishId: item.id })}
      >
        <Animatable.View animation="fadeIn" duration={1000} delay={index * 100}>
          <Card containerStyle={styles.card}>
            <Image 
              source={{uri: baseUrl + item.image}} 
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
            </View>
          </Card>
        </Animatable.View>
      </TouchableOpacity>
    );
  }

  render() {
    if (this.props.dishes.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const panelImages = this.props.leaders.leaders.slice(0, 5).map(leader => baseUrl + leader.image);
      
      const filteredDishes = this.props.dishes.dishes.filter(dish => 
        dish.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
      );
      
      const { currentPage, itemsPerPage } = this.state;
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentDishes = filteredDishes.slice(indexOfFirstItem, indexOfLastItem);

      return (
        <View style={styles.container}>
          <RunningPanel style={styles.panel} images={panelImages} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Are you hungry......"
            onChangeText={this.handleSearchChange}
            value={this.state.searchKeyword}
          />
          <FlatList 
            data={currentDishes}
            renderItem={this.renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
          <Pagination 
            totalItems={filteredDishes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContainer: {
    padding: 10,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },
  panel: {
    width: '50%',
  },
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  currentPageButton: {
    backgroundColor: '#888',
  },
  pageButtonText: {
    color: '#fff',
  },
});

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <View style={styles.paginationContainer}>
      {pages.map(page => (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageButton,
            page === currentPage && styles.currentPageButton
          ]}
          onPress={() => onPageChange(page)}
        >
          <Text style={styles.pageButtonText}>{page}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default connect(mapStateToProps)(Menu);
