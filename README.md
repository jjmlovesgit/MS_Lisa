## Microsoft Lisa - Text to speech Avatar

Note:  Consider the Microsoft relese notes and repo for more complete explanation and helpful supportign links
https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/azure-ai-speech-announces-public-preview-of-text-to-speech/ba-p/3981448


## Initial Setup:
* (install express) open a terminal in the folder:
* run this: npm install express
* run this: npm install openai

Input you OpenAI API key in the congig.json file to enable the LLM chat
Input the API data related to Microsoft in the file avconf.json
Note:  Use the helper file (issue-relay-tokens.py) to get the onfo for avconf.json
* Run a test to ensure yor api is set correctly by checking ChatGPT:  Run test_openai.js
* Got issues?  Cut and paste to ChatGPT and ask for assistance 

## Start the demo:
* Open a session in your terminal in the folder with our code run this: node app.js 
* You should see this message - server started on port localhost:3005
* (open basic.html app) in the browser add localhost:3005
* (connect) press connect you should see the connection ready 
* (Enter Chat Text) press the start button to start streaming

## Final Thoughts
* Be patient and enjoy the puzzle if things are not working right away -- stay with it you will get it!

![image](https://github.com/jjmlovesgit/MS_Lisa/assets/47751509/d90f008c-b81b-49f7-9ffc-ff4c054a7fee)

https://www.youtube.com/watch?v=XTScFT-EnOQ&t=34s
