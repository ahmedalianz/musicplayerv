import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  cancel: {
    fontSize: 15,
    color: '#fc3c44',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  slider: {
    height: 7,
    borderRadius: 16,
  },
  itemSeparator: {
    borderColor: '#9ca3af',
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  emptyContentText: {
    fontSize: 20,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContentImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
    opacity: 0.3,
  },
  flatLstBottom: {paddingBottom: 280},
  flexed: {flex: 1},
  mtAuto: {marginTop: 'auto'},
  w100: {width: '100%'},
});
export default styles;
