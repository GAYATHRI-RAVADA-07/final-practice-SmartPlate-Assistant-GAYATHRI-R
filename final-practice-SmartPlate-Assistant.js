// =========================================================
// SMARTPLATE ASSISTANT 
// =========================================================

// ------------------------------
// VALUES / DATA TYPES
// ------------------------------
/*
PSEUDOCODE: USER PROFILE AND PANTRY SETUP

START

1. Create a user object to store all user-related information:
   - Store the user's name as text (string)
   - Store the user's daily budget as a number
   - Store the user's energy level as text (string)
   - Store the child's mood as text (string)

2. This object will be used later to:
   - Make meal recommendations
   - Control budget decisions
   - Adjust meal difficulty (quick vs complex meals)
   - Filter kid-friendly food options

3. Create a pantry array to store available food items:
   - Each item is a string representing an ingredient

4. The pantry will be used to:
   - Check if meals can be cooked
   - Filter out meals with missing ingredients
   - Support grocery list generation

END
*/
let user = {
  name: "Gayathri",
  budget: 30,
  energyLevel: "low",
  kidMood: "picky"
};

let pantry = ["Rice", "Eggs", "Milk"];

// ------------------------------
// BUILDING ARRAYS (MEAL DATABASE)
// ------------------------------
/*
PSEUDOCODE: MEAL DATABASE AND SNACK SETUP

START

1. Create a mealDatabase array to store all available meals in the system.

2. For each meal in mealDatabase:
   - Store the meal name (string)
   - Store the meal type (breakfast, lunch, or dinner)
   - Store nutrition values:
     * protein (number)
     * carbs (number)
     * fiber (number)
   - Store cost of the meal (number)
   - Store kidScore to measure how likely a child will accept the meal (number scale)
   - Store whether the meal is quick to prepare (boolean)
   - Store a list of required ingredients (array of strings)

3. These meal objects will be used to:
   - Recommend meals based on user preferences
   - Filter meals based on pantry availability
   - Calculate total nutrition (protein, carbs, fiber)
   - Track total cost for budget management
   - Prioritize kid-friendly meals

4. Create a snacks array to store quick snack options.

5. Each snack is stored as a string representing a simple food item.

6. Snacks will be used to:
   - Add extra food options to daily meal plans
   - Provide quick, kid-friendly food choices
   - Support nutrition balance throughout the day

END
*/
let mealDatabase = [
  {
    name: "Egg Veg Scramble",
    type: "breakfast",
    protein: 18,
    carbs: 10,
    fiber: 3,
    cost: 4,
    kidScore: 5,
    quick: true,
    ingredients: ["Eggs", "Milk"]
  },
  {
    name: "Chicken Rice Bowl",
    type: "lunch",
    protein: 30,
    carbs: 40,
    fiber: 5,
    cost: 9,
    kidScore: 3,
    quick: true,
    ingredients: ["Rice"]
  },
  {
    name: "Veg Curry Plate",
    type: "dinner",
    protein: 12,
    carbs: 35,
    fiber: 7,
    cost: 6,
    kidScore: 4,
    quick: false,
    ingredients: ["Rice", "Vegetables"]
  }
];

let snacks = ["Fruit Bowl", "Yogurt", "Peanut Butter Toast"];

// ------------------------------
// USING ARRAYS (DYNAMIC STORAGE)
// ------------------------------
/*
PSEUDOCODE: DAILY PLAN AND GROCERY LIST INITIALIZATION

START

1. Create an empty array called dailyPlan.
   - This will store all meals and snacks selected for the day.
   - Each item added later will represent a chosen meal or snack object.

2. The dailyPlan array will be used to:
   - Build the user's full day meal schedule (breakfast, lunch, dinner, snacks)
   - Store only the meals that match user conditions (budget, kid mood, energy level)
   - Help calculate total daily nutrition (protein, carbs, fiber)

3. Create an empty array called groceryList.
   - This will store all ingredients needed for the selected meals.

4. The groceryList array will be used to:
   - Collect ingredients from all selected meals
   - Prevent duplicate items using checks before adding
   - Generate a final shopping list for the user

END
*/
let dailyPlan = [];
let groceryList = [];

