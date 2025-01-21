from flask import Flask, request
from flask_restx import Api, Resource, fields, Namespace
from flask_cors import CORS

from suicide import analyze_text

app = Flask(__name__)

# Enable CORS globally for all routes (if needed)
CORS(app, resources={r"/*": {"origins": "*"}})

# Specific CORS configurations for the routes
CORS(app, resources={r"/default/calculateSuicidePost": {
    "origins": "https://www.facebook.com",
    "methods": ["POST"],
    "allow_headers": ["Content-Type"]  # Allow Content-Type header
}})

CORS(app, resources={r"/default/getAllPosts": {
    "origins": "https://www.facebook.com",
    "methods": ["GET"],
    "allow_headers": ["Content-Type"]  # Allow Content-Type header
}})

posts = []

api = Api(app, title="Double Text API", description="API שמכפל טקסט שנשלח ב-POST")

# Define namespace
ns = Namespace('default', description='Default namespace')
api.add_namespace(ns)

# Define the Swagger model
text_model = ns.model('TextModel', {
    'content': fields.String(required=True, description='הטקסט להכפלה'),
    'username': fields.String(required=True, description='שם משתמש')
})

@ns.route('/calculateSuicidePost')
class CalculateSuicideText(Resource):
    @ns.expect(text_model)
    @ns.doc(description="מקבל טקסט ומחזיר את מידת האובדנות שבו.")
    def post(self):
        data = request.json
        if not data or 'content' not in data or 'username' not in data:
            return {"error": "Missing 'content' or 'username' in request body"}, 400
        text = data['content']
        username = data['username']
        if(any(post["username"] == username for post in posts) and any(post["content"] == text for post in posts)):
            return {"error": "Post already exists"}, 400
        suicide_rate = analyze_text(text)
        isSucicide = False
        if suicide_rate[0]["label"] == "LABEL_1" and suicide_rate[0]["score"]*100 > 95:
            isSucicide = True
        fullPost = {
            "content": text,
            "username": username,
            "suicide_rate": suicide_rate,
            "isSucicide": isSucicide,
        }

        posts.append(fullPost)
        return fullPost, 200

@ns.route('/getAllPosts')
class GetAllPosts(Resource):
    @ns.doc(description="מחזיר את כל הפוסטים השמורחים.")
    def get(self):
        return posts, 200

if __name__ == '__main__':
    app.run(debug=True)
