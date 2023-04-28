import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ChannelListItem from './ChannelListItem';

const ChannelList = ({channels}) => {
  const renderItem = useCallback(
    ({item}) => <ChannelListItem channel={item} />,
    [],
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={channels}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};
export default ChannelList;
const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    width: '100%',
    // alignItems: 'center',
  },
});
