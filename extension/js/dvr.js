$(document).ready(() => {
    chrome.runtime.sendMessage({message: "check_extension"}, (installed) => {
        if(installed){
            let location_href = location.href;
            let location_tmp = location_href.replace('https://wasd.tv/channel/', '');
            let channel_id = parseInt(location_tmp);
            let getPlayer = setInterval(() => {
                let container = $('.player-controls__container');
                let live = $('.player-info__stat-value-red');
                if(container.length > 0 && live.length > 0){
                    let row = $(container).find('div');
                    $(row[2]).prepend('<div id="dvr"></div>');
                    clearInterval(getPlayer);
                }else if(container.length > 0 && live.length == 0){
                    clearInterval(getPlayer);
                }
            }, 250);
        
            $(document).on('click', '#dvr', async () => {
                let stream = await getStreamStartTime(channel_id);
                if(stream.time != 0){
                    window.open(`https://cdn-curie.wasd.tv/live/${stream.user_id}/index-${stream.time}-now.m3u8`, '_blank');
                }
            });
        }else{
            console.log('[WASD.tv Tool | DVR] Need enable or install: https://chrome.google.com/webstore/detail/play-hls-m3u8/ckblfoghkjhaclegefojbgllenffajdc/related?hl=ru');
        }
    });
});

function getStreamStartTime(channel_id){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://wasd.tv/api/media-containers?media_container_status=RUNNING&limit=1&offset=0&channel_id=${channel_id}&media_container_type=SINGLE,COOP&order_direction=DESC`,
            type: 'GET',
            dataType: 'json',
            success: (json) => {
                let result = json.result;
                if(result.length > 0){
                    let media_container_streams = result[0].media_container_streams;
                    if(media_container_streams.length > 0){
                        let created_at = media_container_streams[0].created_at;
                        let time_tmp = Date.parse(created_at);
                        let time = Math.floor(time_tmp / 1000);
                        let user_id = media_container_streams[0].user_id;
                        resolve({time, user_id});
                    }else{
                        resolve(0);
                    }
                }else{
                    resolve(0);
                }
            },
            error: () => {
                resolve(0);
            }
        });
    });
}