// ------------------------------
// CONTROL STRUCTURES (SMART FILTER ENGINE)
// ------------------------------
/*
PSEUDOCODE: EMERGENCY MEAL MODE LOGIC

START

1. Create a variable called emergencyMode and set it to false.
   - This means the system starts in normal mode by default.

2. Check real-life conditions to determine if emergency mode is needed:

   a. Check if the user's energy level is "low"
   b. OR check if the pantry has fewer than 2 items available

3. If either condition is TRUE:
   - Set emergencyMode to true
   - Display a message indicating:
     "Emergency Mode Activated: Simple meals only"

4. If neither condition is true:
   - Keep emergencyMode as false
   - Continue normal meal planning process

5. Purpose of emergencyMode:
   - Simplify meal suggestions during busy or low-energy days
   - Reduce complex cooking steps
   - Prioritize quick and easy meals

END
*/
let emergencyMode = false;

// Trigger real-life emergency logic
if (user.energyLevel === "low" || pantry.length < 2) {
  emergencyMode = true;
  console.log("⚠ Emergency Mode Activated: Simple meals only");
}

// ------------------------------
// LOOPING THROUGH MEALS (DECISION ENGINE)
// ------------------------------
/*
PSEUDOCODE: SMART MEAL SELECTION ENGINE (CORE LOGIC)

START

1. Initialize tracking variables:
   - Set totalProtein to 0 (tracks total protein for the day)
   - Set totalCost to 0 (tracks total cost of selected meals)

2. Start a loop through each meal in mealDatabase:
   - Begin at index 0
   - Continue until all meals have been checked

3. For each meal:
   - Store the current meal in a variable called "meal"
   - Set canCook = true (assume meal is valid at first)

4. Pantry validation check:
   - Loop through each ingredient in the meal
   - If any ingredient is NOT found in pantry:
     → Set canCook = false

5. Kid preference check:
   - If user kidMood is "picky"
   - AND meal kidScore is less than 4:
     → Set canCook = false

6. Emergency mode check:
   - If emergencyMode is true
   - AND meal is NOT quick:
     → Set canCook = false

7. Final decision:
   - If canCook is still true after all checks:
     a. Add meal to dailyPlan array
     b. Add meal protein to totalProtein
     c. Add meal cost to totalCost
     d. Display message: "Selected Meal: [meal name]"

8. Repeat steps 3–7 for all meals in mealDatabase

END
*/
let totalProtein = 0;
let totalCost = 0;

for (let i = 0; i < mealDatabase.length; i++) {
  let meal = mealDatabase[i];
  let canCook = true;

  // Pantry check
  for (let j = 0; j < meal.ingredients.length; j++) {
    if (!pantry.includes(meal.ingredients[j])) {
      canCook = false;
    }
  }

  // Kid logic
  if (user.kidMood === "picky" && meal.kidScore < 4) {
    canCook = false;
  }

  // Emergency mode logic
  if (emergencyMode && !meal.quick) {
    canCook = false;
  }

  // If meal passes all conditions → add to plan
  if (canCook) {
    dailyPlan.push(meal);

    totalProtein += meal.protein;
    totalCost += meal.cost;

    console.log("Selected Meal:", meal.name);
  }
}

// ------------------------------
// USING ARRAYS (SNACK SELECTION)
// ------------------------------
/*
PSEUDOCODE: ADD HEALTHY SNACKS TO DAILY PLAN

START

1. Begin a loop through each snack in the snacks array.
   - Start at index 0.
   - Continue until all snack options have been processed.

2. For each snack:
   - Access the snack name using the current index.

3. Create a new snack object containing:
   - name: the current snack's name
   - type: "snack"

4. Add the snack object to the dailyPlan array.

5. Repeat steps 2–4 until all snacks have been added.

6. Result:
   - The dailyPlan now includes meals and healthy snack options.

END
*/
for (let i = 0; i < snacks.length; i++) {
  dailyPlan.push({
    name: snacks[i],
    type: "snack"
  });
}

