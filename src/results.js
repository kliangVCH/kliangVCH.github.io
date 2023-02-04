function animateValue(e, t, a, n) {
    if (e) {
        var o = e.innerHTML;
        console.log(a);
        var r = a,
            i = Math.abs(Math.floor(n / r));
        i = Math.max(i, 50);
        var c,
            l = new Date().getTime() + n;
        function m() {
            var t = new Date().getTime(),
                i = Math.max((l - t) / n, 0),
                m = Math.round(a - i * r);
            (e.innerHTML = o.replace(/([0-9]+)/g, m)), m == a && clearInterval(c);
        }
        (c = setInterval(m, i)), m();
    }
}
var objectEmission = document.querySelector("#totalEmission"),
    objectDistance = document.querySelector("#totalDistance"),
    objectCity = document.querySelector("#totalCities");

