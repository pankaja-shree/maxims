mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root@123'
app.config['MYSQL_DATABASE_DB'] = 'employee'
app.config['MYSQL_DATABASE_HOST'] = '192.168.1.80'
mysql.init_app(app)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()