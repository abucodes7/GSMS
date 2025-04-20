from flask import Flask, render_template, request, redirect, session, url_for, flash
from datetime import timedelta
import sqlite3

app = Flask(__name__)
app.secret_key = 'gsms_secret_key'
app.permanent_session_lifetime = timedelta(minutes=30)

# DB init (run once)
def init_db():
    with sqlite3.connect("database.db") as con:
        cur = con.cursor()
        cur.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)')
        cur.execute('CREATE TABLE IF NOT EXISTS admins (adminname TEXT, password TEXT)')
        cur.execute('''CREATE TABLE IF NOT EXISTS products (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT,
                          category TEXT,
                          price INTEGER,
                          quantity INTEGER,
                          image TEXT,
                          description TEXT)''')
        con.commit()

# Home page
@app.route("/")
def home():
    return render_template("home.html")

# User login
@app.route("/user_login", methods=["GET", "POST"])
def user_login():
    if request.method == "POST":
        uname = request.form["username"]
        pwd = request.form["password"]
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM users WHERE username=? AND password=?", (uname, pwd))
            user = cur.fetchone()
            if user:
                session["user"] = uname
                return redirect(url_for("products"))
            else:
                flash("Invalid credentials")
    return render_template("user_login.html")

# Admin login
@app.route("/admin_login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        admin = request.form["adminname"]
        pwd = request.form["password"]
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM admins WHERE adminname=? AND password=?", (admin, pwd))
            result = cur.fetchone()
            if result:
                session["admin"] = admin
                return redirect(url_for("admin_panel"))
            else:
                flash("Invalid admin login")
    return render_template("admin_login.html")

# Signup
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        uname = request.form["username"]
        pwd = request.form["password"]
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("INSERT INTO users VALUES (?,?)", (uname, pwd))
            con.commit()
        return redirect(url_for("user_login"))
    return render_template("signup.html")

# Product page
@app.route("/products")
def products():
    if "user" in session:
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM products")
            items = cur.fetchall()
        return render_template("products.html", products=items)
    return redirect(url_for("user_login"))

# Cart page
@app.route("/cart")
def cart():
    if "user" in session:
        # Assume 10 mins for every item in cart
        pickup_time = len(session.get("cart", [])) * 10
        return render_template("cart.html", cart=session.get("cart", []), time=pickup_time)
    return redirect(url_for("user_login"))

# Add to cart
@app.route("/add_to_cart/<int:pid>")
def add_to_cart(pid):
    if "user" in session:
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM products WHERE id=?", (pid,))
            product = cur.fetchone()
            if product:
                if "cart" not in session:
                    session["cart"] = []
                cart = session["cart"]
                cart.append({"id": pid, "name": product[1], "price": product[3]})
                session["cart"] = cart
        return redirect(url_for("cart"))
    return redirect(url_for("user_login"))

# Admin panel
@app.route("/admin_panel", methods=["GET", "POST"])
def admin_panel():
    if "admin" in session:
        if request.method == "POST":
            name = request.form["name"]
            category = request.form["category"]
            price = request.form["price"]
            quantity = request.form["quantity"]
            img = request.form["image"]
            desc = request.form["description"]
            with sqlite3.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("INSERT INTO products (name, category, price, quantity, image, description) VALUES (?,?,?,?,?,?)",
                            (name, category, price, quantity, img, desc))
                con.commit()
        with sqlite3.connect("database.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM products")
            items = cur.fetchall()
        return render_template("admin_panel.html", products=items)
    return redirect(url_for("admin_login"))

# Ready to pickup (message simulation)
@app.route("/notify/<username>")
def notify(username):
    flash(f"Notification sent to {username} → Order Ready for Pickup ✅")
    return redirect(url_for("admin_panel"))

# Logout
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))

# Run app
if __name__ == "__main__":
    init_db()  # Only first time
    app.run(debug=True)
