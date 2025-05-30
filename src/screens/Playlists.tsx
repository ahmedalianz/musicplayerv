import {PlaylistListItem} from '@/components';
import {
  ItemSeparatorComponent,
  ListEmptyPlaylistComponent,
  ListHeaderComponent,
} from '@/components/TrackListComponents';
import {Styles} from '@/constants';
import {usePlaylists} from '@/store/selectors';
import {Playlist} from '@/types/TracksList.types';
import {playlistNameFilter} from '@/utils/filters';
import React, {useMemo, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const Playlists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const playlists = usePlaylists();
  const ITEM_HEIGHT = 50;

  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(searchQuery));
  }, [playlists, searchQuery]);
  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={Styles.container}>
      <ListHeaderComponent
        {...{scrollY, searchQuery, setSearchQuery}}
        title={'Artists'}
      />
      <Animated.FlatList
        skipEnteringExitingAnimations
        ref={flatListRef}
        keyExtractor={(item: Playlist) => item.name}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={[Styles.flatLstBottom, {paddingHorizontal: 12}]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyPlaylistComponent}
        data={filteredPlaylists}
        renderItem={({item: playlist}) => <PlaylistListItem {...{playlist}} />}
      />
    </View>
  );
};

export default Playlists;
