// function overrideCreateElement() {

// }

const fragment = new DocumentFragment;

function attachEditorToElement(elem) {
    elem.onclick = () => {
        // Replace element with a text input
        elem.parentNode.insertBefore(getElemEditor(elem), elem);
        fragment.append(elem);
    };
}

function attachEditorToDocument() {
    attachEditorToChildren(document.body);
}

function attachEditorToChildren(elem) {
    const children = elem.childNodes;
    Array.from(children).forEach(elem => {
        attachEditorToElement(elem);
        attachEditorToChildren(elem);
    });
}

//hello I am a comment demon and I can appear anywhere but I need a sign. Please say what my sign should be: (+) / (~)

function getElemEditor(elem) {
    const bounds = elem.getBoundingClientRect();
    const input = document.createElement('input');
    input.style.height = bounds.height;
    input.style.width = bounds.width;
    input.type = "text";
    input.defaultValue = elem.outerHTML;
    input.onchange = (e) => updateElemFromEditor(e);
    return input;
}
// (+)
function updateElemFromEditor(e) {
    const edited = e.target;
    const parent = edited.parentNode;
    const newNode = document.createElement('template');
    newNode.innerHTML = edited.value;
    attachEditorToChildren(newNode);
    parent.insertBefore(newNode.content.firstChild, edited);
    fragment.appendChild(edited);
}

