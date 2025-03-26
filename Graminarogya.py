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



