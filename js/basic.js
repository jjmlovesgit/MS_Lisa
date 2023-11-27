// At the top of your main JS fileVoic
window.OPENAI_API_KEY = window.OPENAI_API_KEY || null;

// Later in your code when you assign it
fetch('./js/config.json')
  .then((response) => response.json())
  .then(async (config) => {
    window.OPENAI_API_KEY = config.OPENAI_API_KEY; // Assigning the value without redeclaring
  })
  .catch((error) => {
    console.error('Error loading config.json:', error);
  });


//___RPOMPT_____________________________________________________________________________________________________________________________________



// Global conversation history
let conversationHistory = [];

// Initialize the conversation with a system message
function initializeConversation() {
    const systemMessage = {
        role: "system",
        content: "You are Dell Corporation Laptop Web Site Sales Assitant with expert Laptop product knowledge.  You share typical uses cases for the various products and can you offer recommendations for products in response to customore needs."   
    };
    conversationHistory = [systemMessage];
}

// Function to fetch response from OpenAI
async function fetchOpenAIResponse(userMessage) {
  // Initialize conversation if it's empty
  if (conversationHistory.length === 0) {
    initializeConversation();
  }

  // Append the user message to the conversation history
  conversationHistory.push({ role: "user", content: userMessage });

  // Ensure the conversation history does not exceed token limits
  manageConversationHistory();

  // Make the API request
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      temperature: 0.5,
    }),
  });

  // Handle response
  if (!response.ok) {
    throw new Error(`OpenAI API request failed with status ${response.status}`);
  }

  // Process and return data
  const data = await response.json();
  const assistantMessage = data.choices[0].message.content.trim();
  conversationHistory.push({ role: "assistant", content: assistantMessage });

  return assistantMessage;
}

// Function to manage conversation history length
function manageConversationHistory() {
  // Implement logic to trim conversation history
  // e.g., remove oldest messages if the total token count exceeds a certain limit
}

// Function to calculate max tokens
function calculateMaxTokens(conversation) {
  // Implement logic to calculate the max tokens dynamically
  // based on the conversation length and token limits
}
 


//______End OpenAI_____________________________________________________________________________________________________________


// Function to clear default text
    function clearDefaultText(element) {
        element.value = '';
    }

//stop playback with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            stopAvatarPlayback();
        }
    });



    function stopAvatarPlayback() {
        if (avatarSynthesizer && typeof avatarSynthesizer.stopSpeaking === 'function') {
            avatarSynthesizer.stopSpeaking();
            console.log("Playback stopped.");
        } else {
            console.error("Avatar synthesizer is not initialized or stopSpeaking method is not available.");
        }
    }
    
    

// Modified function to speak and fetch response
let processingIndicatorInterval; // Declare this variable globally

// Function to stop the streaming of processing indicator
function stopProcessingIndicator() {
  if (processingIndicatorInterval) {
    clearInterval(processingIndicatorInterval);
    processingIndicatorInterval = null;
  }
}

// Helper function to clear the response element
function clearResponseElement(elementId) {
    const element = document.getElementById(elementId);
    element.innerText = ''; // Clear the current text
  }
  
  // Function to stream a repeating character
  function streamProcessingIndicator(elementId, character, intervalDuration) {
    const element = document.getElementById(elementId);
    return setInterval(() => {
      element.innerText += character;
    }, intervalDuration);
  }
  
  // Function to stream the response
  function streamResponseText(elementId, text, intervalId, intervalDuration) {
    clearInterval(intervalId); // Clear the processing indicator interval
    clearResponseElement(elementId); // Clear the "..." before displaying the response
  
    const element = document.getElementById(elementId);
    let index = 0;
  
    const responseIntervalId = setInterval(() => {
      if (index < text.length) {
        element.innerText += text.charAt(index);
        index++;
      } else {
        clearInterval(responseIntervalId); // Clear the interval when done
      }
    }, intervalDuration);
  
    return responseIntervalId; // Return the interval ID so it can be cleared later if needed
  }

  // Utility function to automatically scroll the content to the bottom
