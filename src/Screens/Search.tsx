
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Button } from "react-native";

function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 150 : 0,
      useNativeDriver: true,
    }).start();
  }, [animation, enabled]);

  return (
    <Animated.View  style={{ transform: [{translateY: animation}] , width: 500, backgroundColor:'yellow'}}>
      <View
        style={
          styles.rectangle}
        onTouchEnd={() => { setEnabled(!enabled) }}></View>
      
    </Animated.View>
  );
}

function Search() {
  return (
    <View style={styles.block}>
      <SlideLeftAndRight />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {},
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
})

export default Search;