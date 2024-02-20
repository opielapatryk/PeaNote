import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';  
import store from '../../src/store/store'; 
import { SafeAreaProvider} from 'react-native-safe-area-context';
import UserBoard from '../../src/screens/auth/UserBoardScreen/components/UserBoard';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react-native';


const friendEmail = jest.fn(()=>'joe@doe.com');
const name = jest.fn(()=>'Joe')

const mockState = {
  settings: {
    friendimage: 'https://example.com/profile.jpg',
  },
  login: {
    message: 'Test message',
    reduxdescription: 'Test description',
  },
};


jest.mock('react-redux')


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
    signIn: jest.fn(),
}));


jest.mock('@invertase/react-native-apple-authentication', () => ({
  AppleButton: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => {
  const originalModule = jest.requireActual('@react-native-firebase/firestore');

  const users = [
    { email: 'joe@doe.com',description:'joe@doe.com description',username:'justjoe' },
    { email: 'john@example.com',description:'john@example.com description',username:'justjohn'},
  ];

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: jest.fn((field, operator, value) => ({
          get: jest.fn(() => ({ 
            empty: !users.some(user => user.email === value),
            docs: users.filter(user => user.email === value).map(user => ({
                data: jest.fn(() => ({
                  description: user.description,
                })),
            })),
         })),
        })),
      })),
    })),
  };
});

beforeEach(() => {
  useSelector.mockImplementation((selector) => selector(mockState));
});

// it('renders components correctly', async () => {
//   const { getByText, getByTestId } = render(<UserBoard route={{ params: {} }} />);
  
//   await waitFor(() => {
//     expect(getByText('Test description')).toBeTruthy();
//     expect(getByTestId('profile-image')).toBeTruthy();
//     expect(getByText('Test message')).toBeTruthy();
//   });

// });

// it('fetches and displays user description', async () => {
//   getDescription.mockResolvedValue('Fetched description');

//   const { getByText } = render(<UserBoard route={{ params: { friendEmail: 'test@example.com' } }} />);
  
//   await waitFor(() => {
//     expect(getByText('Fetched description')).toBeTruthy()
//     expect(getByText('Test description')).toBeTruthy()
//   });
// });


// const { friendEmail,name,oldnickname} = route.params;
// const { message,reduxdescription } = useSelector((state) => state.login);
// const [description, newDescription] = useState(reduxdescription);
// expect(getDescription(friendEmail)).toHaveBeenCalled()
// expect(description).toBe('users[0].description')

// jest.mock('../../src/screens/auth/UserBoardScreen/functions/getDescription',()=>({
//   getDescription: jest.fn()
// }));

import { getDescription } from '../../src/screens/auth/UserBoardScreen/functions/getDescription';

it('UserBoard screen renders correctly.', async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <SafeAreaProvider>
        <UserBoard/>
      </SafeAreaProvider>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();

  const getDescriptionSpy = require('../../src/screens/auth/UserBoardScreen/functions/getDescription')

  const spy = jest.spyOn(getDescriptionSpy, 'getDescription')

  await getDescription('joe@doe.com')

  expect(spy).toHaveBeenCalled();
});

it('renders props correctly',()=>{
  const mockedParams = {
    route: {params:{friendEmail: 'friend@doe.com', name:'Joe', oldnickname:''}},
    navigation: ''
  }
  const component = render(<UserBoard {...mockedParams}/>).toJSON()
  console.log(component);
})