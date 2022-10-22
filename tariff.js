const tariff = {     
    "Bermuda":	24.07,
    "Argentina": 6.88,
    "Panama": 5.77,
    "South Korea": 5.48,
    "Uruguay": 5.29,
    "French Polynesia":	4.83,
    "Saudi Arabia":	4.23,
    "Qatar": 3.55,
    "UAE":	3.28,
    "Japan":2.22,
    "United States": 1.52,
    "Canada":	1.49,
    "Czech Republic":	1.48,
    "Greece": 1.48,
    "Belgium": 	1.48,
    "Netherlands": 1.48,
    "Austria":	1.48,
    "France":	1.48,
    "Finland":	1.48,
    "Italy":	1.48,
    "Poland":	1.48,
    "Sweden":	1.48,
    "Ireland":	1.48,
    "Spain":	1.48,
    "Hungary":	1.48,
    "Australia": 0.71,
    "Singapore": 0.05
};

function getTariff(inputCountry) {
    return tariff[inputCountry];
}

