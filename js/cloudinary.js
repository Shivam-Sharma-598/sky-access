export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "skyaccess_unsigned");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbar25zcx/upload",
        {
            method: "POST",
            body: formData
        }
    );

    return await res.json();
}
