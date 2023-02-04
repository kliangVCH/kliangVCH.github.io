var options = {
        shouldSort: !0,
        threshold: 0.1,
        maxPatternLength: 32,
        keys: [
            { name: "LocationID", weight: 0.5 },
            { name: "NAME", weight: 0.3 },
            { name: "City", weight: 0.2 },
        ],
    },
    fuse = new Fuse(airports, options),
    ac = $("#autocomplete")
        .on("click", function (t) {
            t.stopPropagation();
        })
        .on("focus keyup", search)
        .on("keyup", onKeyDown),
    wrap = $("<div>").addClass("autocomplete-wrapper").insertBefore(ac).append(ac),
    list = $("<div>")
        .addClass("autocomplete-results")
        .on("click", ".autocomplete-result", function (t) {
            t.preventDefault(), t.stopPropagation(), selectIndex($(this).data("index"));
        })
        .appendTo(wrap);
function clearResults() {
    (results = []), (numResults = 0), list.empty();
}
function selectIndex(t) {
    if (results.length >= t + 1) {
        var e = results[t].City + " - " + results[t].LocationID;
        ac.attr("data-airport", JSON.stringify(findMapAirport(results[t].LocationID))), ac.val(e).focus(), clearResults(), $(".autocomplete-results").hide();
    }
}
function findMapAirport(t) {
    var e = null;
    for (var a in map.airports) null == e && map.airports[a].LocationID == t && (e = map.airports[a]);
    return e;
}
$(document)
    .on("mouseover", ".autocomplete-result", function (t) {
        var e = parseInt($(this).data("index"), 10);
        isNaN(e) || list.attr("data-highlight", e);
    })
    .on("click", clearResults);
var results = [],
    numResults = 0,
    selectedIndex = -1;
function search(t) {
    if (38 !== t.which && 13 !== t.which && 40 !== t.which)
        if (ac.val().length > 0) {
            (results = _.take(fuse.search(ac.val()), 2)), (numResults = results.length);
            var e = results.map(function (t, e) {
                return '<div class="autocomplete-result" data-index="' + e + '"><b>' + t.LocationID + "</b> - " + t.City + "</div>";
            });
            (selectedIndex = -1), list.html(e.join("")).attr("data-highlight", selectedIndex), $(".autocomplete-results .autocomplete-result").length ? $(".autocomplete-results").show() : $(".autocomplete-results").hide();
        } else (numResults = 0), list.empty();
}
function onKeyDown(t) {
    if (!(ac.val().length <= 0 || (38 != t.which && 13 != t.which && 40 != t.which))) {
        t.stopPropagation(), t.preventDefault();
        var e = $(".autocomplete-results > .autocomplete-result.active").index(),
            a = $(".autocomplete-results > .autocomplete-result").length;
        switch (($(".autocomplete-results > .autocomplete-result.active").removeClass("active"), t.which)) {
            case 38:
                -1 == e ? $(".autocomplete-results > .autocomplete-result:last").addClass("active") : $(".autocomplete-results > .autocomplete-result:eq(" + (e - 1 < 0 ? a - 1 : --e) + ")").addClass("active");
                break;
            case 13:
                $(".autocomplete-results > .autocomplete-result:eq(" + e + ")").click();
                break;
            case 40:
                -1 == e ? $(".autocomplete-results > .autocomplete-result:first").addClass("active") : $(".autocomplete-results > .autocomplete-result:eq(" + (e + 1 >= a ? 0 : ++e) + ")").addClass("active");
                break;
            default:
                return;
        }
    }
}

