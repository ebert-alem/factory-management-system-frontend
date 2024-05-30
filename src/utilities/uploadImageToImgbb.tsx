export const uploadImageToImgbb = async (imageFile: any) => {
    const apiKey = 'c3e93becd7397da9778d5c011d0be12e';
    const apiUrl = 'https://api.imgbb.com/1/upload';

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('key', apiKey);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.data.url;
        } else {
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// export const deleteImageFromImgbb = async (deleteUrl: string) => {
//     const apiKey = 'c3e93becd7397da9778d5c011d0be12e';
//     const apiUrl = `https://api.imgbb.com/1/delete?url=${encodeURIComponent(deleteUrl)}&key=${apiKey}`;

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'GET',
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data.success;
//         } else {
//             throw new Error('Image deletion failed');
//         }
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }