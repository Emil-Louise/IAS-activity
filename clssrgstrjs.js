let subjectCount = 1;
let errMessF = false;
let errMessL = false;
let errMessE = false;
let errMessS = false;
let errMessSelS = false;

function register() {
    let fname = document.querySelector('#fname');
    let mname = document.querySelector('#mname');
    let lname = document.querySelector('#lname');
    let email = document.querySelector('#inpEmail');
    let course = document.getElementsByClassName("course");
    let courseList = '';
    let valid = true;
    let selected = true;

    for (let i = 0; i < subjectCount; i++) {
        if (course[i].value == 'Select subject') {
            course[i].style.transition = "0.04s ease";
            course[i].style.outline = "solid 4px rgb(244, 67, 54, .6)";
            selected = false;

            if (!course[i].parentElement.querySelector('.errorMessage') && !errMessS) {
                errMessS = true;
                let errorMessage = document.createElement('span');
                errorMessage.textContent = 'Please select a subject';
                errorMessage.className = 'errorMessage';
                errorMessage.style.position = 'absolute';
                errorMessage.style.color = 'rgb(244, 67, 54)';
                errorMessage.style.fontSize = '16px';

                course[i].parentElement.appendChild(errorMessage);
                course[i].addEventListener('focus', (event) => {
                    errMessS = false;
                    course[i].parentElement.removeChild(errorMessage);
                })
            }
        }
    }
    if (fname.value.trim() === '') {
        valid = false;
        fname.style.transition = "0.04s ease";
        fname.style.outline = "solid 4px rgb(244, 67, 54, .6)";

        if (!fname.parentElement.querySelector('.errorMessage') && !errMessF) {
            errMessF = true;
            let errorMessage = document.createElement('span');
            errorMessage.textContent = 'Please enter your first name';
            errorMessage.className = 'errorMessage';
            errorMessage.style.position = 'absolute';
            errorMessage.style.color = 'rgb(244, 67, 54)';
            errorMessage.style.fontSize = '16px';

            fname.parentElement.appendChild(errorMessage);
            fname.addEventListener('focus', (event) => {
                errMessF = false;
                fname.parentElement.removeChild(errorMessage);
            })
        }
    }
    if (lname.value.trim() === '') {
        valid = false;
        lname.style.transition = "0.04s ease";
        lname.style.outline = "solid 4px rgb(244, 67, 54, .6)";

        if (!lname.parentElement.querySelector('.errorMessage') && !errMessL) {
            errMessL = true;
            let errorMessage = document.createElement('span');
            errorMessage.textContent = 'Please enter your last name';
            errorMessage.className = 'errorMessage';
            errorMessage.style.position = 'absolute';
            errorMessage.style.color = 'rgb(244, 67, 54)';
            errorMessage.style.fontSize = '16px';

            lname.parentElement.appendChild(errorMessage);
            lname.addEventListener('focus', (event) => {
                errMessL = false;
                lname.parentElement.removeChild(errorMessage);
            })
        }
    }
    if (email.value.trim() === '') {
        valid = false;
        email.style.transition = "0.04s ease";
        email.style.outline = "solid 4px rgb(244, 67, 54, .6)";

        if (!email.parentElement.querySelector('.errorMessage') && !errMessE) {
            errMessE = true;
            let errorMessage = document.createElement('span');
            errorMessage.textContent = 'Please enter your email address';
            errorMessage.className = 'errorMessage';
            errorMessage.style.position = 'absolute';
            errorMessage.style.color = 'rgb(244, 67, 54)';
            errorMessage.style.fontSize = '16px';

            email.parentElement.appendChild(errorMessage);
            email.addEventListener('focus', (event) => {
                errMessE = false;
                email.parentElement.removeChild(errorMessage);
            })
        }
    }
    if (!email.parentElement.querySelector('.errorMessage') && !errMessE && !email.value.includes('@')) {
        valid = false;
        email.style.transition = "0.04s ease";
        email.style.outline = "solid 4px rgb(244, 67, 54, .6)";

        errMessE = true;
        let errorMessage = document.createElement('span');
        errorMessage.textContent = 'Email should incude \'@\'';
        errorMessage.className = 'errorMessage';
        errorMessage.style.position = 'absolute';
        errorMessage.style.color = 'rgb(244, 67, 54)';
        errorMessage.style.fontSize = '16px';

        email.parentElement.appendChild(errorMessage);
        email.addEventListener('focus', (event) => {
            errMessE = false;
            email.parentElement.removeChild(errorMessage);
        })
    }
    if (valid && selected) {
        const modal = new bootstrap.Modal(document.querySelector('#modalConfirm'));
        modal.show();
        document.querySelector('#testconfirm').textContent = fname.value.toUpperCase() + " " + mname.value.toUpperCase() + " " + lname.value.toUpperCase();
        document.querySelector('#testconfirm2').textContent = email.value;
        let comma = ', ';
        for (let i = 0; i < subjectCount; i++) {
            if (i == subjectCount - 1)
                comma = '';
            courseList += course[i].value + comma;
        };
        document.querySelector('#course').innerHTML = courseList;
    }

    for (let i = 0; i < subjectCount; i++) {
        course[i].addEventListener('focus', (event) => event.target.style.outline = 'none');
    }
    fname.addEventListener('focus', (event) => event.target.style.outline = 'none');
    lname.addEventListener('focus', (event) => event.target.style.outline = 'none');
    email.addEventListener('focus', (event) => event.target.style.outline = 'none');
}

