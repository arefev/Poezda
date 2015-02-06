smi2Tracker = {
    track: function(env) {
        if(typeof(env) == "undefined") { env = {}; }

        // send some miscellaneous info about the request
        // env.u = document.location.href;
        env.bw = window.innerWidth;
        env.bh = window.innerHeight;


        if(document.referrer && document.referrer != "") {
            env.ref = document.referrer;
        }

        env.rnd = Math.floor(Math.random() * 10e12);

        var params = [];
        for(var key in env) {
            if(env.hasOwnProperty(key)) {
                params.push(encodeURIComponent(key) + "=" + encodeURIComponent(env[key]));
            }
        }

        var img = new Image();
        img.width=1;
        img.height=1;
        img.src = '//target.smi2.net/init/?' + params.join('&');

    }
};

if(typeof(smi2TrackerSend) == "undefined") {
    var smi2TrackerSend=1;
    if(typeof(ttsmi2_data) == "undefined") { ttsmi2_data = {}; }
    smi2Tracker.track(ttsmi2_data);

}