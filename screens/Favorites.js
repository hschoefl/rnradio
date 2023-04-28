import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ChannelList from '../components/ChannelList';
const Favorites = () => {
  const {favoriteChannels} = useSelector(state => state.channel);

  if (!favoriteChannels || favoriteChannels.length === 0) {
    return (
      <View style={styles.noFavorites}>
        <Text style={styles.text}>
          Du hast noch keine Favoriten hinzugefügt.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <ChannelList channels={favoriteChannels} />
    </View>
  );
};
export default Favorites;
const styles = StyleSheet.create({
  noFavorites: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
});
