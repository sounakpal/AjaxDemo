$(document).ready(function () {
    //code to populate the links of the Ul
    var objectMain = {

        dataJson: "",
        callAjax: function () {
            $.ajax({
                dataType: "json",
                url: 'data/link.json',
                //data: data,
                success: function (data) {
                    objectMain.dataJson = data;
                    objectMain.populateLi();
                }
            });
        },
        populateLi: function () {
            for (var key in objectMain.dataJson) {
                //console.log(objectMain.dataJson[key]);
                var x = objectMain.dataJson[key];
                $('#' + key).append("<ul class='addToFooter'></ul>");
                for (var abc in x) {
                    $('#' + key + ' .addToFooter').append('<li><a href="' + x[abc] + '">' + abc + '</a></li>');
                    //console.log(x[abc] + " " + abc);
                }
            }
        },
        xmlData: "",
        countXml: "",
        callXmlData: function () {
            $.ajax({
                url: "data/playerData.xml",
                dataType: "xml",
                success: objectMain.parseXml
            });
        },
        parseXml: function (data, status, details) {
            $(data).find('Name').each(function (i) {
                $data = $("<a class='next'>aaaa</a><a class='previous'>bbbb</a><div class='wrap'><div class='left'><img src='" + $(this).find('src').text() + "' /></div><div class='right'><p class='something'>Born on:" + $(this).find('Born').text() + "</p></div></div>");
                $('#second .container').append($data);
                i++;
                alert(i);
                return false;
            });
        },

        some: function(){
        	$('#second').on('click', '.next', function () {
		        $(this).siblings('.wrap').empty();
		        objectMain.parseXml();
		    });
        }

    };

    objectMain.callAjax();
    objectMain.callXmlData();
    objectMain.some();
    
    //code for the first div 
    $('#first').on('click', 'ul a', function () {
        $('#first .container').load(this.href, function (response, status, xhr) {
            if (status == "error") {
                var extra = "<h1>The page was intentionally removed.</h1>";
                var msg = "Sorry but there was an error: ";
                $(this).html(extra + msg + xhr.status + " " + xhr.statusText);
            }
        });
        return false;
    });
    //ends here

});