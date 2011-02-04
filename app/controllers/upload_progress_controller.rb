class UploadProgressController < ApplicationController
  
  def index
  end

  def new
    @audio_file = AudioFile.new
    @uid = AudioFile::generate_uid
  end

  def create    
    request.format = :js
    @audio_file = AudioFile.new( params[:audio_file] )
    if @audio_file.save
      respond_to do |format|
        format.html{
          render :text => "wrong door"
        }
        format.js{ 
          render :json => {:path => @audio_file.file.url, :id => @audio_file.id }.to_json
        }
      end
    else
      render :json => { :errors => @audio_file.errors.full_messages },
             :status => 409
    end
  end 
  
  def update
    # in real life you should always check if item is this user not some prankster, current_user.audio_files.find
    @audio_file = AudioFile.find( params[:id] )
    if @audio_file.update_attributes(params[:audio_file])
      render :json => { :name => @audio_file.name },
             :status => 200 
    else
      render :json => { :errors => @audio_file.errors.full_messages },
             :status => 409
    end 
  end

end