function scrollToBottom(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }
  
  // Function to stream the response text
  function streamResponseText(elementId, text, intervalDuration) {
    const element = document.getElementById(elementId);
    let index = 0;
    
    // Ensure the element is clear before streaming the text
    element.innerText = '';
    
    const responseIntervalId = setInterval(() => {
      if (index < text.length) {
        element.innerText += text.charAt(index);
        index++;
        scrollToBottom(elementId); // Scroll down each time new text is added
      } else {
        clearInterval(responseIntervalId); // Clear the interval when done
      }
    }, intervalDuration);
    
    return responseIntervalId; // Return the interval ID so it can be cleared later if needed
  }
  
  // Modified function to speak and fetch response
  function speakAndFetchResponse() {
    const userQueryElement = document.getElementById('openAIQuery');
    const userQuery = userQueryElement.value;
    console.log("Sending query to OpenAI:", userQuery);
  
    // Clear the output box before starting the streaming process
    const openAIResponseElement = document.getElementById('openAIResponse');
    openAIResponseElement.innerText = '';
  
    // Stop any ongoing streaming of processing indicator
    stopProcessingIndicator();
  
    // Start streaming the processing indicator
    processingIndicatorInterval = streamProcessingIndicator('openAIResponse', '.', 100);
  
    fetchOpenAIResponse(userQuery)
      .then((response) => {
        // Clear the processing indicator before streaming the response
        stopProcessingIndicator();
  
        // Stream the response text
        streamResponseText('openAIResponse', response, 50);
        console.log("Received response from OpenAI:", response);
  
        if (avatarSynthesizer && typeof avatarSynthesizer.speak === 'function') {
          avatarSynthesizer.speak(response);
          console.log("Passed response to avatar synthesizer.");
        } else {
          console.error('Avatar synthesizer is not initialized or speak method is not available.');
        }
      })
      .catch((error) => {
        // Stop the processing indicator and log any errors
        stopProcessingIndicator();
        console.error('Error fetching OpenAI response:', error);
      });
  }
  

// Global objects
var avatarSynthesizer
var peerConnection
var previousAnimationFrameTimestamp = 0;
var subscriptionKey;
var cogSvcRegion;
var iceServerUrl;
var iceServerUsername;
var iceServerCredential;
var config; 

// Function to handle the configuration once it's loaded
function handleConfiguration(loadedConfig) {
    // Assign values from config to global variables
    subscriptionKey = loadedConfig.AzureSpeechResource.SubscriptionKey;
    cogSvcRegion = loadedConfig.AzureSpeechResource.Region;
    iceServerUrl = loadedConfig.ICEServer.URL;
    iceServerUsername = loadedConfig.ICEServer.Username;
    iceServerCredential = loadedConfig.ICEServer.Credential;

    // Update UI elements with the configuration values
    // Note: Only update if the elements exist in your HTML
    if (document.getElementById('region')) {
        document.getElementById('region').value = cogSvcRegion;
    }
    if (document.getElementById('iceServerUrl')) {
        document.getElementById('iceServerUrl').value = iceServerUrl;
    }
    if (document.getElementById('iceServerUsername')) {
        document.getElementById('iceServerUsername').value = iceServerUsername;
    }
    if (document.getElementById('iceServerCredential')) {
        document.getElementById('iceServerCredential').value = iceServerCredential;
    }

    // Continue with other initialization logic here
    console.log('Configuration loaded:', loadedConfig);

    // Call the function to start the session or perform other actions
    //startSession();
};

// Asynchronously load the configuration on startup
window.onload = function() {
    fetch('./js/avconf.json')
        .then(response => response.json())
        .then(loadedConfig => {
            config = loadedConfig; // Store the config in a global variable
            handleConfiguration(config); // Call the function to handle the loaded configuration
        })
        .catch(error => {
            console.error('Error loading the configuration:', error);
        });
};


