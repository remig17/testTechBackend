const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

router.get("/test", (req, res) => {
  res.json({ success: true });
});

router.get("/import-csv", async (req, res) => {
  try {
    const csvFilePath = path.resolve(__dirname, "../data.csv");

    // Lire le fichier CSV
    const csvData = await fs.readFile(csvFilePath, "utf-8");
    const rows = csvData.split("\n").map((row) => row.split(","));

    if (!req.db || !req.db.query) {
      throw new Error("Database connection not available.");
    }

    const expectedColumns = 3; // Nombre de colonnes attendu dans la table MySQL

    // Vérifier le nombre de colonnes dans chaque ligne du fichier CSV
    const isValidRow = (row) => row.length === expectedColumns;

    // Filtrer les lignes invalides avant l'insertion
    const validRows = rows.slice(1).filter(isValidRow);

    if (validRows.length === 0) {
      throw new Error("Aucune ligne valide à importer.");
    }

    // Insérer les données dans la table MySQL
    const query = "INSERT INTO csv_table (uuid, nom, email) VALUES ?";
    // Utiliser seulement les lignes valides pour l'insertion
    await req.db.query(query, [validRows]);

    res.json({ success: true });
  } catch (error) {
    console.error("Error during CSV import:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
