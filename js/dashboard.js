import { auth, db } from "./firebase.js";
import { uploadFile } from "./cloudinary.js";

import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM elements
const uploadBtn = document.getElementById("uploadBtn");
const usedEl = document.getElementById("used");
const limitEl = document.getElementById("limit");
const progressEl = document.getElementById("progress");
const fileListEl = document.getElementById("fileList");
const userNameEl = document.getElementById("userName");

// 🔹 LOAD USER DATA ON PAGE LOAD
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "../index.html";
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert("User data not found!");
            return;
        }

        const data = userSnap.data();

        // Set default values if undefined
        const usedMB = typeof data.usedMB === "number" ? data.usedMB : 0;
        const limitMB = typeof data.limitMB === "number" ? data.limitMB : 100; // default limit 100MB
        const files = Array.isArray(data.files) ? data.files : [];

        // show user name
        userNameEl.innerText = data.name || "User";

        // update storage UI
        updateStorageUI(usedMB, limitMB);

        // show files
        renderFiles(files);

    } catch (err) {
        console.error("Error loading user data:", err);
        alert("Failed to load user data");
    }
});

// 🔹 UPDATE STORAGE UI
function updateStorageUI(used, limit) {
    const safeUsed = isNaN(used) ? 0 : Math.max(0, used);
    const safeLimit = isNaN(limit) || limit <= 0 ? 100 : limit;

    usedEl.innerText = safeUsed.toFixed(2);
    limitEl.innerText = safeLimit.toFixed(2);

    const percentage = Math.min((safeUsed / safeLimit) * 100, 100);
    progressEl.style.width = percentage + "%";
}

// 🔹 RENDER FILE LIST + DELETE
function renderFiles(files) {
    fileListEl.innerHTML = "";

    // latest file sabse upar
    const sortedFiles = [...files].sort(
        (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );

    sortedFiles.forEach((file) => {
        const div = document.createElement("div");
        div.className = "file";

        const fileName = file.name && file.name !== "undefined" ? file.name : "Unnamed File";
        const fileSize = typeof file.size === "number" ? file.size.toFixed(2) : "0.00";

        div.innerHTML = `
          <div style="display: inline;">
            <strong style="margin-left:1rem;">${fileName}</strong>
            <a href="${file.url}" target="_blank" style="margin-left:1rem; margin-right:1rem;">View File</a>
            <span style="margin-right:1rem;"> (${fileSize} MB)</span>
          </div>
          <button class="deleteBtn" style="margin-bottom:1rem; margin-top:1rem;">Delete</button>
        `;

        div.querySelector(".deleteBtn").onclick = async () => {
            try {
                const userRef = doc(db, "users", auth.currentUser.uid);
                const userSnap = await getDoc(userRef);
                const data = userSnap.data();

                const updatedUsed = Math.max(0, (data.usedMB || 0) - (file.size || 0));
                const updatedFiles = Array.isArray(data.files)
                    ? data.files.filter(f => f.url !== file.url)
                    : [];

                await updateDoc(userRef, {
                    usedMB: updatedUsed,
                    files: arrayRemove(file)
                });

                updateStorageUI(updatedUsed, data.limitMB || 100);
                renderFiles(updatedFiles);

            } catch (err) {
                console.error("Error deleting file:", err);
                alert("Failed to delete file");
            }
        };

        fileListEl.appendChild(div);
    });
}

// 🔹 UPLOAD FILE
uploadBtn.onclick = async () => {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("Select a file");

    showLoader();

    try {
        const sizeMB = file.size / (1024 * 1024);
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        const data = snap.data();
        const usedMB = typeof data.usedMB === "number" ? data.usedMB : 0;
        const limitMB = typeof data.limitMB === "number" ? data.limitMB : 100;
        const files = Array.isArray(data.files) ? data.files : [];

        if (usedMB + sizeMB > limitMB) {
            hideLoader();
            return alert(`Storage limit exceeded! Max ${limitMB} MB`);
        }

        const uploadRes = await uploadFile(file);

        const newFile = {
            url: uploadRes.secure_url,
            size: Number(sizeMB.toFixed(2)),
            name: file.name,
            createdAt: Date.now()
        };

        const newUsed = usedMB + sizeMB;

        await updateDoc(userRef, {
            usedMB: newUsed,
            files: arrayUnion(newFile)
        });

        updateStorageUI(newUsed, limitMB);
        renderFiles([...files, newFile]);

        alert("Your file is uploaded successfully");
        hideLoader();

    } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed");
        hideLoader();
    }
};
