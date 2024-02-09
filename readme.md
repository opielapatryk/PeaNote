### PeaNote is a user-friendly application designed to streamline the process of leaving and sharing notes with friends, providing a centralized space for collecting important information. Whether it's a quick reminder, a to-do list, or a shared idea, PeaNote ensures that all your notes are conveniently stored in one accessible place. </br> You should setup your own firebase config.


# Useful commands
## Clone
npm install</br>

## Run
Device: npx expo start --dev-client

## Test
npm test
Overwrite snapshots: npm test -- -u

## Build
Device: eas build --profile development --platform ios
Simulator: eas build --profile development-simulator --platform ios

## Update build app store
eas build --platform ios
eas submit -p ios --latest

## Small update to app store
eas update
