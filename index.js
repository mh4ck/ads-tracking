const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true });
const url = process.argv[2] || null;
const shortid = require("shortid")
const fs = require("fs");

if(!url) {
  console.log("[Error]: Please enter a valid url to crawl.");
  console.log("[Usage]: node index.js \"https://xxx.xx/123456/\"");
  process.exit(0);
  return;
}

nightmare
  .goto(url)
  .wait(5000)
  .evaluate(() => {
    return {
      title: document.title,
      html: document.documentElement.innerHTML
    }
  })
  //.end()
  .then((ret) => {
    fs.writeFileSync("pagelog." + shortid.generate() + ".json", JSON.stringify(ret), "utf8");
  })
  .catch((err) => {
    console.log(err);
  });
