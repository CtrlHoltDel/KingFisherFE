export const fileDownload = (data) => {
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(data)]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.json'); //or any other extension
    document.body.appendChild(link);
    link.click();
}