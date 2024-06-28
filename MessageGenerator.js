const sharp = require('sharp');
const fs = require('fs');

// Pfad zur Eingabebilddatei
const inputImagePath = 'input2.jpg';

// Farbwerte zu Symbolen zuordnen
function getSymbol(r, g, b) {
  if (r > 200 && g > 200 && b > 200) {
    return 'w'; // Weiß -> Leerstelle
  } else if (r > 200 && g < 50 && b < 50) {
    return '@'; // Rot -> @
  } else if (r < 50 && g > 200 && b < 50) {
    return '#'; // Grün -> #
  } else if (r < 50 && g < 50 && b > 200) {
    return '*'; // Blau -> *
  } else {
    return '.'; // Andere -> .
  }
}

// Bild einlesen und in eine Symbolmatrix konvertieren
sharp(inputImagePath)
  .resize(100) // Optional: Bildgröße anpassen für eine kompaktere Darstellung
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    console.log(`Bildgröße: ${width}x${height}, Kanäle: ${channels}`);

    let symbolMatrix = [];
    for (let y = 0; y < height; y++) {
      let row = '';
      for (let x = 0; x < width; x++) {
        const r = data[(y * width + x) * channels];
        const g = data[(y * width + x) * channels + 1];
        const b = data[(y * width + x) * channels + 2];
        row += getSymbol(r, g, b);
      }
      symbolMatrix.push(row);
    }

    // Symbolmatrix ausgeben oder weiter verarbeiten
    console.log(symbolMatrix);

    // Optional: Symbolmatrix in eine Datei speichern
    fs.writeFileSync('outputSymbolMatrix.txt', symbolMatrix.join('\n'));
  })
  .catch(err => {
    console.error('Fehler beim Einlesen des Bildes:', err);
  });


const quotes = require('./quoates');
function generator() {
    const len = quotes.length;
    return quotes[Math.ceil(Math.random()*len)].quote;
}
console.log(generator());