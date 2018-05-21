# AI Bot
*We really need a new name...*


**Active Project:** [PROTOTYPE](https://github.com/Syekiya/AI-Bot/projects/1)
## DEPENDENCIES

    typescript
    ffmpeg (for Voice support)
    

## Voice Support
You will need to create a Google Cloud account to generate a private key to access Google's API services. Please read [this guide](https://github.com/Syekiya/AI-Bot/wiki/Google-Cloud-API-Setup) on how to generate a key and add it to your project.

## INSTALLING

    git clone
    npm install
    
**Config file**: /dist/config.json

Example:

    {  
	    "name":"Alexa",  
	    "version":"0.3.0",  
		"api":{  
		    "port":1337  
	    },  
	    "irc":{  
		    "nick":"Alexa-dev",  
		    "ident":"Alexa-dev",  
		    "realname":"Alexa AI Bot",  
		    "host":"irc.example.net",  
		    "port":6667,  
		    "ssl":"false",  
		    "password":"",  
		    "channels":[  
			    "#alexa"  
		    ]  
	    },  
	    "discord":{  
		    "token":"E"  
	    },  
	    "lastfm":{  
		    "api_key":"",  
		    "secret":""  
	    }  
    }
	    

## BUILDING

    npm run build


## RUNNING

    npm run test


    
