from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="sentinet/suicidality")

def analyze_text(text):
    result = classifier(text, truncation=True, padding=True, max_length=512)
    return result



