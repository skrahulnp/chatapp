var firebaseConfig = {
    apiKey: "AIzaSyDBjZ-hrQfIQHI-_5nN4OYF232BLmlD-pw",
    authDomain: "chatapp-4f36f.firebaseapp.com",
    projectId: "chatapp-4f36f",
    storageBucket: "chatapp-4f36f.appspot.com",
    messagingSenderId: "68728329680",
    appId: "1:68728329680:web:3a9000ccac88fb605d55d5",
    measurementId: "G-P1FF2K0DLF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.database();

  const username = prompt("Please Tell Us Your Name");

  document.getElementById("message-form").addEventListener("submit", sendMessage);

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const fetchChat = db.ref("messages/");
  
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });