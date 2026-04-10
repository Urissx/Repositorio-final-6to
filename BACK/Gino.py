from flask import Flask, render_template, request, redirect, session
import sqlite3

app = Flask(__name__)
app.secret_key = "secretkey"

# ---------------- DB ----------------
def get_db():
    return sqlite3.connect("database.db")

def init_db():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        favorite_game TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        game TEXT,
        format TEXT,
        rules TEXT,
        prize TEXT,
        date TEXT,
        max_players INTEGER
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        tournament_id INTEGER
    )
    """)

    db.commit()
    db.close()

init_db()

# ---------------- HOME ----------------
@app.route("/")
def home():
    return render_template("index.html")

# ---------------- TORNEOS ----------------
@app.route("/tournaments")
def tournaments():
    db = get_db()
    cursor = db.cursor()

    game = request.args.get("game")

    if game:
        cursor.execute("SELECT * FROM tournaments WHERE game LIKE ?", ('%' + game + '%',))
    else:
        cursor.execute("SELECT * FROM tournaments")

    data = cursor.fetchall()
    return render_template("tournaments.html", tournaments=data)

# ---------------- CREAR TORNEO ----------------
@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        data = request.form

        db = get_db()
        cursor = db.cursor()

        cursor.execute("""
        INSERT INTO tournaments (name, game, format, rules, prize, date, max_players)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data["name"],
            data["game"],
            data["format"],
            data["rules"],
            data["prize"],
            data["date"],
            data["max_players"]
        ))

        db.commit()
        return redirect("/tournaments")

    return render_template("create_tournament.html")

# ---------------- UNIRSE ----------------
@app.route("/join/<int:id>")
def join(id):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("INSERT INTO participants (user_id, tournament_id) VALUES (1, ?)", (id,))
    db.commit()

    return redirect("/tournaments")

# ---------------- PERFIL ----------------
@app.route("/profile", methods=["GET", "POST"])
def profile():
    db = get_db()
    cursor = db.cursor()

    if request.method == "POST":
        fav = request.form["favorite_game"]
        cursor.execute("UPDATE users SET favorite_game=? WHERE id=1", (fav,))
        db.commit()

    cursor.execute("SELECT * FROM users WHERE id=1")
    user = cursor.fetchone()

    return render_template("profile.html", user=user)

# ---------------- CHAT ----------------
messages = []

@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "POST":
        msg = request.form["message"]
        messages.append(msg)

    return render_template("chat.html", messages=messages)

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)