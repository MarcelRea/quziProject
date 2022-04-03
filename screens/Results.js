import React, { useEffect, useState }  from 'react';
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet, StatusBar, RefreshControl } from 'react-native';



const Results = ({navigation, route}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getResults = async () => {


         try {
          const response = await fetch('https://tgryl.pl/quiz/results', {
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
        getResults();
      }, []);

   const wait = (timeout) => {
   return new Promise(resolve => setTimeout(resolve, timeout));
   }

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
        <Text style={styles.text}>Nick   Score  Total  Type            Date</Text>
            <FlatList
              data={data}
              refreshControl={
              <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              />
              }
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text2}>{item.nick}           {item.score}          {item.total}      {item.type}   {item.createdOn}</Text>
              </View>
              )}
            />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: -20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
  },
  text:{
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    fontSize: 14,
  },
  text2:{
    display: 'flex',
    justifyContent: 'space-around',
    fontSize:12,
    alignSelf:'stretch'
  }
});

export default Results;