# Kitchen Kevin (Mobile App)

Hello dudes, it's Kevin. I'm gonna help you cook the dankest food.

Kitchen Kevin (Mobile App) helps you find recipe based on what ingredients you have.

---
## What to Install

#### XCode
Although this app uses React-Native, it does not use Expo to compile the code due to Expo not able to access the IOS folder that was required to run Google DialogFlow.
One must have XCode to compile this project on their local machine.


In order to run Kitchen Kevin after cloning:

```
npm install
npm run postinstall
sudo gem install cocoapods
npx pod-install
npm run ios
```

---
## Tips For Getting Started
#### Buttons
- **Microphone Button** - Pressing the microphone button allows the user to iniate the conversion with Kevin.
- **Mute Button** - The Mute button stops the conversation betweeen the user and Kevin.
- **Chat Button** - Interrupts Kevin while he is speaking in case the User just wants to read the transcript of what Kevin will/is saying.

#### Interaction
1. User tells Kevin the ingredients that they have.

2. Once Kevin returns a recipe back to the user, the user has the option to proceed with the recipe or look for another recipe based on those ingredients. To proceed with the recipe, the user should say "proceed". To find another recipe, the user should say "new recipe."

3. If the user is curious about how much of the a certain ingredients they need in a recipe, he/she should ask Kevin "how much of ___ do I need"

4. To go to the next step of the recipe, the user should say "next step".

5. Happy Cooking
