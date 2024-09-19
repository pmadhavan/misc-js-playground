const streams = `4
ENTREE
Spaghetti
10.95
2
3

1
CATEGORY
Pasta
4
5

2
OPTION
Meatballs
1.00

3
OPTION
Chicken
2.00

5
ENTREE
Lasagna
12.00

6
ENTREE
Caesar Salad
9.75
3`;

class Menu {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItemById(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  getItems() {
    return this.items;
  }

  getItemById(itemIdToFind) {
    return this.items.find((item) => item.id === itemIdToFind);
  }
  getItemByName(nameToFind) {
    return this.items.find(
      (item) => item.name.toLowerCase() === nameToFind.toLowerCase()
    );
  }
  reconstructMenu() {
    // Map through the items
    return this.items
      .map((item) => {
        // create instance of menuItem with each item
        // Call menuitem reconstruct
        const { id, type, name, price, linkedItems } = item;
        const menuItem = new MenuItem(id, type, name, price, linkedItems);
        return menuItem.reconstructMenuItem();
      })
      .join('\n\n');
  }
}

class MenuItem {
  constructor(id, type, name, price = null, linkedItems = []) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
    this.linkedItems = linkedItems;
  }

  addLinkedItem(item) {
    this.linkedItems.push(item);
  }
  getLinkedItems() {
    return this.linkedItems;
  }
  reconstructMenuItem() {
    // Add items values into a array and join with \n new line
    const values = [this.id, this.type, this.name, this.price].filter(
      (value) => value != undefined
    );
    const allValues = values.concat(this.linkedItems);

    return allValues.join('\n');
  }
}

const pricedItems = ['OPTION', 'ENTREE'];

const parseData = (streams) => {
  // Split string
  const lines = streams.split('\n');

  // Create a Menu Item
  // Create a Menu
  const menu = new Menu();
  // Define currItem
  let curItem = {};
  // Loop through the lines
  for (let line of lines) {
    if (line) {
      if (!curItem.id) {
        curItem['id'] = line;
      } else if (!curItem.type) {
        curItem['type'] = line;
      } else if (!curItem.name) {
        curItem['name'] = line;
      } else if (
        !curItem.price &&
        pricedItems.includes(curItem.type.toUpperCase())
      ) {
        curItem['price'] = line;
      } else {
        if (curItem.linkedItems && curItem.linkedItems.length > 0) {
          curItem.linkedItems.push(line);
        } else {
          curItem.linkedItems = [line];
        }
      }
    } else {
      if (Object.keys(curItem).length > 0) {
        const { id, type, name, price, linkedItems } = curItem;
        const menuItem = new MenuItem(id, type, name, price, linkedItems);
        menu.addItem(menuItem);
        curItem = {};
      }
    }
  }

  if (Object.keys(curItem).length > 0) {
    const { id, type, name, price, linkedItems } = curItem;
    const menuItem = new MenuItem(id, type, name, price, linkedItems);
    menu.addItem(menuItem);
    curItem = {};
  }
  return menu;
};
// -----------------------

const createMenu = () => {
  const items = [];

  return {
    addItem: (item) => this.items.push(item),
    removeItem: (itemToRemove) => {
      this.items = this.items.filter((item) => item !== itemToRemove);
    },
    getItems: () => {
      return this.items;
    },
    getItemById: (itemIdToFind) => {
      return this.items.find((item) => item.id === itemIdToFind);
    },
  };
};
// Empty string
console.log(parseData(`\n\n`));

// empty Strinsg
console.log(parseData(`\n`));

// 1 menu item

console.log(
  'single',
  parseData(`4
ENTREE
Spaghetti
10.95
2
3`)
);

// 2 menu item

// console.log(
//   parseData(`4
// ENTREE
// Spaghetti
// 10.95
// 2
// 3

// 1
// CATEGORY
// Pasta
// 4
// 5
// `)
// );

const data = parseData(`4
ENTREE
Spaghetti
10.95
2
3

1
CATEGORY
Pasta
4
5

2
OPTION
Meatballs
1.00

3
OPTION
Chicken
2.00

5
ENTREE
Lasagna
12.00

6
ENTREE
Caesar Salad
9.75
3`);
console.log(data.getItems());

// Item by name
const lasagna = data.getItemByName('Lasagna');
console.log('Item found', lasagna);

// Item by id and reconstruct
const item = data.getItemById('1');
console.log('Item found', item);
console.log(item.reconstructMenuItem());

// Menu reconstruct

console.log('Data in string', data.reconstructMenu());
