/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {currencyByRupee} from './constants';
import CurrencyButton from './components/CurrencyButton.component';
import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  //States
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState<Currency | null>(null);

  // Helper methods
  function validateInputAmount(inputAmount: number): boolean {
    if (isNaN(inputAmount)) {
      Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4b2ec',
        textColor: '#000000',
      });
      return false;
    }
    return true;
  }

  //Handlers
  const buttonPressHandler = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    setTargetCurrency(targetValue);
  };

  useEffect(
    function (): void {
      if (targetCurrency) {
        if (!targetCurrency) {
          return;
        }
        const inputAmount = parseFloat(inputValue);
        if (!validateInputAmount(inputAmount)) {
          return;
        }
        const convertedValue = inputAmount * targetCurrency.value;
        const result = `${targetCurrency.symbol} ${convertedValue.toFixed(2)}`;
        setResultValue(result);
      }
    },
    [inputValue, targetCurrency],
  );

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter Value to convert"
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency?.name === item.name && styles.selected,
                ]}
                onPress={() => buttonPressHandler(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
