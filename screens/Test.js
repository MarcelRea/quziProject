import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView, Pressable, TouchableOpacity, route } from 'react-native'

function Test ({navigation, route}) {

    const {ajdi} = route.params

    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [name, setName] = useState([]);

    const getQuestions = async () => {
       try {
        const response = await fetch(`http://tgryl.pl/quiz/test/${ajdi}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          });
        const json = await response.json();
        setQuestions(json.tasks);
        setName(json)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      }

      useEffect(() => {
        getQuestions();
      }, []);

      const [currentQuestion, setCurrentQuestion] = useState(0)
      const [showScore, setShowScore] = useState(false)
      const [score, setScore] = useState(0)
      const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect === true) {
          setScore(score + 1);
        }

        const nextQuetions = currentQuestion + 1;

        if (nextQuetions < questions.length) {
          setCurrentQuestion(nextQuetions);
        }
        else {

         (async () => {
          const rawResponse = await fetch('https://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: 'Gracz1',
                score: score,
                total: questions.length,
                type: name.name
            })
          });
          const content = await rawResponse.json();

          })();


          setShowScore(true)
          navigation.navigate('Results',{
          paramKey: score,})
        }

      }
    if(questions.length === 0)
      return (<View><Text>Ładowanie</Text></View>);

    else
    return (
        <SafeAreaView style={[styles.container, {display: isLoading ? 'none' : 'flex'}]}>
            <View style={styles.numberQuestions}>
                <Text style={styles.textNumberQuestions}> Pytanie {currentQuestion + 1} na {questions.length} </Text>
            </View>
            <View style={styles.Questions}>
                <Text style={styles.textQuestions}> { questions[currentQuestion].question} </Text>
            </View>
            <View style={styles.Answer}>
                <Text style={styles.textQuestions}>
                    {questions[currentQuestion].answers.map((answerOptions, pos) =>  (
                    <View key={pos} style={styles.answerView}>
                    <Button color='gray' onPress={() => handleAnswerButtonClick(answerOptions.isCorrect)}
                    title={answerOptions.content} />
                    </View>
                ))} </Text>
                <Text style={styles.textLiczba}> Liczba zdobytych punktów: {score} </Text>
            </View>
        </SafeAreaView>
      );

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#8FBC8F',
  },
  numberQuestions: {
    backgroundColor:'#dc143c',
    margin:10,
    flex:0.1,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  textNumberQuestions: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Questions: {
    backgroundColor:'#b8860b',
    margin:10,
    marginLeft:22,
    flex:0.2,
    height:70,
    width:350,
    alignItems:'center',
    justifyContent:'center'
  },
  textQuestions: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Answer: {
    backgroundColor:'#b8860b',
    margin:10,
    marginLeft:30,
    flex:0.8,
    height:200,
    width:330,
    alignItems:'center',
    justifyContent:'center'

  },
  answerView:{
    width:250,
    height:80,
  },
  textLiczba:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  }
});

export default Test;
