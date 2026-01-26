import readline from "node:readline";
import { Command } from "commander";
import { promises as fs } from "node:fs";
import { createWriteStream } from "node:fs";
import PDFDocument from "pdfkit";

const program = new Command();

const cafeName = "Cafe Hitomi";

const getTimeAndDate = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // +1 because Jan is 0
  const yyyy = now.getFullYear();

  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  const formatted = `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  return formatted;
};

const getTimestampForFileName = () => {
  const regex = /\/|\:/gm;
  const emptySpace = / /gm;
  const timestamp = getTimeAndDate()
    .replace(regex, "")
    .replace(emptySpace, "_");
  return timestamp;
};

const menu = {
  drinks: {
    espresso: 250,
    americano: 300,
    latte: 350,
    cappuccino: 400,
    matchalatte: 450,
  },
  foods: {
    cookie: 100,
    cake: 200,
    muffin: 150,
    sandwich: 250,
  },
};

const allMenu = { ...menu.drinks, ...menu.foods };

const formatMoney = (cent) => {
  return "€" + (cent / 100).toFixed(2);
};

const allItems = Object.keys(allMenu);
const allPrices = Object.values(allMenu).map((price) => formatMoney(price));

const maxLength = (arr) => {
  const lengthArr = arr.map((e) => e.length);
  return Math.max(...lengthArr) + 3;
};

const LEFT = maxLength(allItems);
const RIGHT = maxLength(allPrices);

const ask = (questionText, rl) => {
  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      resolve(answer);
    });
  });
};

const normalizer = (answer) => {
  return answer.toLowerCase().trim();
};

const getPrice = (item) => {
  return allMenu[item];
};

const issueReceiptPDF = (receiptStr) => {
  const timestamp = getTimestampForFileName();
  const PDFName = "receipt_" + timestamp + ".pdf";
  const doc = new PDFDocument();
  doc.pipe(createWriteStream(PDFName));
  doc.font("Courier").fontSize(20).text(receiptStr, 100, 100);
  doc.end();
};

const cafeOrder = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const orders = [];
  let totalPrice = 0;
  let rawAnswer;
  let normalizedAnswer = "";

  while (true) {
    rawAnswer = await ask('What do you want ? Type an item, or "done"\n', rl);
    normalizedAnswer = normalizer(rawAnswer);
    if (normalizedAnswer === "done") {
      const orderLines =
        orders.length > 0
          ? orders.map((item) => {
              const price = formatMoney(getPrice(item));
              return `${item.padEnd(LEFT)}${price.padStart(RIGHT)}`;
            })
          : ["No items"];
      const totalStr = "Total";
      const dash = "-";
      const lines = [
        cafeName,
        getTimeAndDate(),
        "",
        ...orderLines,
        "",
        `${totalStr.padEnd(LEFT)}${formatMoney(totalPrice).padStart(RIGHT)}`,
        `${dash.repeat(LEFT + RIGHT)}`,
        "",
      ];
      console.log(`${lines.join("\n")}`);
      try {
        issueReceiptPDF(lines.join("\n"));
      } catch (e) {
        console.error(e);
      }
      break;
    }
    if (!(normalizedAnswer in allMenu)) {
      console.log("This item is not in the menu");
      continue;
    }
    orders.push(normalizedAnswer);
    totalPrice += getPrice(normalizedAnswer);
    console.log(`current order list: ${orders.join(" ")}`);
  }
  rl.close();
};

const showMenu = () => {
  console.log("\n-MENU-\n\nDrink");
  for (const drink in menu.drinks) {
    console.log(`- ${drink}: €${menu.drinks[drink] / 100}`);
  }
  console.log("\nFood");
  for (const food in menu.foods) {
    console.log(`- ${food}: €${menu.foods[food] / 100}`);
  }
};

program
  .name("cafe-order")
  .description("CLI to order drinks and foods at a cafe")
  .version("0.0.1");

program.action(cafeOrder);

program.command("menu").description("Show our menu").action(showMenu);

program.parse();
