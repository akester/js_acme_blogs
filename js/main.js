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