livePreview = document.getElementById("livePreview");
simulatePost = document.getElementById("simulatePost");
inputCode = document.getElementById("inputCode");
errContainer = document.getElementById("errContainer");
errMsgs = document.getElementById("errMsgs");
output = document.getElementById("output");
preview = document.getElementById("preview");
adpost = document.getElementById("AD-post");
adcontent = document.getElementById("AD-content");

simulatePost.onchange = function() {
    if (simulatePost.checked) {
        livePreview.checked = false;
        livePreview.disabled = true;
    }
    else {
        livePreview.disabled = false;
    }
}

inputCode.onkeyup = function() {
    if (livePreview.checked) parseBB();
}

preview.onclick = function() {
    parseBB();
}

parseBB = function() {
    var result = XBBCODE.process({
        text: inputCode.value,
        removeMisalignedTags: false,
        addInLineBreaks: true
    });

    if (result.error) {
        errContainer.style.display = "block";
        errMsgs.innerHTML = result.errorQueue.join("<br/>");
    } else {
        errContainer.style.display = "none";
        errMsgs.innerHTML = "";
    }

    output.innerHTML = result.html;
    
    if (simulatePost.checked) {
        showAsPost();
    }
    else {
        adpost.style.display = 'none';
        adcontent.innerHTML = '';
    }
};

showAsPost = function() {
    adpost.style.display = 'block';
    adcontent.innerHTML = output.innerHTML;
    output.innerHTML = '<i>Veja a simulação do post abaixo</i>';
}

/** Tags AD **/
XBBCODE.addTags({
    
    "title1": {
        openTag: function(params,content) {
            return '<span class="pun_title1">&gt;&gt; ';
        },
        closeTag: function(params,content) {
            return '</span>';
        }
    },
    
    "title2": {
        openTag: function(params,content) {
            return '<span class="pun_title2">';
        },
        closeTag: function(params,content) {
            return '</span>';
        }
    },
    
    "code": {
        openTag: function(params,content) {
            return '<div class="code"><h4>Código:</h4><div class="scrollbox"><pre>';
        },
        closeTag: function(params,content) {
            return '</pre></div></div>';
        }
    },
    
    "quote": {
        openTag: function(params,content) {
            var quote = '<blockquote class="quote"><div>';
            if (params) quote += '<h4 class="punmob_quote">'+params.substring(1)+'</a> escreveu:</h4>';
            quote += '<span class="punmob_quote">';
            return quote;
        },
        closeTag: function(params,content) {
            return '</span></div></blockquote>';
        }
    },
    
    "spoiler": {
        openTag: function(params,content) {
            var spoilerTitle = params ? params.substring(1) : 'Spoiler (Clique para visualizar)';
            return '<blockquote class="spoil"><div><h4 onclick="' + "pchild=this.parentNode.getElementsByClassName('punmob_spoil'); if(pchild[1].style.display!='none'){pchild[1].style.display='none'; pchild[1].style.height='0';}else{pchild[1].style.display=''; pchild[1].style.height='';}" + '" class="punmob_spoil"><span>' + spoilerTitle + '</span></h4><span class="punmob_spoil" style="display:none;height:0;">';
        },
        closeTag: function(params,content) {
            return '</span></div></blockquote>';
        }
    }
    
});