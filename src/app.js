'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Bixby } = require('jovo-platform-bixby')
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
   // new Alexa(),
   // new GoogleAssistant(),
    new Bixby(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    

    NEW_USER() {
        // Triggered when a user opens your app for the first time
        this.ask(`Welcome, looks like this is your first time here`)
     },
     LAUNCH() {
        return this.toIntent('HelloWorldIntent');
    },

    CollectInfoIntent() {
         // location
         //  dob
         // 

         if (this.$inputs.dob) {
            this.$session.$data.dob = this.$inputs.dob.value;
            this.$session.$data.color = this.$inputs.color.value;

            this.$user.$data.dob = this.$inputs.dob.value;
            this.$user.$data.color = this.$inputs.color.value;
            this.ask(`I saved your date of birth, and favorite color`)

         }
           
            //this.ask(`Hello there, your location is ${this.$inputs.location.value.point.latitude}`)
         else 
             this.ask('Hi there, what is your date of birth?')   
    },

    HelloWorldIntent() {

        if (this.$user.isNew()) { 
            this.ask('Welcome, Looks like this is your first time.  Please make a selection');
        } 
        else
          this.ask('Welcome back, you can say hello world, collect some information, or find my location to begin');
    },
    LocationIntent() {


        this.$session.$data.location = this.$inputs.location.value;
        this.ask(`Here's your location`)

    },

    MyNameIsIntent() {
        this.$session.$data.name = this.$inputs.name.value;
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
