db = db.getSiblingDB('wishlistSample')
db.createCollection('lists')
listsCollection = db.getCollection("lists")
listsCollection.remove({})
listsCollection.insert(
{
	  name: "List A",
	  listId: 1,
      userId: 1,
      photoLink: "",
	  date: "10-24-2025",
      budget: 50
}
)
listsCollection.insert(
{
	  name: "List B",
	  listId: 2,
      userId: 1,
      photoLink: "",
	  date: "10-24-2025",
      budget: 50
}
)
listsCollection.insert(
{
	  name: "List C",
	  listId: 3,
      userId: 1,
      photoLink: "",
	  date: "10-24-2025",
      budget: 50
}
)
db.createCollection('items')
itemsCollection = db.getCollection("items")
itemsCollection.remove({})
itemsCollection.insert(
{
	listId : 1,
	items : [
	 {
	  name: "Item A",
	  itemId: 1,
      photoLink: "",
      price: 10,
      description: "",
      itemLink: "",
      isReserved: false
	 }
	]
}
)
tasksCollection.insert(
{
	listId : 2,
	tasks : [
	 {
	  name: "Item B",
	  itemId: 1,
      photoLink: "",
      price: 10,
      description: "",
      itemLink: "",
      isReserved: false
	 }
	]	
}
)
tasksCollection.insert(
{
	listId : 3,
	tasks : [
	 {
	  name: "Item C",
	  itemId: 1,
      photoLink: "",
      price: 10,
      description: "",
      itemLink: "",
      isReserved: false
	 }
	]	
}
)