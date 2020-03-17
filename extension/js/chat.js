$(document).ready(() => {
    console.log('[WASD.tv Tool] Init!');
    let getChat = setInterval(() => {
        let chat_messages = $( ".chat-messages" );
        if(chat_messages.length > 0){
            clearInterval(getChat);
            creatObserver();
        }
    }, 200);
});

function creatObserver(){
    let chat_messages = $(".chat-messages");
    if(chat_messages.length > 0){
        let target = chat_messages[0];
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                let newNodes = mutation.addedNodes;
                if(newNodes !== null && newNodes.length > 0){
                    let chat_message = newNodes[0];
                    let span = $(chat_message).find('span');
                    if(span.length > 1){
                        let message = $(span[1]).html();
                        let match = message.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
                        if(match){
                            for(let i = 0; i <  match.length; i++){
                                message = message.replace(match[i], `<a href="${match[i]}" target="_blank" style="text-decoration: underline;">${match[i]}</a>`);
                            }
                        }
                        $(span[1]).html(message);
                    }
                }
            });    
        });
        let config = { attributes: true, childList: true, characterData: true };
        observer.observe(target, config);
    }
}
