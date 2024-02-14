import React from 'react';
import renderer from 'react-test-renderer';
import ResetPasswordModal from '../../../src/screens/login/components/ResetPasswordModal';

test('LoginWithApple button renders correctly.', () => {
    const tree = renderer.create(<ResetPasswordModal/>).toJSON();
    
    expect(tree).toMatchSnapshot();
});