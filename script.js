const sourceInput = document.getElementById('source')
const targetInput = document.getElementById('target')
const LANGUAGES  = [
  { code: 'ar', name: 'Arabic' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'cs', name: 'Czech' },
  { code: 'hr', name: 'Croatian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fa', name: 'Persian' },
  { code: 'fil', name: 'Filipino' },
  { code: 'fr', name: 'French' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ha', name: 'Hausa' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kannada', name: 'Kannada' },
  { code: 'ko', name: 'Korean' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ms', name: 'Malay' },
  { code: 'my', name: 'Burmese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' }
];
let sourceInFocus = false;
let targetInFocus = false;

function debounce(func, timeout = 200){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

async function onSourceChange() {
  const inputText = sourceInput.value.trim();  
  if (!sourceInFocus || inputText.length === 0) {
    targetInput.value = '';
    return;
  }
  
  console.log(inputText)
  const sourceLanguage = document.getElementById('source-language').value;
  const targetLanguage = document.getElementById('target-language').value;

  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${inputText}`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      targetInput.value =  data[0][0][0];
  })
  .catch(error => console.error('Error:', error));
}

async function onTargetChange() {
  const inputText = targetInput.value;
  if (!targetInFocus || inputText.length ===0) {
    sourceInput.value = '';
    return;
  }

  const sourceLanguage = document.getElementById('target-language').value;
  const targetLanguage = document.getElementById('source-language').value;
  
  console.log(sourceLanguage, targetLanguage)
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${inputText}`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      sourceInput.value =  data[0][0][0];
  })
  .catch(error => console.error('Error:', error));
}

function populateLanguageOptions() {
  const selectElement = document.getElementById('source-language');
  const targetElement = document.getElementById('target-language');

  LANGUAGES.forEach((language) => {
    const sourceOption = document.createElement('option')
    const targetOption = document.createElement('option')
    sourceOption.value = language.code
    sourceOption.textContent = language.name 
    targetOption.value = language.code
    targetOption.textContent = language.name
    selectElement.appendChild(sourceOption)
    targetElement.appendChild(targetOption)
  })

  selectElement.value = 'en'
  targetElement.value = 'hr'
}

function onSourceOptionChange() {
  document.getElementById('source-label').textContent = document.getElementById('source-language').value.toUpperCase()
}
function onTargerOptionChange() {
  document.getElementById('target-label').textContent = document.getElementById('target-language').value.toUpperCase()
}

const debounceOnSourceChange = debounce(() => onSourceChange());
const debounceOnTargetChange = debounce(() => onTargetChange());

populateLanguageOptions()
document.getElementById('source').addEventListener('change', debounceOnSourceChange)
document.getElementById('source').addEventListener('focus', () => {
  sourceInFocus = true;
})
document.getElementById('source').addEventListener('blur', () => {
  sourceInFocus = false;
})
document.getElementById('source').addEventListener('keyup', debounceOnSourceChange)

document.getElementById('target').addEventListener('change', debounceOnTargetChange)
document.getElementById('target').addEventListener('focus', () => {
  targetInFocus = true;
})
document.getElementById('target').addEventListener('blur', () => {
  targetInFocus = false;
})
document.getElementById('target').addEventListener('keyup', debounceOnTargetChange)


document.getElementById('source-language').addEventListener('change', onSourceOptionChange)
document.getElementById('target-language').addEventListener('change', onTargerOptionChange)
