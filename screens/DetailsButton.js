import * as React from 'react';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function GoToButton() {
  const navigation = useNavigation();

  return (
    <Button
      titleStyle={{
        fontSize: 12,
      }}
      type="clear"
      title='View'
      onPress={() => navigation.navigate('Details')}
    />
  );
}