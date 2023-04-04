
# Babble-Log

Babble-Log is a web application that uses the React library, react-speech-recognition https://github.com/JamesBrill/react-speech-recognition, to access the user's microphone and convert speech to text.  The app allows you to take voice notes, save these notes and organize them into folders.
The react-speech-recognition may not work with certain web browsers, especially on mobile devices.  It has been tested with on desktop Chrome browser and mobile Safari.  Does not seem to work on mobile Chrome on ios devices.

## Using the application
Create an account and login.  Once you login you can record your voice by pushing the microphone button.  Voice commands may not work properly depending on browser.  You can also push a button to generate a random inspirational quote.  You can save the recorded note, or generated quote with the save button.

To view saved notes, use the Log button towards the top of the page.  The default folder for notes is the notes folder. If you want to create a new folder push the folder icon with the plus sign.  You can delete folders with the trashcan icon.  Navigate to a note link to view the full note.  Move the note to a different folder with the folder icon and delete the note with the trashcan icon.

The site is deployed on AWS.  The page uses a self-signed TLS/SSL certificate so you will have to proceed to the site after warnings.

https://www.thomasulee.com:3000
