import { StyleSheet,StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE4',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop:20
  },
  note: {
    backgroundColor: '#FFF3B2',
    width: 100,
    height: 150,
    borderWidth: 1,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowColor: 'rgb(0, 0, 0)',
    paddingTop:10,
    paddingLeft:10,
    marginLeft:10,
    borderRadius:8,
    marginBottom:10
  },
  noteText:{
    fontSize:15,
    letterSpacing:1.5,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
  },
  board:{
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFBE4',
  },
  menu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:40,
    marginBottom:20
  },
  button_text: {
    fontSize:12,
    letterSpacing:2,
  },
  button_text_clicked: {
    fontSize:12,
    letterSpacing:2,
    fontWeight: '900'
  },
  modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  header:{
    fontSize:22,
  },
  paragraph:{
    fontSize:12,color:'gray'
  },
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
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
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
  settingButton:{
    backgroundColor:'#FFF3B2',
    borderWidth:1,
    borderRadius:20,
    width:300,
    padding:10,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
  },
  switchRow:{
    flexDirection: 'row',
    backgroundColor:'#FFF3B2',
    borderWidth:1,
    borderRadius:20,
    width:300,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:20,
    justifyContent:'center',
    padding:3,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
  },
  settingsActionText:{
    fontSize:12,
    paddingRight:10,
    letterSpacing:.5,
  },
  settingsText:{
    fontSize:12,
    letterSpacing:.5,
  },
  settingsTextInput:{
    alignSelf:'center',
    marginBottom:20,
    width:300,
    borderWidth:1,
    padding:3,
    borderRadius:5,
    padding:5
  },
  settingsMessage:{
    alignSelf:'center',
  },
  friendsHeaderRequest:{
    fontSize:20,
    fontWeight:'bold',
    letterSpacing:1,
    alignSelf:'center',
    borderWidth:2,
    borderRadius:3,
    padding:5,
    margin:10,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
  },
  friendsFriendsHeader:{
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center',
    marginTop:15
  },
  friendsTextInput:{
    alignSelf:'center',
    marginTop:10,
    width:300,
    borderWidth:1,
    padding:5,
    borderRadius:5,
  },
  friendsButton:{
    backgroundColor:'#FFF3B2',
    borderWidth:1,
    borderRadius:20,
    width:200,
    padding:10,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,

elevation: 1,
  },
  friendsMessage:{
    alignSelf:'center',
    marginTop:15
  },
  friendInList:{
    borderBottomWidth:1,
    paddingBottom:5
  },
  requestItem:{
    flexDirection: 'row',
    backgroundColor:'#FFF3B2',
    borderWidth:1,
    borderRadius:20,
    width:300,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:20,
    justifyContent:'center',
    padding:3,
  },
  createNoteButton:{
    backgroundColor:'#FFF3B2',
    borderWidth:1,
    borderRadius:20,
    width:100,
    padding:10,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:20,
    marginTop:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  createNoteButtonText:{
    fontWeight:'bold',
    fontSize:12,
    letterSpacing:.5,
  }
});
