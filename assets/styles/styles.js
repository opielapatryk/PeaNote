import { StyleSheet,StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
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
    flex: 1,
    paddingBottom: 10,
  },
  menu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:40,
    marginBottom:20
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
  },
  header:{
    fontSize:22,
  },
  paragraph:{fontSize:12,color:'gray'},
  roundTextInput:{
    borderRadius:20,
    borderWidth: 1,
    padding:10,
    borderColor: 'lightgrey',
    width:250,
    marginTop:5,
    marginBottom:5
  },
  confirmButton:{
    backgroundColor:'#fff2ba',
    borderRadius:20,
    borderWidth: 1,
    padding:10,
    borderColor: '#e6c019',
    width:200,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
  },
  continuteWithGoogle:{
    borderRadius:20,
    borderWidth: 1,
    padding:10,
    borderColor: 'lightgray',
    width:200,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  bottomView:{
    flexDirection:'row',
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor: 'lightgray',
  },
  pressableInBottonViewLeftLogInOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
    borderRightWidth: 1,
  },
  pressableInBottonViewRightLogInOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderBottomColor:'#e6c019'
  },
  pressableInBottonViewLeftCreateAccountOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderBottomColor:'#e6c019',
  },
  pressableInBottonViewRightCreateAccountOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    marginBottom:5,
    alignItems:'center',
    borderLeftWidth: 1,
  },
  errorMessage:{
    color:'red'
  },
  containerboard: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
