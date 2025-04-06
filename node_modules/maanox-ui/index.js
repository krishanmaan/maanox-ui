#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

// Node.js __dirname compatibility in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL from CLI
const args = process.argv.slice(2);

if (args.length < 2 || args[0] !== "add") {
  console.log("❌ Usage: maanox-ui add <component-url>");
  process.exit(1);
}

const componentURL = args[1];
const fileName = componentURL.split("/").pop(); // 'btn'
const filePath = path.resolve(process.cwd(), "components", "ui", `${fileName}.tsx`);

(async () => {
  try {
    const response = await axios.get(componentURL);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, response.data, "utf8");
    console.log(`✅ Component downloaded to: ${filePath}`);
  } catch (error) {
    console.error("❌ Failed to download component:", error.message);
  }
})();
