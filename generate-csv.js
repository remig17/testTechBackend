const fs = require("fs");
const uuid = require("uuid");

const filename = "data.csv";
const rowCount = 1000000;

const generateCSV = (filename, rowCount) => {
  // Header du CSV
  let csvContent = "uuid,nom,email\n";

  // Générer les lignes du CSV
  for (let i = 0; i < rowCount; i++) {
    const row = `${uuid.v4()},,\n`; // Les champs nom et email sont vides
    csvContent += row;
  }

  // Écrire le contenu dans le fichier
  fs.writeFileSync(filename, csvContent, "utf-8");

  console.log(
    `CSV with ${rowCount} rows generated successfully at ${filename}`
  );
};

// Appel de la fonction pour générer le CSV
generateCSV(filename, rowCount);
