from transformers import pipeline

# הגדרת המודל
classifier = pipeline("sentiment-analysis", model="sentinet/suicidality")

# פונקציה לניתוח טקסט
def analyze_text(text):
    result = classifier(text)
    return result

# דוגמה לשימוש בפונקציה
if __name__ == "__main__":
    text = "i am dying dying to eat"
    result = analyze_text(text)

    # תוצאות
    label = result[0]['label']
    score = result[0]['score'] * 100
    print(f"Label: {label}")
    print(f"Score: {score:.2f}%")

