import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {SvgUri} from 'react-native-svg';
import {Color} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const ChannelListItem = ({channel}) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate('Details', {channel});
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={onPressHandler}>
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            {channel.logoUrl.includes('.svg') ? (
              <SvgUri
                width="100%"
                height="100%"
                uri={channel.logoUrl}
                // style={styles.itemImage}
              />
            ) : (
              <Image style={styles.itemImage} source={{uri: channel.logoUrl}} />
            )}
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{channel.name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ChannelListItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  item: {
    // flex: 1,
    flexDirection: 'row',
    // padding: 4,
    borderRadius: 6,
    backgroundColor: Color.white,
    width: '95%',
    maxWidth: '95%',
    height: 75,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: Color.grey4,
    shadowRadius: 6,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
  },
  imageContainer: {
    height: 70,
    width: 70,
    // borderTopLeftRadius: 6,
    // borderBottomLeftRadius: 6,
    overflow: 'hidden',
    padding: 6,
  },
  itemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  itemTextContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.blue4,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.65,
  },
});
