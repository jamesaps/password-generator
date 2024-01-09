// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  var validPasswordLength = false;

  while (! validPasswordLength) {
    var passwordLength = prompt('Please enter a desired password length.');
    var passwordLengthInt = parseInt(passwordLength);

    if (isNaN(passwordLengthInt)) {
      alert('Password length needs to be a number. Please try again.');
    } else if (passwordLengthInt < 8 || passwordLengthInt > 128) {
      alert('Password length needs to be at least 8 charaters but no more than 128 characters. Please try again.');
    } else {
      validPasswordLength = true;
    }
  }

  var validCharacterTypesResponse = false;
  var characterTypes = ["lowercase", "uppercase", "numeric", "special"];

  var characterTypesSelected = [];

  while (! validCharacterTypesResponse) {
    characterTypes.forEach(function (characterType) {
      var characterTypeResponse = getCharacterTypeResponse(characterType);
  
      if (characterTypeResponse === true) {
        characterTypesSelected.push(characterType);
      }
    });

    if (characterTypesSelected.length === 0) {
      alert("You must specify at least one character type to include in your password. Please try again.");
    } else {
      validCharacterTypesResponse = true;
    }
  }

  return {
    passwordLength: passwordLength,
    characterTypesSelected: characterTypesSelected
  };
}

// Function for generating a prompt asking for character type inclusion
function getCharacterTypeResponse(characterType) {
  var validCharacterTypeResponse = false;

  while(! validCharacterTypeResponse) {
    var passwordCharacterTypeResponse = prompt(`Would you like your password to include ${characterType} characters? Please enter YES or NO.`);
    var passwordCharacterTypeResponseCleaned = passwordCharacterTypeResponse.toUpperCase().trim();

    if (passwordCharacterTypeResponseCleaned === "YES") {
      alert(`Thank you. Your password will contain ${characterType} characters.`);
      return true;
    } else if (passwordCharacterTypeResponseCleaned === "NO") {
      alert(`Thank you. Your password will not contain ${characterType} characters.`);
      return false;
    } else {
      alert("Your response was invalid. Please try again.");
    }
  }
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomNumberUpToArrayLength = Math.floor(Math.random() * arr.length);

  return arr[randomNumberUpToArrayLength];
}

// Function to generate password with user input
function generatePassword() {
  var passwordOptions = getPasswordOptions();
  var passwordCharacters = [];

  // first get one character from each of the character types that the user specified

  for (var i = 0; i < passwordOptions.characterTypesSelected.length; i++) {
    // get a character from the corresponding array and add it to the passwordCharacters string
    var characterType = passwordOptions.characterTypesSelected[i];
    passwordCharacters.push(getCharacterFromType(characterType));
  }

  // then fill up the rest of the passwordCharacters string with random characters from user's specified character types
  while (passwordCharacters.length < passwordOptions.passwordLength) {
    var characterType = getRandom(passwordOptions.characterTypesSelected);
    passwordCharacters.push(getCharacterFromType(characterType));
  }
}

// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Function to select a character according to its corresponding plain text description
function getCharacterFromType(characterType) {
  switch(characterType) {
    case "lowercase":
      return getRandom(lowerCasedCharacters);
    case "uppercase":
      return getRandom(upperCasedCharacters);
    case "numeric":
      return getRandom(numericCharacters);
    case "special":
      return getRandom(specialCharacters);
    default:
      return "";
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);