import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import CreateAccountFooter from '../CreateAccountFooter';
import store from '../../../../../store/store'; 
import { SafeAreaProvider} from 'react-native-safe-area-context';

test('Create account footer renders correctly.', () => {

  const tree = renderer.create(
    <Provider store={store}>
      <SafeAreaProvider>
      <CreateAccountFooter />

      </SafeAreaProvider>
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
