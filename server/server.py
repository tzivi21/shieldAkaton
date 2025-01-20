from flask import Flask, request
from flask_restx import Api, Resource, fields, Namespace
from flask_cors import CORS  # ייבוא flask_cors

from suicide import analyze_text

app = Flask(__name__)
CORS(app)  # הפעלת CORS לכל הבקשות
posts = []

api = Api(app, title="Double Text API", description="API שמכפל טקסט שנשלח ב-POST")

# הגדרת namespace
ns = Namespace('default', description='Default namespace')
api.add_namespace(ns)

# הגדרת המודל ל-Swagger
text_model = ns.model('TextModel', {
    'text': fields.String(required=True, description='הטקסט להכפלה'),
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
        suicide_rate = analyze_text(text)
        fullPost = {
            "content": text,
            "username": username,
            "suicide_rate": suicide_rate
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