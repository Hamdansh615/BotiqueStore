This is a React-Native Biolerplate

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: 

>**Note**: you can find multiple command scripts written in package.json file

First, you will need to install the dependencies

npm install 
# OR  
yarn install

# For ios add pods
cd ios 
pod install

## Step 2: Start your Application

npm run android
# OR 
yarn run android

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

**Update application name and bundle/package**

Now that you have successfully run the app, let's modify it, Remember package name cannot have a space or special character. Atlease I’ve never tried that.

So let’s change our app’s name and identifier.

We will use “react-native-rename” for this. Make sure you install it globally and not in your app. Thus, not making any difference to your app. (Installing node module globally means to install in your computer and not within the react native application)
Ref: https://www.npmjs.com/package/react-native-rename

$ npm install -g react-native-rename

$ react-native-rename “My App” -b com.org.myapp
Please replace “My App” with your desired app display name, and the same applies to the bundle identifier.

Please note: This will update the package and app name throughout the “/android/”, “/ios/” directories and in “/app.json” file.

Re-open terminal inside VSCode where react-native app is running.

Kill the process using “ctrl+c” and run again using
$ npm start --reset-cache

Once the app is running, run android app in another terminal using
$ npm run android or yarn run android

If you wish to verify the package name for android, then run following command in terminal:
$ adb shell pm list packages -f

**Voila!!! we have successfully renamed our react-native application for android & iOS.**

**Update application icon**

Choose/create an image for your mobile app icon.
Make sure image size is below 1024kb and you get a (512*512 px) image, preferably square shaped ‘.png’ file for crisp & clear icon.
