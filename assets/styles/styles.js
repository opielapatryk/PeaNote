import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    backgroundColor: 'rgba(226, 216, 124, 1)',
    width: 100,
    height: 150,
    borderWidth: 1,
    shadowOffset: {
      width: -6,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: 'rgb(0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
  },
  button: {
    marginLeft:10,
    backgroundColor: 'red',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowOffset: {
      width: -6,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: 'rgb(0, 0, 0)'
  },
  board:{
    height: 1000,
    paddingBottom:250
  },
  menu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button_two_text: {
    color:'rgb(0,122,255)',
  },
  modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  switchRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginTop:5
  },
  settingsActionText:{
    color:'rgb(0,122,255)',
    fontSize:18,
    paddingRight:15,
  }
});
