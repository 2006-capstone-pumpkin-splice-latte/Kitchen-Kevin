/**
 * DIALOGFLOW V2
 */
var dialogflow2 = new Dialogflow_V2();
dialogflow2.setConfiguration = async function (clientEmail, privateKey, languageTag, projectId) {
    dialogflow2.projectId = projectId;
    dialogflow2.accessToken = await dialogflow2.generateAccessToken(clientEmail, privateKey);
    dialogflow2.languageTag = languageTag;
    dialogflow2.sessionId = dialogflow2.sessionId ? dialogflow2.sessionId : dialogflow2.guid();
    // set listeners
    Voice.onSpeechStart = (c) => {
        dialogflow2.speechResult = null;
        dialogflow2.silenceTimer;
        if (dialogflow2.onListeningStarted) {
            dialogflow2.onListeningStarted(c);
        }
    }
    Voice.onSpeechEnd = (c) => {
        if (dialogflow2.speechResult) {
            dialogflow2.requestQuery(dialogflow2.speechResult[0], dialogflow2.onResult, dialogflow2.onError);
        }
        if (dialogflow2.onListeningFinished) {
            dialogflow2.onListeningFinished(c);
        }
    }
    Voice.onSpeechVolumeChanged = (c) => {
        if (dialogflow2.onAudioLevel) {
            dialogflow2.onAudioLevel(c);
        }
    }
    Voice.onSpeechResults = (result) => {
        console.log('running onspeechresults')
        clearTimeout(dialogflow2.silenceTimer)
        if (result.value) {
            dialogflow2.speechResult = result.value;
        }
        dialogflow2.silenceTimer = setTimeout(()=> {
            Voice.stop()
            Voice.start(dialogflow2.languageTag)
        }, 2500)
    }}
dialogflow2.startListening = function (onResult, onError) {
    dialogflow2.onResult = onResult;
    dialogflow2.onError = onError;
    Voice.start(dialogflow2.languageTag);
}
dialogflow2.finishListening = function () {
    Voice.stop();
}
export { dialogflow2 as Dialogflow_V2 };
