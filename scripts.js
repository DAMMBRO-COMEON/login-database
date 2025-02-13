document.addEventListener('DOMContentLoaded', function() {
    const surveyForm1 = document.getElementById('surveyForm1');
    const surveyForm2 = document.getElementById('surveyForm2');

    if (surveyForm1) {
        surveyForm1.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = surveyForm1['name'].value;
            const email = surveyForm1['email'].value;
            const age = surveyForm1['age'].value;

            // Save data to localStorage
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('age', age);

            // Redirect to page 2
            window.location.href = 'page2.html';
        });
    }

    if (surveyForm2) {
        surveyForm2.addEventListener('submit', function(e) {
            e.preventDefault();
            const satisfaction = surveyForm2['satisfaction'].value;
            const comments = surveyForm2['comments'].value;

            // Retrieve data from localStorage
            const name = localStorage.getItem('name');
            const email = localStorage.getItem('email');
            const age = localStorage.getItem('age');

            // Create message for LINE Notify
            const message = `Survey Submission\nName: ${name}\nEmail: ${email}\nAge: ${age}\nSatisfaction: ${satisfaction}\nComments: ${comments}`;

            // Send notification to LINE
            fetch('https://notify-api.line.me/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer fI7cMsbkayPHaT28DlRHfCBQSRfHSwJhSEkK1gpQm6R'
                },
                body: `message=${encodeURIComponent(message)}`
            })
            .then(response => {
                if (response.ok) {
                    // Save data to Firestore
                    db.collection('survey_responses').add({
                        name: name,
                        email: email,
                        age: age,
                        satisfaction: satisfaction,
                        comments: comments,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        window.location.href = 'thankyou.html';
                    })
                    .catch(error => {
                        console.error('Error writing document: ', error);
                        alert('Failed to save data');
                    });
                } else {
                    alert('Failed to send notification');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to send notification');
            });
        });
    }
});