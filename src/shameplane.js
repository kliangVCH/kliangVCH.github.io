function runShamePlane() {
    var e = map.emission;
    console.log("runShamePlane"), console.log(e);
    var t = document.getElementById("coBarThree"),
        o = e / 1e3;
    setClassValue("co", o.toFixed(2)), (t.style = "height: calc(" + o + "rem * 10)");
}
function setClassValue(e, t) {
    for (els = document.getElementsByClassName(e), i = 0; i < els.length; i++) els[i].innerText = t;
}
function changeOPT(e) {
    document.getElementById(e.currentTarget.id + "-bar").classList.toggle("on");
}
const opt1 = document.getElementById("opt1");
opt1.addEventListener("change", changeOPT);
const opt2 = document.getElementById("opt2");
opt2.addEventListener("change", changeOPT);
const opt4 = document.getElementById("opt4");
opt4.addEventListener("change", changeOPT);
const opt5 = document.getElementById("opt5");
opt5.addEventListener("change", changeOPT);
const opt7 = document.getElementById("opt7");
function addMetaData(e, t, o, n) {
    const r = [
        { name: "description", content: e + " â†’ " + t + " = " + o + "tCOâ‚‚e.Explore how this trip compares to the efforts you make to reduce your carbon footprint." },
        { property: "og:url", content: location.href },
        { property: "og:title", content: e + " â†’ " + t + " = " + o + "tCOâ‚‚e" },
        { property: "og:description", content: "Explore how this trip compares to the efforts you make to reduce your carbon footprint." },
    ];
    for (i = 0; i < r.length; i++) {
        var c = document.createElement("meta");
        c.setAttribute("name", r[i].content), c.setAttribute("property", r[i].property), c.setAttribute("content", r[i].content), document.getElementsByTagName("head")[0].appendChild(c);
    }
    document
        .querySelector('meta[name="description"]')
        .setAttribute(
            "content",
            "The emissions for a plane seat flying to " +
                t +
                " from " +
                e +
                " will be  tons of COâ‚‚. Resulting in the loss of mÂ² of arctic summer ice. Explore how this trip compares to the efforts you make to reduce your carbon footprint."
        ),
        (document.querySelector("title").innerText = "The COâ‚‚ emissions for flying to " + t);
}
opt7.addEventListener("change", changeOPT);

