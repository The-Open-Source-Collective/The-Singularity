# The Singularity from The Open Source Collective

**Active Project:** [PROTOTYPE](https://github.com/The-Open-Source-Collective/The-Singularity/projects/1)
## DEPENDENCIES
Please see "INSTALLING FFMPEG ON WINDOWS" before installing FFMPEG for node.

    node
    npm
    yarn
    typescript --global
    WINDOWS DEVELOPERS: npm install --global --production windows-build-tools (FOR node-gyp)
    node-gyp -g
    ffmpeg --global (for Voice support)
    ffmpeg-binaries --global (for Voice Support)
    
    

## Voice Support
You will need to create a Google Cloud account to generate a private key to access Google's API services. Please read [this guide](https://github.com/Syekiya/AI-Bot/wiki/Google-Cloud-API-Setup) on how to generate a key and add it to your project.

## INSTALLING

    Fork this Repo
    git clone <your forked repo>
    yarn install
    
**Config file**: /dist/config.json

Example:

    {  
	    "name":"Alexa-Dev[Example]",  
	    "version":"0.3.0",  
		"api":{  
		    "port":1337  
	    },  
	    "irc":{  
		    "nick":"Alexa-Dev[Example]",  
		    "ident":"Alexa",  
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

    yarn run build


## RUNNING

    yarn run test


    
## INSTALLING FFMPEG ON WINDOWS
**Download FFMPEG**

Download FFMPEG from [this website]https://ffmpeg.zeranoe.com/builds/. Make sure to find the current Static Build for your OS Architecture (32bit/64bit).

**Extract FFMPEG**

Extract the files to the root of your harddrive, and rename the folder to ffmpeg.

**Install FFMPEG**

    Press the Windows Key
    Start typing in Edit Envirnment Varibles
    Edit Envirnment Varibles
    Under System variables find the variable Path hit edit
    Depending on your version of windows you may have a list of entries or a semicolon sperated field of entries.
    
    If Windows 10
    Hit the new button on the right
    add c:\ffmpeg\bin
    
    If older versions of Windows:
    add ;c:\ffmpeg\bin to the end of the field.