// Logger function that also checks status and sets the color accordingly
const log = (msg) => {
    const loggingElement = document.getElementById('logging');
    if (loggingElement) {
        // Split the message into title and status
        const parts = msg.split(': ');
        const title = parts[0] + ': '; // Title part of the message
        const status = parts[1]; // Status part of the message

        // Create a span for the title
        const titleSpan = document.createElement('span');
        titleSpan.innerText = title;

        // Create a span for the status
        const statusSpan = document.createElement('span');
        // Explicitly check for 'disconnected' first to avoid it being overridden by 'connected'
        if (status.includes('disconnected')) {
            statusSpan.style.color = 'red';
        } else if (status.includes('checking')) {
            statusSpan.style.color = 'green';
        } else if (status.includes('connected')) {
            statusSpan.style.color = 'green';
        } else {
            statusSpan.style.color = 'black';
        }
        statusSpan.innerText = status;

        // Append the title span and status span to the log
        loggingElement.appendChild(titleSpan);
        loggingElement.appendChild(statusSpan);
        loggingElement.appendChild(document.createElement('br'));
    }
}


    // Setup WebRTC
    function setupWebRTC(iceServerUrl, iceServerUsername, iceServerCredential) {
    // Create WebRTC peer connection
        peerConnection = new RTCPeerConnection({
            iceServers: [{
                urls: [ iceServerUrl ],
                username: iceServerUsername,
                credential: iceServerCredential
            }]
    })

    const element = document.getElementById('yourElementId');
    if (element) {
        element.hidden = true; // or false, depending on your logic
    } else {
        console.error('Element not found');
    }
  

    // Fetch WebRTC video stream and mount it to an HTML video element
    peerConnection.ontrack = function (event) {
        // Clean up existing video element if there is any
        remoteVideoDiv = document.getElementById('remoteVideo')
        for (var i = 0; i < remoteVideoDiv.childNodes.length; i++) {
            if (remoteVideoDiv.childNodes[i].localName === event.track.kind) {
                remoteVideoDiv.removeChild(remoteVideoDiv.childNodes[i])
            }
        }

        const mediaPlayer = document.createElement(event.track.kind)
        mediaPlayer.id = event.track.kind
        mediaPlayer.srcObject = event.streams[0]
        mediaPlayer.autoplay = true
        document.getElementById('remoteVideo').appendChild(mediaPlayer)
        document.getElementById('videoLabel').hidden = true
        document.getElementById('overlayArea').hidden = true

        if (event.track.kind === 'video') {
            mediaPlayer.playsInline = true
            remoteVideoDiv = document.getElementById('remoteVideo')
            canvas = document.getElementById('canvas')
            if (document.getElementById('transparentBackground').checked) {
                remoteVideoDiv.style.width = '0.1px'
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                canvas.hidden = false
            } else {
                canvas.hidden = true
            }

            mediaPlayer.addEventListener('play', () => {
                if (document.getElementById('transparentBackground').checked) {
                    window.requestAnimationFrame(makeBackgroundTransparent)
                } else {
                    remoteVideoDiv.style.width = mediaPlayer.videoWidth / 2 + 'px'
                }
            })
        }
        else
        {
            // Mute the audio player to make sure it can auto play, will unmute it when speaking
            // Refer to https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
            mediaPlayer.muted = true
        }
    }

    // Make necessary update to the web page when the connection state changes
    peerConnection.oniceconnectionstatechange = e => {
        const statusElement = document.getElementById('status');
        log("WebRTC status: " + peerConnection.iceConnectionState)

        if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') {
            document.getElementById('startSession').disabled = false
            document.getElementById('configuration').hidden = false
        }
    }

    // Offer to receive 1 audio, and 1 video track
    peerConnection.addTransceiver('video', { direction: 'sendrecv' })
    peerConnection.addTransceiver('audio', { direction: 'sendrecv' })

    // start avatar, establish WebRTC connection
    avatarSynthesizer.startAvatarAsync(peerConnection).then((r) => {
        console.log("[" + (new Date()).toISOString() + "] Avatar started.")

    }).catch(
        (error) => {
            console.log("[" + (new Date()).toISOString() + "] Avatar failed to start. Error: " + error)
            document.getElementById('startSession').disabled = false
            document.getElementById('configuration').hidden = false
        }
    );
}

