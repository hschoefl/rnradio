import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {setAllChannels} from '../features/channelSlice';
import ChannelList from '../components/ChannelList';
import {Color} from '../constants/Colors';

// const RADIO_URL = 'https://sdsevocdn.xploretv.at/metadata/radio/endava.json';
const RADIO_URL = 'http://localhost:5002/api/v2/channels';

const AllChannels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const {allChannels} = useSelector(state => state.channel);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(RADIO_URL);
        const data = await response.json();
        dispatch(setAllChannels(data));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, [dispatch]);

  const onChangeHandler = enteredValue => {
    setSearchTerm(enteredValue);
  };

  if (isLoading && allChannels.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nach Radiosender suchen..."
        value={searchTerm}
        onChangeText={onChangeHandler}
      />
      <ChannelList
        channels={allChannels.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
        )}
      />
    </View>
  );
};

export default AllChannels;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: Color.white,
    color: Color.grey5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Color.grey5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
});
