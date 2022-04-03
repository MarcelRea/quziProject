import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import WelcomeScreen from './Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home ({navigation}) {
    AsyncStorage.clear();

    const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);

            const getDescription = async () => {


                 try {
                  const response = await fetch('https://tgryl.pl/quiz/tests', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                  });
                  const json = await response.json();
                  setData(json);
                } catch (error) {
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }

              useEffect(() => {
                getDescription();
              }, []);


              const renderAjdiItem = ({ item }) => {
                    return(
                        <ScrollView style={styles.scrollView}>
                                    <View style={styles.border}>
                                        <Button title={item.name}
                                         onPress = {({})=> navigation.navigate('Test #1', {
                                            ajdi:item.id,
                                            })
                                            }/>
                                         <Text style={styles.text}>
                                            {item.description}
                                         </Text>
                                        <Text style={styles.text}>
                                            Poziom Trudności: {item.level}
                                        </Text>
                                         <Button color="gray" title='Check!'
                                         onPress = {()=> navigation.navigate('Results')} />
                                    </View>
                                    </ScrollView>
                    )
              }
    return (
        <View style={styles.container}>
        <WelcomeScreen pagekey={"uniquekey"} title={"Regulamin"} description={"I. POSTANOWIENIA OGÓLNE: APLIKACJA mobilna o nazwie QUIZ dostępna w systemie Android.                                                                    2.REGULAMIN OGÓLNY:                           Niniejszy Regulamin świadczenia Usług drogą elektroniczną przez Usługodawcę za pośrednictwem Aplikacji.                                   3.QUIZ POSTANOWIENIA OGÓLNE:    Funkcjonalność Aplikacji polegająca na umożliwieniu Użytkownikom uczestnictwa w grze polegającej na wyborze prawidłowych odpowiedzi na wprowadzone do Aplikacji przez Usługodawcę lub innych Użytkowników pytania i zbieraniu punktów w celu osiągnięcia jak najwyższej pozycji w rankingu Użytkowników.                                        4.RODO POSTANOWIENIA OGÓLNE:      Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE."}
                />
                <FlatList
                data={data}
                renderItem={renderAjdiItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    border: {
        flex: 1,
        borderWidth: 2,
        marginTop:20,
        marginBottom:20,
    },
    text:{
        margin:10,
        textAlign: 'center',
        color:'black'
    },
     scrollView: {
        marginHorizontal: 20,
     },
})

export default Home;