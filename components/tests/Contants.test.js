import renderer from 'react-test-renderer';
import React from 'react'
import {userLink,usersLink,stickerLink,stickersLink} from '../Constants'

describe('Testing constants', () => {
    test('should return url string with user id equal 1', () => { 
        const userURL = userLink(1)
        expect(userURL).toBe(`http://localhost:8000/api/users/1/`)
     })

     test('should return users url', () => { 
        const usersURL = usersLink()
        expect(usersURL).toBe(`http://localhost:8000/api/users/`)
     })

     test('should return sticker url string with sticker id equal 1', () => { 
        const stickerURL = stickerLink(1)
        expect(stickerURL).toBe(`http://localhost:8000/api/stickers/1/`)
     })

     test('should return stickers url', () => { 
        const stickersURL = stickersLink()
        expect(stickersURL).toBe(`http://localhost:8000/api/stickers/`)
     })
});
