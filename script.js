const originInput = document.getElementById('origin')
const targetInput = document.getElementById('target')

async function onOriginChange() {
  const inputText = originInput.value;
  // Replace 'en' and 'hr' with the desired source and target languages
  const sourceLanguage = 'en';
  const targetLanguage = 'hr';
  
  // Use Google Translate API to translate the text
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${inputText}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      // Update the content of the element with the translated text
      console.log(data)
      targetInput.value =  data[0][0][0];
  })
  .catch(error => console.error('Error:', error));
}


async function onTargetChange() {
  const inputText = targetInput.value;

  const sourceLanguage = 'hr';
  const targetLanguage = 'en';
  
  // Use Google Translate API to translate the text
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${inputText}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      // Update the content of the element with the translated text
      originInput.value =  data[0][0][0];
  })
  .catch(error => console.error('Error:', error));
}



document.getElementById('origin').addEventListener('change', onOriginChange)
document.getElementById('target').addEventListener('change', onTargetChange)