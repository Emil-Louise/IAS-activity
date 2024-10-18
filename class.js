let subjectCount = 1;
let errorStates = {
    fname: false,
    mname: false,
    lname: false,
    email: false,
    subject: false,
    subjectSelect: false
};

function createErrorMessage(text) {
    const errorMessage = document.createElement('span');
    errorMessage.className = 'errorMessage';
    errorMessage.style.position = 'absolute';
    errorMessage.style.color = 'rgb(244, 67, 54)';
    errorMessage.style.fontSize = '16px';
    errorMessage.textContent = text;
    return errorMessage;
}

function showError(element, message) {
    element.style.transition = "0.1s ease-in-out";
    element.style.outline = "solid 4px rgba(244, 67, 54)";
    setTimeout(() => {
        element.style.transition = "0.1s ease-in-out";
        element.style.outline = "solid 4px rgba(244, 67, 54, .6)";
    }, 300);

    if (!element.parentElement.querySelector('.errorMessage') && !errorStates[element.id]) {
        errorStates[element.id] = true;
        const errorMessage = createErrorMessage(message);
        element.parentElement.appendChild(errorMessage);
        element.addEventListener('focus', () => {
            errorStates[element.id] = false;
            element.parentElement.removeChild(errorMessage);
        }, { once: true });
    }
}

function validateFields() {
    const fname = document.querySelector('#fname');
    const mname = document.querySelector('#mname');
    const lname = document.querySelector('#lname');
    const email = document.querySelector('#inpEmail');
    const courses = document.getElementsByClassName("course");
    let valid = true;
    let selected = true;

    // Validate first name
    if (fname.value.trim() === '' || fname.value.startsWith(' ')) {
        valid = false;
        showError(fname, fname.value.trim() === '' ? 'Please enter your first name' : 'Name can\'t start with spaces');
    }

    // Validate middle name
    if (mname.value.startsWith(' ')) {
        valid = false;
        showError(mname, 'Middle name can\'t start with spaces');
    }

    // Validate last name
    if (lname.value.trim() === '' || lname.value.startsWith(' ')) {
        valid = false;
        showError(lname, lname.value.trim() === '' ? 'Please enter your last name' : 'Last name can\'t start with spaces');
    }

    // Validate email
    if (email.value.trim() === '') {
        valid = false;
        showError(email, 'Please enter your email address');
    } else if (!email.value.includes('@') || !email.value.includes('.com') || email.value.includes(' ')) {
        valid = false;
        let errorMessage = 'Email should include \'@\' and .com';
        if (email.value.includes(' ')) {
            errorMessage = 'Email should not include spaces';
        }
        showError(email, errorMessage);
    }

    // Validate subjects
    for (let i = 0; i < subjectCount; i++) {
        if (courses[i].value === 'Select subject') {
            valid = false;
            showError(courses[i], 'Please select a subject');
            selected = false;
        }
    }

    return { valid, selected };
}

function register() {
    const { valid, selected } = validateFields();

    if (valid && selected) {
        const modal = new bootstrap.Modal(document.querySelector('#modalConfirm'));
        modal.show();
        document.querySelector('#nameConfirm').textContent = `${document.querySelector('#fname').value.toUpperCase()} ${document.querySelector('#mname').value.toUpperCase()} ${document.querySelector('#lname').value.toUpperCase()}`;
        document.querySelector('#emailConfirm').textContent = document.querySelector('#inpEmail').value;

        const courseList = Array.from(document.getElementsByClassName('course')).map(course => course.value).join(', ');
        document.querySelector('#course').innerHTML = courseList;
    }

    // Clear outlines on focus
    ['fname', 'mname', 'lname', 'inpEmail', ...Array.from(document.getElementsByClassName('course')).map(course => course.id)].forEach(id => {
        document.querySelector(`#${id}`).addEventListener('focus', (event) => event.target.style.outline = 'none');
    });
}

function add() {
    if (subjectCount >= 5) {
        alert('You\'ve selected all subjects');
        return;
    }

    const selected = document.querySelector(`#selCourse${subjectCount}`);
    if (selected.value === 'Select subject') {
        if (!selected.parentElement.querySelector('.errorMessage')) {
            errorStates.subjectSelect = true;
            const errorMessage = createErrorMessage('Please select a subject first');

            selected.parentElement.appendChild(errorMessage);
            selected.style.outline = "solid 4px rgba(244, 67, 54, .6)";

            selected.addEventListener('focus', () => {
                errorStates.subjectSelect = false;
                selected.parentElement.removeChild(errorMessage);
            });
        }

        selected.addEventListener('focus', (event) => event.target.style.outline = 'none');
        return;
    }

    subjectCount++;
    createSubjectSelect();
}

function createSubjectSelect() {
    const newDiv = document.createElement('div');
    newDiv.className = "col-10 mt-3";

    const options = document.createElement('select');
    options.className = "form-select course";
    options.id = `selCourse${subjectCount}`;
    options.appendChild(createSubjectOption('Select subject', true));

    const subjects = ["IAS 1", "OS", "IM 3", "NET 2", "HCI 1"];
    subjects.forEach(subject => {
        options.appendChild(createSubjectOption(subject));
    });

    function updateOptions() {
        const selectedValues = Array.from(document.querySelectorAll('.course')).map(select => select.value);
        document.querySelectorAll('.course').forEach(select => {
            select.querySelectorAll('option').forEach(option => {
                if (selectedValues.includes(option.value) && option.value !== select.value) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            });
        });
    }
    options.addEventListener('focus', updateOptions);

    newDiv.appendChild(options);
    document.querySelector('#subjects').appendChild(newDiv);

    const removeButton = createRemoveButton(newDiv);
    document.querySelector('#subjects').appendChild(removeButton);
}

function createSubjectOption(text, hidden = false) {
    const option = document.createElement('option');
    option.textContent = text;
    option.value = text;
    if (hidden) option.hidden = true;
    return option;
}

function createRemoveButton(newDiv) {
    const removeButton = document.createElement('div');
    removeButton.className = "col-2 mt-3";

    const btn = document.createElement('button');
    btn.className = "btn btn-light border border-sublte";
    btn.type = 'button';
    btn.appendChild(createIcon('bi bi-dash-lg'));

    btn.addEventListener('click', () => {
        newDiv.remove();
        removeButton.remove();
        subjectCount--;
    });

    removeButton.appendChild(btn);
    return removeButton;
}

function createIcon(className) {
    const icon = document.createElement('i');
    icon.className = className;
    return icon;
}

function confirmRegister() {
    let timerInterval;
    let mdl = document.querySelector('#modalConfirm');
    mdl.classList.remove('show');
    mdl.setAttribute('aria-hidden', 'true');
    mdl.setAttribute('style', 'display: none');
    Swal.fire({
        title: "Checking credentials",
        html: "This will take a moment.",
        timer: 2000,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then(() => {
        const courseList = Array.from(document.getElementsByClassName('course')).map(course => course.value).join(', ');
        document.querySelector('#course').innerHTML = courseList;
        Swal.fire({
            title: "Registration successful!",
            text: "You are now registered to " + courseList,
            icon: "success",
            backdrop: false
        }).then((result) => {
            if (result.isConfirmed || result.dismiss) {
                window.location.href = 'confirm.html';
            }
        });
    });
}
