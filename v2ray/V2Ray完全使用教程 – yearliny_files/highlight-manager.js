// On-Demand Loading 
function lazy_load_highlight() {
    const blocks = document.querySelectorAll('pre code');

    // If there is no code block, it will not continue
    if (blocks.length == 0) {
        return
    }

    // Avoid conflicts
    if (!this.hasOwnProperty('hljs')) {
        // load js
        let highlightJs = document.createElement('script');
        highlightJs.type = 'text/javascript';
        highlightJs.src = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/highlight.min.js';

        // load css
        let highlightCSS = document.createElement('link');
        highlightCSS.rel = 'stylesheet';
        highlightCSS.href = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/styles/atom-one-light.min.css';
        
        document.body.append(highlightJs, highlightCSS);

        // highlight settings
        highlightJs.onload = function(){
            blocks.forEach(function(block){
                hljs.highlightBlock(block)
            })
        }
    }
}

window.onload = lazy_load_highlight;
