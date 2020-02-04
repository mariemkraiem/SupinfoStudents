let app = new Vue({
    el: '#app',
    data: {
        Title: "Coucou louloute <3",
        students: [
            {
                nom: "Kraiem",
                prenom: "Mariem",
                annee: 5,
            },
            {
                nom: "Kraiem",
                prenom: "Mariem",
                annee: 5,
            },
            {
                nom: "Kraiem",
                prenom: "Mariem",
                annee: 5,
            },
            {
                nom: "Kraiem",
                prenom: "Mariem",
                annee: 5,
            },
            {
                nom: "Kraiem",
                prenom: "Mariem",
                annee: 5,
            }],
    }
});

function loadStudents() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
           app._data.students = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "/api/students/all", true);
    xhttp.send();
}
