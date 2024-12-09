function createElemWithText(tag = 'p', textContent = '', className = '') {
    var element = document.createElement(tag);
    var content = document.createTextNode(textContent);

    element.appendChild(content);

    if (className != '') {
        element.classList.add(className);
    }

    return element
}


function createSelectOptions(users) {
    var options = []

    if (!users) {
        return undefined;
    }

    for (let i = 0; i < users.length; i++) {
        var user = users[i];

        var element = document.createElement('option');
        element.value = user.id
        element.textContent = user.name 

        options.push(element)

        console.log(element);
    }

    return options;
}

function toggleCommentSection(postId) {
    if (!postId) {
        return undefined;
    }

    var section = document.querySelector(`section[data-post-id='${postId}']`);

    if (!section) {
        return null;
    }

    section.classList.toggle('hide');

    return section;
}

function toggleCommentButton(postId) {
    if (!postId) {
        return undefined;
    }

    var button = document.querySelector(`button[data-post-id='${postId}']`);

    if (!button) {
        return null;
    }

    if (button.textContent == 'Show Comments') {
        button.textContent = 'Hide Comments';
    } else {
        button.textContent = 'Show Comments';
    }

    return button;
}

function deleteChildElements(parentElement) {
    if (!parentElement instanceof HTMLElement) {
        return undefined;
    }

    var i = 0;
    var child = parentElement.lastElementChild

    while (child = parentElement.lastElementChild) {
        parentElement.removeChild(child);
        console.log(child);

        if (i > 100) {
            break;
        }
        i++;
    }

    return parentElement;
}

function addButtonListeners() {
    var buttons = document.querySelectorAll('main button');

    for (let i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var postId = button.dataset.postId;
        if (!postId) {
            continue;
        }

        console.log(button);

        button.addEventListener("click", function(e) {
            toggleComments(e, postId);
        });
    }

    return buttons;
}

function removeButtonListeners() {
    var buttons = document.querySelectorAll('main button');

    for (let i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var postId = button.dataset.postId;
        if (!postId) {
            continue;
        }

        console.log(button);

        button.removeEventListener("click", function(e){});
    }

    return buttons
}

function createComments(comments) {
    if (!comments) {
        return undefined;
    }

    var fragment = document.createDocumentFragment();

    for (let i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var article = document.createElement('article');
        article.append(createElemWithText('h3', comment.name));
        article.append(createElemWithText('p', comment.body));
        article.append(createElemWithText('p', `From: ${comment.email}`));
        fragment.append(article);
    }

    return fragment;
}

function populateSelectMenu (users) {
    if (!users) {
        return undefined;
    }

    var select = document.getElementById("selectMenu");
    var elements = createSelectOptions(users);
    select.append(...elements);

    return select
}

async function getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json());
}

async function getUserPosts(userId) {
    if (!userId) {
        return undefined;
    }
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then((response) => response.json());
}

async function getUser(userId) {
    if (!userId) {
        return undefined;
    }

    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json());
}

async function getPostComments(postId) {
    if (!postId) {
        return undefined;
    }

    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => response.json());
}

async function displayComments(postId) {
    if (!postId) {
        return undefined;
    }

    var section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');

    var comments = await getPostComments(postId);
    var fragment = createComments(comments);

    section.append(fragment);
    console.log(section);
    return section;
}

async function createPosts(posts) {
    if (!posts) {
        return undefined;
    }

    var fragment = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
        var post = posts[i];
        var article = document.createElement('article')
        
        article.append(createElemWithText('h2', post.title));
        article.append(createElemWithText('p', post.body));
        article.append(createElemWithText('p', `Post ID: ${post.id}`));
        
        var author = await getUser(post.userId);
        article.append(createElemWithText('p', `Author: ${author.name} with ${author.company.name}`));
        article.append(createElemWithText('p', author.company.catchPhrase));

        var button = createElemWithText('button', 'Show Comments');
        button.dataset.postId = post.id;
        article.append(button);

        var section = await displayComments(post.id);
        article.append(section);

        fragment.append(article);
    }

    return fragment;
}

async function displayPosts(posts) {
    var main = document.getElementsByTagName('main')[0];

    if (!posts) {
        return createElemWithText('p', 'Select an Employee to display their posts.', 'default-text');
    }

    var postElements = await createPosts(posts);
    main.append(postElements);

    return postElements;
}

function toggleComments(e, postId) {
    //
}