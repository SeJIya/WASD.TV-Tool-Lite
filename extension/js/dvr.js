$(document).ready(() => {
    chrome.runtime.sendMessage({message: "check_extension"}, (installed) => {
        if(installed){
            let getPlayer = setInterval(() => {
                let container = $('.player-controls__container');
                let live = $('.player-info__stat-value-red');
                if(container.length > 0 && live.length > 0){
                    let row = $(container).find('div');
                    $(row[2]).prepend('<div id="dvr"></div>');
                    clearInterval(getPlayer);
                }
            }, 200);
        
            $(document).on('click', '#dvr', async () => {
                let time = await getStreamStartTime();
                if(time != 0){
                    window.open(`https://cdn-curie.wasd.tv/live/311570/index-${time}-9999999.m3u8`, '_blank');
                }
            });
        }else{
            console.log('[WASD.tv Tool | DVR] Need enable or install: https://chrome.google.com/webstore/detail/play-hls-m3u8/ckblfoghkjhaclegefojbgllenffajdc/related?hl=ru');
        }
    });
});

function getStreamStartTime(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://wasd.tv/api/media-containers?media_container_status=RUNNING&limit=1&offset=0&channel_id=173869&media_container_type=SINGLE,COOP&order_direction=DESC',
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
                        resolve(time);
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
