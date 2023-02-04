function runInfographic() {
    console.log(objectEmission.innerText),
        console.log(map.emission),
        animateValue(objectEmission, 0, objectEmission.innerHTML, 1500),
        animateValue(objectDistance, 0, objectDistance.innerHTML, 1500),
        animateValue(objectCity, 0, objectCity.innerHTML, 500),
        $("#2009aid").text("$" + $("#td4_2").text() + "m"),
        $("#2010aid").text("$" + $("#td4_3").text() + "m"),
        (bar1 = parseInt($("#td3_2").text())),
        (bar2 = parseInt(map.emission)),
        (area1 = parseFloat($("#td4_2").text())),
        (area2 = map.emission / 5),
        (biggestbar = bar1),
        bar2 > biggestbar && (biggestbar = bar2),
        (maxheight = 350),
        (bar1height = (bar1 / biggestbar) * maxheight),
        (bar2height = (bar2 / biggestbar) * maxheight),
        $("#chart1_bar1").delay(500).animate({ height: bar1height }, 1e3),
        $("#chart1_bar2").delay(1e3).animate({ height: bar2height }, 1e3),
        (maxwidth = 400),
        (area1width = parseInt((area1 / (area1 + area2)) * maxwidth)),
        (area2width = parseInt((area2 / (area1 + area2)) * maxwidth)),
        $("#chart3_area2").delay(2500).animate({ height: area2width, width: area2width }, 1e3),
        $("#barcharts").hover(
            function () {
                $("#areacharts").stop().animate({ opacity: 0.5 });
            },
            function () {
                $("#areacharts").stop().animate({ opacity: 1 });
            }
        ),
        $("#areacharts").hover(
            function () {
                $("#barcharts").stop().animate({ opacity: 0.5 });
            },
            function () {
                $("#barcharts").stop().animate({ opacity: 1 });
            }
        ),
        $("#data").hide(),
        runShamePlane();
}

