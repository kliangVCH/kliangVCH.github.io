map = new Vue({
    el: "#app",
    data: () => ({ distance: null, emission: null, airports: [], currentAirport: null, lastAirport: null, markers: [] }),
    filters: { numberWithCommas: (r) => (r && r.toString ? r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : r) },
    mounted() {
        var r = d3.geoAlbers().parallels([50, 70]).rotate([90, 0, 0]).scale([1500]);
        (this.projection = r),
            fetch("data/canada.json")
                .then((r) => r.json())
                .then((e) => {
                    var t = d3.geoPath().projection(r);
                    d3.select(this.$refs.provinces).selectAll("path").data(e.features).enter().append("path").attr("d", t);
                }),
            fetch("data/canadianairport.json")
                .then((r) => r.json())
                .then((e) => {
                    for (var t, a, i = (e = e.slice(0, 100)).length; i--; ) (t = e[i]), (a = r([t.Lng, t.Lat])) ? ((t.x = a[0]), (t.y = a[1])) : e.splice(i, 1);
                    this.airports = e.reverse();
                    var s = null;
                    this.markers.forEach((r) => {
                        var e = this.randomAirport();
                        e == s && (e = this.randomAirport()), (s = e), (r.airport = e), (r.x = e.x), (r.y = e.y);
                    }),
                        this.markerDistance();
                });
    },
    methods: {
        randomAirport() {
            return this.airports[Math.floor(Math.random() * this.airports.length)];
        },
        markerSet(r, e) {
            if ((r && r.preventDefault(), ((e = e || this.markers[0]).airport = null), (e.current = !0), (e.startX = e.x), (e.startY = e.y), (this.currentAirport = null), (this.currentMarker = e), this.airplaneTween)) {
                var t = this.airplaneTween,
                    a = new TimelineLite();
                a.to(this.$refs.airplane, 0.2, {
                    opacity: 0,
                    ease: "Linear.easeNone",
                    onComplete: function () {
                        t && t.kill();
                    },
                }),
                    (this.airplaneFade = a);
            }
            this.markerDrag(r), this.$refs.map.addEventListener("mouseleave", this.markerLeave);
        },
        markerDrag(r) {
            if (((this.currentMarker.airport = this.currentAirport), this.currentAirport)) (this.currentMarker.x = this.currentAirport.x), (this.currentMarker.y = this.currentAirport.y);
            else {
                d3.event = r;
                var e = d3.mouse(this.$refs.map);
                (this.currentMarker.x = e[0]), (this.currentMarker.y = e[1]);
            }
            this.markerDistance();
        },
        markerLeave() {
            (this.currentMarker.x = this.currentMarker.startX), (this.currentMarker.y = this.currentMarker.startY), this.markerStop();
        },
        markerStop() {
            console.log("stop!"),
                document.removeEventListener("mousemove", this.markerDrag),
                document.removeEventListener("mouseup", this.markerStop),
                this.$refs.map.removeEventListener("mouseleave", this.markerLeave),
                (this.currentMarker.current = !1),
                (this.currentMarker = null),
                this.markerDistance();
        },
        markerConnect() {
            if (!(this.markers.length < 2)) {
                for (var r = [], e = 0; e < this.markers.length - 1; e++) {
                    var t = this.markers[e],
                        a = this.markers[e + 1];
                    t.x < a.x && ((t = this.markers[e]), (a = this.markers[e + 1]));
                    var i = a.x - t.x,
                        s = a.y - t.y,
                        n = Math.sqrt(i * i + s * s);
                    r.push("M" + a.x + "," + a.y + "A" + n + "," + n + " 0 0,1 " + t.x + "," + t.y);
                }
                return r;
            }
        },
        calcDistance(r, e, t, a, i) {
            var s = (Math.PI * r) / 180,
                n = (Math.PI * t) / 180,
                h = e - a,
                o = (Math.PI * h) / 180,
                l = Math.sin(s) * Math.sin(n) + Math.cos(s) * Math.cos(n) * Math.cos(o);
            return (l = 60 * (l = (180 * (l = Math.acos(l))) / Math.PI) * 1.1515), "K" == i && (l *= 1.609344), "N" == i && (l *= 0.8684), (l *= 1.60934);
        },
        markerDistance() {
            if ((this.airplaneTween && (this.airplaneTween.kill(), $(".airplane").css("opacity", 0)), (this.distance = 0), !(this.markers.length < 2))) {
                for (var r = 0; r < this.markers.length - 1; r++) {
                    var e = this.markers[r],
                        t = this.projection.invert([e.x, e.y]).reverse(),
                        a = this.markers[r + 1],
                        i = this.projection.invert([a.x, a.y]).reverse();
                    this.distance += Math.round(this.calcDistance(t[0], t[1], i[0], i[1]));
                }
                this.airplaneAnimate();
            }
        },
        airportSnap(r, e) {
            e !== this.currentAirport && ((e.current = !0), (this.currentAirport = e), this.currentMarker && (this.currentMarker.airport = e));
        },
        airportLeave(r, e) {
            (e.current = !1), (this.currentAirport = null), (this.lastAirport = e);
        },
        airplaneAnimate() {
            var r = this.markerConnect(),
                e = new TimelineMax({ repeat: -1, delay: -0.2 }),
                t = Math.min(this.distance / 80, 15),
                a = Math.min(0.2 * t, 0.3);
            this.airplaneFade && this.airplaneFade.isActive()
                ? (e.pause(),
                  this.airplaneFade.eventCallback("onComplete", function () {
                      e.play();
                  }))
                : this.airplaneTween && this.airplaneTween.kill();
            var i = MorphSVGPlugin.pathDataToBezier(r.join(" "));
            e.to(this.$refs.airplane, t, { bezier: { values: i, curviness: 1, autoRotate: -90, type: "cubic" }, reversed: !0, ease: Linear.easeNone }, 0),
                e.fromTo(this.$refs.airplane, a, { opacity: 0 }, { opacity: 1, delay: a / 2, ease: "Linear.easeNone" }, 0),
                e.to(this.$refs.airplane, a, { opacity: 0, ease: "Linear.easeNone" }, "-=" + a),
                (this.airplaneTween = e);
        },
        calculateEmission() {
            this.emission = 0;
            for (var r = 0, e = 0, t = null, a = null, i = null, s = null, n = 0; n < this.markers.length; n++)
                this.markers[n].flying && (t ? ((i = this.markers[n]), (s = this.projection.invert([i.x, i.y]).reverse())) : ((t = this.markers[n]), (a = this.projection.invert([t.x, t.y]).reverse()))),
                    t && i && ((r = Math.round(this.calcDistance(a[0], a[1], s[0], s[1]))), (e += r *= r < 463 ? 0.25493 : r > 463 && r < 3700 ? 0.15573 : 0.14981), (t = i), (a = s), (i = null), (s = null));
            this.emission = e;
        },
    },
});

