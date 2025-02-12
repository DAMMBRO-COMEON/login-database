document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logout');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm['email'].value;
            const password = loginForm['password'].value;

            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'page1.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = registerForm['email'].value;
            const password = registerForm['password'].value;

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    return db.collection('users').doc(userCredential.user.uid).set({
                        email: email
                    });
                })
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            });
        });
    }
});