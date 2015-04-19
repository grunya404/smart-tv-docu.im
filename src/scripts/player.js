Player = {
    play: function(url) {
        var v = document.createElement('video');
        v.id = 'player';
        v.width = '320';
        v.height = '240';
        v.controls = 'controls';
        v.crossOrigin = 'use-credentials';
        v.preload = 'metadata';
        var s = document.createElement('source');
        s.src = url;
        //s.src = "http://d2.streambox.in:8081/docu/25Xb2pp0P8m9g6D1Z3945R45Pauc61I75.mp4/chunk.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9NC8xOS8yMDE1IDI6MDk6MDcgUE0maGFzaF92YWx1ZT3fka9d+qGz4X/prtYtD4zBJnZhbGlkbWludXRlcz0zNjA=";
        //s.type = 'video/mp4';
        s.type = 'application/x-mpegURL';
        v.appendChild(s);
        document.getElementById('player_wrapper').innerHTML = '';
        document.getElementById('player_wrapper').appendChild(v);
        document.getElementById('player_wrapper').style.display = 'block';
        v.pause();
        v.load();
        v.play();
    }
};