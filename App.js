import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, push, ref, onValue} from 'firebase/database';

export default function App() {
  const [product, onChangeProduct] = React.useState('');
  const [amount, onChangeAmount] = React.useState('');
  const [shoppingList, setShoppingList] = React.useState([]);

  const firebaseConfig = {
    apiKey: 'AIzaSyAnXwM-5jX8ncpT_jlyRB9yVlPiUukWkQU',
    authDomain: 'shopping-list-firebase-be8f8.firebaseapp.com',
    databaseURL:
      'https://shopping-list-firebase-be8f8-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'shopping-list-firebase-be8f8',
    storageBucket: 'shopping-list-firebase-be8f8.appspot.com',
    messagingSenderId: '138470226404',
    appId: '1:138470226404:web:a3c1f406c308a9663e6ff1',
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  React.useEffect(() => {
    const shoppinglistRef = ref(database, 'shoppinglist/');
    onValue(shoppinglistRef, snapshot => {
      const data = snapshot.val();
      setShoppingList(Object.values(data));
    });
  }, []);

  const add = () => {
    push(ref(database, 'shoppinglist/'), {product: product, amount: amount});
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.list}>
        <Text style={{color: 'black', paddingRight: 10}}>
          {item.product}, {item.amount}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '35%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextInput
          onChangeText={onChangeProduct}
          value={product}
          style={styles.input}
          placeholder="Product"
        />
        <TextInput
          onChangeText={onChangeAmount}
          value={amount}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Amount"
        />

        <View style={{flexDirection: 'row'}}>
          <Button title="SAVE" onPress={add} />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        >
          Shopping List
        </Text>
        <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: 120,
    height: 40,
    borderColor: '#dddddd',
    backgroundColor: '#eeeeee',
  },
  list: {
    flexDirection: 'row',
  },
});
