// =========================================================
// SMARTPLATE ASSISTANT – UNIT 0 SKILL DEMONSTRATION
// =========================================================


// ------------------------------
// VALUES / DATA TYPES / OPERATIONS
// ------------------------------
/*
PSEUDOCODE:
- Create a user profile object to store key inputs
- Use different data types (string, number, boolean)
- Store pantry items in an array for later logic

This section represents how real user data is stored in an application.
*/

let user = {
  name: "Gayathri",        // string
  budget: 30,              // number
  energyLevel: "low",      // string
  kidMood: "picky"         // string
};

let pantry = ["Rice", "Eggs", "Milk"]; // array of strings


// ------------------------------
// BUILDING ARRAYS
// ------------------------------
/*
PSEUDOCODE:
- Create a meal database
- Each meal stores multiple properties (object inside array)
- Include nutrition, cost, and ingredients

This represents structured application data storage.
*/

let mealDatabase = [
  {
    name: "Egg Veg Scramble",
    protein: 18,
    cost: 4,
    kidScore: 5,
    quick: true,
    ingredients: ["Eggs", "Milk"]
  },
  {
    name: "Chicken Rice Bowl",
    protein: 30,
    cost: 9,
    kidScore: 3,
    quick: true,
    ingredients: ["Rice"]
  }
];

let snacks = ["Fruit Bowl", "Yogurt"];


// ------------------------------
// USING ARRAYS
// ------------------------------
/*
PSEUDOCODE:
- Store selected meals in daily plan
- Store grocery items dynamically
- Prevent duplicates when adding items

This shows how arrays change during program execution.
*/

let dailyPlan = [];
let groceryList = [];


// ------------------------------
// CONTROL STRUCTURES AND LOGIC
// ------------------------------
/*
PSEUDOCODE:
- Check conditions to activate emergency mode
- If user is low energy OR pantry is small
- Then simplify meal suggestions

This represents decision-making in apps.
*/

let emergencyMode = false;

if (user.energyLevel === "low" || pantry.length < 2) {
  emergencyMode = true;
  console.log("⚠ Emergency Mode Activated");
}


// ------------------------------
// WORKING WITH LOOPS (MEAL FILTER ENGINE)
// ------------------------------
/*
PSEUDOCODE:
- Loop through all meals
- Check pantry ingredients
- Check kid preference
- Apply emergency mode rules
- If valid → add to daily plan

This is the core logic engine of the app.
*/

let totalProtein = 0;
let totalCost = 0;

for (let i = 0; i < mealDatabase.length; i++) {
  let meal = mealDatabase[i];
  let canCook = true;

  // Check pantry availability
  for (let j = 0; j < meal.ingredients.length; j++) {
    if (!pantry.includes(meal.ingredients[j])) {
      canCook = false;
    }
  }

  // Kid preference rule
  if (user.kidMood === "picky" && meal.kidScore < 4) {
    canCook = false;
  }

  // Emergency mode rule
  if (emergencyMode && !meal.quick) {
    canCook = false;
  }

  // If valid meal → add to plan
  if (canCook) {
    dailyPlan.push(meal);
    totalProtein += meal.protein;
    totalCost += meal.cost;

    console.log("Selected:", meal.name);
  }
}


// ------------------------------
// STRINGING CHARACTERS TOGETHER
// ------------------------------
console.log(`\nHello ${user.name}, your SmartPlate plan is ready:`);


// ------------------------------
// LOOP OUTPUT DISPLAY
// ------------------------------
for (let i = 0; i < dailyPlan.length; i++) {
  console.log(`${i + 1}. ${dailyPlan[i].name}`);
}


// ------------------------------
// FINAL SUMMARY (REAL-WORLD OUTPUT)
// ------------------------------
console.log("\n--- SUMMARY ---");
console.log(`Total Protein: ${totalProtein}g`);
console.log(`Total Cost: $${totalCost}`);

if (totalCost > user.budget) {
  console.log("⚠ Budget exceeded!");
} else {
  console.log("✔ Within budget");
}

if (emergencyMode) {
  console.log("Tip: Emergency mode was activated due to conditions.");
}


// ------------------------------
// GROCERY LIST (ARRAY + LOOP COMBO)
// ------------------------------
for (let i = 0; i < dailyPlan.length; i++) {
  if (dailyPlan[i].ingredients) {
    for (let j = 0; j < dailyPlan[i].ingredients.length; j++) {
      let item = dailyPlan[i].ingredients[j];

      if (!groceryList.includes(item)) {
        groceryList.push(item);
      }
    }
  }
}

console.log("\nGrocery List:");
for (let i = 0; i < groceryList.length; i++) {
  console.log("- " + groceryList[i]);
}


/*
=========================================================
FINAL PSEUDOCODE SUMMARY
=========================================================
1. Store user + pantry data (values/data types)
2. Build structured meal database (arrays/objects)
3. Apply logic rules (conditionals)
4. Loop through meals to filter valid options
5. Build daily plan dynamically (arrays usage)
6. Generate grocery list without duplicates
7. Display final outputs using loops + strings
=========================================================
*/