// Make video background transparent by matting
function makeBackgroundTransparent(timestamp) {
    // Throttle the frame rate to 30 FPS to reduce CPU usage
    if (timestamp - previousAnimationFrameTimestamp > 30) {
        video = document.getElementById('video')
        tmpCanvas = document.getElementById('tmpCanvas')
        tmpCanvasContext = tmpCanvas.getContext('2d', { willReadFrequently: true })
        tmpCanvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        if (video.videoWidth > 0) {
            let frame = tmpCanvasContext.getImageData(0, 0, video.videoWidth, video.videoHeight)
            for (let i = 0; i < frame.data.length / 4; i++) {
                let r = frame.data[i * 4 + 0]
                let g = frame.data[i * 4 + 1]
                let b = frame.data[i * 4 + 2]
                if (g - 150 > r + b) {
                    // Set alpha to 0 for pixels that are close to green
                    frame.data[i * 4 + 3] = 0
                } else if (g + g > r + b) {
                    // Reduce green part of the green pixels to avoid green edge issue
                    adjustment = (g - (r + b) / 2) / 3
                    r += adjustment
                    g -= adjustment * 2
                    b += adjustment
                    frame.data[i * 4 + 0] = r
                    frame.data[i * 4 + 1] = g
                    frame.data[i * 4 + 2] = b
                    // Reduce alpha part for green pixels to make the edge smoother
                    a = Math.max(0, 255 - adjustment * 4)
                    frame.data[i * 4 + 3] = a
                }
            }

            canvas = document.getElementById('canvas')
            canvasContext = canvas.getContext('2d')
            canvasContext.putImageData(frame, 0, 0);
        }

        previousAnimationFrameTimestamp = timestamp
    }

    window.requestAnimationFrame(makeBackgroundTransparent)
}
// Do HTML encoding on given text
function htmlEncode(text) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    return String(text).replace(/[&<>"'\/]/g, (match) => entityMap[match])
}

window.startSession = () => {
    console.log("Configuration at startSession:", config);
  
    // Check if config is loaded and has necessary sections
    if (!config || !config.AzureSpeechResource || !config.TTSConfiguration) {
      console.error("Configuration not loaded or is missing sections.");
      return;
    }
  
    const cogSvcRegion = config.AzureSpeechResource.Region;
    const subscriptionKey = config.AzureSpeechResource.SubscriptionKey;
  
    // Check for required values
    if (!subscriptionKey || subscriptionKey.trim() === '') {
      alert('Please fill in the subscription key of your speech resource.');
      return;
    }
  
    // Create the SpeechSDK configuration
    const speechSynthesisConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, cogSvcRegion);
    speechSynthesisConfig.endpointId = config.TTSConfiguration.CustomVoiceEndpointId;
    speechSynthesisConfig.speechSynthesisVoiceName = config.TTSConfiguration.Voice;

    // Set up the avatar video format
    const videoFormat = new SpeechSDK.AvatarVideoFormat();
    let videoCropTopLeftX = config.AvatarConfiguration.VideoCrop ? 600 : 0;
    let videoCropBottomRightX = config.AvatarConfiguration.VideoCrop ? 1320 : 1920;
    videoFormat.setCropRange(new SpeechSDK.Coordinate(videoCropTopLeftX, 0), new SpeechSDK.Coordinate(videoCropBottomRightX, 1080));

    // Initialize the avatar configuration
    const avatarConfig = new SpeechSDK.AvatarConfig(
        config.AvatarConfiguration.Character,
        config.AvatarConfiguration.Style,
        videoFormat
    );
    avatarConfig.customized = config.AvatarConfiguration.CustomAvatar;
    avatarConfig.backgroundColor = config.AvatarConfiguration.BackgroundColor;

    // Create the avatar synthesizer
    avatarSynthesizer = new SpeechSDK.AvatarSynthesizer(speechSynthesisConfig, avatarConfig);

    // Set up the event handler for avatar events
    avatarSynthesizer.avatarEventReceived = function (s, e) {
        var offsetMessage = ", offset from session start: " + e.offset / 10000 + "ms.";
        if (e.offset === 0) {
            offsetMessage = "";
        }
        console.log("[" + (new Date()).toISOString() + "] Event received: " + e.description + offsetMessage);
    };

    // Check if ICE server details are set
    if (!iceServerUrl || iceServerUrl.trim() === '' || 
        !iceServerUsername || iceServerUsername.trim() === '' || 
        !iceServerCredential || iceServerCredential.trim() === '') {
        alert('Please fill in the ICE server URL, username, and credential.');
        return;
    }

    // Start setting up WebRTC
    setupWebRTC(iceServerUrl, iceServerUsername, iceServerCredential);
    };

    // lets see if we can simulate astreaming effect
    function streamTextToDisplay(text, elementId, speed) {
        let i = 0;
        const element = document.getElementById(elementId);
        if (!element) return; // Exit if the element is not found
    
        // Clear the element before starting to stream the new text
        element.textContent = '';
    
        function addCharacter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(addCharacter, speed);
            }
        }
        addCharacter();
    }
    
