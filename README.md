
https://roadmap.sh/projects/expense-tracker

````{"variant":"standard","title":"README - Charly Expense Tracker CLI","id":"59021"}
# 💰 Charly Expense Tracker CLI

A simple **command-line expense tracker** built with **TypeScript** and **Commander.js**.  
It allows you to add, list, summarize, and delete your daily expenses — all saved locally in a JSON file.

---

## 🚀 Features
- Add expenses with description, amount, and date  
- List all saved expenses in a formatted table  
- View total or month-specific expense summaries  
- Delete expenses by ID  
- Data stored locally in `CharlyTracker.json`

---

## 🛠️ Installation

1. Make sure you have **Node.js (v18 or later)** installed.
2. Clone or download the repository.
3. Install dependencies:
   ```bash
   npm install commander
   ```
4. Run the tracker using Node:
   ```bash
   node .\Etracker.ts <command>
   ```

---

## 📘 Usage

### Add a new expense
```bash
node .\Etracker.ts add --description "Lunch" --amount 20
```
or specify a custom date (in `MM/DD/YYYY` or `MM-DD-YYYY`):
```bash
node .\Etracker.ts add --description "Movie" --amount 18 --date 09/12/2025
```
✅ Output:
```
Expense added successfully (ID:1)
```

---

### List all expenses
```bash
node .\Etracker.ts list
```
✅ Example output:
```
ID         | Description | Amount     | Date
-----------+-------------+------------+-----------
1          | Lunch       | 20         | 10/25/2025
2          | Dinner      | 10         | 10/25/2025
```

---

### Show total expenses
```bash
node .\Etracker.ts summary
```
✅ Output:
```
Total expenses: $30
```

---

### Show total for a specific month
```bash
node .\Etracker.ts summary --month 10
```
✅ Output:
```
Total expenses: $45
```

---

### Delete an expense by ID
```bash
node .\Etracker.ts delete --id 2
```
✅ Output:
```
Expense deleted successfully
```

If the ID doesn’t exist:
```
No expense to delete
```

---

## 🧾 Data Storage
All expenses are stored in a local file:
```
./CharlyTracker.json
```
Each expense is an object like this:
```json
{
  "ID": 1,
  "Description": "Lunch",
  "Amount": 20,
  "Date": "10/25/2025"
}
```

---

## ⚙️ Notes
- Dates are stored in **MM/DD/YYYY** format.
- Amounts must be **positive numbers**.
- If no description or date is provided, defaults are used:
  - `Description`: `"No descrip"`
  - `Date`: current system date.

---

## 🧑‍💻 Example session

```bash
node .\Etracker.ts add --description "Breakfast" --amount 12
node .\Etracker.ts add --description "Transport" --amount 8
node .\Etracker.ts list
node .\Etracker.ts summary
node .\Etracker.ts delete --id 1
node .\Etracker.ts summary --month 10
```

✅ Output:
```
Expense added successfully (ID:1)
Expense added successfully (ID:2)
ID         | Description | Amount     | Date
-----------+-------------+------------+-----------
1          | Breakfast   | 12         | 10/25/2025
2          | Transport   | 8          | 10/25/2025
Total expenses: $20
Expense deleted successfully
Total expenses: $8
```

---

## 🧠 Author
**Charly**  
🧩 Systems Engineering Student — Passionate about efficient backend design and automation.
````
