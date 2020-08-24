const axios = require('axios');
const access_token = "ya29.a0AfH6SMB0PhCPY5iURCYL-xCY5dDEttFmUsYMGbt0PiOi15MSt6OpdyHsC3Pob-yXoF8vPd-Ysikz6ndvfCGtV6ILnrjfb022rClETxqbL5T6EmeUFZovEjJfEH6dP2EApm0Gyoj6GyJCBh00kU0mzslb8m1EM50l3CZ66q38UNmQ"
import { Dialogflow_V2 } from 'react-native-dialogflow'
import { project_id, client_email, private_key} from './config/dialogflowConfig'

const sessionId = '123456'
const languageCode = 'en'

export default class DialogFlow {
  constructor(props) {
    super(props)
    Dialogflow_V2.setConfiguration(
      client_email,
      private_key,
      Dialogflow_V2.LANG_ENGLISH,
      project_id
    )

  }
}
