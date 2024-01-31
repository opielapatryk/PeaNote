import { StyleSheet,StatusBar,Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  flexone:{
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFDF3',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop:50
  },
  note: {
    backgroundColor: '#FFF5BD',
    width: Dimensions.get("window").width / 2.20,
    height: Dimensions.get("window").height / 5,
    shadowOffset: {
      height: .5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    margin: 8,
    borderRadius:5,
  },
  noteclicked:{
    width: Dimensions.get("window").width / 2.20,
    height: Dimensions.get("window").height / 5,
    shadowOffset: {
      height: .5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    margin: 8,
    borderRadius:5,
    flexDirection:'row',
    backgroundColor:'#DAD097',
  },
  noteText:{
    fontSize:15
  },
  noteTextHeader:{
    fontSize:20,
    fontWeight: 'bold',
    marginBottom:5
  },
  board:{
    flex: 1,
    backgroundColor: '#FFFDF3'
  },
  friendsboard:{
    flex: 1,
    backgroundColor: '#FFFDF3',
    justifyContent:"space-between",
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
    justifyContent:'space-around',
    shadowColor: "#000",
    backgroundColor: '#FFFDF3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  bottomView:{
    flexDirection:'row',
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor: 'lightgray',
    marginBottom:20
  },
  pressableInBottonViewLeftLogInOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    alignItems:'center',
    borderRightWidth: 1
  },
  pressableInBottonViewRightLogInOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderBottomColor:'#e6c019',
    shadowColor: "#e6c019",
    backgroundColor: '#FFFDF3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  pressableInBottonViewLeftCreateAccountOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderBottomColor:'#e6c019',
    shadowColor: "#e6c019",
    backgroundColor: '#FFFDF3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  pressableInBottonViewRightCreateAccountOn:{
    padding:10,
    borderColor: 'lightgray',
    width:150,
    marginTop:5,
    alignItems:'center',
    borderLeftWidth: 1
  },
  errorMessage:{
    color:'red'
  },
  containerboard: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  settingButton:{
    backgroundColor:'#FFF5BD',
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
    fontStyle:'italic',
    margin:10
  },
  friendsHeaderRequest:{
    backgroundColor:'#FFF',
    shadowOffset: {
      width: 0,
      height: .5,
    },
    shadowOpacity: 0.1,
    shadowRadius: .5,
    zIndex:1000,
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height / 18.4,
    justifyContent:'center'
  },

  friendsRequestList:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 18.4,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'space-around',
    padding:8,
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
    fontSize:17,
    fontWeight:'bold',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    letterSpacing:2,
    alignSelf:'center',
    paddingRight:10
  },
  friendsHeaderRequestText:{
    fontSize:17,
    fontWeight:'bold',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    letterSpacing:2,
    alignSelf:'center',
  },
  deleteAccountButton:{
    backgroundColor:'#FFF',
    shadowOffset: {
      width: 0,
      height: .5,
    },
    shadowOpacity: 0.1,
    shadowRadius: .5,
    zIndex:1000,
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height / 12.4,
    justifyContent:'center',
    paddingBottom:Dimensions.get("window").height / 100,
  },
  removeFriendButton:{
    backgroundColor:'#FFF',
    shadowOffset: {
      width: 0,
      height: .5,
    },
    shadowOpacity: 0.1,
    shadowRadius: .5,
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height / 20,
    justifyContent:'center'
  },

  deleteAccountText:{
    fontSize:17,
    fontWeight:'bold',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    letterSpacing:2,
    alignSelf:'center',
  },
  switchRow:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 18.4,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },

  removeFriendText:{
    fontSize:17,
    fontWeight:'bold',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    letterSpacing:1,
    alignSelf:'center'
  },
  friendsFriendsHeader:{
    fontSize:20,
    fontWeight:"bold",
    alignSelf:'center',
    marginTop:15,
    marginBottom:15
  },
  friendsTextInput:{
    fontSize:17,
    backgroundColor:'#FFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height / 18.6,
    textAlign:'center',
    letterSpacing:.5,
    fontWeight:'bold',
    paddingTop:10
  },
  friendsMessage:{
    alignSelf:'center',
    marginTop:15,
    fontStyle:'italic',
  },
  friendInList:{
    padding:10,
    marginLeft:10,
  },
  requestItem:{
    flexDirection: 'row',
    width:300,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:10,
    padding:10,
    shadowColor: "#000",
    backgroundColor: '#FFFDF3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    justifyContent:'space-around',
    borderBottomWidth:1
  },
  createNoteButton:{
    backgroundColor:'#FFF5BD',
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
  },
  renderFriends:{
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFDF3',
  },
  emptyBoardText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    marginTop:Dimensions.get('window').height / 10,
    opacity: .5,
    letterSpacing:.5
  },
  modalPasswordResetView:{    
    flex: 1,
    justifyContent: 'center',
    marginTop: 22
  },
  modalPasswordResetViewChild:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalPasswordResetHeader:{
    fontWeight:'bold',
    fontSize:20,
    marginBottom:10
  },
  modalPasswordResetParagraph:{
    marginBottom:10
  },
  modalPasswordResetTextInput:{
    borderWidth:1,
    padding:10,
    borderColor:'lightgray',
    borderRadius:5,
    marginBottom:25
  },
  modalPasswordResetButtonNext:{
    backgroundColor:'black',
    padding:10,
    width:100,
    borderRadius:10,
  },
  modalPasswordResetButtonNextText:{
    color:'white',
    textAlign:'center',
    fontWeight:'bold',
    letterSpacing:1
  },
  modalPasswordResetButtonBack:{
    padding:10,
    width:100,
    borderRadius:10,
    borderWidth:1
  },
  modalPasswordResetButtonBackText:{
    textAlign:'center',
    fontWeight:'bold',
    letterSpacing:1
  },
  noteIsInfoTrueLeftButton:{
    height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 20
  },
  noteIsInfoTrueRightButton:{
    height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 25
  },
  noteIsInfoTrueButtonsText:{
    fontWeight:'bold',
    fontSize:20
  },
  notesIsInfoVerticalLine:{
    height:Dimensions.get("window").height / 8,borderLeftWidth:1,alignSelf:'center'
  },
});
