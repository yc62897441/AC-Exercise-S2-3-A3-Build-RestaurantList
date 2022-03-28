// require packages used in the project
const express = require("express")
const app = express()
const port = 3000

// load data(餐廳資料)
const restaurantList = require("./restaurant.json")

// require express-handlebars here
const exphbs = require("express-handlebars")

// setting template engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// setting static files
app.use(express.static("public"))

// routes setting index page (main page)
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results })
})

// route setting search bar output
app.get("/search", (req, res) => {
  keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
  // 如果有成功搜尋到結果，則清空回傳到search bar的字串
  if (restaurants.length > 0) {
    keyword = ""
  }
  res.render("index", { restaurants: restaurants, keyword: keyword })
})

// routes setting single restaurant page
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id.toString().toLowerCase()
  const restaurant = restaurantList.results.find(item => item.id.toString().toLowerCase() === id)
  res.render("show", { restaurant: restaurant })
})

// 啟動監聽server
app.listen(port, () => {
  console.log(`Serve is listening on http://localhost:${port}`)
})
