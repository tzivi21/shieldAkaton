function getFacebookPosts() {
  let posts = document.querySelectorAll('div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd');
  let extractedPosts = [];
  posts.forEach(post => {
    let content = post.querySelector('div.x78zum5.xdt5ytf');
    if (content) {
      extractedPosts.push(content.innerText.trim());
    }
  });
  console.log(extractedPosts);
  if (extractedPosts.length > 0) {
    formatPost=parseFacebookPost(extractedPosts);
    console.log(formatPost);
    sendToServer(formatPost);
  } else {
    console.log("No posts found.");
  }
}
function parseFacebookPost(rawData) {
  let parsedPost = {
      username: rawData[1],  
      content: rawData[10],  
      timePosted: rawData[4].match(/‏(\d+ שעות)/)?.[1] || "unknown", 
      views: rawData[15] || "unknown"
  };
  return parsedPost;
}

function printObjectFields(obj) {
  let object = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      object += `${key}: ${obj[key]}`;
    }
  }
  alert(object);
}

function sendToServer(posts) {

  fetch('http://127.0.0.1:5000/default/calculateSuicidePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(posts)
  }).then(response => {
    if (response.ok) {
      console.log("Posts sent successfully!");
    } else {
      console.error("Failed to send posts.");
    }
  }).catch(error => console.error("Error:", error));
}

// הפעלת פונקציה כאשר הדף נטען
window.addEventListener('load', () => {
  setTimeout(getFacebookPosts, 5000);
});
