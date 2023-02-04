var str = document.querySelector("#distancebetween").innerText,
    res = Number(str.replace(/\D/g, "")),
    adjusteddistance = 1.609344 * res;

