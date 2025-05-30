import {Styles} from '@/constants';
import {TracksListProps, TrackV} from '@/types/TracksList.types';
import React, {memo, useCallback, useRef} from 'react';
import {FlatList, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import {
  ItemSeparatorComponent,
  ListEmptySongsComponent,
  ListHeaderComponent,
  QueueControls,
} from './TrackListComponents';
import TrackListItem from './TrackListItem';
import {useQueue, useQueueActions} from '@/store/selectors';
const TracksList = ({
  id,
  searchQuery,
  setSearchQuery,
  tracks,
  hideQueueControls = false,
  title,
  headerCustomStyle,
  AdditionalListHeader,
}: TracksListProps) => {
  const ITEM_HEIGHT = 50;
  const queueOffset = useRef(0);
  const activeQueueId = useQueue();
  const {setActiveQueueId} = useQueueActions();
  const onTrackSelect = useCallback(
    async (track: TrackV) => {
      const isChangingQueue = activeQueueId !== id;
      const trackIndex = tracks.findIndex(t => t.url === track.url);

      if (isChangingQueue) {
        const beforeTracks = tracks.slice(0, trackIndex);
        const afterTracks = tracks.slice(trackIndex + 1);
        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.add(afterTracks);
        await TrackPlayer.add(beforeTracks);
        await TrackPlayer.play();
        setActiveQueueId(id);
        queueOffset.current = trackIndex;
      } else {
        const nextTrackIndex =
          trackIndex - queueOffset.current < 0
            ? tracks.length + trackIndex - queueOffset.current
            : trackIndex - queueOffset.current;
        await TrackPlayer.skip(nextTrackIndex);
        await TrackPlayer.play();
      }
    },
    [activeQueueId, id, setActiveQueueId, tracks],
  );

  const renderItem = useCallback(
    ({item}: {item: any}) => (
      <TrackListItem track={item} onTrackSelect={onTrackSelect} />
    ),
    [onTrackSelect],
  );

  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View>
      <ListHeaderComponent
        {...{scrollY, searchQuery, setSearchQuery, headerCustomStyle}}
        title={title}
      />
      {AdditionalListHeader && <AdditionalListHeader />}
      <Animated.FlatList
        ref={flatListRef}
        data={tracks}
        renderItem={renderItem}
        ListHeaderComponent={
          !hideQueueControls ? (
            <QueueControls tracks={tracks} style={{paddingBottom: 20}} />
          ) : undefined
        }
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptySongsComponent}
        keyExtractor={item => item.id}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={Styles.flatLstBottom}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(TracksList);
