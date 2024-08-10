import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Loading from './LoadingConponent';
import * as Animatable from 'react-native-animatable';
import { Card, Title, Paragraph } from 'react-native-paper';
import { baseUrl } from '../Shared/baseUrl';
import { Shadow } from 'react-native-shadow-2';
import Animated, { FadeIn } from 'react-native-reanimated';
// redux
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 10,
  },
  card: {
    borderWidth: 1, // Border width of 1px
    borderColor: '#dcdcdc', // Light gray border color
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures content doesn't overflow
  },
  cardCover: {
    height: 200, // Set a fixed height for the card cover image
  },
  cardContent: {
    padding: 10, // Add padding inside the card content
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8', // Light background color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      );
    } else if (this.props.errMess) {
      return <Text style={styles.errorMessage}>{this.props.errMess}</Text>;
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
            <View style={styles.cardWrapper}>
              <Card style={styles.card}>
                <Card.Cover source={{ uri: baseUrl + item.image }} style={styles.cardCover} />
                <Card.Content style={styles.cardContent}>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
              </Card>
            </View>
          
        );
      }
      return <View />;
    }
  }
}

class Home extends Component {
  render() {
    const dish = this.props.dishes.dishes.filter((dish) => dish.featured === true)[0];
    const promo = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const leader = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];

    return (
      <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} entering={FadeIn.duration(1000).delay(500)}>
          <RenderItem
            item={dish}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem
            item={promo}
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem
            item={leader}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
