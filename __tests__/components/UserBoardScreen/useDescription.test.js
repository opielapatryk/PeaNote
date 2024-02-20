import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useDescription } from "../../../src/screens/auth/UserBoardScreen/components/useDescription";
import { getDescription } from "../../../src/screens/auth/UserBoardScreen/functions/getDescription";

jest.mock('@react-navigation/native', () => ({   ...jest.requireActual('@react-navigation/native'),   useFocusEffect: jest.fn().mockImplementation((func) => func()), }));

jest.mock('../../../src/screens/auth/UserBoardScreen/functions/getDescription.js', () => ({
    getDescription: jest.fn(),
  }));

describe('useDescription hook', () => {
    it('should fetch and set the description on focus effect', async () => {
        const friendEmail = 'test@example.com';
        const mockDescription = 'Mocked description';
    
        // Set up the getDescription mock to resolve with the mockDescription
        getDescription.mockResolvedValue(mockDescription);
    
        // Render the hook
        const { result } = renderHook(() => useDescription(friendEmail));
    
        // Ensure that the initial state is an empty string
        expect(result.current).toBe('');
    
        // Simulate focus effect
        await act(async () => {
          result.current; // This will trigger the useFocusEffect
        });
    
        // Now, the description state should be set to the mockDescription
        expect(result.current).toBe(mockDescription);
    });
});