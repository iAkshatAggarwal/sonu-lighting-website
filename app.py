from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = 'my_secret_key'

# define the items and their prices
items = [
    {"name": "Item 1", "price": 100, "img": "item1.jpg"},
    {"name": "Item 2", "price": 150, "img": "item2.jpg"},
    {"name": "Item 3", "price": 200, "img": "item3.jpg"},
    {"name": "Item 4", "price": 250, "img": "item4.jpg"},
    {"name": "Item 5", "price": 300, "img": "item5.jpg"}
]

@app.route("/")
def index():
    return render_template("home.html", items=items)

@app.route("/add_to_cart", methods=["POST"])
def add_to_cart():
    item_name = request.form["item_name"]
    item_price = next(item["price"] for item in items if item["name"] == item_name)
    session.setdefault("cart", []).append({"name": item_name, "price": item_price})
    return redirect("/")

@app.route("/cart")
def cart():
    cart = session.get("cart", [])
    total_price = sum(item["price"] for item in cart)
    return render_template("cart.html", cart=cart, total_price=total_price)

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
