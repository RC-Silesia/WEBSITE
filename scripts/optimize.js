const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const sourceDir = path.join(process.cwd(), "src", "img");
const outputDir = path.join(process.cwd(), "assets", "img");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const shouldClean = process.argv.includes("--clean");

const variants = [
  { suffix: "hero", width: 1920, quality: 82 },
  { suffix: "card", width: 960, quality: 80 },
  { suffix: "thumb", width: 480, quality: 78 },
];

const polishMap = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

function sanitizeBaseName(fileName) {
  const parsed = path.parse(fileName);
  const normalized = parsed.name
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (char) => polishMap[char] || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "image";
}

async function ensureDirectories() {
  await fs.mkdir(sourceDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
}

async function cleanOutput() {
  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  const webpFiles = entries.filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".webp");

  for (const file of webpFiles) {
    await fs.unlink(path.join(outputDir, file.name));
  }

  console.log(`Usunięto pliki WebP z assets/img: ${webpFiles.length}`);
}

async function listImages() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
}

async function fileSizeKb(filePath) {
  const stat = await fs.stat(filePath);
  return Math.max(1, Math.round(stat.size / 1024));
}

async function optimizeImage(fileName) {
  const sourcePath = path.join(sourceDir, fileName);
  const baseName = sanitizeBaseName(fileName);

  console.log(`\nŹródło: ${fileName}`);

  for (const variant of variants) {
    const outputName = `${baseName}-${variant.suffix}.webp`;
    const outputPath = path.join(outputDir, outputName);

    try {
      await sharp(sourcePath)
        .rotate()
        .resize({
          width: variant.width,
          withoutEnlargement: true,
        })
        .webp({ quality: variant.quality })
        .toFile(outputPath);

      const size = await fileSizeKb(outputPath);
      console.log(`  OK ${outputName} (${size} KB)`);
    } catch (error) {
      console.error(`  Błąd ${outputName}: ${error.message}`);
    }
  }
}

async function main() {
  await ensureDirectories();

  if (shouldClean) {
    await cleanOutput();
  }

  const images = await listImages();

  if (images.length === 0) {
    console.log("Brak obrazów w src/img. Dodaj pliki JPG/PNG/WebP i uruchom npm run optimize.");
    return;
  }

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log(`\nZakończono optymalizację. Przetworzone pliki źródłowe: ${images.length}`);
}

main().catch((error) => {
  console.error(`Błąd pipeline zdjęć: ${error.message}`);
  process.exitCode = 1;
});
