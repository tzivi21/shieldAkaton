from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="sentinet/suicidality")

def analyze_text(text):
    result = classifier(text)
    label = result[0]['label']
    score = result[0]['score'] * 100
    return {score:score, label:label}

# דוגמה לשימוש בפונקציה
# if __name__ == "__main__":
#     text = "i am dying dying to eat"
#     result = analyze_text(text)

#     # תוצאות

#     print(f"Label: {label}")
#     print(f"Score: {score:.2f}%")

