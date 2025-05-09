const languages = {
  1: { name: "English", code: "en-IN" },
  2: { name: "Hindi", code: "en-IN" },
  3: { name: "Tamil", code: "en-IN" },
  4: { name: "Telugu", code: "en-IN" },
  5: { name: "Kannada", code: "en-IN" },
  6: { name: "Malayalam", code: "en-IN" },
  7: { name: "Bengali", code: "en-IN" },
  8: { name: "Marathi", code: "en-IN" },
  9: { name: "Gujarati", code: "en-IN" }
};

const features = {
  1: "Show Nearby Hospitals",
  2: "Free Government Health Schemes Information",
  3: "Medicine Availability",
  4: "Vaccine Availability",
  5: "Emergency Services",
  6: "Medical News",
};

const nearbyHospitals = [
  { name: "J.M Urgent Care Hospital", location: "Anna Nagar, Kinathukadavu, Tamil Nadu" },
  { name: "Sri Venkateshwara Hospital", location: "Pollachi Main Rd, Kinathukadavu, Tamil Nadu" },
  { name: "SV Medical Center", location: "Pollachi Main Rd, Kinathukadavu, Tamil Nadu" },
];

let step = 1;
let selectedLanguage = 1;

function speak(text, callback = null) {
  speechSynthesis.cancel(); // Stop any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);

  const langCode = languages[selectedLanguage]?.code || "en-IN";
  utterance.lang = langCode;

  const voices = speechSynthesis.getVoices();
  const matchingVoices = voices.filter(v => v.lang === langCode);

  if (matchingVoices.length > 0) {
    utterance.voice = matchingVoices[0];
  } else {
    console.warn(`No voice found for ${langCode}, using default.`);
    utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
  }

  if (callback) utterance.onend = callback;
  speechSynthesis.speak(utterance);
}

function announceLanguages() {
  let message = "Welcome to the Medical IVR System. Please select your language. ";
  for (let i = 1; i <= 9; i++) {
    message += `For ${languages[i].name}, press ${i}. `;
  }
  speak(message);
}
function checkMedicineAvailability() {
  const message = "Common medicines like Paracetamol, Ibuprofen, and Amoxicillin are usually available in your nearby pharmacies. For accurate availability, please consult your local chemist or use a pharmacy app.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}
function checkVaccineAvailability() {
  const message = "COVID-19 vaccines, Hepatitis, and Flu vaccines are generally available at government health centers and selected private hospitals. You can check availability through the CoWIN portal or local health department.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}
function emergencyServicesInfo() {
  const message = "For emergency services: Ambulance - dial 108, Police - 100, Fire - 101. Please stay calm and provide accurate information when you call.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}
function provideMedicalNews() {
  const message = "Here are some recent updates: The World Health Organization warns of rising flu cases this season. A new vaccine for dengue is under trial. Visit verified news sources or health ministry sites for more updates.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}

function announceFeatures() {
  let message = "Please select a service. ";
  for (let i = 1; i <= 6; i++) {  // Update loop to include the 12 features
    message += `To ${features[i]}, press ${i}. `;
  }
  speak(message);
}

function showNearbyHospitals() {
  const output = document.getElementById("output");
  let message = "Here are some nearby hospitals: ";

  nearbyHospitals.forEach(hospital => {
    message += `${hospital.name} located in ${hospital.location}. `;
  });

  output.innerHTML = `<strong>Nearby Hospitals:</strong><br>${nearbyHospitals.map(h => `${h.name} (${h.location})`).join('<br>')}`;

  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    output.innerHTML += "<br><br>Starting over...";
    announceLanguages();
  });
}

function provideHealthSchemesInfo() {
  const message = "Here is the information on Free Government Health Schemes: There are several government schemes available to the public, including Ayushman Bharat, Jan Arogya Yojana, and others aimed at providing affordable healthcare for rural and underserved areas.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}

// Simple predefined features:
function provideHealthTips() {
  const message = "Here are some general health tips: Eat balanced meals, drink plenty of water, get regular exercise, and avoid stress.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}

function contactEmergencyServices() {
  const message = "For emergency services, you can contact the following numbers: Ambulance - 108, Fire Service - 101, Police - 100.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}

function healthTipsForAilments() {
  const message = "Here are health tips for common ailments: For a cold, drink warm fluids and rest. For a headache, avoid bright lights and stay hydrated.";
  speak(message, () => {
    step = 1;
    document.getElementById("title").innerText = "📞 Select Your Language";
    document.getElementById("output").innerHTML += "<br><br>Returning to main menu...";
    announceLanguages();
  });
}

function handleKey(key) {
  const output = document.getElementById("output");
  const title = document.getElementById("title");

  if (step === 1) {
    selectedLanguage = key;
    const langName = languages[selectedLanguage]?.name || "English";
    const msg = `You selected ${langName}. Now, here are the services available.`;
    output.innerHTML = `✅ Language selected: <strong>${langName}</strong><br><br>📞 Listen to the services...`;
    title.innerText = "Select a Feature";

    speak(msg, () => {
      announceFeatures();
      step = 2;
    });
  } else if (step === 2) {
    const feature = features[key];
    const msg = `You selected ${feature}. Processing your request.`;
    output.innerHTML += `<br><br>✅ Feature selected: <strong>${feature}</strong><br><br>📲 Processing your request...`;

    speak(msg, () => {
      if (key === 1) {
        showNearbyHospitals();
      } else if (key === 2) {
        provideHealthSchemesInfo();
      } else if (key === 3) {
        checkMedicineAvailability();
      } else if (key === 4) {
        checkVaccineAvailability();
      } else if (key === 5) {
        emergencyServicesInfo();
      } else if (key === 6) {
        provideMedicalNews();
      } else {
        // Handle under-development features if you expand later
        step = 1;
        title.innerText = "📞 This feature is under Development";
        output.innerHTML += "<br><br>Returning to main menu...";
        announceLanguages();
      }
      
    });
  }
}

// Ensure voices load correctly (especially in Chrome)
window.onload = () => {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices(); // Force-load voices
  };
  announceLanguages();
};
