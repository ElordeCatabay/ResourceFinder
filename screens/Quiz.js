import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { englishData } from '../src/EnglishQuestions'
import { FlatList } from 'react-native'
import QuestionItem from './QuestionItem'
import { TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import { Modal } from 'react-native'
const { height, width } = Dimensions.get('window')
export default function Quiz () {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [questions, setQuestions] = useState(englishData)
  const listRef = useRef()
  const [modalVisible,setModalVisible]=useState(false)
  const OnSelectOption = (index, x) => {
    const tempData = questions
    tempData.map((item, ind) => {
      if (index == ind) {
        if(item.marked!==-1){
     item.marked = -1;
        }else{
        item.marked = x;
        }
      }
    })
    let temp = []
    tempData.map(item => {
      temp.push(item)
    })
    setQuestions(temp)
  };
  const getTextScore=()=>{
    let marks=0;
    questions.map(item=>{
      if (item.marked!==-1){
        marks=marks+5;
      };
    });
    return marks;
  };
  const reset=()=>{
const tempData = questions
tempData.map((item, ind) => {
    item.marked = -1;
});
let temp = []
tempData.map(item => {
  temp.push(item)
})
setQuestions(temp)

  }
  return (
    <View style={{ flex: 1 }}>
     <View 
     style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:20,}}>
     <Text
  style={{
    fontSize: 20,
    fontWeight: '600',
    marginTop: 40,
    marginLeft: 40,
    color: '#000'
  }}>
  English Questions :{'' + currentIndex + '/' + englishData.length}
</Text>
<Text style={{marginRight:20,fontSize:20,fontWeight:'600',color:'red',marginLeft:40,marginTop:40}} 
 onPress={()=>{
  reset();
  listRef.current.scrollToIndex({animated:true,index:0});
 }}>
Reset</Text>
</View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1
            setCurrentIndex(x.toFixed(0))
          }}
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x)
                }}
              />
            )
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex >1?'purple':'gray',
            marginBottom: 60,
            height: 60,
            width: 120,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            console.log(currentIndex) - 1
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                anumated: true,
                index: parseInt(currentIndex) - 2
              })
            }
          }}
        >
          <Text style={{ color: '#fff' }}>Previous</Text>
        </TouchableOpacity>
        {currentIndex == 8 ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              marginBottom: 60,
              height: 60,
              width: 120,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              marginBottom: 60,
              height: 60,
              width: 120,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              console.log(currentIndex)
              if(questions[currentIndex-1].marked!==-1){
          if (currentIndex < questions.length) {
                listRef.current.scrollToIndex({
                  anumated: true,
                  index: currentIndex
                });
              }
              }
             
            }}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
  animationType='slide'
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={{flex:1,backgroundColor:'rgba(0,0,0,.5)',justifyContent:'center',alignItems:'center',}}>
   <View style={{flex:1,backgroundColor:'#fff',width:'90%',borderRadius:20,marginTop:250,marginBottom:250}}>
<Text style={{fontSize:30,fontWeight:'800',alignSelf:'center',marginTop:20,}}>Text Score</Text>
<Text style={{fontSize:100,fontWeight:'800',alignSelf:'center',marginTop:20,color:'green'}}>{getTextScore()}</Text>
<TouchableOpacity style={{alignItems:'center',height:40,padding:10,borderWidth:1,borderRadius:10,marginTop:20,marginBottom:20}}
onPress={()=>{
  setModalVisible(!modalVisible);
}}>
  <Text>Close</Text>
</TouchableOpacity>
   </View>
  </View>
</Modal>
    </View>
  )
}
