require 'spec_helper'

describe UploadProgressController do

  describe "#index" do
    it "should render index page" do
      get :index
      response.status.should eql(200)
    end
  end

  describe "#new" do
    it "should render new" do
      get :new
      response.status.should eql(200)
    end
  end

  describe "#create" do

    it "should fail and return status 409 if empty data" do
      lambda do
        post :create, :audio_file => {}
        response.status.should eql(409)
      end.should change(AudioFile, :count).by(0)
    end

    it "should create audiofile with file" do
      lambda do           
        post :create, :audio_file => { :file => File.new(Rails.root.to_s + '/spec/fixtures/images/rails.png') }
        response.status.should eql(200)
      end.should change(AudioFile, :count).by(1)
    end

  end
  
  describe "#update" do
    
    it "should add name to existing audio_file" do
      @af = AudioFile.create(:file => File.new(Rails.root.to_s + '/spec/fixtures/images/rails.png') )
      lambda do                                
       post :update, :id => @af.id, :audio_file => { :name => "kuba" }
       @af.reload
       @af.name.should eql("kuba") 
      end.should change(AudioFile, :count).by(0) 
      @af.destroy
    end
    
  end

end
