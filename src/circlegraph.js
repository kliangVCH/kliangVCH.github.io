function drawCharts() {
    document.querySelectorAll(".percent-circle").forEach(function (e) {
        var r = map.emission / 3910,
            t = 100 * r;
        $(".percent-circle").attr("data-percent", t.toFixed(1).toString());
        var c = e.offsetWidth,
            a = Math.ceil(c * Math.PI);
        if (r < 100) var i = Math.ceil(a * r);
        else i = a;
        var n = a - i;
        e.querySelector(".percent-circle-inner").style.strokeDasharray = i + "px " + n + "px";
    });
}

