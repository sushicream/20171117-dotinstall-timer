(function() {
    'use strict';

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    var startTime;
    var timeLeft;
    var timeToCountDown = 4 * 1000;
    var timerId;

    // 分・秒に変換
    function updateTimer(t) {
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();

        // 桁数が足りないときは0で埋める
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('00' + ms).slice(-3); // ミリ秒の場合は3桁

        // 表示
        timer.textContent = m + ':' + s + '.' + ms;
    }

    // カウントダウン
    function countDown() {
        timerId = setTimeout(function() {
            timeLeft = timeToCountDown - (Date.now() - startTime);
            // 残り時間が0以下になったらタイマーを止める
            if(timeLeft < 0) {
                clearTimeout(timerId);
                timeLeft = 0;
                timeToCountDown = 0;
                updateTimer(timeLeft);
                return;
            }
            updateTimer(timeLeft);
            countDown();
        }, 10);
    }

    // スタートボタン
    start.addEventListener('click', function() {
        // 開始時刻
        startTime = Date.now();
        countDown();
    });
})();
