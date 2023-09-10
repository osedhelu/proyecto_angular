
export function validateElementCreation(elementId, callback) {
    const element = document.getElementById(elementId);

    if (element) {
        callback(element);
    } else {
        setTimeout(() => {
            validateElementCreation(elementId, callback);
        }, 100);
    }
}
