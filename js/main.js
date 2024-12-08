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

function toggleComments(e, postId) {
    //
}