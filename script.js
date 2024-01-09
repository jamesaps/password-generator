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

    console.log(passwordLengthInt + " " + typeof passwordLengthInt);

    if (isNaN(passwordLengthInt)) {
      alert('Password length needs to be a number. Please try again.');
    } else if (passwordLengthInt < 8 || passwordLengthInt > 128) {
      alert('Password length needs to be at least 8 charaters but no more than 128 characters. Please try again.');
    } else {
      validPasswordLength = true;
    }
  }

  var validLowercaseCharactersResponse = false;

  while(! validLowercaseCharactersResponse) {
    var passwordLowercaseCharacters = prompt('Would you like your password to include lowercase characters? Please enter YES or NO.');
    var passwordLowercaseCharactersResponseCleaned = passwordLowercaseCharacters.toUpperCase().trim();

    if (passwordLowercaseCharactersResponseCleaned === "YES") {
      alert("Thank you. Your password will contain lowercase characters.");
      validLowercaseCharactersResponse = true;
    } else if (passwordLowercaseCharactersResponseCleaned === "NO") {
      alert("Thank you. Your password will not contain lowercase characters.");
      validLowercaseCharactersResponse = false;
    } else {
      alert("Your response was invalid. Please try again.");
    }
  }

  var validUppercaseCharactersResponse = false;

  while(! validUppercaseCharactersResponse) {
    var passwordUppercaseCharacters = prompt('Would you like your password to include uppercase characters? Please enter YES or NO.');
    var passwordUppercaseCharactersResponseCleaned = passwordUppercaseCharacters.toUpperCase().trim();

    if (passwordUppercaseCharactersResponseCleaned === "YES") {
      alert("Thank you. Your password will contain uppercase characters.");
      validUppercaseCharactersResponse = true;
    } else if (passwordUppercaseCharactersResponseCleaned === "NO") {
      alert("Thank you. Your password will not contain uppercase characters.");
      validUppercaseCharactersResponse = false;
    } else {
      alert("Your response was invalid. Please try again.");
    }
  }
}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  var passwordOptions = getPasswordOptions();
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