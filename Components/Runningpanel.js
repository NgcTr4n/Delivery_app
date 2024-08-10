import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';

const RunningPanel = ({ images }) => {
  const screenWidth = Dimensions.get('window').width;
  const imagesWidth = useRef(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimation = () => {
      Animated.timing(animatedValue, {
        toValue: -imagesWidth.current,
        duration: images.length * 1000, // Điều chỉnh tốc độ ở đây
        useNativeDriver: true,
      }).start(() => {
        animatedValue.setValue(0);
        runAnimation();
      });
    };

    runAnimation();
  }, []);

  return (
    <View style={{ height: 100, overflow: 'hidden' }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: animatedValue }],
        }}
        onLayout={(event) => {
          imagesWidth.current = event.nativeEvent.layout.width;
        }}
      >
        {images.concat(images).map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: screenWidth, height: 100, resizeMode: 'cover' }}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default RunningPanel;