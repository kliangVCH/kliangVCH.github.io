function handle_click(e) {
    setTimeout(continue_clicked, 100);
}
function continue_clicked() {
    hide_trans_summary.play();
}
document.querySelector("#addbutton").addEventListener("mouseup", handle_click);
var hide_trans_summary = anime({
        opacity: "0",
        easing: "easeInOutSine",
        duration: 500,
        begin: function () {},
        autoplay: !1,
        complete: function () {
            translate_button.play();
        },
    }),
    translate_button = anime({ targets: document.querySelector("#incomplete-tasks"), translateY: ["0", "0"], translateX: ["0", "0"], scale: 1, duation: 500, autoplay: !1, easing: "easeOutExpo", complete: function () {} });

