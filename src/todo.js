var taskInput = document.getElementById("autocomplete"),
    addButton = document.getElementById("addbutton"),
    calculateButton = document.getElementById("calculate"),
    incompleteTaskHolder = document.getElementById("incomplete-tasks");
$("#incomplete-tasks").disableSelection(),
    $("#autocomplete").keydown(function (e) {
        13 == e.keyCode && (e.preventDefault(), $(".autocomplete-results").is(":visible") || addButton.click());
    });
var createNewTaskElement = function (e, t) {
        var a = document.createElement("li"),
            o = document.createElement("label"),
            n = document.createElement("button");
        (o.className = "mb-0"), (o.innerText = e), (o.id = e + t), (n.className = "delete btn");
        var l = document.createElement("i");
        return (l.className = "fa fa-trash"), n.appendChild(l), a.appendChild(o), a.appendChild(n), a;
    },
    addTask = function (e) {
        console.log("Add Task...");
        var t = createNewTaskElement(taskInput.value, e);
        incompleteTaskHolder.appendChild(t), bindTaskEvents(t, taskCompleted), (taskInput.value = ""), addMarker($(t));
    },
    deleteTask = function (e) {
        console.log("Delete Task...");
        var t,
            a = this.parentNode,
            o = a.parentNode;
        for (var n in (o.removeChild(a), map.markers)) map.markers[n].airport.LocationID == a.getAttribute("data-location") && (t = n);
        map.markers.splice(t, 1), map.markerDistance(), updateLabelText(), 0 == $("#incomplete-tasks > li").length && $("#incomplete-tasks").addClass("d-none");
    },
    taskCompleted = function () {
        console.log("Complete Task...");
        var e = this.parentNode;
        completedTasksHolder.appendChild(e), bindTaskEvents(e, taskIncomplete);
    },
    taskIncomplete = function () {
        console.log("Incomplete Task...");
        var e = this.parentNode;
        incompleteTaskHolder.appendChild(e), bindTaskEvents(e, taskCompleted);
    };
addButton.addEventListener("click", function () {
    if ("" != taskInput.value) {
        var e = $("#journeytype [name='journeytype']:checked").val();
        addTask(e), $("#incomplete-tasks").removeClass("d-none"), console.log(e), document.getElementById("autocomplete").focus();
    }
});
var bindTaskEvents = function (e, t) {
    console.log("bind list item events"), (e.querySelector("button.delete").onclick = deleteTask);
};
function addMarker(e) {
    var t = JSON.parse($("#autocomplete").attr("data-airport")) || {};
    $("#autocomplete").attr("data-airport", "");
    var a = { airport: t, x: t.x, y: t.y, startX: t.x, startY: t.y, fill: "#f47825", flying: 1 == $("#journeytype [name='journeytype']:checked").val(), current: !0, index: map.markers.length };
    e.attr("data-location", t.LocationID + map.markers.length), map.markers.push(a), (map.currentAirport = t), (map.currentMarker = a), map.markerDistance(), updateLabelText();
}
function updateFormData() {
    for (var e = 0, t = document.querySelector("#incomplete-tasks").childElementCount; e < t; e++) {
        var a = "#city" + e;
        document.querySelector(a).value = document.querySelector("#incomplete-tasks").children[e].children[0].id;
    }
}
function updateEmissionData() {
    $("#distancebetween [data-distance]").text(map.distance),
        map.calculateEmission(),
        $("#totalEmission[data-emission]").text(parseInt(map.emission)),
        (document.querySelector("#totalCities").innerHTML = document.querySelector("#incomplete-tasks").childElementCount),
        $("#emission-data").show();
}
function updateLabelText() {
    $("#journeytype").val("1"),
        map.markers.length <= 0 ? ($("#sort-it [for='autocomplete']").text("I'm starting my CaRMS Tour from"), $("#journeytype").hide()) : ($("#sort-it [for='autocomplete']").text("I then travelled to"), $("#journeytype").show()),
        map.markers.length > 1 ? $("#calculate").show() : ($("#calculate").hide(), $("#emission-data").hide()),
        $("#emission-data").is(":visible") && (updateEmissionData(), runInfographic(), drawCharts());
}
function animateThankYouMessage() {
    $("#thankyou").show(),
        $("html, body")
            .stop()
            .animate({ scrollTop: $("#thankyou").position().top }, 500);
}
function updateShamePlane() {
    (document.getElementById("opt1").checked = !1),
        (document.getElementById("opt2").checked = !1),
        (document.getElementById("opt4").checked = !1),
        (document.getElementById("opt5").checked = !1),
        (document.getElementById("opt7").checked = !1),
        document.getElementById("opt1-bar").classList.remove("on"),
        document.getElementById("opt2-bar").classList.remove("on"),
        document.getElementById("opt4-bar").classList.remove("on"),
        document.getElementById("opt5-bar").classList.remove("on"),
        document.getElementById("opt7-bar").classList.remove("on");
}
calculateButton.addEventListener("click", function () {
    updateEmissionData(),
        updateFormData(),
        $("html, body")
            .stop()
            .animate({ scrollTop: $("#emission-data").position().top }, 500),
        runInfographic(),
        drawCharts(),
        updateShamePlane(),
        document.getElementById("schooloforigin").focus();
});

