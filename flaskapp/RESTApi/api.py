from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flaskext.mysql import MySQL

app = Flask(__name__)
api = Api(app)

# sql config
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root@123'
app.config['MYSQL_DATABASE_DB'] = 'sanskrit'
app.config['MYSQL_DATABASE_HOST'] = '192.168.1.80'
mysql.init_app(app)

class CreateUser(Resource):
    def post(self):
        try:
            #parsing email and pwd from args 
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('spCreateUser',(_userEmail,_userPassword))
            data = cursor.fetchall()
            if len(data) is 0:
                conn.commit()
                return {'StatusCode':'200','Message': 'User creation success'}
            else:
                return {'StatusCode':'1000','Message': str(data[0])}

        except Exception as e:
            return {'error': str(e)}


api.add_resource(CreateUser, '/CreateUser')

if __name__ == '__main__':
    app.run(debug=True)