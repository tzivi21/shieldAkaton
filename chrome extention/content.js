let interval;
function getFacebookPosts() {
  let posts = document.querySelectorAll('div[role="article"]');
  let extractedPosts = [];

  posts.forEach(post => {
    console.log(post);
    let content = getContent(post);
    console.log(content);
    let userName = getUserName(post);
    console.log(userName);
    if (content && userName) {
      let postObject = {
        username: userName,
        content: content,
      };
      extractedPosts.push(postObject);
    }
  });

  if (extractedPosts.length > 0) {
    console.log("Extracted Posts:", extractedPosts);
    sendToServer(extractedPosts);
  } else {
    console.log("No posts found.");
  }
}

function getUserName(post) {
  let profileDiv = post.querySelector('div[data-ad-rendering-role="profile_name"]');
  if (!profileDiv) {
    return null;
  }
  let userName = "";
  let spans = profileDiv.querySelectorAll('span');
  spans.forEach(span => {
    if (userName == "") {
      userName += span.textContent.trim();
    }
  });
  return userName;
}

function getContent(post) {
  let postDiv = post.querySelector('div[data-ad-comet-preview="message"]');
  if (!postDiv) {
    return null;
  }
  let children = postDiv.querySelectorAll('div');
  let textContent = '';
  children.forEach(child => {
    if (textContent == "") {
      textContent += child.textContent.trim() + ' ';
    }
  });
  return textContent;
}

function sendToServer(posts) {
  posts.forEach(post => {
    fetch('http://127.0.0.1:5000/default/calculateSuicidePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(response => {
      if (response.ok) {
        console.log("Posts sent successfully!");
      } else {
        console.error("Failed to send posts.");
      }
    }).catch(error => console.error("Error:", error));
  })

}

window.addEventListener('load', () => {
  clearInterval(interval);
  interval=setInterval(getFacebookPosts, 5000);
});

window.addEventListener('beforeunload', () => {
  clearInterval(interval); 
});


