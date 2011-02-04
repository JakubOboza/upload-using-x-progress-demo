var Application = {
  
  init: function(){ 
   Application.initAudioFileWithProgressSubmit();   
  },

  
  /* reponse Handlers */      
  successOnAudioFileNameUpload: function(responseText){
    var audio_file_name_form = $("#audio-file-name-form"); 
    var audio_file_name = $("#audio-file-name"); 
    audio_file_name.text("file name:" + responseText.name); 
    audio_file_name.show();
    audio_file_name_form.hide();
  },
  
  errorOnAudioFileNameUpload: function(request){ 
    /* Here we would handle errors, like validations fails etc... not required by this "task" */
    console.debug("Huston we have a problem!"); 
    console.debug(request);
  },
  
  successOnAudioFileUpload: function(responseText){  
    var audio_file_path = $("#audio-file-path");
    audio_file_path.text(responseText.path); 
    audio_file_path.show();
    $("#progress").hide("slide");      
    var audio_file_name_form = $("#audio-file-name-form"); 
    console.debug(audio_file_name_form);
    // Let me set url to update action ->  
    var update_url = audio_file_name_form.attr('action') + "/" + responseText.id
    audio_file_name_form.attr('action', update_url);
    audio_file_name_form.ajaxForm({  
      success: Application.successOnAudioFileNameUpload,
      error: Application.errorOnAudiFileNameUpload
    });          
    audio_file_name_form.submit(); 
    console.debug(update_url);
  },
  
  errorOnAudiFileUpload: function(request){
    /* Here we would handle errors, like validations fails etc... not required by this "task" */ 
    console.debug(request);
  },
  
  fetchUploadProgress: function(uid){
    $.ajax({
      type: "GET",
      url: "/progress",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Progress-ID", uid);
      },
      error: function(e){
        alert("Something went wrong, sorry");
        /* Clear timeouts */  
        window.clearTimeout(e.timer); 
      },
      success: function(upload) {    
        var bar = $('#progress-bar');      
        
        /* Poor mans solution non nom nom eval nom*/
        var result = eval(upload);
        
        if (result.state == 'starting') { 
        }
        if (result.state == 'uploading') {
          var w = Math.floor((upload.received / upload.size)*100);
          bar.html(w + "%");
        }
        /* we are done, stop the interval */
        if (result.state == 'done') {
          window.clearTimeout(e.timer);
        }
        }
      });
  },
        
  /* Miss Fortune */
    
  initAudioFileWithProgressSubmit: function(){
    var audio_file_form_submit =  $('#audio-file-upload-form-submit');
    var audio_file_form = $("#audio-file-upload-form");     
    var audio_file_name_form = $("#audio-file-name-form");
    audio_file_form_submit.click(function(e){
      e.preventDefault();   
      audio_file_form.ajaxForm({  
        dataType: "json",
        success: Application.successOnAudioFileUpload,
        error: Application.errorOnAudiFileUpload
      });  
      audio_file_form.hide(); 
      audio_file_name_form.show();
      $("#progress").show();
      var uid = $('#X-Progress-ID').val();
      audio_file_form.attr("action", audio_file_form.attr("action") + "?X-Progress-ID=" + uid);
      audio_file_form.trigger("submit");
      interval = window.setInterval(
        function () {
          Application.fetchUploadProgress(uid);
        },
       1500 /* 2000 = 2 sec, lets take a small tax on lag */
      );
      return false;
    });
    
  },

};


$(document).ready(function() {
  Application.init();
});
