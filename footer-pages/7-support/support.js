document.getElementById("supportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const issue = document.getElementById("issue").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !issue || !message) {
        alert("Please fill all fields");
        return;
    }

    alert("Support request submitted successfully");
    this.reset();
});