// ------------------------------
// GROCERY LIST GENERATION (NO DUPLICATES)
// ------------------------------
/*
PSEUDOCODE: GENERATE GROCERY LIST WITHOUT DUPLICATES

START

1. Begin a loop through each item in the dailyPlan array.
   - Start at index 0.
   - Continue until all meals and snacks have been checked.

2. For each item in dailyPlan:
   - Check whether the item has an ingredients list.
   - (Meals will have ingredients; some snacks may not.)

3. If the item has ingredients:
   - Begin a second loop through each ingredient.

4. For each ingredient:
   - Store the current ingredient in a variable called item.

5. Check whether the ingredient already exists in groceryList.
   - If it does NOT exist:
     a. Add the ingredient to groceryList.
   - If it already exists:
     a. Skip it to avoid duplicates.

6. Repeat until all ingredients from the current meal are checked.

7. Continue until all meals and snacks in dailyPlan have been processed.

8. Result:
   - groceryList contains one unique entry for each required ingredient.

END
*/
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

// ------------------------------
// STRINGING CHARACTERS TOGETHER
// ------------------------------
console.log(`\nHello ${user.name}, here is your SmartPlate plan:`);

// ------------------------------
// FINAL OUTPUT LOOP (DISPLAY SYSTEM)
// ------------------------------
/*
PSEUDOCODE: DISPLAY THE COMPLETE DAILY MEAL PLAN

START

1. Begin a loop through each item in the dailyPlan array.
   - Start at index 0.
   - Continue until all meals and snacks have been displayed.

2. For each item:
   - Calculate the display number by adding 1 to the current index.
   - Access the name of the current meal or snack.

3. Display the formatted output:
   - Meal number
   - Period (.)
   - Meal or snack name

   Example:
   1. Egg Veg Scramble
   2. Fruit Bowl

4. Repeat until every item in dailyPlan has been displayed.

5. Result:
   - The user sees a numbered list of all selected meals and snacks for the day.

END
*/
for (let i = 0; i < dailyPlan.length; i++) {
  console.log(`${i + 1}. ${dailyPlan[i].name}`);
}

// ------------------------------
// FINAL INSIGHTS (REAL APP BEHAVIOR)
// ------------------------------
/*
PSEUDOCODE: DISPLAY DAILY SUMMARY, BUDGET STATUS, AND GROCERY LIST

START

1. Display a heading for the daily summary section.

2. Display the total protein for all selected meals.
   - Add "g" to indicate grams.

3. Display the total cost of all selected meals.
   - Add "$" to indicate dollars.

4. Compare totalCost to the user's budget.

5. If totalCost is greater than the budget:
   - Display a warning message:
     "Budget exceeded!"

6. Otherwise:
   - Display a success message:
     "Within budget"

7. Check whether emergencyMode is active.

8. If emergencyMode is true:
   - Display a helpful tip explaining that
     Emergency Mode was activated due to:
     - Low energy level
     OR
     - Limited pantry ingredients

9. Display a heading for the grocery list.

10. Begin a loop through each item in groceryList.
    - Start at index 0.
    - Continue until all grocery items have been displayed.

11. For each grocery item:
    - Display the item with a bullet point or dash.

12. Repeat until all grocery items are shown.

END
*/
console.log("\n--- DAILY SUMMARY ---");
console.log("Total Protein:", totalProtein + "g");
console.log("Total Cost: $" + totalCost);

if (totalCost > user.budget) {
  console.log("⚠ Budget exceeded!");
} else {
  console.log("✔ Within budget");
}

if (emergencyMode) {
  console.log("⚡ Tip: Emergency mode used due to low energy or pantry shortage");
}

console.log("\nGrocery List:");
for (let i = 0; i < groceryList.length; i++) {
  console.log("- " + groceryList[i]);
}

/*
=========================================================
PSEUDOCODE SUMMARY (HIGH LEVEL LOGIC)
=========================================================

START
1. Store user data and pantry items
2. Create meal and snack databases
3. Check if emergency mode is needed
4. Loop through meals:
   - Check pantry availability
   - Check kid preference
   - Check emergency rules
   - If valid → add to daily plan
5. Add snacks to plan
6. Build grocery list without duplicates
7. Calculate total nutrition and cost
8. Display final meal plan and insights
END
*/

