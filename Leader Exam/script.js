// ========================
// AUTH CHECK + LOGOUT
// ========================
const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "index.html" || currentPage === " ") {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser){
        window.location.href = "login.html";
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", ( ) => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        })
    }
}

// =========
// SIGNUP
// =========
if (currentPage === "signup.html") {
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(u => u.username === username)){
            alert("This User Already Exists!");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users",JSON.stringify(users));
        alert("You Succesfully Registered!");
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
     });
}

// =======
// LOGIN
// =======
if (currentPage === "login.html") {
    const loginForm = document.getElementById("loginForm");
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
    } else {
        alert("Username Or Password Is Incorrect ⚠️");
    }
}

// ===================
// POSTS (index.html)
// ===================
if (currentPage === "index.html" || currentPage === " ") {
    const form = document.getElementById("postForm");
    const postsContainer = document.getElementById("posts");
    const showAllBtn = document.getElementById("showAll");
    const showPublicBtn = document.getElementById("showPublic")
    const showPrivateBtn = document.getElementById("showPrivate");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentFilter = "all";

    function renderPosts() {
        postsContainer.innerHTML = " ";
        let filtered = posts;
        if (currentFilter === "public") {
            filtered = posts.filter(p => p.type === "public");
        } else if (currentFilter === "private"){
            filtered = posts.filter(p => p.type === "private");
        }

        filtered.forEach(p => {
            const div = document.createElement("div");
            div.className = "post";
            postsContainer.appendChild(div);
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const newPost = {
            title: document.getElementById("tite").value,
            body: document.getElementById("body").value,
            image: document.getElementById("image").value,
            type: document.getElementById("type").value,
            date: new Date().toLocaleString(),
            user: localStorage.getItem("currentUser")
        };
        posts.unshift(newPost);
        localStorage.setItem("posts", JSON,stringify(posts));
        form.reset();
        renderPosts();
    });

    function setActive(btn){
        [showAllBtn, showPrivateBtn, showPrivateBtn].forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    }

    showAllBtn.addEventListener("click", ( ) => {
        currentFilter = "all";
        setActive(showAllBtn)
        renderPosts();
    });

    showPublicBtn.addEventListener("click", ( ) => {
        currentFilter = "public";
        setActive(showPublicBtn);
        renderPosts();
    });

    showPrivateBtn.addEventListener("click", ( ) => {
        currentFilter = "private";
        setActive(showPrivateBtn);
        renderPosts();
    });

    renderPosts();
}


function submit(){
    const submit = document.getElementById("submit")
    submit.addEventListener("click", ( ) => {
        window.location.href = "./index.html";
    })
}


function logIn(){
    const login = document.getElementById("login")
    login.addEventListener("click", ( ) => {
        window.location.href = "./index.html"
    })
}