function add() {
    let selected = document.querySelector('#selCourse' + subjectCount);
    if (selected.value == 'Select subject') {
        errMessSelS = true;
        let errorMessage = document.createElement('span');
        errorMessage.textContent = 'Please select a subject first';
        errorMessage.className = 'errorMessage';
        errorMessage.style.position = 'absolute';
        errorMessage.style.color = 'rgb(244, 67, 54)';
        errorMessage.style.fontSize = '16px';

        selected.parentElement.appendChild(errorMessage);
        selected.addEventListener('focus', (event) => {
            errMessSelS = false;
            selected.parentElement.removeChild(errorMessage);
        })
        selected.style.outline = "solid 4px rgb(244, 67, 54, .6)";
    }
    else if (subjectCount >= 3) {
        alert('You\'ve selected all subjects');
    }
    else {
        subjectCount++;

        // subject seletions
        let newDiv = document.createElement('div');
        newDiv.className = "col-10 mt-3";

        let options = document.createElement('select');
        options.className = "form-select course";
        options.ariaLabel = "Default select example";
        options.textContent = 'test';
        options.id = "selCourse" + subjectCount;

        let subjectOptions = document.createElement('option');
        subjectOptions.textContent = "Select subject";
        options.appendChild(subjectOptions);

        let subjects = ["One", "Two", "Three"];
        subjects.forEach(subject => {
            let option = document.createElement('option');
            option.textContent = subject;
            option.value = subject;
            options.appendChild(option);
        });

        newDiv.appendChild(options);

        //remove button
        let removeButton = document.createElement('div');
        removeButton.className = "col-2 mt-3"

        let btn = document.createElement('button');
        btn.className = "btn btn-light border border-sublte";
        btn.type = 'button';

        let icon = document.createElement('i');
        icon.className = "bi bi-dash-lg";
        btn.appendChild(icon);

        btn.addEventListener('focus', function () {
            classSel.removeChild(newDiv);
            classSel.removeChild(removeButton);
            subjectCount--;
        })
        removeButton.appendChild(btn);

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

        let classSel = document.querySelector('#subjects');
        classSel.appendChild(newDiv);
        classSel.appendChild(removeButton);
    }
    selected.addEventListener('focus', (event) => event.target.style.outline = 'none');
}

function confirmRegister() {
    let timerInterval;
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
    }).then((result) => {
        let course = document.getElementsByClassName('course');
        let courseList = '';
        let comma = ', ';
        for (let i = 0; i < subjectCount; i++) {
            if (i == subjectCount - 1)
                comma = '';
            courseList += course[i].value + comma;
        };
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