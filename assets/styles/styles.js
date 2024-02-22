import { StyleSheet,StatusBar,Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF3',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  note: {
    backgroundColor: '#f9e889',
    width: Dimensions.get("window").width / 2.20,
    height: Dimensions.get("window").height / 5,
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
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
    backgroundColor:'#d7c667',
  },
  noteText:{
    fontSize:15
  },
  noteTextHeader:{
    fontSize:16,
    fontWeight: '600',
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
  modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  paragraph:{
    fontSize:12,color:'gray',fontWeight:'700',
  },
  roundTextInput:{
    borderRadius:5,
    borderWidth: 1.3,
    padding:10,
    borderColor: 'lightgrey',
    width:Dimensions.get('window').width/1.5,
    marginTop:5,
    marginBottom:5,
    backgroundColor:'white',
    height:Dimensions.get('window').height /20,
  },
  confirmButton:{
    height:Dimensions.get('window').height /20,
    backgroundColor:'#c99c1f',
    borderRadius:5,
    borderWidth: 1,
    padding:10,
    borderColor: '#c99c1f',
    width:Dimensions.get('window').width/1.5,
    alignItems:'center',
    justifyContent:'center',
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
    height:Dimensions.get('window').height /20,
    borderRadius:5,
    borderWidth: 1,
    paddingLeft:10,
    borderColor: 'lightgray',
    width:Dimensions.get('window').width/1.5,
    alignItems:'center',
    flexDirection:'row',
    shadowColor: "#000",
    backgroundColor: '#FFFDF3',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    justifyContent:'center'
  },
  bottomView:{
    flexDirection:'row',
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderColor: 'lightgray',
    marginBottom:10
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
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomColor:'#c99c1f',
    shadowColor: "#c99c1f",
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
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomColor:'#c99c1f',
    shadowColor: "#c99c1f",
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
    color:'red',
    fontSize:13
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
    justifyContent:'center',
    borderBottomWidth:.2,borderBottomColor:'lightgrey',
  },
  ProfilePic:
    {width:Dimensions.get('window').height/5,height:Dimensions.get('window').height/5,borderRadius:100,resizeMode:'stretch',borderWidth:.3,borderColor:'gray',backgroundColor:'white'}
  ,
  ProfilePicParent:
    {alignItems:'center',backgroundColor:'white',shadowColor: 'black',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.3,width:Dimensions.get('window').height/5,height:Dimensions.get('window').height/5,borderRadius:100,backgroundColor:'white',marginTop:Dimensions.get('window').height/40,marginBottom:Dimensions.get('window').height/40}
  ,
  ProfilePicGrandparent:{
    alignItems:'center',backgroundColor:'white'
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
  noteHistoryList:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 18.4,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    alignSelf:'center',
    alignItems:'center',
    paddingLeft:20,
    borderBottomWidth:.2,
    borderBottomColor:'lightgray'
  },
  settingsActionText:{
    fontSize:14,
    fontWeight:'600',
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
  removeFriendText:{
    fontSize:14,
    fontWeight:'600',
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
  friendsHeaderRequestText:{
    fontSize:17,
    fontWeight:'600',
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
  addFriendButton:{
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
    borderTopWidth:.17,borderColor:'lightgrey', marginTop:30,padding:10
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
    borderBottomWidth:.2,borderBottomColor:'lightgrey',
  },
  friendsTextInput:{
    fontSize:14,
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
    fontWeight:'600',
    borderBottomWidth:1,
    borderBottomColor:'lightgrey',
  },
  friendsList:{
    backgroundColor:'#FFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    width: Dimensions.get("window").width,
    height:Dimensions.get("window").height / 18.6,
    justifyContent: 'center',
    paddingLeft:Dimensions.get("window").width / 20,
  },
  firendListText:{
    fontSize:12,
    letterSpacing:1.5,
  },
  emptyBoardText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'600',
    marginTop:Dimensions.get('window').height / 10,
    opacity: .5,
    letterSpacing:.5
  },
  modalPasswordResetView:{    
    flex: 1,
    justifyContent: 'center',
    marginTop: 22
  },
  modalSetPassword:{
    backgroundColor:'white',
    height:Dimensions.get('window').height,
    justifyContent:'center'
  },
  modalSetPasswordChild:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    fontWeight:'600',
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
    borderRadius:5,
  },
  modalPasswordResetButtonNextText:{
    color:'white',
    textAlign:'center',
    fontWeight:'600',
    letterSpacing:1
  },
  modalPasswordResetButtonBack:{
    padding:10,
    width:100,
    borderRadius:5,
    borderWidth:1
  },
  modalPasswordResetButtonBackText:{
    textAlign:'center',
    fontWeight:'600',
    letterSpacing:1
  },
  noteIsInfoTrueLeftButton:{
    height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 20
  },
  noteIsInfoTrueRightButton:{
    height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 25
  },
  noteIsInfoTrueButtonsText:{
    fontWeight:'600',
    fontSize:20
  },
  notesIsInfoVerticalLine:{
    height:Dimensions.get("window").height / 8,borderLeftWidth:1,alignSelf:'center'
  },
  editNote:{
    backgroundColor:'black',
    padding:10,
    width:100,
    borderRadius:5,
    alignItems:'center',
    
  },
  editNoteText:{
    color:'white',
    fontWeight:'600',
    letterSpacing:.5
  },
  editNoteBackText:{
    fontWeight:'600',
    letterSpacing:.5
  },
  editNoteBack:{
    padding:10,
    width:100,
    borderRadius:5,
    borderWidth:1,
    alignItems:'center'
  },
  tabBarIndicatorStyle:{backgroundColor:'#c99c1f',top:0},
  tabBarLabelStyle:{letterSpacing:.5, fontSize:13},
  tabBarStyle:{borderTopWidth:.17,borderTopColor:'lightgray'},
  createAccountBodyContainer:{gap:Dimensions.get('window').height/50,alignItems:'center'},
  createAccountBodyHeader:{fontSize:20,fontWeight:'600',letterSpacing:.5},
  createAccountBodyParagraph:{letterSpacing:.5,fontSize:13},
  appleButton:{
    width:Dimensions.get('window').width/1.5,
    height: 45,
  },
  logo:{width:Dimensions.get('window').width/1.2,height:Dimensions.get('window').height/4,marginTop:Dimensions.get('window').height/50},
  leftActions:{backgroundColor:'green',justifyContent:'center',width:Dimensions.get('window').width,paddingLeft:16},
  rightAction:{backgroundColor:'red',justifyContent:'center',width:Dimensions.get('window').width,alignItems:'flex-end',paddingRight:16},
});