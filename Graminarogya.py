import logging
import googlemaps
from flask import Flask, request
from googletrans import Translator
from twilio.twiml.voice_response import VoiceResponse, Gather

app = Flask(__name__)

# ✅ Setup Logging
logging.basicConfig(level=logging.DEBUG)

# ✅ Initialize APIs (Use your actual API keys)
GMAPS_API_KEY = "AIzaSyBjiI7Jz5CKjYIDrJRON-tXu90cZ0QJMBM"
gmaps = googlemaps.Client(key=GMAPS_API_KEY)
translator = Translator()


@app.route("/")
def home():
    return "Welcome to the Healthcare Helpline! Dial in to access services."


@app.route("/voice", methods=["GET", "POST"])
def voice():
    response = VoiceResponse()
    gather = Gather(input='dtmf', num_digits=1, action="/language")

    gather.say("Welcome to the healthcare helpline. Press 1 for Hindi, 2 for Telugu, 3 for Kannada, "
               "4 for Malayalam, 5 for Tamil, 6 for Urdu, 7 for Marathi, 8 for Bengali, 9 for Assamese, "
               "0 for English, and # to repeat.")
    response.append(gather)
    return str(response)

@app.route("/feature", methods=["GET", "POST"])
def feature():
    response = VoiceResponse()
    digits = request.form.get("Digits", "")

    routes = {
        "1": "/nearest_hospital", "2": "/medical_news", "3": "/medicine_availability",
        "4": "/vaccination",
        "5": "/emergency_services", "6": "/health_schemes",
        "0": "/feature", "#": "/language"
    }

    if digits in routes:
        response.redirect(routes[digits])
    else:
        response.say("Invalid option. Please try again.")

    return str(response)

@app.route("/nearest_hospital", methods=["GET", "POST"])
def nearest_hospital():
    response = VoiceResponse()
    try:
        user_location = (12.9716, 77.5946)  # Example: Bangalore
        places = gmaps.places(query="hospital", location=user_location, radius=5000)

        if "results" in places and places["results"]:
            hospitals = [f"{h.get('name', 'Unnamed')}, {h.get('formatted_address', 'Unknown')}" for h in
                         places["results"][:3]]
            response.say("Nearest hospitals are: " + ", ".join(hospitals))
        else:
            response.say("No hospitals found nearby.")
    except Exception as e:
        logging.error(f"Error: {e}")
        response.say("Error fetching hospital details.")
    return str(response)



