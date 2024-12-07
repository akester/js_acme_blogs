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

