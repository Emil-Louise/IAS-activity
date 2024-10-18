let errorStates = {
    fname: false,
    mname: false,
    lname: false,
    email: false,
    type: false
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
    element.style.boxShadow = '3px 3px 5px red, -3px 3px 5px red, 3px -3px 5px red, -3px -3px 5px red';
    setTimeout(() => {
        element.style.transition = "0.1s ease-in-out";
        element.style.boxShadow = '3px 3px 5px rgb(540, 67, 54, 60%), -3px 3px 5px rgb(540, 67, 54, 60%), 3px -3px 5px rgb(540, 67, 54, 60%), -3px -3px 5px rgb(540, 67, 54, 60%)';
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
    const type = document.querySelector("#membershipType");
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

    // Validate membership
    if (type.value === 'Select membership') {
        valid = false;
        showError(type, 'Please select membership type');
        selected = false;
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

    return { valid, selected };
}

function apply() {
    const { valid, selected } = validateFields();

    if (valid && selected) {
        const modal = new bootstrap.Modal(document.querySelector('#modalConfirm'));
        modal.show();
        document.querySelector('#nameConfirm').textContent = `${document.querySelector('#fname').value.toUpperCase()} ${document.querySelector('#mname').value.toUpperCase()} ${document.querySelector('#lname').value.toUpperCase()}`;
        document.querySelector('#emailConfirm').textContent = document.querySelector('#inpEmail').value;
        document.querySelector('#typeConfirm').textContent = document.querySelector('#membershipType').value;
    }

    // Clear outlines on focus
    ['fname', 'mname', 'lname', 'inpEmail', 'membershipType'].forEach(id => {
        document.querySelector(`#${id}`).addEventListener('focus', (event) => event.target.style.boxShadow = 'none');
    });
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
        const type = document.querySelector('#type').value;
        // document.querySelector('#type').innerHTML = type;
        Swal.fire({
            title: "Application successful!",
            text: "You have applied to " + type + " membership",
            icon: "success",
            backdrop: false
        }).then((result) => {
            if (result.isConfirmed || result.dismiss) {
                window.location.href = 'membership.html';
            }
        });
    });
}