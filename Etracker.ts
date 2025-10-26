import readlin from "readline";

import fs from "fs";
const path = './CharlyTracker.json';

import { program } from 'commander';


//If doesnt exist, creates one Array json
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]), 'utf8');
}


//Gets the data and the last ID
let data = JSON.parse(fs.readFileSync(path, 'utf8'));
let last = (data.length > 0) ? data[data.length-1].ID : 0
const formatterUS = new Intl.DateTimeFormat('en-US');

/*
$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)
$ expense-tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: 2)
$ expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10
$ expense-tracker summary
# Total expenses: $30
$ expense-tracker delete --id 2
# Expense deleted successfully
$ expense-tracker summary
# Total expenses: $20
$ expense-tracker summary --month 8
# Total expenses for August: $20

*/


program
.command("add")
.option("--description <description>", "Description of the expense made")
.option("--amount <amount>", "Price of the expense")
.option("--date <date>", "Expense date MM/DD/YYYY or MM-DD-YYYY")
.action((arg) => {
  let realdate:String = String(arg.date).replaceAll("-","/");
  realdate = (/^\d{2}\/\d{2}\/\d{4}$/.test(realdate)) ? realdate : formatterUS.format(Date.now());
  let realdesc = arg.description? arg.description: "No descrip"
  let am = (arg.amount && arg.amount > 0) ? arg.amount : 0
  data.push({"ID":++last, "Description": realdesc, "Amount": am
    , "Date": (arg.date)? realdate:formatterUS.format(Date.now())})
  fs.writeFileSync(path, JSON.stringify(data), 'utf8')
  console.log(`Expense added successfully (ID:${last})`);
});

program
.command("list")
.action((arg) => {
  if (data.length === 0) {
    console.log("No expenses to show");
    return;
  }

  const headers = Object.keys(data[0]);
  
  const columnWidths = headers.map(header => {
    const maxDataWidth = Math.max(...data.map((item:Object) => 
      String(item[header as keyof typeof item] || '').length
    ));
    return Math.max(header.length, maxDataWidth, 10);
  });

  const headerRow = headers.map((header, i) => 
    header.padEnd(columnWidths[i], ' ')
  ).join(' | ');
  console.log(headerRow);
  
  const separator = columnWidths.map(width => 
    '-'.repeat(width)
  ).join('-+-');
  console.log(separator);

  data.forEach((e: Object) => {
    const row = headers.map((key, i) => {
      const value = String((e as any)[key] || '');
      return value.padEnd(columnWidths[i], ' ');
    }).join(' | ');
    console.log(row);
  });
});



program
.command("summary")
.option("--month <month>", "The month of the expense")
.action((arg) => {
  let sum:number = 0;
  data
  .filter((e:Object) => !arg.month || arg.month === e.Date.split("/")[0])
  .map((e:Object) => Number(e.Amount))
  .forEach( (e:number) => sum+=e);

  console.log(`Total expenses: $${sum}`)
})


program
.command("delete")
.option("--id <id>", "Id of the expense to delete")
.action( (args) => {
  let isThere = data.some((e:Object) => e.ID === args.id)
  data = data.filter((e:Object) => e.ID != args.id)
  if (isThere) console.log("Expense deleted successfully")
  else console.log("No expense to delete")
  fs.writeFileSync(path, JSON.stringify(data), "utf-8");
})

program.parse();





