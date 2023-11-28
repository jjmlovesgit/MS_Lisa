## Microsoft Lisa - Text to speech Avatar

Note:  Consider the Microsoft relese notes and repo for more complete explanation and helpful supportign links
https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/azure-ai-speech-announces-public-preview-of-text-to-speech/ba-p/3981448


## Initial Setup:
* (install express) open a terminal in the folder:
* run this: npm install express
* run this: npm install openai

Input you OpenAI API key in the config.json file to enable the LLM chat
Input the API data related to Microsoft in the file avconf.json
Note:  Use the helper file (issue-relay-tokens.py) to get the info for avconf.json
* Run a test to ensure yor api is set correctly by checking ChatGPT:  Run test_openai.js and Run issue=relay-tokens.py
* You want to get both these to run before moving on to more complex work 
* Got issues?  Cut and paste to ChatGPT and ask for assistance 

## Start the demo:
* Open a session in your terminal in the folder where your code resides:  run this: node app.js 
* You should see this message result in your window - server started on port localhost:3005
* Go to your browser and open basic.html file in the browser add localhost:3005
* Exercise the application as per the Videos:

## Final Thoughts
* Be patient and enjoy the puzzle if things are not working right away -- stay with it you will get it!

![image](https://github.com/jjmlovesgit/MS_Lisa/assets/47751509/d90f008c-b81b-49f7-9ffc-ff4c054a7fee)

https://www.youtube.com/watch?v=XTScFT-EnOQ&t=34s
