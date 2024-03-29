// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  '\'',
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
    var passwordLength = prompt('Please enter a desired password length. It must be between 8 and 128 characters (inclusive).');

    // if user cancelled prompt return an error
    if (passwordLength === null) {
      return {
        error: true
      };
    }

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
  var characterTypes = ['lowercase', 'uppercase', 'numeric', 'special'];

  var characterTypesSelected = [];

  var errorEncountered = false;

  while (! validCharacterTypesResponse) {
    for(var i = 0; i < characterTypes.length; i++) {
      var characterTypeResponse = getCharacterTypeResponse(characterTypes[i]);

      if (characterTypeResponse === null) {
        // if user cancelled prompt return an error
        return {
          error: true
        };
      } else if (characterTypeResponse === true) {
        characterTypesSelected.push(characterTypes[i]);
      }
    }

    if (characterTypesSelected.length === 0) {
      alert('You must specify at least one character type to include in your password. Please try again.');
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
    
    if (passwordCharacterTypeResponse === null) {
      return null;
    }
    
    var passwordCharacterTypeResponseCleaned = passwordCharacterTypeResponse.toUpperCase().trim();

    let truthyResponses = ['YES', 'Y', 'TRUE', 'T'];
    let falsyResponses = ['NO', 'N', 'FALSE', 'F'];

    if (truthyResponses.includes(passwordCharacterTypeResponseCleaned)) {
      alert(`Thank you. Your password will contain ${characterType} characters.`);
      return true;
    } else if (falsyResponses.includes(passwordCharacterTypeResponseCleaned)) {
      alert(`Thank you. Your password will not contain ${characterType} characters.`);
      return false;
    } else {
      alert('Your response was invalid. Please try again.');
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

  if (passwordOptions.error) {
    alert('Password generation cancelled.');
    return '';
  }

  var passwordCharacters = [];

  // first get one character from each of the character types that the user specified

  for (var i = 0; i < passwordOptions.characterTypesSelected.length; i++) {
    // get a character from the corresponding array and add it to the passwordCharacters string
    var characterType = passwordOptions.characterTypesSelected[i];
    passwordCharacters.push(getCharacterFromType(characterType));
  }

  // randomly shuffle array to prevent first 1-4 characters of password being of a predictable character type
  shuffle(passwordCharacters);

  // then fill up the rest of the passwordCharacters string with random characters from user's specified character types
  while (passwordCharacters.length < passwordOptions.passwordLength) {
    var characterType = getRandom(passwordOptions.characterTypesSelected);
    var characterToAddToPassword = getCharacterFromType(characterType);

    if (characterToAddToPassword === '') {
      alert('FATAL ERROR: Terminating password generation. An unidentified character type was specified for use in your password.')
      return '';
    }

    passwordCharacters.push(characterToAddToPassword);
  }
  
  // join all elements in array to a single string
  return passwordCharacters.join('');
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
}

// Function to select a character according to its corresponding plain text description
function getCharacterFromType(characterType) {
  switch(characterType) {
    case 'lowercase':
      return getRandom(lowerCasedCharacters);
    case 'uppercase':
      return getRandom(upperCasedCharacters);
    case 'numeric':
      return getRandom(numericCharacters);
    case 'special':
      return getRandom(specialCharacters);
    default:
      return '';
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