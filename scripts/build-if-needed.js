const fs = require("fs");

if (!fs.existsSync(".next")) {
  console.log("No .next build found. Running build first...");
  const { execSync } = require("child_process");
  execSync("npm run build", { stdio: "inherit" });
}
