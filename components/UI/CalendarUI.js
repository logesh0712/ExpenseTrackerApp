import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarUI()
{
    return (
        <SafeAreaView style={styles.container}>
          <Calendar />
        </SafeAreaView>
      ); 
}

export default CalendarUI;

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: 'center',
      margin: 10,
      padding: 10
    },
  });